"""
Job Match Scorer — Claude Opus 4.6

POST /api/match-jobs
Takes user's completed nodes, career path, and target companies.
Returns personalized job matches with skill gap analysis.
"""

import json
import logging
from flask import Blueprint, request, jsonify
from anthropic import Anthropic

logger = logging.getLogger("careercraft.jobs")
jobs_bp = Blueprint("jobs", __name__)


# Static job database — curated for Indian market
JOB_DATABASE = {
    "fullstack": [
        {
            "id": "fs-1",
            "title": "SDE 1 — Full Stack",
            "company": "Razorpay",
            "location": "Bangalore",
            "salary": "₹12L - ₹18L",
            "requiredSkills": ["React", "Node.js", "TypeScript", "PostgreSQL", "REST APIs", "Git"],
            "applyUrl": "https://razorpay.com/careers/",
        },
        {
            "id": "fs-2",
            "title": "Frontend Engineer",
            "company": "Swiggy",
            "location": "Bangalore",
            "salary": "₹10L - ₹16L",
            "requiredSkills": ["React", "JavaScript", "CSS", "Redux", "REST APIs", "Performance Optimization"],
            "applyUrl": "https://careers.swiggy.com/",
        },
        {
            "id": "fs-3",
            "title": "Software Engineer",
            "company": "Google India",
            "location": "Hyderabad",
            "salary": "₹20L - ₹35L",
            "requiredSkills": ["DSA", "System Design", "JavaScript", "Python", "Distributed Systems", "Testing"],
            "applyUrl": "https://careers.google.com/",
        },
        {
            "id": "fs-4",
            "title": "Full Stack Dev — Junior",
            "company": "Zepto",
            "location": "Mumbai",
            "salary": "₹8L - ₹14L",
            "requiredSkills": ["React", "Node.js", "MongoDB", "Express", "Docker", "AWS"],
            "applyUrl": "https://www.zepto.co/careers",
        },
    ],
    "aiml": [
        {
            "id": "ai-1",
            "title": "ML Engineer",
            "company": "Flipkart",
            "location": "Bangalore",
            "salary": "₹15L - ₹25L",
            "requiredSkills": ["Python", "TensorFlow", "PyTorch", "NLP", "MLOps", "SQL"],
            "applyUrl": "https://www.flipkartcareers.com/",
        },
        {
            "id": "ai-2",
            "title": "AI Research Intern",
            "company": "Microsoft India",
            "location": "Hyderabad",
            "salary": "₹18L - ₹30L",
            "requiredSkills": ["Python", "Deep Learning", "NLP", "Computer Vision", "Research Papers", "PyTorch"],
            "applyUrl": "https://careers.microsoft.com/",
        },
        {
            "id": "ai-3",
            "title": "Data Scientist",
            "company": "Meesho",
            "location": "Bangalore",
            "salary": "₹12L - ₹20L",
            "requiredSkills": ["Python", "Pandas", "Scikit-Learn", "SQL", "A/B Testing", "Statistics"],
            "applyUrl": "https://meesho.io/careers",
        },
    ],
    "data": [
        {
            "id": "ds-1",
            "title": "Data Analyst",
            "company": "PhonePe",
            "location": "Bangalore",
            "salary": "₹8L - ₹14L",
            "requiredSkills": ["SQL", "Python", "Pandas", "Power BI", "Statistics", "Excel"],
            "applyUrl": "https://www.phonepe.com/careers/",
        },
        {
            "id": "ds-2",
            "title": "Business Analyst",
            "company": "Paytm",
            "location": "Noida",
            "salary": "₹7L - ₹12L",
            "requiredSkills": ["SQL", "Excel", "Tableau", "Python", "Statistics", "Problem Solving"],
            "applyUrl": "https://paytm.com/careers/",
        },
    ],
    "devops": [
        {
            "id": "do-1",
            "title": "SRE / DevOps Engineer",
            "company": "Atlassian India",
            "location": "Bangalore",
            "salary": "₹18L - ₹28L",
            "requiredSkills": ["Linux", "Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Monitoring"],
            "applyUrl": "https://www.atlassian.com/careers",
        },
    ],
    "cyber": [
        {
            "id": "cy-1",
            "title": "Security Analyst",
            "company": "Palo Alto Networks",
            "location": "Bangalore",
            "salary": "₹10L - ₹18L",
            "requiredSkills": ["Network Security", "Linux", "SIEM", "Penetration Testing", "Python", "OWASP"],
            "applyUrl": "https://jobs.paloaltonetworks.com/",
        },
    ],
    "mobile": [
        {
            "id": "mb-1",
            "title": "React Native Developer",
            "company": "CRED",
            "location": "Bangalore",
            "salary": "₹12L - ₹20L",
            "requiredSkills": ["React Native", "TypeScript", "JavaScript", "Redux", "REST APIs", "Firebase"],
            "applyUrl": "https://cred.club/careers",
        },
    ],
}

