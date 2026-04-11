"""
CareerCraft Backend — Flask Application Factory
All AI features use Claude Opus 4.6 via the Anthropic SDK.
API keys are provided by the user per-request (not stored on the server).
"""

import os
import logging
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("careercraft")


def create_app() -> Flask:
    """Create and configure the Flask application."""
    app = Flask(__name__)

    # CORS — allow the Vite dev server and common local origins
    CORS(app, origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ])

    # ── Register Blueprints ────────────────────────────────────────────
    from routes.chat import chat_bp
    from routes.analyzer import analyzer_bp
    from routes.resume import resume_bp
    from routes.visualizer import visualizer_bp
    from routes.jobs import jobs_bp

    app.register_blueprint(chat_bp)
    app.register_blueprint(analyzer_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(visualizer_bp)
    app.register_blueprint(jobs_bp)

    # ── Health Check ───────────────────────────────────────────────────
    @app.route("/api/health", methods=["GET"])
    def health():
        return jsonify({"success": True, "message": "CareerCraft API is running"})

    # ── Global Error Handlers ──────────────────────────────────────────
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({"success": False, "error": str(error)}), 400

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"success": False, "error": "Endpoint not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        logger.error("Internal server error: %s", error)
        return jsonify({"success": False, "error": "Internal server error"}), 500

    logger.info("CareerCraft backend initialized — all blueprints registered")
    return app


if __name__ == "__main__":
    port = int(os.getenv("FLASK_PORT", 5000))
    app = create_app()
    app.run(debug=os.getenv("FLASK_ENV") == "development", port=port)
