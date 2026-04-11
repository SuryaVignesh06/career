# CareerCraft — Backend & Database Integration Guide

> **Purpose of This Document:** This README provides everything needed to design the database schema, connect Firebase services, and integrate the backend API for CareerCraft. It covers the full project idea, every feature, the user data model, all API endpoints with request/response contracts, and the recommended Firestore collection structure.

---

## 📌 Project Overview

**CareerCraft** is an AI-powered career development platform built for Indian B.Tech engineering students. It combines personalized learning roadmaps, AI mentorship, interview diagnostics, resume building, and job matching into a single web application.

### Core Idea
- Students sign up → complete a 6-step onboarding wizard → get a personalized career roadmap
- They progress through learning modules, earn XP, maintain streaks, and level up
- AI features (mentor chat, interview analysis, resume scoring, code visualization) help them prepare for jobs
- The platform tracks behavioral patterns (focus, discipline, consistency) and adapts recommendations

### Target Users
Indian B.Tech/B.E. students (1st year through final year), recent graduates, and career-switchers targeting roles at FAANG, Indian startups (Zepto, Swiggy, Razorpay), product companies, and MNCs.

---

## 🏗️ Current Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND                          │
│                  (Vite + TypeScript + Tailwind)               │
│                                                              │
│  Auth: localStorage (simulated)  →  NEEDS: Firebase Auth     │
│  Data: localStorage per-user     →  NEEDS: Firestore DB      │
│  Files: none                     →  NEEDS: Firebase Storage   │
│                                                              │
│  AI Features call Flask backend at http://localhost:5000      │
└────────────────────────────────┬─────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │     FLASK BACKEND        │
                    │   (Python + Anthropic)   │
                    │                          │
                    │  POST /api/chat          │
                    │  POST /api/analyze       │
                    │  POST /api/score-resume  │
                    │  POST /api/improve-summary│
                    │  POST /api/visualize     │
                    │  POST /api/match-jobs    │
                    │  GET  /api/health        │
                    └─────────────────────────┘
```

### What Currently Works (Frontend-Only)
| Feature | Current State | Backend Needed? |
|---------|--------------|-----------------|
| Sign Up / Login | localStorage (simulated accounts) | ✅ Firebase Auth |
| Google Sign-In | Simulated modal | ✅ Firebase Auth (Google Provider) |
| GitHub Sign-In | Fetches real GitHub API data, stores locally | ✅ Firebase Auth (GitHub Provider) |
| User Profile | localStorage per-user | ✅ Firestore |
| Onboarding (6 steps) | Saves to localStorage | ✅ Firestore |
| Career Roadmaps (6 paths) | Static data in `roadmaps.js` | ❌ Stays client-side |
| Progress Tracking (XP, streak, modules) | localStorage | ✅ Firestore |
| Dashboard | Reads from localStorage | ✅ Reads from Firestore |
| AI Mentor Chat | Needs Flask backend | ✅ Flask + Claude API |
| Interview Analyzer | Needs Flask backend | ✅ Flask + Claude API |
| ATS Resume Builder | Form works, AI scoring needs backend | ✅ Flask + Claude API |
| Code Visualizer | Needs Flask backend | ✅ Flask + Claude API |
| Intelligence Feed | Mock data | Optional — can remain static or connect to news API |
| Job Matching | Mock data on frontend / AI scoring on backend | ✅ Flask + Claude API |

---

## 👤 Complete User Data Model

This is the exact user profile structure currently stored in localStorage. **This same structure should be stored in Firestore** under a `users/{uid}` document.

```typescript
interface UserProfile {
    // ─── Identity ─────────────────────────────────────
    uid: string;                    // Firebase Auth UID
    displayName: string;            // Full name
    email: string;                  // Email address
    photoURL: string | null;        // Profile photo URL
    authProvider: 'email' | 'google' | 'github';  // How they signed up
    createdAt: string;              // ISO timestamp of account creation

