<p align="center">
  <strong>CareerCraft.</strong>
</p>

<p align="center">
  <em>The AI Career Operating System for Indian Engineering Students</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-6-blue?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-8-purple?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-cyan?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Claude_AI-3.5-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />
</p>

---

## 📌 What is CareerCraft?

**CareerCraft** is a full-featured, AI-powered career development platform purpose-built for Indian B.Tech engineering students. It eliminates career guesswork by combining **personalized AI-driven roadmaps**, **behavioral intelligence tracking**, **real-time job market data**, and **interview diagnostics** into a single operating system.

The platform adapts to the user's learning speed, consistency, and discipline — behaving less like a static tool and more like an **intelligent career co-pilot** that evolves with the user over time.

**Target Users:** B.Tech/B.E. students (1st year through final year), recent graduates, and career-switchers targeting roles at FAANG, Indian startups (Zepto, Swiggy, Razorpay), product companies, and MNCs.

---

## 🧭 Table of Contents

1. [Core Architecture](#-core-architecture)
2. [Landing Page](#-landing-page)
3. [Authentication System](#-authentication-system)
4. [Onboarding Flow](#-onboarding-flow)
5. [Dashboard — Command Center](#-dashboard--command-center)
6. [Multi-Domain Roadmap Engine](#-multi-domain-roadmap-engine)
7. [AI Mentor — 24/7 Chat Assistant](#-ai-mentor--247-chat-assistant)
8. [Domain Intelligence Feed](#-domain-intelligence-feed)
9. [AI-Powered Job Matching Engine](#-ai-powered-job-matching-engine)
10. [Interview Failure Analyzer](#-interview-failure-analyzer)
11. [ATS Resume Builder](#-ats-resume-builder)
12. [AI Code Visualizer](#-ai-code-visualizer)
13. [Gamification System](#-gamification-system)
14. [Design System](#-design-system)
15. [Tech Stack](#-tech-stack)
16. [Project Structure](#-project-structure)
17. [Getting Started](#-getting-started)
18. [Future Roadmap](#-future-roadmap)
19. [Contributing](#-contributing)
20. [License](#-license)

---

## 🏗️ Core Architecture

CareerCraft operates on a **client-first intelligence model**. All AI features (behavioral analysis, job matching, feed scoring) are implemented via client-side simulation, while the AI Mentor and Code Visualizer connect to a Flask backend powered by Claude 3.5 Sonnet.

```
┌─────────────────────────────────────────────────────────┐
│                     BROWSER CLIENT                       │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ AuthCtx  │  │ UserModel│  │ Behavioral│  │ Activity│ │
│  │ Provider │──│ (Profile)│──│ Insights  │──│  Logger │ │
│  └────┬─────┘  └──────────┘  └──────────┘  └─────────┘ │
│       │                                                  │
│  ┌────┴──────────────────────────────────────────────┐  │
│  │                  PAGE ROUTER                       │  │
│  │  Landing → Login → Onboarding → Dashboard → ...   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                          │
│  Persistence: localStorage (keyed per user UID)          │
└───────────────────────────────────┬──────────────────────┘
                                    │
                         ┌──────────┴──────────┐
                         │   FLASK BACKEND      │
                         │  (Claude 3.5 API)    │
                         │  /api/chat           │
                         │  /api/visualize      │
                         └─────────────────────┘
```

**Key Design Decisions:**
- **Per-user localStorage profiles** — each account gets its own isolated profile, XP, and progress.
- **`computeUserInsights()`** — a client-side algorithm that derives behavioral traits (Focus, Discipline, Consistency) from activity logs and streak patterns.
- **No hard auth gates** — routes work without login for demo purposes; authentication is soft-enforced.
- **Backend is optional** — the app is fully functional as a frontend prototype; the Flask backend enhances AI Mentor and Code Visualizer features.

---

## 🌐 Landing Page

The landing page serves as a high-conversion marketing site with the following sections:

| Section | Description |
|---|---|
| **Sticky Navbar** | Scroll-aware navigation with smooth-scroll anchors (`#how-it-works`, `#careers`, `#features`, `#pricing`) |
| **Live Ticker** | Animated infinite-scroll marquee showing real-time market stats (e.g., "React developers in 847% demand", "AI Engineer salaries up 34% YoY") |
| **Hero Section** | Full-width hero with animated roadmap preview card showing interactive progress nodes. Trust badges: 12,400+ Students · 94% Job Match · Updated Weekly |
| **How It Works** | 3-step flow: Tell Us About You → Get Your Roadmap → Learn, Track, Get Hired |
| **Career Paths Grid** | 6 career cards (Full Stack, AI/ML, Data Science, Cloud & DevOps, Cybersecurity, Mobile Dev) each showing avg salary, time-to-job, and animated market demand bars |
| **Live Job Market Pulse** | Split view: Top In-Demand Skills (React 94%, Python 89%, DSA 87%, Node.js 78%, AWS 72%) + Trending Skills with HOT/UP/NEW badges (LangChain, TypeScript, System Design, Kubernetes, Rust) |
| **Features Grid** | 6 feature cards with icons and descriptions — Smart Career Roadmap, Interview Failure Analyzer, Live Resource Hub, AI Mentor, ATS Resume Builder, XP & Gamification |
| **Company Intelligence Table** | Structured table showing companies (Zoho, Freshworks, Swiggy, Google), their open roles, required skills, experience level, and live hiring status badges |
| **Student Testimonials** | 3 testimonial cards from real student personas with names, colleges, and career paths |
| **Pricing Section** | 3-tier pricing (Free / Pro ₹299/mo / Max ₹332/mo) with annual toggle (40% discount). Each tier clearly lists included features. Max tier includes Code Visualizer, Priority AI Mentor, 1-on-1 Mock Interviews, and Lifetime Roadmap Updates |
| **Footer** | Platform links (Roadmap, Interview Analyzer, AI Mentor, Resume Builder) + Company links (About, Careers, Privacy, Terms) |

---

## 🔐 Authentication System

The authentication page provides a complete sign-in/sign-up experience:

- **Tab Switcher** — Toggle between Sign In and Sign Up with animated transitions
- **Email + Password Auth** — Full form validation with real-time password strength meter (Weak/Fair/Good/Strong) based on length, uppercase, digits, and special characters
- **Confirm Password** — Live match indicator with green checkmark
- **Google OAuth Placeholder** — UI-ready Google sign-in button (requires API keys)
- **Demo Mode** — One-click "Launch Demo App View" button that creates a fresh demo account instantly
- **Split Layout** — Left panel displays branding, tagline ("Your Career. Your Rules. No Guesswork."), and a testimonial card; right panel contains the auth form
- **Error/Success Toasts** — Animated neo-brutalist alert banners for validation errors and success messages
- **Account Isolation** — Each sign-up creates a unique `local_<timestamp>` UID with a completely fresh profile

---

## 🎯 Onboarding Flow

After sign-up, users go through a **6-step guided onboarding wizard** that configures their entire career profile:

| Step | Question | Options |
|------|----------|---------|
| **1** | What's your current status? | 1st Year B.Tech, 2nd Year, 3rd Year, 4th Year / Final, Recent Graduate |
| **2** | What's your target career? | Full Stack Dev, AI/ML Engineer, Data Science, Cloud & DevOps, Cybersecurity, Mobile Dev |
| **3** | How comfortable are you with coding? | Beginner (just started), Intermediate (know basics), Advanced (built projects) |
| **4** | Which companies are you targeting? | Google/Meta/Big Tech, Startups (Swiggy, Zepto), Product Companies, MNCs (TCS, Infosys), Open to anything *(multi-select)* |
| **5** | Any secondary interests? | AI/ML, Cloud & DevOps, Cybersecurity, Mobile Dev, Data Science *(multi-select, optional)* |
| **6** | What's your goal timeline? | 3 Months (Intensive), 6 Months (Standard), 1 Year (Relaxed) |

**Post-onboarding:** A loading screen with a progress bar and pulsing brain icon simulates AI roadmap generation before redirecting to the Dashboard.

All answers are persisted to the user's localStorage profile: `career`, `secondaryDomains`, `goalTimeline`, `status`, `companies`, and `onboardingDone`.

---

## 📊 Dashboard — Command Center

The Dashboard is the central hub of the Career OS. It contains the following sections:

### Personalized Greeting
Dynamic greeting based on time of day (Good Morning/Afternoon/Evening) + streak count ("Day 5 Streak!"). Displays the user's learning speed (Intensive/Standard/Relaxed) and current status (1st Year / 2nd Year / etc.).

### AI Behavioral Gauges (4 radial charts)
Real-time circular gauges derived from the `computeUserInsights()` algorithm:

| Gauge | What it Measures | Derivation |
|-------|-----------------|------------|
| **Focus** | Tasks per active day | `(activities in last 7 days / active days) × 2`, capped at 10 |
| **Discipline** | Streak & Consistency average | `(consistency + focus) / 2`, capped at 10 |
| **Consistency** | Daily streak continuity | Direct from `streak` property, capped at 10 |
| **Drive** | Overall momentum | `(streak / 5) + 5`, capped at 10 |

Each gauge uses animated SVG `strokeDasharray` transitions powered by Framer Motion.

### Stats Row (4 stat cards)
- **Total XP** — cumulative experience points earned
- **Day Streak** — consecutive days of activity
- **Completed** — number of roadmap modules finished
- **Progress** — overall roadmap completion percentage

### Roadmap Preview (inline)
Shows the first 4 nodes of the user's primary roadmap with status indicators:
- ✅ **Done** — blue background
- 📖 **Active** — yellow background with "Mark Done" button (appears on hover)
- 🔒 **Locked** — gray, dimmed

Completing a node triggers **confetti** (full-screen for level-ups, localized for regular completions), awards XP, updates the streak, and logs the activity.

### Balance Engine
A dark-themed card showing the focus split between primary (80%) and secondary (20%) domains with animated progress bars. Includes an AI-generated motivational insight about the user's cross-domain adaptability.

### Recent Activity Log
Chronological feed of the last 4 actions (e.g., "Completed 'React & Hooks'") with timestamps and XP earned.

### Live Intelligence Feed Preview
Compact preview of 2 trending tech news items (e.g., "React 19 RC Released — 2h ago") with a link to the full Feed page.

### Quick Tools & Features Grid
5 feature cards linking to all app tools: Interview Failure Analyzer (tagged "Hot"), AI Mentor, ATS Resume Builder, Smart Career Roadmap, and Code Visualizer.

### Genuine Internships & Opportunities
6 curated external links to verified internship platforms:
- Simplify.jobs, Y Combinator, Wellfound (AngelList), Internshala, LinkedIn Internships, WayUp
Each card opens the platform in a new tab.

### AI Curated Certifications
Career-specific certification recommendations (3 per career path). For example, a Full Stack user sees: Meta Front-End Developer (Coursera), IBM Full Stack Developer (Coursera), AWS Certified Developer (AWS). Each card links to the certification URL.

### Post-Completion Section (unlocks at 100% progress)
When the user completes all roadmap modules:
- **Celebration Banner** with trophy icon, total XP, modules completed, and level reached
- **Recommended Job Roles** — 4 career-matched roles with salary ranges, match percentages, expandable "Apply on" links (LinkedIn, Naukri, Indeed)
- **Job Application Checklist** — 8-item checklist (update resume, polish LinkedIn, build portfolio projects, etc.)
- **Resume Update Guide** — career-specific skills to add + pro tips (e.g., "Add a GitHub link with 3+ live projects", "Quantify impact: 'Reduced load time by 40%'")

---

## 🗺️ Multi-Domain Roadmap Engine

The Roadmap page provides deep-dive, phase-by-phase learning paths.

### 6 Supported Career Paths

| Career | Phases | Total Modules | Key Topics |
|--------|--------|---------------|------------|
| **Full Stack Dev** | Foundation → Frontend → Backend → Advanced | 12 | HTML/CSS, JavaScript, React, Node.js, REST APIs, Databases, System Design, DSA |
| **AI / ML Engineer** | Math & Python → ML → Deep Learning → MLOps | 12 | Python, Linear Algebra, Supervised/Unsupervised Learning, Neural Networks, NLP, LangChain, Kaggle |
| **Data Science** | Data Foundation → Analysis → ML → Big Data | 12 | Pandas, SQL, Statistics, Data Viz, EDA, Scikit-Learn, Power BI, Apache Spark |
| **Cloud & DevOps** | Linux & Networking → Containers/CI-CD → Cloud → Advanced | 12 | Linux, Docker, Kubernetes, GitHub Actions, AWS, Terraform, Monitoring, GitOps |
| **Cybersecurity** | Foundations → Ethical Hacking → Specialization → Certs | 12 | Networking, Linux, Cryptography, OWASP, Pen Testing, Malware Analysis, CompTIA Security+ |
| **Mobile Dev** | Programming Foundation → React Native/Flutter → Backend Integration → Publishing | 12 | JavaScript/TypeScript, React Native, Navigation, Firebase, REST/GraphQL, App Store Deploy |

### Multi-Domain Switching
Users can toggle between their primary career and secondary domains directly on the roadmap page. Each domain tracks its own independent progress using `completedNodes` (primary) and `secondaryProgress[domainId]` (secondary).

### Module Details
Each module displays:
- Title and estimated completion time
- XP reward upon completion
- Curated learning resources (ClassCentral, TeachyTechie, official documentation, YouTube series)
- Node status: ✅ Done / 📖 Active (mark completable) / 🔒 Locked

### Progress Tracking
- Phase-level progress bars
- Overall percentage completion
- Total XP available vs. earned for the active domain

---

## 💬 AI Mentor — 24/7 Chat Assistant

A real-time conversational AI mentor powered by **Claude 3.5 Sonnet** via a Flask backend.

**Features:**
- **Markdown Rendering** — AI responses are rendered with full markdown support (code blocks, headers, lists, bold/italic) via `react-markdown`
- **Suggestion Chips** — 4 pre-built prompts on empty state: "What should I learn after React?", "How do I prepare for a DSA interview?", "Which companies hire freshers for 8L+?", "Explain closures in JavaScript"
- **Typing Indicator** — Animated bouncing dots (red, yellow, blue) while AI generates response
- **Keyboard Support** — Enter to send, Shift+Enter for newline
- **Backend Integration** — Sends full conversation history to `POST http://localhost:5000/api/chat` for context-aware responses
- **Error Handling** — Graceful fallback message if the backend is unreachable

---

## 📡 Domain Intelligence Feed

A curated, filterable feed of domain-specific technical trends.

**Features:**
- **Relevance Scoring** — Each item scored 0–100% based on alignment with the user's primary career path
- **Tag Filtering** — Filter by domain: All, Frontend, Backend, AI/ML, DevOps, Cybersecurity
- **Search** — Real-time text search across titles and summaries
- **Feed Cards** — Each card shows: domain tag, time posted, article title (links to source), summary (2-line clamp), source attribution, and relevance percentage
- **Hover Actions** — Bookmark and Share buttons appear on card hover
- **Empty State** — Informative illustration when no results match current filters
- **Animated Transitions** — Cards animate in/out with scale and opacity via `AnimatePresence`

---

## 🎯 AI-Powered Job Matching Engine

An intelligent job matching system that correlates roadmap progress with market requirements.

**Features:**
- **Match Scoring** — Each job displays a percentage match (e.g., 92%) based on the user's skill progress
- **Job Cards** — Company logo initial, title, location, salary range, and skill tags
- **Skill Gap Analysis** — Visual breakdown of user proficiency vs. job requirements per skill, using animated progress bars (green = proficient, red = gap)
- **AI Recommendation Panel** — Specific advice on which roadmap module to complete next to increase match percentage
- **Recommended Module** — Direct link to the specific skill that would most improve the match
- **Career Path Impact** — Predicts networking growth (+240 industry connections) and skill unlocks (e.g., "Production Architecture")
- **Apply Now** — Direct external link to job application
- **Search** — Filter by role title or company name
- **Split Layout** — Left panel lists top matches; right panel shows detailed analysis of the selected job

---

## 🔍 Interview Failure Analyzer

A diagnostic tool that transforms interview rejections into structured recovery plans.

**Input Phase:**
- Company name field (e.g., "Swiggy")
- Role applied field (e.g., "SDE 1")
- Large text area to paste interview questions and answers

**Analysis Phase (after submission):**
- **Diagnostic Score** — Large circular score display (e.g., 62/100) with company and role context
- **Areas to Fix** — Expandable weakness cards with severity badges (HIGH/MEDIUM/LOW priority) and specific improvement tips. Example: *"You failed 3 out of 4 DP questions. Focus on LCS, Knapsack, and Coin Change patterns for 2 weeks."*
- **What You Did Well** — Strength identification cards (e.g., "Strong on Arrays and Strings", "Good behavioral answers")
- **4-Week Recovery Plan** — Week-by-week structured plan with specific tasks (e.g., Week 1: "Complete 20 DP problems on LeetCode", Week 3: "Mock interview on Pramp or Interviewing.io")
- **"Add to Roadmap Tracker"** button to integrate the recovery plan into the main roadmap

---

## 📄 ATS Resume Builder

A purpose-built resume construction tool optimized for Applicant Tracking Systems.

**Editor Sections:**
- **Personal Info** — Name, Email, Phone, LinkedIn, GitHub URL
- **Professional Summary** — Textarea with "AI Improve" button (wand icon) for AI-powered rewriting
- **Technical Skills** — Comma-separated input that auto-renders as visual skill tags
- **Key Projects** — Dynamic project list (add/remove). Each project has: Name, Description (with impact metrics), GitHub/Live Demo link
- **Education** — Degree, University, Years, CGPA

**ATS Analysis Sidebar (sticky):**
- **ATS Score** — Large animated circular gauge (e.g., 84/100) with rating label (GOOD RATING)
- **Actionable Checks** — Specific improvement tips with done/pending status:
  - ❌ "Add measurable metrics to 'Built a web app'"
  - ❌ "Include keywords: React, REST API, Database"
  - ❌ "Phone number missing from contact section"
  - ✅ "Skills section is well-structured"
  - ✅ "Education section includes valid CGPA"
- **"Run Full ATS Scan"** button
- **"Export PDF Map"** button in the header

---

## 💻 AI Code Visualizer

A step-by-step code execution tracer for understanding algorithms and data structures.

**Setup View:**
- **Language Selector** — JavaScript, Python, Java, C++, C
- **Code Editor** — Dark-themed textarea with syntax placeholder and file extension indicator
- **"Build Native Visualization"** button sends code to `POST http://localhost:5000/api/visualize`

**Visualization View (3-panel split):**
1. **Source Code Panel** — Full code with line numbers; active line highlighted in yellow with a red left border
2. **State Panel:**
   - **"What's happening?"** — Plain-English explanation of the current execution step
   - **"Local Variables"** — Real-time variable name/value pairs displayed as labeled boxes
3. **Console Output** — Terminal-style output panel showing `console.log` / `print` results

**Navigation:**
- Previous/Next step buttons with step counter (e.g., "Step 3 / 12")
- "Back to Editor" button to modify code

---

## 🎮 Gamification System

CareerCraft uses a full XP/Level/Streak system to sustain user engagement:

| Mechanic | Details |
|----------|---------|
| **XP Rewards** | Each roadmap module awards 150–800 XP on completion |
| **Level System** | Level 1 (0-299 XP), Level 2 (300-799), Level 3 (800-1499), Level 4 (1500-2499), Level 5 (2500-3999), Level 6+ (dynamic) |
| **Day Streak** | Consecutive daily activity tracking. Resets if user misses a day. Displayed prominently in sidebar and dashboard |
| **XP Progress Bar** | Visual bar in sidebar showing progress toward next level with "XP to next" counter |
| **Confetti Celebration** | Canvas confetti on every task completion (localized burst). Full-screen confetti on level-up |
| **Activity Log** | Timestamped journal of all actions with XP earned |
| **Career Badge** | Sidebar displays current career path label (e.g., "Full Stack Dev") |

---

## 🎨 Design System

CareerCraft uses a custom **Neo-Brutalist / Cyber-Engineering aesthetic** designed for maximum clarity and visual impact.

### Color Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `cc-bg` | `#FAFAFA` | Page background |
| `cc-outer` | `#1A1A1A` | Sidebar, dark sections |
| `cc-text` | `#1A1A1A` | Primary text |
| `cc-muted` | `#6B7280` | Secondary text |
| `cc-border` | `#1A1A1A` | Card borders |
| `cc-red` | `#EB6D51` | Primary accent, CTAs, alerts |
| `cc-yellow` | `#F4D35E` | Active states, highlights |
| `cc-blue` | `#7EC8E3` | Info, completed states |
| `cc-purple` | `#C7A5F0` | Premium, special features |
| `cc-gray` | `#F1F1F1` | Neutral backgrounds |

### Component Classes

| Class | Effect |
|-------|--------|
| `neo-card` | `border: 2px solid #1A1A1A`, `border-radius: 1rem`, `padding: 1.5rem`, `box-shadow: 4px 4px 0px #1A1A1A` |
| `neo-card-yellow` | Neo card with `#F4D35E` background |
| `neo-card-blue` | Neo card with `#7EC8E3` background |
| `neo-card-purple` | Neo card with `#C7A5F0` background |
| `btn-neo` | Heavy button with `font-black`, `border-radius: 9999px`, `border: 2px solid #1A1A1A`, `box-shadow: 4px 4px 0px #1A1A1A`, hover lifts and removes shadow |
| `shadow-neo` | Shorthand for the signature `2px 2px 0px #1A1A1A` shadow |

### Typography
- **Primary Font:** DM Sans (Google Fonts) — a geometric humanist sans-serif
- **Weights Used:** Bold (700) and Black (900) exclusively — no thin or light weights
- **All labels and meta text:** Uppercase with `tracking-widest` letter spacing

### Animations
- **Framer Motion** — Page transitions, card entrances, gauge animations, modal state changes
- **CSS Animations** — Infinite marquee ticker, pulse effects, bounce indicators
- **Canvas Confetti** — Celebration effects on task completions and level-ups

---

## ⚙️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **UI Framework** | React | 19.2.4 |
| **Language** | TypeScript | 6.0.2 |
| **Build Tool** | Vite | 8.0.0 |
| **Styling** | Tailwind CSS + custom CSS tokens | 3.4.1 |
| **Typography Plugin** | @tailwindcss/typography | 0.5.19 |
| **Animations** | Framer Motion | 12.36.0 |
| **Icons** | Lucide React | 0.577.0 |
| **Routing** | React Router DOM | 7.13.1 |
| **Markdown Rendering** | React Markdown | 10.1.0 |
| **Charts** | Recharts | 3.8.0 |
| **Celebrations** | Canvas Confetti | 1.9.4 |
| **AI SDK** | Anthropic AI SDK | 0.78.0 |
| **Auth (optional)** | Firebase | 12.10.0 |
| **Backend** | Flask (Python) + Claude 3.5 API | — |

---

## 📁 Project Structure

```
careercraft/
├── public/                     # Static assets
├── backend/                    # Flask API server (Claude AI + Code Visualizer)
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx         # Shared navigation sidebar (all app pages)
│   │   └── ProtectedRoute.jsx  # Auth guard component
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx     # User model, auth, behavioral insights engine
│   │
│   ├── data/
│   │   └── roadmaps.js        # All career paths, phases, modules, certifications,
│   │                           # completion data, job roles, resume tips
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx     # Marketing site (Hero, Pricing, Testimonials)
│   │   ├── LoginPage.tsx       # Sign In / Sign Up / Demo Login
│   │   ├── OnboardingPage.tsx  # 6-step career profile wizard
│   │   ├── DashboardPage.tsx   # Central command center (600+ lines)
│   │   ├── RoadmapPage.tsx     # Multi-domain learning path with progress
│   │   ├── MentorPage.tsx      # AI chat interface (Claude 3.5)
│   │   ├── FeedPage.tsx        # Domain intelligence feed
│   │   ├── JobsPage.tsx        # Job matching + skill gap analysis
│   │   ├── AnalyzerPage.tsx    # Interview failure diagnostic
│   │   ├── ResumePage.tsx      # ATS resume builder + score checker
│   │   └── CodeVisualizerPage.tsx  # Step-by-step code execution tracer
│   │
│   ├── App.tsx                 # Route definitions
│   ├── main.tsx                # React entry point
│   ├── index.css               # Design system tokens + global styles
│   └── firebase.js             # Firebase configuration
│
├── index.html                  # HTML entry
├── tailwind.config.js          # Tailwind theme extensions
├── vite.config.js              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn**
- (Optional) **Python 3.9+** for the Flask backend
- (Optional) **Anthropic API Key** for AI Mentor and Code Visualizer

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YourUsername/careercraft.git
cd careercraft

# 2. Install frontend dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Backend Setup (Optional — enables AI Mentor + Code Visualizer)

```bash
cd backend
pip install -r requirements.txt

# Set your Anthropic API key
export ANTHROPIC_API_KEY=your_key_here

# Start the Flask server
python app.py
```

The backend runs at `http://localhost:5000`.

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_BASE_URL=/
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗺️ Future Roadmap

- [ ] **AI Companion Widget** — Floating, proactive assistant that provides real-time contextual interventions across all pages
- [ ] **GitHub Portfolio Scraper** — Analyze user's GitHub commits and integrate them into behavioral metrics
- [ ] **Live 1:1 Mock Interview Rooms** — Peer-to-peer or AI-simulated technical interview sessions with video
- [ ] **Peer Study Groups** — Community-led study groups organized by career path and roadmap phase
- [ ] **Mobile App** — React Native companion app for on-the-go learning tracking
- [ ] **Internship Aggregator** — Real-time scraping of startup internship listings from Indian job boards

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

<p align="center">
  <strong>Engineered with ❤️ for the next generation of Indian engineers.</strong>
</p>
