"""
Code Execution Tracer — Claude Opus 4.6

POST /api/visualize
Takes source code + language, returns step-by-step execution trace
with line numbers, variable states, console output, and explanations.
"""

import json
import logging
from flask import Blueprint, request, jsonify
from anthropic import Anthropic

logger = logging.getLogger("careercraft.visualizer")
visualizer_bp = Blueprint("visualizer", __name__)


TRACE_PROMPT = """You are a code execution engine tracer. Simulate the execution of the following {language} code line by line.

Return ONLY a raw JSON object (no markdown, no code fences, no commentary). The JSON must follow this exact schema:

{{
  "steps": [
    {{
      "stepNumber": <integer starting from 1>,
      "activeLine": <integer — the line number currently executing (1-indexed)>,
      "explanation": "<plain English explanation of what this line does>",
      "variables": {{<variable_name>: <current_value_as_string>}},
      "consoleOutput": "<cumulative console output up to this step, or empty string>",
      "callStack": ["<current function scope, e.g. 'main', 'foo()'>"]
    }}
  ],
  "totalSteps": <integer>,
  "language": "{language}"
}}

RULES:
1. Simulate loops properly — show each iteration as a separate step
2. Track ALL local variables and their values at each step
3. Show function calls entering/exiting the call stack
4. Maximum 50 steps (truncate long loops with a note in explanation)
5. For console.log/print/System.out.println — accumulate output in consoleOutput
6. Variable values must be strings (e.g. "5" not 5, "[1, 2, 3]" not [1,2,3])
7. Be precise about line numbers — they must match the actual source code lines

CODE TO TRACE:
```{language}
{code}
```"""


@visualizer_bp.route("/api/visualize", methods=["POST"])
def visualize():
    """Generate a step-by-step execution trace for the given code."""
    api_key = request.headers.get("X-API-Key", "").strip()
    if not api_key:
        return jsonify({"success": False, "error": "Anthropic API key is required."}), 401

    data = request.get_json(silent=True)
    if not data or not data.get("code", "").strip():
        return jsonify({"success": False, "error": "Code is required."}), 400

    code = data["code"]
    language = data.get("language", "javascript")

    # Validate language
    allowed_languages = {"javascript", "python", "java", "cpp", "c", "typescript"}
    if language.lower() not in allowed_languages:
        return jsonify({
            "success": False,
            "error": f"Unsupported language. Allowed: {', '.join(sorted(allowed_languages))}"
        }), 400

    try:
        client = Anthropic(api_key=api_key)

        prompt = TRACE_PROMPT.format(language=language, code=code)

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4000,
            messages=[{"role": "user", "content": prompt}],
        )

        raw_text = response.content[0].text.strip()

        # Strip markdown fences
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
        raw_text = raw_text.strip()

        trace = json.loads(raw_text)

        # Validate structure
        if "steps" not in trace or not isinstance(trace["steps"], list):
            raise ValueError("Invalid trace structure: missing 'steps' array")

        logger.info("Code visualized — %d steps generated for %s", len(trace["steps"]), language)

        return jsonify({"success": True, "data": trace})

    except json.JSONDecodeError as e:
        logger.error("Failed to parse visualizer JSON: %s", e)
        return jsonify({
            "success": False,
            "error": "AI returned an invalid trace format. Please try simpler code."
        }), 500
    except Exception as e:
        logger.error("Visualizer error: %s", e)
        if "invalid_api_key" in str(e).lower():
            return jsonify({"success": False, "error": "Invalid API key."}), 401
        return jsonify({"success": False, "error": f"Visualization failed: {e}"}), 500