    // ─── Onboarding Answers ──────────────────────────
    career: string | null;          // Primary career path: 'fullstack' | 'aiml' | 'data' | 'devops' | 'cyber' | 'mobile'
    secondaryDomains: string[];     // Secondary interests: e.g. ['aiml', 'devops']
    status: string | null;          // Current education stage: '1st_year' | '2nd_year' | '3rd_year' | '4th_year' | 'fresher'
    companies: string[];            // Target companies: e.g. ['google', 'startup', 'product']
    goalTimeline: string;           // Learning pace: '3_months' | '6_months' | '12_months'
    onboardingDone: boolean;        // Whether onboarding wizard is completed

    // ─── Progress & Gamification ─────────────────────
    level: number;                  // Current level (derived from XP): 1-6+
    xp: number;                     // Total experience points earned
    streak: number;                 // Consecutive days of activity
    completedNodes: string[];       // Array of completed roadmap module IDs: e.g. ['fs1', 'fs2', 'fs3']
    secondaryProgress: Record<string, string[]>;  // Progress in secondary domains: e.g. { aiml: ['ai1', 'ai2'] }
    skillLevels: Record<string, number>;  // Skill proficiency scores (not heavily used yet)

    // ─── Behavioral Intelligence ─────────────────────
    behavioralTraits: {
        focus: number;              // 1-10, derived from tasks per active day
        discipline: number;         // 1-10, average of focus + consistency
        consistency: number;        // 1-10, derived from streak
        procrastination: number;    // 0-10, inverse of active days
    };
    learningSpeed: 'intensive' | 'standard' | 'relaxed';  // Derived from activity frequency

    // ─── Activity Log ────────────────────────────────
    activityLog: Array<{
        action: string;             // e.g. "Completed \"React & Hooks\""
        xp: string;                 // e.g. "+500 XP"
        timestamp: string;          // ISO timestamp
    }>;

