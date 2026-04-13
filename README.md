<p align="center">
  <strong style="font-size: 2em;">CareerCraft</strong> <span style="color: #EB6D51;">●</span>
</p>

<h3 align="center">AI-Powered Career Operating System for Indian Engineering Students</h3>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Python-Flask-green?logo=flask" alt="Flask" />
  <img src="https://img.shields.io/badge/AI-Claude%20Opus%204.6-blueviolet?logo=anthropic" alt="Claude AI" />
  <img src="https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-orange?logo=firebase" alt="Firebase" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel" alt="Vercel" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [The Problem](#-the-problem)
- [The Solution](#-the-solution)
- [Core Features](#-core-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Backend API Endpoints](#-backend-api-endpoints)
- [Career Paths Supported](#-career-paths-supported)
- [Screenshots & UI](#-screenshots--ui)
- [Roadmap & Future Plans](#-roadmap--future-plans)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 Overview

**CareerCraft** is a full-stack, AI-driven **Career Operating System** designed specifically for Indian B.Tech engineering students. Instead of following generic "learn to code" tutorials, students get a **personalized, gamified, AI-mentored career path** from onboarding to job placement.

The platform combines:
- **AI-powered personalized roadmaps** tailored to the student's exact background, goals, and target companies
- **Real-time Claude AI mentoring** for code doubts, career guidance, and interview preparation
- **Interview failure analysis** that breaks down exactly why a student failed an interview and generates a week-by-week recovery plan
- **ATS-optimized resume building** with AI scoring and improvement suggestions
- **Code visualization** that traces code execution step-by-step with variable tracking
- **Job matching engine** with skill-gap analysis against real Indian tech companies
- **Gamification** with XP, levels, streaks, and behavioral trait analysis to keep students motivated

> **Live Demo**: Deployed on Vercel  
> **Backend**: Flask + Claude AI via Anthropic SDK

---

## 🎯 The Problem

Indian engineering students face a critical career navigation crisis:

1. **Information overload** — Thousands of YouTube tutorials, bootcamp ads, and conflicting "roadmaps" with no personalization  
2. **No structured path** — Students don't know what to learn next after completing basics  
3. **Interview anxiety** — Students fail interviews but have no idea *why* or *how to recover*  
4. **Resume gaps** — Resumes are not ATS-optimized, leading to rejections before even being read  
5. **No mentorship** — Personalized mentoring is either unavailable or costs ₹50,000+ in bootcamps  
6. **Motivation drop-off** — Students start learning but lose momentum after 2–3 weeks  

---

## 💡 The Solution

CareerCraft acts as a **Career Operating System** — a single platform where students:

1. **Onboard** with their background (year, skills, target companies, timeline)  
2. **Receive a custom AI-generated roadmap** with 12 sequential modules, each with XP rewards and curated resources  
3. **Track progress** with XP points, level-ups, day streaks, and confetti celebrations  
4. **Get 24/7 AI mentoring** powered by Claude — personalized with their live profile data  
5. **Analyze interview failures** and receive week-by-week recovery plans  
6. **Build ATS-optimized resumes** with AI scoring and one-click summary improvement  
7. **Visualize code execution** step-by-step to understand algorithms  
8. **Discover matched jobs** with skill-gap analysis and direct apply links  

---

## ✨ Core Features

### 1. 🗺️ Smart Career Roadmap
- **6-step personalized onboarding** collects: current year, target career, coding level, target companies, secondary domains, and goal timeline  
- **8 career paths** with 8–12 phased modules each (Foundation → Frontend → Backend → Advanced)  
- Each module includes: title, estimated time, XP reward, and curated learning resources (ClassCentral, freeCodeCamp, TeachyTechie, official docs)  
- **Progress tracking** with visual completion bars and a timeline view  
- **Node-based unlocking** — modules unlock sequentially as you complete previous ones  

### 2. 🤖 AI Mentor (24/7 Chat)
- **Powered by Claude AI** (via Anthropic SDK) with a deeply contextual system prompt  
- The system prompt is **dynamically injected** with the user's live profile: career path, XP, streak, completed modules, and level  
- Trained to give **India-specific advice** — mentions real companies (Swiggy, Zepto, Razorpay, Google India), realistic salary ranges (₹3L–₹25L), and real platforms (LeetCode, NeetCode, GeeksforGeeks)  
- Supports **Markdown rendering** in responses (headings, code blocks, bold, bullets)  
- Quick suggestion chips for common questions  
- BYOK (Bring Your Own Key) model — users provide their own Anthropic API key  

### 3. 🔍 Interview Failure Analyzer
- Students paste their **interview questions and answers** along with the company name and role  
- Claude AI performs a deep diagnostic and returns:
  - **Diagnostic score** (0–100)  
  - **Key insight** summarizing the root cause  
  - **Weakness areas** with severity levels (HIGH / MEDIUM / LOW) and specific recovery tips  
  - **Strengths identified** with evidence  
  - **Week-by-week recovery plan** (e.g., "Week 1: Focus on sliding window problems on LeetCode")  
- Expandable accordion UI for each weakness with detailed remediation steps  

### 4. 📄 ATS Resume Builder
- **Full resume editor** with sections: Personal Info, Professional Summary, Technical Skills, Projects, Education  
- **AI-powered ATS scoring** — Claude analyzes the resume against ATS rules and returns:
  - ATS Score (0–100) with rating (POOR / FAIR / GOOD / EXCELLENT)  
  - Actionable checklist with pass/fail status for each rule  
  - Missing keywords and improvement tips  
- **One-click AI summary improvement** — rewrites the professional summary to be ATS-optimized  
- Skills are displayed as **visual tags** parsed from comma-separated input  
- Fully live-updating circular score indicator  

### 5. 🔬 Code Visualizer
- Students paste code in **5 supported languages**: JavaScript, Python, Java, C++, C  
- Claude AI **traces the execution** line-by-line and returns a structured step array  
- **Split-pane viewer** with:
  - Source code with active line highlighting  
  - "What's happening?" explanation panel  
  - Local variables panel showing variable state at each step  
  - Console output panel  
- **Step-by-step navigation** with Previous/Next controls and step counter  

### 6. 💼 Job Matching Engine
- **Skill-gap analysis** — each job listing shows the student's proficiency in required skills with visual progress bars  
- Match percentage calculated from the student's completed roadmap modules  
- **AI Recommendation panel** suggesting the next module to complete for a higher match  
- Career path impact indicators (Networking Growth, Skill Unlock)  
- Direct apply links to job portals  

### 7. 📰 Domain Intelligence Feed
- **Curated tech news** relevant to the student's chosen career path  
- Tag-based filtering (Frontend, Backend, AI/ML, DevOps, Cybersecurity)  
- Relevance matching percentage per article  
- Search, bookmark, and share functionality  
- Source attribution and timestamp  

### 8. 👤 Professional Profile & Dashboard

#### Dashboard
- **Time-aware greeting** (Good Morning/Afternoon/Evening) with streak count  
- **AI Behavioral Gauges** — circular SVG charts showing Focus, Discipline, Consistency, and Drive  
- **Stats cards** — Total XP, Day Streak, Completed Modules, Overall Progress  
- **Roadmap preview** with "Mark Done" quick actions and confetti explosions  
- **Balance Engine** showing primary vs. secondary domain focus allocation  
- **Recent Activity** feed and Live Intel Preview  
- **Quick Tools** grid linking to all AI features  
- **Curated Internship Links** — real platforms: Simplify.jobs, Y Combinator, Wellfound, Internshala, LinkedIn, WayUp  
- **AI Curated Certifications** — top 3 industry-recognized certificates per career path  
- **Post-Completion Section** (unlocks at 100% progress):
  - Celebration banner with trophy and stats  
  - Recommended job roles with match percentages and direct apply links (LinkedIn, Naukri, Indeed)  
  - Job application checklist  
  - Resume update guide with tailored skill suggestions  

#### Profile Page
- **GitHub-style contribution heatmap** generated from activity logs (26 weeks, 5 intensity levels)  
- **Real GitHub integration** — fetches repos, stars, forks, followers, and language distribution via GitHub API  
- **Language distribution bar chart** with color-coded segments  
- **Behavioral analysis** with progress bars for Focus, Discipline, Consistency, and Procrastination Risk  
- **Edit Profile modal** for updating name, status, career path, and goal timeline  
- Updates propagate to both Firebase Auth and Firestore  

### 9. 🔐 Authentication System
- **Firebase Authentication** with 3 providers:
  - Email/Password registration and login  
  - Google Sign-In (popup)  
  - GitHub Sign-In (popup + real GitHub API data fetching)  
- **Route protection** via `<ProtectedRoute>` wrapper component  
- **Firestore persistence** — user profiles are stored and synced in real-time  
- **Behavioral trait computation** — derived automatically from activity patterns  
- **Graceful fallback** — app works even if Firestore rules block writes  

### 10. 🎮 Gamification Engine
- **XP System** — each module awards 150–800 XP based on difficulty  
- **Level System** — 6+ levels with progressive thresholds (300, 800, 1500, 2500, 4000 XP)  
- **Day Streaks** — tracked automatically based on activity timestamps  
- **Confetti Celebrations** — level-up triggers a full-screen confetti explosion; module completion triggers a targeted burst  
- **Activity Log** — records every action with timestamps and XP gains  
- **Behavioral Traits** — Focus, Discipline, Consistency, and Procrastination Risk are computed from learning patterns  

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Landing  │  │Onboarding│  │Dashboard │  │ Profile  │    │
│  │  Page    │  │  (6 Step)│  │  (Main)  │  │  Page    │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Roadmap  │  │ AI Mentor│  │ Analyzer │  │ Resume   │    │
│  │  Page    │  │  (Chat)  │  │  Page    │  │ Builder  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │   Code   │  │   Job    │  │   Feed   │                   │
│  │Visualizer│  │ Matching │  │  (Intel) │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
│                                                              │
│  AuthProvider │ Sidebar │ ProtectedRoute │ ApiKeyModal       │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │     Firebase Services    │
        │  ┌──────┐  ┌──────────┐ │
        │  │ Auth │  │Firestore │ │
        │  │      │  │ (Profiles│ │
        │  │Google│  │  + Logs) │ │
        │  │GitHub│  └──────────┘ │
        │  │Email │               │
        │  └──────┘               │
        └────────────┬────────────┘
                     │
        ┌────────────┴────────────┐
        │   BACKEND (Flask + CORS) │
        │  ┌──────────────────┐   │
        │  │ /api/chat        │──── AI Mentor
        │  │ /api/analyze     │──── Interview Analyzer
        │  │ /api/score-resume│──── ATS Resume Score
        │  │ /api/improve     │──── Summary Improver
        │  │ /api/visualize   │──── Code Visualizer
        │  │ /api/jobs        │──── Job Search
        │  │ /api/health      │──── Health Check
        │  └────────┬─────────┘   │
        └───────────┼─────────────┘
                    │
        ┌───────────┴─────────────┐
        │   Anthropic Claude API   │
        │   (claude-sonnet-4)      │
        │   User BYOK model        │
        └──────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework with hooks and functional components |
| **TypeScript** | Type safety across all pages and components |
| **Vite 8** | Lightning-fast build tool and dev server |
| **React Router v7** | Client-side routing with protected routes |
| **Framer Motion** | Page transitions, micro-animations, and AnimatePresence |
| **Tailwind CSS 3** | Utility-first styling with custom neo-brutalist design system |
| **Lucide React** | 50+ consistent SVG icons |
| **Recharts** | Data visualization and charting |
| **React Markdown** | Render Claude AI responses with code blocks and formatting |
| **Canvas Confetti** | Level-up and task completion celebrations |
| **Firebase SDK 12** | Authentication (Google, GitHub, Email) + Firestore DB |

### Backend
| Technology | Purpose |
|---|---|
| **Python 3 + Flask** | Lightweight API server |
| **Flask-CORS** | Cross-origin request handling for Vercel deployment |
| **Anthropic SDK** | Direct integration with Claude AI models |
| **Gunicorn** | Production WSGI server |
| **python-dotenv** | Environment variable management |

### Infrastructure
| Service | Purpose |
|---|---|
| **Vercel** | Frontend hosting and deployment |
| **Firebase** | Authentication + Firestore database |
| **GitHub** | Version control and CI/CD triggers |

---

## 📁 Project Structure

```
careerCraft/
├── src/
│   ├── App.tsx                    # Root component with routing
│   ├── main.tsx                   # React DOM entry point
│   ├── firebase.js                # Firebase config and auth helpers
│   ├── index.css                  # Global CSS + neo-brutalist design tokens
│   ├── App.css                    # App-level styles
│   ├── contexts/
│   │   └── AuthContext.tsx        # Auth provider, profile management, behavioral insights
│   ├── components/
│   │   ├── Sidebar.tsx            # Navigation sidebar with active route detection
│   │   ├── ProtectedRoute.jsx     # Route guard for authenticated pages
│   │   └── ApiKeyModal.tsx        # BYOK Anthropic API key modal
│   ├── lib/
│   │   ├── api.ts                 # API client functions for all backend routes
│   │   └── apiKeyStore.ts         # Local storage manager for API keys
│   ├── data/
│   │   └── roadmaps.js            # Career metadata, roadmap phases, certifications, completion data
│   └── pages/
│       ├── LandingPage.tsx        # Marketing homepage with 8 sections
│       ├── LoginPage.tsx          # Auth page (Google, GitHub, email sign-up/in)
│       ├── OnboardingPage.tsx     # 6-step career profiling wizard
│       ├── DashboardPage.tsx      # Main dashboard with stats, roadmap, tools
│       ├── RoadmapPage.tsx        # Full roadmap view with phase expansion
│       ├── MentorPage.tsx         # AI chat interface with Claude
│       ├── AnalyzerPage.tsx       # Interview failure analysis tool
│       ├── ResumePage.tsx         # ATS resume builder and scorer
│       ├── CodeVisualizerPage.tsx # Step-by-step code execution visualizer
│       ├── JobsPage.tsx           # Job matching with skill-gap analysis
│       ├── FeedPage.tsx           # Tech intelligence news feed
│       └── ProfilePage.tsx        # User profile with GitHub heatmap
├── backend/
│   ├── app.py                     # Flask app factory with blueprint registration
│   ├── requirements.txt           # Python dependencies
│   ├── .env.example               # Environment variable template
│   └── routes/
│       ├── __init__.py
│       ├── chat.py                # AI Mentor chat endpoint
│       ├── analyzer.py            # Interview failure analysis endpoint
│       ├── resume.py              # ATS scoring + summary improvement endpoints
│       ├── visualizer.py          # Code execution visualization endpoint
│       └── jobs.py                # Job search and matching endpoint
├── vercel.json                    # Vercel deployment config
├── vite.config.js                 # Vite bundler configuration
├── tailwind.config.js             # Tailwind CSS custom theme
├── tsconfig.json                  # TypeScript compiler options
├── package.json                   # Node.js dependencies and scripts
├── index.html                     # HTML entry point
└── Procfile                       # Gunicorn production server config
```

---

## 🏁 Getting Started

### Prerequisites
- **Node.js** ≥ 18  
- **Python** ≥ 3.9  
- **Firebase Project** with Authentication (Email, Google, GitHub) and Firestore enabled  
- **Anthropic API Key** (users can bring their own key via the in-app modal)  

### 1. Clone the repository
```bash
git clone https://github.com/SuryaVignesh06/CareerCraft.git
cd CareerCraft
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Set up Firebase
Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com) and enable:
- **Authentication** → Email/Password, Google, GitHub providers  
- **Firestore Database** → Create a database in production mode  

Update `src/firebase.js` with your Firebase config.

### 4. Start the frontend
```bash
npm run dev
```
The app will be available at `http://localhost:5173/`.

### 5. Set up the backend
```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file based on `.env.example`:
```env
FLASK_ENV=development
FLASK_PORT=5000
```

### 6. Start the backend
```bash
python app.py
```
The API will be available at `http://localhost:5000/`.

### 7. Add your API key in the app
Navigate to any AI-powered feature (Mentor, Analyzer, Resume, Visualizer) and click **"Add API Key"** to enter your Anthropic API key. The key is stored locally in `sessionStorage` and never sent to any server other than Anthropic directly.

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/health` | Health check | None |
| `POST` | `/api/chat` | AI Mentor conversation | `X-API-Key` header |
| `POST` | `/api/analyze` | Interview failure analysis | `X-API-Key` header |
| `POST` | `/api/score-resume` | ATS resume scoring | `X-API-Key` header |
| `POST` | `/api/improve-summary` | AI professional summary rewrite | `X-API-Key` header |
| `POST` | `/api/visualize` | Code execution visualization | `X-API-Key` header |
| `POST` | `/api/jobs/search` | Job search and matching | `X-API-Key` header |

> **Note:** All AI endpoints use the **BYOK (Bring Your Own Key)** model. The user's Anthropic API key is sent via the `X-API-Key` request header and is used to call the Claude API directly. No API keys are stored on the backend.

---

## 🎓 Career Paths Supported

CareerCraft provides comprehensive roadmaps, certifications, and job matching for **8 distinct career paths**:

| Career Path | Modules | Est. Time | Avg Salary Range |
|---|:---:|---|---|
| ⚡ Full Stack Development | 12 | 5–6 months | ₹6L – ₹14L |
| 🧠 AI / ML Engineering | 12 | 6–8 months | ₹8L – ₹18L |
| 📊 Data Science | 12 | 4–6 months | ₹7L – ₹15L |
| ☁️ Cloud & DevOps | 12 | 5–7 months | ₹7L – ₹14L |
| 🛡️ Cybersecurity | 12 | 6–8 months | ₹6L – ₹13L |
| 📱 Mobile Development | 12 | 4–5 months | ₹5L – ₹12L |
| 🎨 UI/UX Design | 8 | 3–4 months | ₹5L – ₹12L |
| ✍️ Creative Writing / Literature | 8 | 3–4 months | ₹4L – ₹10L |

Each career path includes:
- **4 learning phases** with 2–3 modules each  
- **Curated learning resources** from ClassCentral, freeCodeCamp, Coursera, and official documentation  
- **3 recommended certifications** from providers like AWS, Google, Meta, CompTIA  
- **4 target job roles** with salary ranges and direct apply links (LinkedIn, Naukri, Indeed)  
- **Resume skill suggestions** and professional tips tailored to the career  

---

## 🎨 Design System

CareerCraft uses a **Neo-Brutalist design language** — a bold, modern aesthetic combining:

- **Heavy borders** (2px solid `#1A1A1A`)  
- **Hard drop shadows** (`shadow-[4px_4px_0px_#1A1A1A]`)  
- **Vivid color palette**: Red (`#EB6D51`), Yellow (`#F4D35E`), Blue (`#C1E4F4`), Purple (`#D7C4F2`)  
- **DM Sans** font family for clean, modern typography  
- **Micro-animations** using Framer Motion for every interactive element  
- **Responsive breakpoints** for mobile, tablet, and desktop  

---

## 🗓️ Roadmap & Future Plans

- [ ] **Real-time job scraping** from LinkedIn, Naukri, and Indeed APIs  
- [ ] **Peer networking** — connect with students on the same career path  
- [ ] **Mock interview simulator** with AI-generated behavioral and technical questions  
- [ ] **Mobile app** (React Native) for on-the-go learning  
- [ ] **Certification verification** — auto-detect and display earned certificates  
- [ ] **Company-specific roadmaps** (e.g., "Prepare for Google SDE L3 in 6 months")  
- [ ] **Collaborative study rooms** with shared code editors  
- [ ] **Multi-language AI Mentor** (Hindi, Telugu, Tamil support)  

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository  
2. Create a feature branch: `git checkout -b feature/amazing-feature`  
3. Commit your changes: `git commit -m 'Add amazing feature'`  
4. Push to the branch: `git push origin feature/amazing-feature`  
5. Open a Pull Request  

---

## 📄 License

This project is built and maintained by **Surya Vignesh**. All rights reserved.

---

<p align="center">
  <strong>CareerCraft</strong> — Built for Indian engineering students who mean business.
</p>
