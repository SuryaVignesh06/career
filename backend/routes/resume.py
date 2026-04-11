"""
ATS Resume Scorer + Summary Improver — Claude Opus 4.6

POST /api/score-resume   — Full ATS analysis with score, checks, and tips
POST /api/improve-summary — AI-rewritten professional summary
"""

import json
import logging
from flask import Blueprint, request, jsonify
from anthropic import Anthropic

logger = logging.getLogger("careercraft.resume")
resume_bp = Blueprint("resume", __name__)


SCORE_PROMPT = """You are an expert ATS (Applicant Tracking System) resume analyst specializing in Indian tech job applications.

Analyze this resume data and return ONLY a strict JSON object (no markdown, no commentary):

{{
  "atsScore": <integer 0-100>,
  "rating": "<POOR if 0-40 | FAIR if 41-60 | GOOD if 61-80 | EXCELLENT if 81-100>",
  "checks": [
    {{
      "item": "<what was checked>",
      "passed": <true or false>,
      "suggestion": "<actionable fix if failed, or confirmation if passed>"
    }}
  ],
  "missingKeywords": ["<keyword1>", "<keyword2>"],
  "improvementTips": ["<tip1>", "<tip2>", "<tip3>"]
}}

CHECKING RULES:
1. Check if the summary contains measurable impact metrics (numbers, percentages)
2. Check if technical skills match the target career keywords
3. Check if contact info is complete (name, email, phone, LinkedIn, GitHub)
4. Check if projects have quantified impact ("Increased X by Y%")
5. Check if education includes valid GPA/CGPA
6. Check if skills section uses industry-standard keyword formatting
7. Check for action verbs in project descriptions (Built, Designed, Implemented, Optimized)
8. Check if resume is concise (not too verbose for a fresher)
9. Penalize generic phrases like "team player", "hard worker", "passionate"
10. Boost score for GitHub links, live demo links, and deployment mentions

TARGET CAREER: {career}

RESUME DATA:
Name: {name}
Email: {email}
Phone: {phone}
LinkedIn: {linkedin}
GitHub: {github}
Summary: {summary}
Skills: {skills}
Projects: {projects}
Education: {education}"""


IMPROVE_PROMPT = """You are an expert ATS resume writer for Indian tech freshers.

Rewrite this professional summary to be ATS-optimized for a {career} role. Rules:
1. Maximum 3 sentences
2. Include specific technologies and measurable achievements
3. Use strong action verbs
4. Include the target role explicitly
5. Sound confident but not arrogant
6. Avoid clichés like "passionate learner" or "team player"

Current skills: {skills}

Current summary:
{summary}

Return ONLY the improved summary text — no quotes, no explanation, no markdown."""


@resume_bp.route("/api/score-resume", methods=["POST"])
def score_resume():
    """Score a resume for ATS compatibility and return actionable checks."""
    api_key = request.headers.get("X-API-Key", "").strip()
    if not api_key:
        return jsonify({"success": False, "error": "Anthropic API key is required."}), 401

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"success": False, "error": "Resume data is required."}), 400

    # Format projects for the prompt
    projects_text = ""
    for p in data.get("projects", []):
        projects_text += f"- {p.get('name', 'Untitled')}: {p.get('desc', 'No description')} ({p.get('link', 'No link')})\n"

    try:
        client = Anthropic(api_key=api_key)

        prompt = SCORE_PROMPT.format(
            career=data.get("career", "Full Stack Developer"),
            name=data.get("name", ""),
            email=data.get("email", ""),
            phone=data.get("phone", ""),
            linkedin=data.get("linkedin", ""),
            github=data.get("github", ""),
            summary=data.get("summary", ""),
            skills=data.get("skills", ""),
            projects=projects_text,
            education=data.get("education", ""),
        )

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2000,
            messages=[{"role": "user", "content": prompt}],
        )

        raw_text = response.content[0].text.strip()
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]

        result = json.loads(raw_text.strip())

        logger.info("Resume scored — ATS: %d (%s)", result.get("atsScore", 0), result.get("rating", ""))

        return jsonify({"success": True, "data": result})

    except json.JSONDecodeError:
        return jsonify({"success": False, "error": "AI returned invalid format. Try again."}), 500
    except Exception as e:
        logger.error("Resume scoring error: %s", e)
        if "invalid_api_key" in str(e).lower():
            return jsonify({"success": False, "error": "Invalid API key."}), 401
        return jsonify({"success": False, "error": f"Scoring failed: {e}"}), 500


@resume_bp.route("/api/improve-summary", methods=["POST"])
def improve_summary():
    """Rewrite a professional summary to be ATS-optimized."""
    api_key = request.headers.get("X-API-Key", "").strip()
    if not api_key:
        return jsonify({"success": False, "error": "Anthropic API key is required."}), 401

    data = request.get_json(silent=True)
    if not data or not data.get("summary", "").strip():
        return jsonify({"success": False, "error": "Current summary is required."}), 400

    try:
        client = Anthropic(api_key=api_key)

        prompt = IMPROVE_PROMPT.format(
            career=data.get("career", "Full Stack Developer"),
            skills=data.get("skills", "React, JavaScript, Node.js"),
            summary=data["summary"],
        )

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=500,
            messages=[{"role": "user", "content": prompt}],
        )

        improved = response.content[0].text.strip()

        logger.info("Summary improved successfully")

        return jsonify({"success": True, "data": {"improvedSummary": improved}})

    except Exception as e:
        logger.error("Summary improvement error: %s", e)
        if "invalid_api_key" in str(e).lower():
            return jsonify({"success": False, "error": "Invalid API key."}), 401
        return jsonify({"success": False, "error": f"Improvement failed: {e}"}), 500