    // ─── GitHub Data (optional) ──────────────────────
    github: {
        username: string;
        avatar: string;             // GitHub avatar URL
        bio: string;
        location: string;
        company: string;
        blog: string;
        url: string;                // GitHub profile URL
        publicRepos: number;
        followers: number;
        following: number;
        totalStars: number;
        repos: Array<{
            name: string;
            description: string;
            url: string;
            language: string;
            stars: number;
            forks: number;
        }>;
    } | null;
}
```

### XP → Level Mapping
```
Level 1: 0 – 299 XP
Level 2: 300 – 799 XP
Level 3: 800 – 1,499 XP
Level 4: 1,500 – 2,499 XP
Level 5: 2,500 – 3,999 XP
Level 6+: Every 800 XP after
```

### Behavioral Traits Derivation Algorithm
```
focus       = min(10, max(1, (activities_in_last_7_days / active_days) * 2))
consistency = min(10, max(1, streak))
discipline  = min(10, round((consistency + focus) / 2))
procrastination = max(0, 10 - round(active_days * 1.5))
learningSpeed = "intensive" if activities > 10/week, "relaxed" if < 3/week, else "standard"
```

---

## 🎯 Feature Details & Data Requirements

### 1. Authentication
**Current:** Simulated via localStorage — each signup creates a `local_<timestamp>` UID  
**Needed:** Firebase Authentication

| Auth Method | Firebase Service | Notes |
|-------------|-----------------|-------|
| Email + Password | `createUserWithEmailAndPassword` / `signInWithEmailAndPassword` | Password strength meter on frontend |
| Google OAuth | `signInWithPopup(GoogleAuthProvider)` | One-click Google sign-in |
| GitHub OAuth | `signInWithPopup(GithubAuthProvider)` | After auth, fetches public GitHub API data (repos, stars, followers) |
| Demo Mode | Create anonymous Firebase user or demo account | One-click demo login with pre-populated data |

**Post-Auth Flow:**
1. User signs up → Firebase Auth creates user
2. Frontend creates a Firestore document at `users/{uid}` with the default profile
3. If it's a new user (no `onboardingDone`), redirect to `/onboarding`
4. If returning user, redirect to `/dashboard`

---

### 2. Onboarding (6 Steps)

Collects the following fields and saves them to the user's Firestore profile:

| Step | Field Saved | Type | Possible Values |
|------|-------------|------|-----------------|
| 1 | `status` | string | `'1st_year'`, `'2nd_year'`, `'3rd_year'`, `'4th_year'`, `'fresher'` |
| 2 | `career` | string | `'fullstack'`, `'aiml'`, `'data'`, `'devops'`, `'cyber'`, `'mobile'` |
| 3 | `level` | number | `1` (always set to 1 at onboarding) |
| 4 | `companies` | string[] | `['google', 'startup', 'product', 'mnc', 'open']` |
| 5 | `secondaryDomains` | string[] | `['aiml', 'devops', 'cyber', 'mobile', 'data']` |
| 6 | `goalTimeline` | string | `'3_months'`, `'6_months'`, `'12_months'` |
| — | `onboardingDone` | boolean | Set to `true` after completion |

---

### 3. Career Roadmaps (6 Paths × 12 Modules Each)

Roadmap data is **static** and lives in `src/data/roadmaps.js`. It does NOT need to be in the database.

**Each career has 4 phases with 3 modules each = 12 total modules**

| Career Key | Career Name | XP Range per Module | Example Module IDs |
|-----------|-------------|--------------------|--------------------|
| `fullstack` | Full Stack Dev | 150 – 700 XP | `fs1` through `fs12` |
| `aiml` | AI / ML Engineer | 250 – 700 XP | `ai1` through `ai12` |
| `data` | Data Science | 200 – 600 XP | `ds1` through `ds12` |
| `devops` | Cloud & DevOps | 250 – 700 XP | `do1` through `do12` |
| `cyber` | Cybersecurity | 300 – 800 XP | `cy1` through `cy12` |
| `mobile` | Mobile Dev | 150 – 550 XP | `mb1` through `mb12` |

**What gets stored in Firestore per user:**
- `completedNodes: string[]` — e.g. `["fs1", "fs2", "fs3"]` — these are the module IDs the user has finished
- `secondaryProgress: { [domainKey]: string[] }` — e.g. `{ aiml: ["ai1", "ai2"] }` — progress in secondary domains

**When a module is completed:**
1. Add module ID to `completedNodes`
2. Add XP to `xp` field
3. Update `streak` (increment if yesterday was active, reset if missed a day)
4. Append to `activityLog`
5. Recalculate `behavioralTraits` using the derivation algorithm
6. If all 12 modules done → show post-completion section

---

### 4. AI Mentor Chat

**Purpose:** 24/7 conversational AI tutor powered by Claude  
**Backend Route:** `POST /api/chat`

**Request:**
```json
{
    "messages": [
        { "role": "user", "text": "What should I learn after React?" },
        { "role": "assistant", "text": "..." },
        { "role": "user", "text": "How about Next.js?" }
    ],
    "userContext": {
        "career": "fullstack",
        "status": "3rd_year",
        "completedNodes": ["fs1", "fs2", "fs3", "fs4"],
        "xp": 1050,
        "level": 3,
        "streak": 7
    }
}
```

**Response:**
```json
{
    "success": true,
    "message": "## Great question!\n\nSince you've completed React & Hooks...",
    "tokens_used": 847
}
```

**Headers:** `X-API-Key: <user's Anthropic API key>` — users provide their own key via an in-app popup

**Firestore Consideration:** Chat history could optionally be stored in `users/{uid}/chats/{chatId}` subcollection.

---

### 5. Interview Failure Analyzer

**Purpose:** Analyze interview rejection and generate a structured recovery plan  
**Backend Route:** `POST /api/analyze-interview`

