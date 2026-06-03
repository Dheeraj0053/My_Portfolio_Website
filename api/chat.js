const { SYSTEM_INSTRUCTION } = require('./portfolio-context');

const GROQ_MODEL = 'llama-3.1-8b-instant';
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_TURNS = 8;

function setCorsHeaders(res, origin) {
  const allowed = process.env.ALLOWED_ORIGINS;
  const headers = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (allowed === '*') {
    headers['Access-Control-Allow-Origin'] = '*';
  } else if (origin && allowed) {
    const list = allowed.split(',').map((o) => o.trim());
    if (list.includes(origin)) {
      headers['Access-Control-Allow-Origin'] = origin;
    }
  } else if (origin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Vary'] = 'Origin';
  }

  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .slice(-MAX_HISTORY_TURNS * 2)
    .filter(
      (item) =>
        item &&
        (item.role === 'user' || item.role === 'model' || item.role === 'assistant') &&
        typeof item.text === 'string' &&
        item.text.trim().length > 0
    )
    .map((item) => ({
      role: item.role === 'model' ? 'assistant' : item.role,
      content: item.text.trim().slice(0, MAX_MESSAGE_LENGTH),
    }));
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';

  if (req.method === 'OPTIONS') {
    setCorsHeaders(res, origin);
    return res.status(204).end();
  }

  setCorsHeaders(res, origin);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: 'Chat is not configured yet. Please set GROQ_API_KEY on the server.',
    });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: `Message must be under ${MAX_MESSAGE_LENGTH} characters` });
  }

  const history = sanitizeHistory(body.history);
  const messages = [
    { role: 'system', content: SYSTEM_INSTRUCTION },
    ...history,
    { role: 'user', content: message },
  ];

  const groqUrl = 'https://api.groq.com/openai/v1/chat/completions';

  try {
    const groqRes = await fetch(groqUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.35,
        max_tokens: 600,
        top_p: 0.9,
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error('Groq API error:', data);
      const errMsg = data.error?.message || JSON.stringify(data);
      return res.status(502).json({
        error: `Groq API Error: ${errMsg}`,
      });
    }

    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "I couldn't generate a response. Please email dheerajkumarr005@gmail.com.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({
      error: 'Something went wrong. Please try again later.',
    });
  }
};
