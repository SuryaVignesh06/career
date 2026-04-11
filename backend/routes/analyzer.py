"""
Interview Failure Analyzer Route — Claude Opus 4.6

POST /api/analyze-interview
Takes interview Q&A content and returns structured diagnostic analysis:
score, weaknesses, strengths, and a week-by-week recovery plan.
"""

import json
import logging
from flask import Blueprint, request, jsonify
from anthropic import Anthropic

logger = logging.getLogger("careercraft.analyzer")
analyzer_bp = Blueprint("analyzer", __name__)


ANALYSIS_PROMPT = """You are an expert interview performance analyst specializing in Indian tech company interviews (FAANG India, Swiggy, Zepto, Razorpay, Zoho, Flipkart, TCS, Infosys, etc.).

Analyze the following interview experience and return your analysis as a STRICT JSON object. Return ONLY the JSON — no markdown, no commentary, no code blocks.

The JSON must follow this exact schema:
{{
  "score": <integer 0-100>,
  "weaknesses": [
    {{
      "area": "<specific topic e.g. Dynamic Programming>",
      "severity": "<HIGH or MEDIUM or LOW>",
      "tip": "<2-3 sentence actionable improvement advice>",
      "detail": "<detailed explanation of what went wrong>"
    }}
  ],
  "strengths": [
    {{
      "area": "<specific topic>",
      "evidence": "<what the candidate did well>"
    }}
  ],
  "recoveryPlan": [
    {{
      "week": <integer 1-4>,
      "tasks": ["<specific task 1>", "<specific task 2>", "<specific task 3>"]
    }}
  ],
  "keyInsight": "<one sentence brutal-truth summary of what held the candidate back>"
}}

RULES:
- Score 0-40 = failed badly, 41-60 = close but clear gaps, 61-80 = decent but needs polish, 81-100 = strong
- Weaknesses must be SPECIFIC (not "improve coding" but "practice sliding window pattern problems")
- Recovery plan must be 4 weeks, each with 2-4 concrete daily/weekly tasks
- Reference real resources: LeetCode, NeetCode, System Design Primer, Pramp, Interviewing.io
- Be brutally honest in keyInsight

INTERVIEW DETAILS:
Company: {company}
Role: {role}
Candidate Level: {level}
Target Career: {career}

INTERVIEW CONTENT:
{content}"""


@analyzer_bp.route("/api/analyze-interview", methods=["POST"])
def analyze_interview():
    """Analyze an interview failure and return a structured recovery plan."""
    api_key = request.headers.get("X-API-Key", "").strip()
    if not api_key:
        return jsonify({
            "success": False,
            "error": "Anthropic API key is required."
        }), 401

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"success": False, "error": "Request body is required."}), 400

    company = data.get("company", "Unknown Company")
    role = data.get("role", "SDE")
    content = data.get("interviewContent", "")
    career = data.get("userCareer", "fullstack")
    level = data.get("userLevel", "fresher")

    if not content.strip():
        return jsonify({
            "success": False,
            "error": "Interview content is required. Paste your interview questions and answers."
        }), 400

    try:
        client = Anthropic(api_key=api_key)

        prompt = ANALYSIS_PROMPT.format(
            company=company,
            role=role,
            level=level,
            career=career,
            content=content,
        )

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=3000,
            messages=[{"role": "user", "content": prompt}],
        )

        raw_text = response.content[0].text.strip()

        # Strip markdown code fences if Claude wraps the JSON
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
        raw_text = raw_text.strip()

        analysis = json.loads(raw_text)

        # Validate required fields
        required_fields = ["score", "weaknesses", "strengths", "recoveryPlan", "keyInsight"]
        for field in required_fields:
            if field not in analysis:
                raise ValueError(f"Missing required field: {field}")

        logger.info("Interview analysis completed — score: %d", analysis["score"])

        return jsonify({
            "success": True,
            "data": analysis,
        })

    except json.JSONDecodeError as e:
        logger.error("Failed to parse JSON from Claude response: %s", e)
        return jsonify({
            "success": False,
            "error": "AI returned an invalid response format. Please try again."
        }), 500
    except Exception as e:
        error_msg = str(e)
        logger.error("Analyzer error: %s", error_msg)

        if "invalid_api_key" in error_msg.lower():
            return jsonify({"success": False, "error": "Invalid API key."}), 401

        return jsonify({
            "success": False,
            "error": f"Analysis failed: {error_msg}"
        }), 500