**Request:**
```json
{
    "company": "Swiggy",
    "role": "SDE 1",
    "interviewContent": "Q1: Explain the difference between... A1: ...",
    "userCareer": "fullstack",
    "userLevel": "3rd_year"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "score": 62,
        "weaknesses": [
            {
                "area": "Dynamic Programming",
                "severity": "HIGH",
                "tip": "Focus on LCS, Knapsack, and Coin Change patterns for 2 weeks.",
                "detail": "You failed 3 out of 4 DP questions..."
            }
        ],
        "strengths": [
            {
                "area": "Arrays and Strings",
                "evidence": "Solved 2/2 array problems correctly with optimal time complexity."
            }
        ],
        "recoveryPlan": [
            { "week": 1, "tasks": ["Complete 20 DP problems on LeetCode", "..."] },
            { "week": 2, "tasks": ["..."] },
            { "week": 3, "tasks": ["Mock interview on Pramp"] },
            { "week": 4, "tasks": ["..."] }
        ],
        "keyInsight": "Your DP weakness cost you the offer."
    }
}
```

**Firestore Consideration:** Store past analyses in `users/{uid}/analyses/{analysisId}` subcollection.

---

### 6. ATS Resume Builder

**Purpose:** Build an ATS-optimized resume with AI scoring  
**Backend Routes:**

#### Score Resume — `POST /api/score-resume`

**Request:**
```json
{
    "name": "Surya Vignesh",
    "email": "surya@gmail.com",
    "phone": "+91 98765 43210",
    "linkedin": "linkedin.com/in/surya",
    "github": "github.com/surya",
    "summary": "Full Stack Developer with experience in...",
    "skills": "React, Node.js, TypeScript, MongoDB",
    "projects": [
        { "name": "CareerCraft", "desc": "AI career platform serving 12k+ students", "link": "github.com/surya/careercraft" }
    ],
    "education": "B.Tech CSE, VIT University, 2022-2026, CGPA: 8.5",
    "career": "fullstack"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "atsScore": 84,
        "rating": "GOOD",
        "checks": [
            { "item": "Summary contains measurable metrics", "passed": true, "suggestion": "Good — summary mentions '12k+ students'" },
            { "item": "Phone number present", "passed": false, "suggestion": "Add +91 phone number for Indian recruiters" }
        ],
        "missingKeywords": ["REST API", "Docker", "CI/CD"],
        "improvementTips": ["Add deployed project URLs", "Quantify impact with numbers"]
    }
}
```

#### Improve Summary — `POST /api/improve-summary`

**Request:**
```json
{
    "summary": "I am a passionate developer who loves coding...",
    "career": "fullstack",
    "skills": "React, Node.js, TypeScript"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "improvedSummary": "Full Stack Developer with 3+ production React/Node.js applications, specializing in..."
    }
}
```

**Firestore Consideration:** Store saved resumes in `users/{uid}/resumes/{resumeId}`.

---

### 7. Code Visualizer

**Purpose:** Step-by-step code execution tracer for learning algorithms  
**Backend Route:** `POST /api/visualize`  
**Supported Languages:** JavaScript, Python, Java, C++, C, TypeScript

**Request:**
```json
{
    "code": "let sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  sum += i;\n}\nconsole.log(sum);",
    "language": "javascript"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "steps": [
            {
                "stepNumber": 1,
                "activeLine": 1,
                "explanation": "Declare variable 'sum' and initialize to 0",
                "variables": { "sum": "0" },
                "consoleOutput": "",
                "callStack": ["main"]
            },
            {
                "stepNumber": 2,
                "activeLine": 2,
                "explanation": "Start for loop, initialize i = 1, check i <= 5 (true)",
                "variables": { "sum": "0", "i": "1" },
                "consoleOutput": "",
                "callStack": ["main"]
            }
        ],
        "totalSteps": 12,
        "language": "javascript"
    }
}
```

---

### 8. Job Matching Engine

