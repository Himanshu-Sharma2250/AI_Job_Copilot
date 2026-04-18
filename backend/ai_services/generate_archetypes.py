from groq import Groq
from groq.types.chat import ChatCompletion
import os
import json
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "openai/gpt-oss-120b"

def generate_archetypes(user_input) -> str:
    """
    user_input: object with attributes:
        degree, experience_level, strengths_list, best_project,
        project_metric, target_roles_list, tech_stack
    Returns JSON string (array of archetype objects).
    """
    system_msg = (
        "You are an AI that generates resume archetype configurations for entry‑level job seekers. "
        "An archetype defines how to reframe a candidate's existing resume for a specific job family "
        "(e.g., Full Stack Developer, Frontend Developer, Backend Developer). "
        "Output must be valid JSON only – no extra text. Generate 2-3 archetypes based on the user's answers."
    )

    user_prompt = f"""
Based on the following entry‑level user's answers, generate 2-3 archetype JSON objects. 
Each archetype corresponds to one job role the user is targeting.

User answers:
- Degree: {user_input.degree}
- Internships/projects count: {user_input.experience_level}
- Top 3 strengths: {user_input.strengths_list}
- Strongest project: {user_input.best_project}
- Best project metric: {user_input.project_metric} (if provided)
- Target roles: {user_input.target_roles_list}
- Known tech stacks: {user_input.tech_stack}

For each target role in the user's list, create one archetype. 
If the user listed more than 3 roles, pick the 3 most relevant based on their strengths.

Each archetype must follow this JSON schema:

{{
    "name": "string (e.g., Entry Level Full Stack Developer)",
    "trigger_keywords": ["keyword1", "keyword2", ...],
    "emphasis": {{
        "skills_to_highlight": ["skill1", "skill2", ...],
        "projects_to_prioritize": ["project name"],
        "traits_to_emphasize": ["trait1", "trait2", ...]
    }},
    "resume_structure": {{
        "summary_template": "string with placeholders like top_skills, top_project, key_metric",
        "section_order": ["Summary", "Technical Skills", "Projects", "Education", "Internships"],
        "project_bullet_priority": ["keyword pattern1", "pattern2", ...]
    }},
    "keyword_injection": {{
        "sections": ["summary", "first_project_bullet", "technical_skills"],
        "max_keywords": 12
    }}
}}

Rules for entry‑level:
- Keep language encouraging but honest (no fabrication).
- Use "built", "developed", "created" instead of "led" or "architected".
- If user has no internships, omit that section.
- Summary template should be one sentence, max 25 words.
- Project bullet priority should include terms like "full stack", "frontend", "backend", "database", "api", "responsive", "testing".

Now generate the JSON. Output only a JSON array of archetypes.
"""
    try:
        response: ChatCompletion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.3,
        )
        return response.choices[0].message.content #type: ignore
    except Exception as e:
        print(f"Groq API error in generate_archetypes: {e}")
        return json.dumps({"error": str(e)})
