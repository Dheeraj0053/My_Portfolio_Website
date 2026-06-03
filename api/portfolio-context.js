/** Portfolio knowledge base — keep in sync with site content */
const PORTFOLIO_CONTEXT = `
# Dheeraj Kumar Ambedkar — Portfolio

## Profile
- Title: Aspiring AI/ML Engineer
- Education: Bachelor's in Computer Science, Sai University, Chennai
- High School: Sainik School Tilaiya (2015–2022)
- Location: Chennai, India
- Status: Open to AI/ML jobs, internships, research collaborations, and project opportunities
- Summary: AI/ML and software engineering enthusiast with experience in machine learning systems, full-stack applications, automation workflows, and business intelligence. Skilled in Python, React, FastAPI, SQL, and modern AI technologies.
- Stats: 15+ projects built, 3 internships
- Languages: English, Hindi

## Contact
- Email: dheerajkumarr005@gmail.com
- Phone: 9508412053
- LinkedIn: https://www.linkedin.com/in/dheeraj-kumar-ambedkar-8b4850266/
- GitHub: https://github.com/Dheeraj0053
- Contact page: contact.html on this portfolio

## Work Experience

### Content Strategy & AI/ML Intern — OGcollege (Jan 2026 – Apr 2026)
- SEO, AEO, GEO content optimization; AI-driven blog automation pipelines
- Keyword research, SERP analysis, content workflow design
- Tech: Python, FastAPI, OpenAI, SEO

### Software Intern — Saral Events (June 2025 – August 2025)
- Full-stack admin dashboard for event and venue booking management
- React.js UI, API optimization, authentication, role-based access, REST APIs
- Tech: React.js, TypeScript, Firebase, Node.js

### Technical Intern — CRM & Zoho — Indyte Nutrition (June 2024 – Aug 2024)
- Zoho CRM implementation; automation across CRM, SalesIQ, Desk, PageSense
- Deluge scripting; 10–15% engagement improvement
- Tech: Zoho CRM, Deluge, API Integration

## Core Expertise
- Machine Learning: regression, ensembles, XGBoost, LightGBM, scikit-learn
- Computer Vision: YOLOv11, TensorFlow/Keras, OpenCV, transfer learning
- Data Science: ARIMA, Prophet, LSTM, forecasting, Pandas
- AI Automation: LLM workflows, FastAPI, Streamlit, OpenAI

## Technical Skills (proficiency)
- Python/ML: Advanced
- TensorFlow/Keras: Proficient
- Scikit-learn/XGBoost: Advanced
- Computer Vision: Proficient
- React.js/TypeScript: Proficient
- FastAPI/SQL: Proficient

## Tools & Frameworks
Scikit-learn, TensorFlow, Keras, YOLOv11, OpenCV, React.js, TypeScript, FastAPI, Streamlit, Firebase, Python, SQL, C++, Git, GitHub, Postman, Excel, Power BI, Pandas, NumPy, Matplotlib

## Awards
- Global Millennium Fellow (UN Millennium Fellowship 2023–24)
- Runner-up, Accenture/IITM Hackathon "Solve the SDGs"
- OMLAS Fellow
- Campus Young Turks (SAT 2025)
- WSN Intrusion Detection: R² 0.988

## Projects — AI/ML & Computer Vision
1. Car Parts Detection using YOLOv11 — object detection, Python, YOLOv11 — https://github.com/Dheeraj0053/Car-Parts-Detection-Using-YOLOV11
2. Car License Plate Detection — OpenCV, deep learning — https://github.com/Dheeraj0053/Car_License_Plate_Detection
3. AI Sales & Lead Scoring System — LightGBM, XGBoost, Streamlit — https://github.com/Dheeraj0053/AI_Sales-Lead_Scoring
4. Intrusion Detection in WSN — regression ML, R² 0.988, 2023 — https://github.com/Dheeraj0053/Intrusion-Detection-in-Wireless-Sensor-Networks-Using-Regression
5. Deep Learning Image Classification with Transfer Learning — Xception, ResNet101V2, InceptionResNetV2, 2023 — https://github.com/Dheeraj0053/Deep-Learning-Based-Image-Classification-with-Transfer-Learning-and-Fine-Tuning
6. Low Carbon Building Solutions (Viridian) — AI sustainability, IoT, runner-up Accenture SDGs hackathon IIT Madras, 2023 — https://github.com/Dheeraj0053/Viridian-sustainable-housing-solutions-

## Projects — Data Science
7. Production-Ready Sales Forecasting System — ARIMA, Prophet, XGBoost, LSTM — https://github.com/Dheeraj0053/Sales_Forecasting_System
8. AI Blog Writer — OGcollege — FastAPI, OpenAI, Gemini images, SEO blogs — https://github.com/Dheeraj0053/Ai_Blog_Writer_OGcollege
9. Campus Waste Management — reduced landfill waste 20% in 6 months, Excel, Power BI, 2023–2024

## Projects — Web Development
10. Fanpit Space App — space discovery & booking, React, Firebase Auth, Firestore, smart pricing, search, reviews, Vercel — GitHub: https://github.com/Dheeraj0053/Fanpit_Space_App — Live: https://fanpit-space-app-43h8.vercel.app/
11. IndiCast Weather Dashboard — React, TypeScript, Indian cities weather, AQI — https://github.com/Dheeraj0053/Indicast-Predict-the-Mausam-with-Ease-
12. Teach For India Volunteer Portal — React, Firebase, admin dashboard — https://github.com/Dheeraj0053/teach-for-india-volunteer-portal
13. InsightScraper — Node.js, Puppeteer web scraping — https://github.com/Dheeraj0053/Web_Scraper_Application
14. Saral Events Admin Dashboard — TypeScript, Firebase, internship project — https://github.com/Dheeraj0053/Admin_Dashboard_saral_events

## Projects — Automation
15. HR Operations Automation System — VBA, PowerShell, Excel — https://github.com/Dheeraj0053/HR_Operations_Automation_Project
`;

const SYSTEM_INSTRUCTION = `You are a helpful assistant on Dheeraj Kumar Ambedkar's portfolio website. Answer questions ONLY using the portfolio context provided below.

Rules:
- Be concise, friendly, and professional (2–4 short paragraphs max unless listing projects).
- If the answer is not in the context, say you don't have that information and suggest emailing dheerajkumarr005@gmail.com or visiting the Contact page.
- Do not invent employers, dates, grades, salaries, or projects not listed in the context.
- For hiring or collaboration, mention he is open to AI/ML roles and share contact details when relevant.
- Decline off-topic questions (general knowledge, coding help unrelated to his work, other people).
- Use markdown sparingly: bullet lists and **bold** are fine; no long code blocks.

PORTFOLIO CONTEXT:
${PORTFOLIO_CONTEXT}`;

module.exports = { PORTFOLIO_CONTEXT, SYSTEM_INSTRUCTION };