**Purpose:** Calculate job match % based on completed roadmap modules  
**Backend Route:** `POST /api/match-jobs`

**Request:**
```json
{
    "completedNodes": ["fs1", "fs2", "fs3", "fs4"],
    "career": "fullstack"
}
```

**Response:**
```json
{
    "success": true,
    "data": {
        "matches": [
            {
                "id": "fs-1",
                "title": "SDE 1 — Full Stack",
                "company": "Razorpay",
                "location": "Bangalore",
                "salary": "₹12L - ₹18L",
                "requiredSkills": ["React", "Node.js", "TypeScript", "PostgreSQL", "REST APIs", "Git"],
                "applyUrl": "https://razorpay.com/careers/",
                "matchScore": 50,
                "matchedSkills": ["JavaScript", "React"],
                "missingSkills": ["Node.js", "TypeScript", "PostgreSQL", "REST APIs"]
            }
        ],
        "userSkills": ["HTML/CSS", "JavaScript", "React"],
        "gapAdvice": "Focus on Node.js next — it's the highest-impact skill for Razorpay's stack..."
    }
}
```

**Note:** The backend has a hardcoded `NODE_SKILL_MAP` that maps module IDs (e.g. `fs-react`) to skill names (e.g. `React`). Currently the frontend uses IDs like `fs1`, `fs4` — **these need to be aligned** between frontend roadmap data and backend skill mapping.

---

## 🔥 Recommended Firebase/Firestore Structure

### Firebase Services Needed
| Service | Purpose |
|---------|---------|
| **Firebase Auth** | Email/password, Google, GitHub authentication |
| **Cloud Firestore** | User profiles, chat history, saved analyses, resumes |
| **Firebase Storage** | Profile photos, resume PDF exports (optional) |
| **Cloud Functions** | (Optional) Server-side logic for cron jobs, cleanup |

### Firestore Collection Schema

```
firestore/
│
├── users/                              # Collection: one document per user
│   └── {uid}/                          # Document: user profile
│       ├── uid: string
│       ├── displayName: string
│       ├── email: string
│       ├── photoURL: string | null
│       ├── authProvider: string         # 'email' | 'google' | 'github'
│       ├── createdAt: timestamp
│       │
│       ├── career: string | null        # 'fullstack' | 'aiml' | 'data' | 'devops' | 'cyber' | 'mobile'
│       ├── secondaryDomains: array
│       ├── status: string | null        # '1st_year' | '2nd_year' | etc.
│       ├── companies: array
│       ├── goalTimeline: string
│       ├── onboardingDone: boolean
│       │
│       ├── level: number
│       ├── xp: number
│       ├── streak: number
│       ├── completedNodes: array        # ['fs1', 'fs2', ...]
│       ├── secondaryProgress: map       # { aiml: ['ai1', 'ai2'] }
│       ├── skillLevels: map
│       │
│       ├── behavioralTraits: map        # { focus, discipline, consistency, procrastination }
│       ├── learningSpeed: string
│       │
│       ├── activityLog: array           # [{ action, xp, timestamp }, ...]
│       │
│       ├── github: map | null           # GitHub profile data
│       │
│       ├── chats/                       # Subcollection: chat sessions
│       │   └── {chatId}/
│       │       ├── createdAt: timestamp
│       │       ├── messages: array      # [{ role, text, timestamp }, ...]
│       │       └── userContext: map
│       │
│       ├── analyses/                    # Subcollection: interview analyses
│       │   └── {analysisId}/
│       │       ├── company: string
│       │       ├── role: string
│       │       ├── score: number
│       │       ├── weaknesses: array
│       │       ├── strengths: array
│       │       ├── recoveryPlan: array
│       │       ├── keyInsight: string
│       │       └── createdAt: timestamp
│       │
│       └── resumes/                     # Subcollection: saved resumes
│           └── {resumeId}/
│               ├── name: string
│               ├── email: string
│               ├── phone: string
│               ├── linkedin: string
│               ├── github: string
│               ├── summary: string
│               ├── skills: string
│               ├── projects: array
│               ├── education: string
│               ├── atsScore: number
│               ├── lastScored: timestamp
│               └── createdAt: timestamp
```