# Mapping from roadmap node IDs to skill names for scoring
NODE_SKILL_MAP = {
    # Full Stack
    "fs-html-css": "HTML/CSS", "fs-javascript": "JavaScript", "fs-react": "React",
    "fs-node": "Node.js", "fs-express": "Express", "fs-mongodb": "MongoDB",
    "fs-rest-api": "REST APIs", "fs-typescript": "TypeScript", "fs-testing": "Testing",
    "fs-system-design": "System Design", "fs-dsa": "DSA", "fs-deployment": "Docker",
    # AI/ML
    "ai-python": "Python", "ai-math": "Statistics", "ai-ml-basics": "Scikit-Learn",
    "ai-supervised": "Supervised Learning", "ai-unsupervised": "Unsupervised Learning",
    "ai-dl": "Deep Learning", "ai-nn": "Neural Networks", "ai-nlp": "NLP",
    "ai-cv": "Computer Vision", "ai-pytorch": "PyTorch", "ai-tensorflow": "TensorFlow",
    "ai-mlops": "MLOps",
    # Data Science
    "ds-python": "Python", "ds-sql": "SQL", "ds-pandas": "Pandas",
    "ds-viz": "Data Visualization", "ds-statistics": "Statistics", "ds-eda": "EDA",
    "ds-ml": "Scikit-Learn", "ds-powerbi": "Power BI", "ds-spark": "Apache Spark",
}


@jobs_bp.route("/api/match-jobs", methods=["POST"])
def match_jobs():
    """Return job matches with skill gap analysis based on user progress."""
    api_key = request.headers.get("X-API-Key", "").strip()
    if not api_key:
        return jsonify({"success": False, "error": "Anthropic API key is required."}), 401

    data = request.get_json(silent=True)
    if not data:
        return jsonify({"success": False, "error": "Request body is required."}), 400

    completed_nodes = data.get("completedNodes", [])
    career = data.get("career", "fullstack")

    # Get user's acquired skills from completed nodes
    user_skills = set()
    for node_id in completed_nodes:
        if node_id in NODE_SKILL_MAP:
            user_skills.add(NODE_SKILL_MAP[node_id])

    # Get relevant jobs
    jobs = JOB_DATABASE.get(career, JOB_DATABASE.get("fullstack", []))

    # Calculate match scores
    matches = []
    for job in jobs:
        required = set(job["requiredSkills"])
        matched = user_skills & required
        missing = required - user_skills
        score = int((len(matched) / max(len(required), 1)) * 100)

        matches.append({
            **job,
            "matchScore": score,
            "matchedSkills": sorted(list(matched)),
            "missingSkills": sorted(list(missing)),
        })

    # Sort by match score descending
    matches.sort(key=lambda x: x["matchScore"], reverse=True)

    # Use Claude for personalized gap advice on top match
    gap_advice = ""
    if matches and matches[0]["missingSkills"]:
        try:
            client = Anthropic(api_key=api_key)
            top_job = matches[0]

            prompt = (
                f"A student targeting {career} careers has applied to {top_job['company']} "
                f"for the role '{top_job['title']}'. They have these skills: {', '.join(user_skills) or 'none yet'}. "
                f"They are missing: {', '.join(top_job['missingSkills'])}.\n\n"
                f"In 2-3 sentences, give specific advice on the most impactful skill to learn NEXT "
                f"and why it will maximize their chances at {top_job['company']}. Be specific about resources."
            )

            response = client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=300,
                messages=[{"role": "user", "content": prompt}],
            )
            gap_advice = response.content[0].text.strip()

        except Exception as e:
            logger.warning("Gap advice generation failed: %s", e)
            gap_advice = "Complete more roadmap modules to improve your match scores."

    logger.info("Job matches generated — %d jobs, top score: %d%%",
                len(matches), matches[0]["matchScore"] if matches else 0)

    return jsonify({
        "success": True,
        "data": {
            "matches": matches,
            "userSkills": sorted(list(user_skills)),
            "gapAdvice": gap_advice,
        }
    })
