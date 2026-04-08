from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# ⚠️ Verify the model name – "groq/compound" may be incorrect.
# Use a valid model like "mixtral-8x7b-32768" or "llama3-8b-8192".
MODEL = "openai/gpt-oss-120b"

def truncate_text(text: str, max_chars: int = 8000) -> str:
    """
    Truncate text to max_chars, cutting at the last space to preserve words.
    """
    if len(text) <= max_chars:
        return text
    truncated = text[:max_chars]
    last_space = truncated.rfind(' ')
    if last_space > 0:
        truncated = truncated[:last_space]
    return truncated + "..."

# ---- RESUME OPTIMIZER ----
def generate_tailored_resume(resume_text: str, job_description: str) -> str:
    # Truncate inputs to avoid API size limits
    resume_text = truncate_text(resume_text, max_chars=10000)
    job_description = truncate_text(job_description, max_chars=5000)

    prompt = f"""
        You are an expert ATS resume optimizer and data formatter.

        Convert the resume into structured JSON format tailored to the job description.

        Rules:
        - Keep all information truthful
        - Improve bullet points for impact
        - Add relevant keywords from the job description
        - Ensure clean, professional wording
        - Do NOT hallucinate fake experience

        JSON Format:
        {{
            "name": "",
            "summary": "",
            "skills": {{
                "frontend": [],
                "backend": [],
                "languages": [],
                "tools": [],
                "databases": []
            }},
            "experience": [
                {{
                "role": "",
                "company": "",
                "duration": "",
                "points": []
                }}
            ],
            "projects": [
                {{
                "name": "",
                "tech_stack": [],
                "points": []
                }}
            ],
            "education": [
                {{
                "degree": "",
                "institution": "",
                "year": ""
                }}
            ]
        }}

        Skill Categorization Rules:
        - frontend → React, Next.js, HTML, CSS, Tailwind, etc.
        - backend → Node.js, Express, Django, Spring Boot, etc.
        - languages → JavaScript, Python, Java, C++, etc.
        - tools → Git, Docker, AWS, Postman, etc.
        - databases → MongoDB, MySQL, PostgreSQL, Redis, etc.

        Instructions:
        - Place each skill in the MOST appropriate category
        - Do NOT duplicate skills across categories
        - If a category has no skills, return empty array []
        - Keep consistent naming (e.g., "JavaScript" not "JS")

        Resume:
        {resume_text}

        Job Description:
        {job_description}

        Return ONLY valid JSON. No explanation.
    """

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Groq API error in generate_tailored_resume: {e}")
        return f"Error generating tailored resume: {e}"

# ---- EMAIL GENERATOR ----
def generate_email(resume_text: str, job_description: str) -> str:
    resume_text = truncate_text(resume_text, max_chars=8000)
    job_description = truncate_text(job_description, max_chars=4000)

    prompt = f"""
        Write a short, human, personalized job application email.
        Write a professional job application email in Markdown format.

        Rules:
        - Less than 150 words
        - Strong opening
        - Mention relevant skills
        - Friendly tone
        - No generic phrases
        Format:
        - Subject line
        - Greeting
        - Body
        - Closing

        Keep it clean and readable.

        Resume:
        {resume_text}

        Job Description:
        {job_description}
    """

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Groq API error in generate_email: {e}")
        return f"Error generating email: {e}"

# ---- FIT SCORE ----
def generate_fit_score(resume_text: str, job_description: str) -> str:
    resume_text = truncate_text(resume_text, max_chars=8000)
    job_description = truncate_text(job_description, max_chars=5000)

    prompt = f"""
        Compare this resume with job description.

        Return in this format:

        Match Score: (0-100)

        Strengths:
        - ...

        Missing Skills:
        - ...

        Suggestions:
        - ...

        Resume:
        {resume_text}

        Job Description:
        {job_description}
    """

    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Groq API error in generate_fit_score: {e}")
        return f"Error generating fit score: {e}"