### Firestore Security Rules (Recommended)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Subcollections inherit parent permissions
      match /chats/{chatId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /analyses/{analysisId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
      match /resumes/{resumeId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

---

## ⚙️ Backend Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Web Framework | Flask | 3.0.0 |
| CORS | flask-cors | 4.0.0 |
| AI Provider | Anthropic (Claude) | 0.78.0 |
| Environment | python-dotenv | 1.0.0 |
| Production Server | Gunicorn | 21.2.0 |

### Backend API Summary Table

| Method | Endpoint | Purpose | Auth | AI Model |
|--------|----------|---------|------|----------|
| `GET` | `/api/health` | Health check | None | None |
| `POST` | `/api/chat` | AI Mentor conversation | `X-API-Key` header | Claude Sonnet |
| `POST` | `/api/analyze-interview` | Interview failure analysis | `X-API-Key` header | Claude Sonnet |
| `POST` | `/api/score-resume` | ATS resume scoring | `X-API-Key` header | Claude Sonnet |
| `POST` | `/api/improve-summary` | AI resume summary rewrite | `X-API-Key` header | Claude Sonnet |
| `POST` | `/api/visualize` | Code execution tracer | `X-API-Key` header | Claude Sonnet |
| `POST` | `/api/match-jobs` | Job match + skill gap analysis | `X-API-Key` header | Claude Sonnet |

### API Key Handling
- **Anthropic API keys are user-provided** — users enter their key in an in-app popup
- Keys are stored in `localStorage` on the client (`apiKeyStore.ts`)
- Every API request sends the key via `X-API-Key` header to the Flask backend
- The backend creates a fresh `Anthropic(api_key=...)` client per request — **no keys stored server-side**

---

## 🔄 Migration Checklist: localStorage → Firebase

### Phase 1: Firebase Auth
1. Set up Firebase project and enable Email/Password + Google + GitHub providers
2. Add Firebase config to `.env` (see `src/firebase.js` for the required env vars)
3. Replace the stubbed functions in `src/firebase.js` with real Firebase SDK calls
4. Refactor `src/contexts/AuthContext.tsx`:
   - Replace `localStorage` session with `onAuthStateChanged` listener
   - On sign-up → create Firestore `users/{uid}` document with `makeDefaultProfile()`
   - On login → fetch profile from Firestore
   - `updateProfile()` → write to Firestore instead of localStorage

### Phase 2: Firestore Data
1. Replace all `localStorage.getItem('cc_profile_...')` calls with Firestore `getDoc/setDoc`
2. Activity log, XP, streak, completedNodes → Firestore updates
3. Add real-time listener (`onSnapshot`) for profile changes across tabs

### Phase 3: Backend Integration
1. Deploy Flask backend (Render, Railway, or Cloud Run)
2. Update `VITE_API_URL` env var to point to deployed backend URL
3. Ensure CORS allows the production frontend domain
4. Test all 6 API endpoints end-to-end

### Phase 4: Optional Enhancements
1. Store chat history in `users/{uid}/chats` subcollection
2. Store interview analyses in `users/{uid}/analyses` subcollection
3. Store saved resumes in `users/{uid}/resumes` subcollection
4. Add Firebase Storage for profile photo uploads and resume PDF exports

---

## 🌐 Frontend Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| UI Framework | React | 19.2.4 |
| Language | TypeScript | 6.0.2 |
| Build Tool | Vite | 8.0.0 |
| Styling | Tailwind CSS | 3.4.1 |
| Animations | Framer Motion | 12.36.0 |
| Icons | Lucide React | 0.577.0 |
| Routing | React Router DOM | 7.13.1 |
| Markdown | React Markdown | 10.1.0 |
| Charts | Recharts | 3.8.0 |
| Celebrations | Canvas Confetti | 1.9.4 |
| Firebase SDK | firebase | 12.10.0 |

---

## 📁 Project Structure

```
careercraft/
├── backend/                         # Flask API server
│   ├── app.py                       # Application factory + blueprints
│   ├── requirements.txt             # Python dependencies
│   ├── .env.example                 # Environment template
│   └── routes/
│       ├── chat.py                  # POST /api/chat
│       ├── analyzer.py              # POST /api/analyze-interview
│       ├── resume.py                # POST /api/score-resume + /api/improve-summary
│       ├── visualizer.py            # POST /api/visualize
│       └── jobs.py                  # POST /api/match-jobs
│
├── src/
│   ├── App.tsx                      # Route definitions
│   ├── main.tsx                     # React entry point
│   ├── index.css                    # Design system tokens + global styles
│   ├── firebase.js                  # Firebase config (NEEDS REAL CREDENTIALS)
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx          # Auth + user profile state (NEEDS FIREBASE REFACTOR)
│   │
│   ├── lib/
│   │   ├── api.ts                   # All backend API calls
│   │   └── apiKeyStore.ts           # Anthropic API key localStorage manager
│   │
│   ├── data/
│   │   └── roadmaps.js             # Static roadmap data (6 careers x 12 modules)
│   │
│   ├── components/
│   │   ├── Sidebar.tsx              # Shared navigation sidebar
│   │   └── ProtectedRoute.jsx       # Auth guard wrapper
│   │
│   └── pages/
│       ├── LandingPage.tsx          # Marketing / landing page
│       ├── LoginPage.tsx            # Sign in / sign up / demo login
│       ├── OnboardingPage.tsx       # 6-step career profile wizard
│       ├── DashboardPage.tsx        # Central command center (600+ lines)
│       ├── RoadmapPage.tsx          # Multi-domain learning path
│       ├── MentorPage.tsx           # AI chat interface
│       ├── FeedPage.tsx             # Domain intelligence feed
│       ├── JobsPage.tsx             # Job matching + skill gap
│       ├── AnalyzerPage.tsx         # Interview failure diagnostic
│       ├── ResumePage.tsx           # ATS resume builder
│       ├── CodeVisualizerPage.tsx   # Step-by-step code tracer
│       └── ProfilePage.tsx          # User profile + contributions
│
├── .env                             # Frontend env vars (VITE_FIREBASE_*)
├── package.json                     # Node dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind theme
└── tsconfig.json                    # TypeScript config
```

---

## 🔑 Environment Variables

### Frontend (.env in root)
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000000000:web:0000000000000000

# Backend URL (defaults to http://localhost:5000)
VITE_API_URL=http://localhost:5000

# Base path for routing (use '/' for custom domain, '/CareerCraft/' for GitHub Pages)
VITE_BASE_URL=/
```

### Backend (backend/.env)
```env
FLASK_ENV=development
FLASK_PORT=5000
# Note: Anthropic API keys are provided by users per-request, not stored on server
```

---

## 🚀 Quick Start

### Frontend
```bash
npm install
npm run dev
# → http://localhost:5173/CareerCraft/
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
# → http://localhost:5000
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📊 Summary: What the Database Person Needs to Do

1. **Create a Firebase project** with Auth (Email, Google, GitHub providers) + Firestore + Storage
2. **Design Firestore schema** using the structure in the "Firestore Collection Schema" section above
3. **Write security rules** so users can only access their own data
4. **Refactor `AuthContext.tsx`** to use Firebase Auth + Firestore instead of localStorage
5. **Update `firebase.js`** with real Firebase SDK function implementations
6. **Deploy Flask backend** and update `VITE_API_URL` to point to it
7. **Test the full flow**: Sign up → Onboard → Progress → AI features → Profile

---

<p align="center">
<strong>Built with ❤️ for the next generation of Indian engineers.</strong>
</p>
