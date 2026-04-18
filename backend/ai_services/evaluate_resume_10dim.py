from groq import Groq
from groq.types.chat import ChatCompletion
import os
import json
from dotenv import load_dotenv
from ai_services.truncate import truncate_text

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "openai/gpt-oss-120b"

def evaluate_resume_10dim(job_description: str, resume_text: str) -> str:
    """
    Returns a JSON string with dimension scores, overall score, grade, and summary.
    """
    jd_trunc = truncate_text(job_description, max_chars=5000)
    resume_trunc = truncate_text(resume_text, max_chars=8000)

    system_msg = (
        "You are an expert hiring assistant. Evaluate how well the resume matches the job description "
        "across 10 dimensions. Output only valid JSON in the specified format."
    )

    user_prompt = f"""
Job Description:
{jd_trunc}

Candidate Resume:
{resume_trunc}

Evaluate the match across these 10 dimensions with the given weights. 
For each dimension, provide a score (1-5) and a brief justification.

Dimensions and weights:
1. Role Match (Gate-pass): Alignment between job requirements and candidate's experience. Weight: Gate-pass (if score < 3, overall score reduced by 30%)
2. Skills Alignment (Gate-pass): Overlap between required tech stack and candidate's skills. Weight: Gate-pass
3. Seniority: Experience level match or stretch. Weight: High (20%)
4. Compensation: Expectation alignment. Weight: High (20%)
5. Geographic: Location/remote/hybrid feasibility. Weight: Medium (10%)
6. Company Stage: Fit with startup/growth/enterprise. Weight: Medium (10%)
7. Product-Market Fit: Interest/experience in domain. Weight: Medium (10%)
8. Growth Trajectory: Career path alignment. Weight: Medium (10%)
9. Interview Likelihood: Probability of callback. Weight: High (20%)
10. Timeline: Start date feasibility. Weight: Low (0% - informational only)

Scoring: 1=No match, 2=Weak, 3=Acceptable, 4=Good, 5=Excellent.

Calculation:
- Sum weighted scores: (High dimensions sum * 0.2 each, Medium dimensions sum * 0.1 each) -> raw out of 100.
- If any Gate-pass dimension score < 3, multiply final score by 0.7 (30% penalty).
- Timeline score does not affect overall.

Output JSON exactly as follows:
{{
  "dimension_scores": {{
    "Role Match": {{"score": 0, "justification": "..."}},
    "Skills Alignment": {{"score": 0, "justification": "..."}},
    "Seniority": {{"score": 0, "justification": "..."}},
    "Compensation": {{"score": 0, "justification": "..."}},
    "Geographic": {{"score": 0, "justification": "..."}},
    "Company Stage": {{"score": 0, "justification": "..."}},
    "Product-Market Fit": {{"score": 0, "justification": "..."}},
    "Growth Trajectory": {{"score": 0, "justification": "..."}},
    "Interview Likelihood": {{"score": 0, "justification": "..."}},
    "Timeline": {{"score": 0, "justification": "..."}}
  }},
  "overall_score": 0,
  "grade": "A",
  "summary": "Brief overall assessment"
}}

Grade mapping:
- A: 90-100
- B: 80-89
- C: 70-79
- D: 60-69
- F: below 60

Now generate the JSON.
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
        print(f"Groq API error in evaluate_resume_10dim: {e}")
        return json.dumps({"error": str(e)})