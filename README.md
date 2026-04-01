# 🚀 AI Job COPILOT

**Upload your Resume. Paste the Job Description. Get Tailored Results inside 10 seconds.**

AI Job Copilot is a powerful, full-stack application that leverages advanced LLMs (via Groq) to supercharge your job search. With a striking Neo-Brutalist frontend and a lightning-fast FastAPI backend, it analyzes your existing resume against a specific job description to generate tailored application materials.

## ✨ Features

- **📑 Smart Resume Parsing:** Automatically extracts text from uploaded resumes.
- **🎯 ATS-Optimized Tailoring:** Rewrites and optimizes your resume to match the target job description.
- **✉️ Automated Cover Emails:** Generates short, human-sounding, and personalized application emails.
- **📊 Fit Score Analysis:** Calculates a match score (0-100) and provides actionable insights (strengths, missing skills, suggestions).
- **🎨 Neo-Brutalist UI:** A bold, high-contrast, fully responsive React interface built with Next.js and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **HTTP Client:** [Axios](https://axios-http.com/)

### Backend
- **Framework:** [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **AI Integration:** [Groq API](https://groq.com/) 
- **Core Processing:** `python-multipart`

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository_url>
cd ai-job-copilot
```

### 2. Set up the Backend
Navigate to the backend directory, install the dependencies, and configure your environment.

```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install uvicorn fastapi groq python-dotenv python-multipart
```

Create a `.env` file in the `backend/` directory and add your Groq API key:
```env
GROQ_API_KEY=your_groq_api_key_here
```

Start the FastAPI server:
```bash
uvicorn main:app --reload
```
The backend will run at `http://localhost:8000`.

### 3. Set up the Frontend
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the development server.

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:3000`.

---

## 💡 How to Use

1. **Open** `http://localhost:3000` in your browser.
2. **Upload** your current resume.
3. **Paste** the full job description you are applying for.
4. **Click Generate**.
5. Within seconds, review your **Fit Score**, copy your **Tailored Resume** points, and grab your custom **Job Application Email**!

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
