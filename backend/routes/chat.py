"""
AI Mentor Chat Route — Claude Opus 4.6

POST /api/chat
The user's Anthropic API key is sent in the X-API-Key header.
User context (career, XP, streak, etc.) is injected into the system prompt
to make responses hyper-personalized.
"""

import logging
from flask import Blueprint, request, jsonify
from anthropic import Anthropic

logger = logging.getLogger("careercraft.chat")
chat_bp = Blueprint("chat", __name__)


def _build_system_prompt(user_context: dict) -> str:
    """Build a dynamic system prompt injecting the user's live profile data."""
    career = user_context.get("career", "software development")
    status = user_context.get("status", "engineering student")
    xp = user_context.get("xp", 0)
    level = user_context.get("level", 1)
    streak = user_context.get("streak", 0)
    completed = user_context.get("completedNodes", [])
    completed_str = ", ".join(completed[:10]) if completed else "none yet"

    return f"""You are CareerCraft Mentor — an expert AI career coach built exclusively for Indian B.Tech engineering students.

CURRENT USER PROFILE:
- Status: {status}
- Target career: {career}
- Experience: {xp} XP, Level {level}
- Current streak: {streak} days
- Completed modules: {completed_str}

YOUR RULES:
1. Be specific and actionable. Never give generic advice like "practice more".
2. Reference real Indian job market context — mention companies like Swiggy, Zepto, Razorpay, Meesho, Google India, Microsoft India, TCS, Infosys, Wipro, HCLTech.
3. When recommending resources, suggest real platforms: LeetCode, NeetCode, freeCodeCamp, Scrimba, CS50, ClassCentral, GeeksforGeeks, Coding Ninjas.
4. Format responses with clear sections using markdown (## headers, - bullet points, **bold**, `code`).
5. If the user shares interview experience, analyze it critically and suggest exact improvement steps.
6. For salary discussions, use realistic Indian fresher ranges (₹3L-₹25L depending on company tier).
7. Be encouraging but brutally honest about gaps. Sugar-coating hurts careers.
8. When asked about roadmaps, be specific about week-by-week timelines.
9. Keep responses focused — max 3-4 paragraphs unless the user asks for detailed notes.
10. If the user says hi, introduce yourself briefly as CareerCraft AI Mentor."""


@chat_bp.route("/api/chat", methods=["POST"])
def chat():
    """Handle a chat message from the AI Mentor page."""
    # ── Validate API key ───────────────────────────────────────────────
    api_key = request.headers.get("X-API-Key", "").strip()
    if not api_key:
        return jsonify({
            "success": False,
            "error": "Anthropic API key is required. Please add your API key in the app settings."
        }), 401

    # ── Validate request body ──────────────────────────────────────────
    data = request.get_json(silent=True)
    if not data or "messages" not in data:
        return jsonify({
            "success": False,
            "error": "Invalid request: 'messages' field is required."
        }), 400

    messages = data["messages"]
    user_context = data.get("userContext", {})

    if not isinstance(messages, list) or len(messages) == 0:
        return jsonify({
            "success": False,
            "error": "Messages must be a non-empty array."
        }), 400

    try:
        client = Anthropic(api_key=api_key)

        # Convert frontend messages to Anthropic format
        anthropic_messages = []
        for msg in messages:
            role = msg.get("role", "user")
            content = msg.get("text", msg.get("content", ""))
            if role in ("user", "assistant") and content:
                anthropic_messages.append({"role": role, "content": content})

        # Ensure the conversation starts with a user message
        if anthropic_messages and anthropic_messages[0]["role"] != "user":
            anthropic_messages = anthropic_messages[1:]

        if not anthropic_messages:
            return jsonify({
                "success": False,
                "error": "No valid messages to process."
            }), 400

        system_prompt = _build_system_prompt(user_context)

        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=2048,
            system=system_prompt,
            messages=anthropic_messages,
        )

        reply = response.content[0].text
        tokens_used = (response.usage.input_tokens or 0) + (response.usage.output_tokens or 0)

        logger.info("Chat response generated — %d tokens used", tokens_used)

        return jsonify({
            "success": True,
            "message": reply,
            "tokens_used": tokens_used,
        })

    except Exception as e:
        error_msg = str(e)
        logger.error("Chat error: %s", error_msg)

        # Provide user-friendly error messages
        if "invalid_api_key" in error_msg.lower() or "authentication" in error_msg.lower():
            return jsonify({
                "success": False,
                "error": "Invalid API key. Please check your Anthropic API key and try again."
            }), 401
        if "rate_limit" in error_msg.lower():
            return jsonify({
                "success": False,
                "error": "Rate limit reached. Please wait a moment and try again."
            }), 429

        return jsonify({
            "success": False,
            "error": f"AI service error: {error_msg}"
        }), 500
