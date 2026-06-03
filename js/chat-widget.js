(function () {
  const SUGGESTIONS = [
    'What are your technical skills?',
    'Tell me about your internships',
    'What AI/ML projects have you built?',
    'How can I contact you?',
  ];

  const MAX_MESSAGE_LENGTH = 500;
  const API_URL =
    window.PORTFOLIO_CHAT_API ||
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:3000/api/chat'
      : '/api/chat');

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatReply(text) {
    const escaped = escapeHtml(text);
    const withBold = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    const blocks = withBold.split(/\n\n+/);
    return blocks
      .map((block) => {
        const lines = block.split('\n').filter(Boolean);
        if (lines.every((l) => l.trim().startsWith('- ') || l.trim().startsWith('• '))) {
          const items = lines
            .map((l) => `<li>${l.replace(/^[-•]\s+/, '')}</li>`)
            .join('');
          return `<ul>${items}</ul>`;
        }
        return `<p>${lines.join('<br>')}</p>`;
      })
      .join('');
  }

  function buildWidget() {
    const root = document.createElement('div');
    root.id = 'portfolio-chat-root';
    root.innerHTML = `
      <div class="chat-panel" id="chatPanel" role="dialog" aria-label="Portfolio assistant chat" aria-hidden="true">
        <div class="chat-panel-header">
          <h3><i class="fas fa-robot"></i> Ask about Dheeraj</h3>
          <p>AI assistant · answers from this portfolio only</p>
        </div>
        <div class="chat-messages" id="chatMessages"></div>
        <div class="chat-suggestions" id="chatSuggestions"></div>
        <form class="chat-form" id="chatForm">
          <textarea class="chat-input" id="chatInput" rows="1" maxlength="${MAX_MESSAGE_LENGTH}" placeholder="Ask about skills, projects, experience..." aria-label="Your message"></textarea>
          <button type="submit" class="chat-send" id="chatSend" aria-label="Send message">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
        <p class="chat-footer-note">Powered by Groq · <a href="contact.html">Contact Dheeraj</a> for direct outreach</p>
      </div>
      <button type="button" class="chat-fab" id="chatFab" aria-label="Open portfolio chat" aria-expanded="false">
        <i class="fas fa-comments" id="chatFabIcon"></i>
      </button>
    `;
    document.body.appendChild(root);
    return root;
  }

  document.addEventListener('DOMContentLoaded', function () {
    buildWidget();

    const panel = document.getElementById('chatPanel');
    const fab = document.getElementById('chatFab');
    const fabIcon = document.getElementById('chatFabIcon');
    const messagesEl = document.getElementById('chatMessages');
    const suggestionsEl = document.getElementById('chatSuggestions');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');

    let isOpen = false;
    let isLoading = false;
    const history = [];

    function addMessage(role, text, extraClass) {
      const div = document.createElement('div');
      div.className = `chat-msg ${role}${extraClass ? ` ${extraClass}` : ''}`;
      if (role === 'assistant') {
        div.innerHTML = formatReply(text);
      } else {
        div.textContent = text;
      }
      messagesEl.appendChild(div);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return div;
    }

    function setWelcome() {
      addMessage(
        'assistant',
        "Hi! I'm Dheeraj's portfolio assistant. Ask me about his **skills**, **internships**, **projects**, or how to **get in touch**."
      );
    }

    function renderSuggestions() {
      suggestionsEl.innerHTML = '';
      SUGGESTIONS.forEach((text) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chat-suggestion-btn';
        btn.textContent = text;
        btn.disabled = isLoading;
        btn.addEventListener('click', () => {
          input.value = text;
          form.requestSubmit();
        });
        suggestionsEl.appendChild(btn);
      });
    }

    function setLoading(loading) {
      isLoading = loading;
      sendBtn.disabled = loading;
      input.disabled = loading;
      renderSuggestions();
    }

    function togglePanel(open) {
      isOpen = open;
      panel.classList.toggle('is-open', open);
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
      fab.classList.toggle('is-open', open);
      fab.setAttribute('aria-expanded', open ? 'true' : 'false');
      fabIcon.classList.toggle('fa-comments', !open);
      fabIcon.classList.toggle('fa-times', open);
      if (open) {
        input.focus();
      }
    }

    fab.addEventListener('click', () => togglePanel(!isOpen));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) togglePanel(false);
    });

    async function sendMessage(text) {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      addMessage('user', trimmed);
      history.push({ role: 'user', text: trimmed });

      setLoading(true);
      const typingEl = addMessage('assistant', 'Thinking...', 'typing');

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history: history.slice(0, -1) }),
        });

        const data = await res.json().catch(() => ({}));
        typingEl.remove();

        if (!res.ok) {
          const errText =
            data.error ||
            (res.status === 503
              ? 'Chat is not set up on the server yet. Please use the contact page.'
              : 'Something went wrong. Please try again.');
          addMessage('assistant', errText, 'error');
          return;
        }

        const reply = data.reply || 'No response received.';
        addMessage('assistant', reply);
        history.push({ role: 'model', text: reply });
      } catch {
        typingEl.remove();
        addMessage(
          'assistant',
          'Could not reach the chat service. If you opened this as a local file, deploy to Vercel and run `vercel dev` for testing. Otherwise email dheerajkumarr005@gmail.com.',
          'error'
        );
      } finally {
        setLoading(false);
        input.value = '';
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      sendMessage(input.value);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.requestSubmit();
      }
    });

    setWelcome();
    renderSuggestions();
  });
})();
