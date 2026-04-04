// ─── Career-specific roadmap data ────────────────────────────────────────────
// Each career has: label, emoji, phases[], each phase has items[]

export const careerMeta = {
    fullstack: { label: 'Full Stack Dev', emoji: '⚡', color: 'var(--cyan)', salary: '₹6L – ₹14L' },
    aiml:      { label: 'AI / ML Engineer', emoji: '🧠', color: 'var(--purple)', salary: '₹8L – ₹18L' },
    data:      { label: 'Data Science', emoji: '📊', color: '#F59E0B', salary: '₹7L – ₹15L' },
    devops:    { label: 'Cloud & DevOps', emoji: '☁️', color: '#10B981', salary: '₹7L – ₹14L' },
    cyber:     { label: 'Cybersecurity', emoji: '🛡️', color: '#F72585', salary: '₹6L – ₹13L' },
    mobile:    { label: 'Mobile Dev', emoji: '📱', color: '#8B5CF6', salary: '₹5L – ₹12L' },
};

// ─── Post-completion: Job Roles, Job Boards & Resume Tips ─────────────────────
export const careerCompletionData = {
    fullstack: {
        jobRoles: [
            { title: 'Full Stack Developer', salary: '₹6L – ₹14L', match: 96, icon: '⚡', tag: 'Top Pick', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=full+stack+developer&location=India', naukri: 'https://www.naukri.com/full-stack-developer-jobs', indeed: 'https://in.indeed.com/jobs?q=full+stack+developer' } },
            { title: 'React Developer', salary: '₹5L – ₹12L', match: 92, icon: '⚛️', tag: 'High Demand', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=react+developer&location=India', naukri: 'https://www.naukri.com/react-developer-jobs', indeed: 'https://in.indeed.com/jobs?q=react+developer' } },
            { title: 'Node.js Backend Engineer', salary: '₹7L – ₹15L', match: 88, icon: '🟢', tag: 'Great Salary', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=nodejs+developer&location=India', naukri: 'https://www.naukri.com/node-js-developer-jobs', indeed: 'https://in.indeed.com/jobs?q=nodejs+developer' } },
            { title: 'Software Development Engineer', salary: '₹8L – ₹20L', match: 82, icon: '🚀', tag: 'FAANG Ready', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=sde+developer&location=India', naukri: 'https://www.naukri.com/software-developer-jobs', indeed: 'https://in.indeed.com/jobs?q=software+developer' } },
        ],
        resumeSkills: ['React.js', 'Node.js', 'REST APIs', 'MongoDB', 'TypeScript', 'System Design', 'Git & CI/CD', 'Docker'],
        resumeTips: ['Add a GitHub link with 3+ live projects', 'Quantify impact: "Reduced load time by 40%"', 'List your DSA proficiency (LeetCode rating)', 'Include deployed URLs for all projects'],
    },
    aiml: {
        jobRoles: [
            { title: 'Machine Learning Engineer', salary: '₹8L – ₹18L', match: 95, icon: '🧠', tag: 'Top Pick', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=machine+learning+engineer&location=India', naukri: 'https://www.naukri.com/machine-learning-engineer-jobs', indeed: 'https://in.indeed.com/jobs?q=machine+learning+engineer' } },
            { title: 'Data Scientist', salary: '₹7L – ₹16L', match: 90, icon: '📊', tag: 'High Demand', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=data+scientist&location=India', naukri: 'https://www.naukri.com/data-scientist-jobs', indeed: 'https://in.indeed.com/jobs?q=data+scientist' } },
            { title: 'AI Research Engineer', salary: '₹12L – ₹25L', match: 80, icon: '🔬', tag: 'Premium', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=ai+research+engineer&location=India', naukri: 'https://www.naukri.com/artificial-intelligence-jobs', indeed: 'https://in.indeed.com/jobs?q=ai+engineer' } },
            { title: 'NLP / LLM Engineer', salary: '₹10L – ₹22L', match: 85, icon: '🤖', tag: 'Trending', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=nlp+engineer&location=India', naukri: 'https://www.naukri.com/nlp-engineer-jobs', indeed: 'https://in.indeed.com/jobs?q=nlp+engineer' } },
        ],
        resumeSkills: ['Python', 'PyTorch / TensorFlow', 'Scikit-Learn', 'HuggingFace', 'MLOps', 'LangChain', 'SQL', 'Cloud ML (AWS/GCP)'],
        resumeTips: ['Link to Kaggle profile with competition rankings', 'Describe model accuracy improvements numerically', 'Add research papers or blog posts if any', 'Highlight LLM/GenAI project experience'],
    },
    data: {
        jobRoles: [
            { title: 'Data Analyst', salary: '₹4L – ₹10L', match: 94, icon: '📈', tag: 'Top Pick', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=data+analyst&location=India', naukri: 'https://www.naukri.com/data-analyst-jobs', indeed: 'https://in.indeed.com/jobs?q=data+analyst' } },
            { title: 'Business Intelligence Analyst', salary: '₹5L – ₹12L', match: 88, icon: '💡', tag: 'High Demand', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=bi+analyst&location=India', naukri: 'https://www.naukri.com/business-intelligence-jobs', indeed: 'https://in.indeed.com/jobs?q=business+intelligence' } },
            { title: 'Data Engineer', salary: '₹7L – ₹16L', match: 82, icon: '🔧', tag: 'Great Salary', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=data+engineer&location=India', naukri: 'https://www.naukri.com/data-engineer-jobs', indeed: 'https://in.indeed.com/jobs?q=data+engineer' } },
            { title: 'Product Analyst', salary: '₹6L – ₹14L', match: 85, icon: '🎯', tag: 'Trending', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=product+analyst&location=India', naukri: 'https://www.naukri.com/product-analyst-jobs', indeed: 'https://in.indeed.com/jobs?q=product+analyst' } },
        ],
        resumeSkills: ['SQL', 'Python (Pandas)', 'Power BI / Tableau', 'Excel', 'Statistics', 'EDA', 'Apache Spark', 'Data Storytelling'],
        resumeTips: ['Add dashboard screenshots or Tableau Public links', 'Mention size of datasets you worked with', 'Include SQL query optimization experience', 'List certifications (Google Data Analytics, etc.)'],
    },
    devops: {
        jobRoles: [
            { title: 'DevOps Engineer', salary: '₹7L – ₹14L', match: 95, icon: '☁️', tag: 'Top Pick', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=devops+engineer&location=India', naukri: 'https://www.naukri.com/devops-engineer-jobs', indeed: 'https://in.indeed.com/jobs?q=devops+engineer' } },
            { title: 'Cloud Engineer (AWS/Azure)', salary: '₹8L – ₹18L', match: 90, icon: '🌩️', tag: 'High Demand', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=cloud+engineer&location=India', naukri: 'https://www.naukri.com/cloud-engineer-jobs', indeed: 'https://in.indeed.com/jobs?q=cloud+engineer' } },
            { title: 'Site Reliability Engineer', salary: '₹10L – ₹22L', match: 82, icon: '🛠️', tag: 'Premium', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=sre&location=India', naukri: 'https://www.naukri.com/site-reliability-engineer-jobs', indeed: 'https://in.indeed.com/jobs?q=site+reliability+engineer' } },
            { title: 'Platform/Infrastructure Engineer', salary: '₹9L – ₹20L', match: 86, icon: '🏗️', tag: 'Great Salary', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=infrastructure+engineer&location=India', naukri: 'https://www.naukri.com/infrastructure-engineer-jobs', indeed: 'https://in.indeed.com/jobs?q=infrastructure+engineer' } },
        ],
        resumeSkills: ['Docker', 'Kubernetes', 'Terraform', 'AWS/GCP', 'CI/CD (GitHub Actions, Jenkins)', 'Linux', 'Prometheus & Grafana', 'Bash Scripting'],
        resumeTips: ['Add AWS/Azure certification badges', 'Quantify infra cost savings or uptime improvements', 'List GitHub Actions workflows you built', 'Mention on-call experience and incident response'],
    },
    cyber: {
        jobRoles: [
            { title: 'Security Analyst', salary: '₹5L – ₹12L', match: 93, icon: '🛡️', tag: 'Top Pick', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=security+analyst&location=India', naukri: 'https://www.naukri.com/security-analyst-jobs', indeed: 'https://in.indeed.com/jobs?q=security+analyst' } },
            { title: 'Penetration Tester', salary: '₹6L – ₹14L', match: 88, icon: '🔐', tag: 'High Demand', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=penetration+tester&location=India', naukri: 'https://www.naukri.com/penetration-testing-jobs', indeed: 'https://in.indeed.com/jobs?q=penetration+tester' } },
            { title: 'SOC Analyst (L1/L2)', salary: '₹4L – ₹10L', match: 91, icon: '📡', tag: 'Entry Friendly', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=soc+analyst&location=India', naukri: 'https://www.naukri.com/soc-analyst-jobs', indeed: 'https://in.indeed.com/jobs?q=soc+analyst' } },
            { title: 'Cloud Security Engineer', salary: '₹9L – ₹20L', match: 80, icon: '☁️', tag: 'Premium', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=cloud+security+engineer&location=India', naukri: 'https://www.naukri.com/cloud-security-engineer-jobs', indeed: 'https://in.indeed.com/jobs?q=cloud+security' } },
        ],
        resumeSkills: ['Kali Linux', 'Burp Suite', 'Nmap', 'Metasploit', 'OWASP Top 10', 'CompTIA Security+', 'Wireshark', 'SIEM Tools'],
        resumeTips: ['List certifications: Security+, CEH, eJPT', 'Add HackerOne/Bugcrowd profile with findings', 'Mention TryHackMe/HackTheBox ranks', 'Include any CVE discoveries or responsible disclosures'],
    },
    mobile: {
        jobRoles: [
            { title: 'React Native Developer', salary: '₹5L – ₹12L', match: 94, icon: '📱', tag: 'Top Pick', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=react+native+developer&location=India', naukri: 'https://www.naukri.com/react-native-developer-jobs', indeed: 'https://in.indeed.com/jobs?q=react+native+developer' } },
            { title: 'Flutter Developer', salary: '₹5L – ₹13L', match: 88, icon: '💙', tag: 'High Demand', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=flutter+developer&location=India', naukri: 'https://www.naukri.com/flutter-developer-jobs', indeed: 'https://in.indeed.com/jobs?q=flutter+developer' } },
            { title: 'iOS Developer (Swift)', salary: '₹7L – ₹16L', match: 80, icon: '🍎', tag: 'Premium', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=ios+developer&location=India', naukri: 'https://www.naukri.com/ios-developer-jobs', indeed: 'https://in.indeed.com/jobs?q=ios+developer' } },
            { title: 'Mobile App Engineer', salary: '₹6L – ₹14L', match: 90, icon: '🛠️', tag: 'Versatile', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=mobile+app+engineer&location=India', naukri: 'https://www.naukri.com/mobile-developer-jobs', indeed: 'https://in.indeed.com/jobs?q=mobile+app+engineer' } },
        ],
        resumeSkills: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'REST APIs', 'Redux / Zustand', 'App Store Deploy', 'Reanimated 3'],
        resumeTips: ['Add Play Store / App Store links to your apps', 'Mention download counts or user ratings', 'List performance wins (app size, load time)', 'Include UI/UX design skills if applicable'],
    },
};

export const roadmapData = {
    fullstack: [
        {
            phase: 'Foundation',
            color: 'var(--green)',
            items: [
                { id: 'fs1', title: 'HTML & CSS Fundamentals', xp: 200, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'FreeCodeCamp HTML/CSS', 'CSS Tricks Guide', 'Kevin Powell YouTube'] },
                { id: 'fs2', title: 'JavaScript Essentials', xp: 350, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'javascript.info', 'Akshay Saini JS Playlist', 'You Don\'t Know JS (Book)'] },
                { id: 'fs3', title: 'Git & Version Control', xp: 150, time: '1 week', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Git Documentation', 'The Odin Project Git'] },
            ]
        },
        {
            phase: 'Frontend',
            color: 'var(--cyan)',
            items: [
                { id: 'fs4', title: 'React & Hooks', xp: 500, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'React Docs (react.dev)', 'Scrimba React Course', 'Jack Herrington YouTube'] },
                { id: 'fs5', title: 'State Management (Redux / Zustand)', xp: 350, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Redux Toolkit Docs', 'Zustand GitHub README'] },
                { id: 'fs6', title: 'TypeScript Basics', xp: 300, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'TypeScript Handbook', 'Matt Pocock YouTube'] },
            ]
        },
        {
            phase: 'Backend',
            color: 'var(--purple)',
            items: [
                { id: 'fs7', title: 'Node.js & Express', xp: 450, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Node.js Docs', 'Traversy Media Node Crash Course'] },
                { id: 'fs8', title: 'REST API Design', xp: 300, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'REST API Tutorial', 'Postman Learning Center'] },
                { id: 'fs9', title: 'Databases (SQL + MongoDB)', xp: 400, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'SQLZoo', 'MongoDB University', 'Prisma ORM Docs'] },
            ]
        },
        {
            phase: 'Advanced',
            color: '#F59E0B',
            items: [
                { id: 'fs10', title: 'Authentication & Security', xp: 350, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'JWT.io', 'OWASP Top 10', 'Fireship Auth Video'] },
                { id: 'fs11', title: 'System Design Basics', xp: 600, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Gaurav Sen YouTube', 'Designing Data-Intensive Apps'] },
                { id: 'fs12', title: 'DSA for Interviews', xp: 700, time: '6 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Striver A-Z Sheet', 'NeetCode.io', 'LeetCode Top 150'] },
            ]
        },
    ],

    aiml: [
        {
            phase: 'Math & Python Foundation',
            color: 'var(--green)',
            items: [
                { id: 'ai1', title: 'Python for Data Science', xp: 300, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Python.org Docs', 'CS50P Harvard', 'Mosh Python Course'] },
                { id: 'ai2', title: 'Linear Algebra & Statistics', xp: 400, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', '3Blue1Brown Linear Algebra', 'StatQuest YouTube', 'Khan Academy'] },
                { id: 'ai3', title: 'NumPy & Pandas', xp: 250, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Kaggle Pandas Course', 'NumPy Docs Tutorial'] },
            ]
        },
        {
            phase: 'Machine Learning',
            color: 'var(--purple)',
            items: [
                { id: 'ai4', title: 'Supervised Learning (Regression, Classification)', xp: 500, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Andrew Ng ML Course', 'Scikit-Learn Docs', 'StatQuest ML Playlist'] },
                { id: 'ai5', title: 'Unsupervised Learning & Clustering', xp: 400, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Google ML Crash Course', 'Kaggle ML Courses'] },
                { id: 'ai6', title: 'Model Evaluation & Feature Engineering', xp: 350, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Kaggle Feature Engineering Course'] },
            ]
        },
        {
            phase: 'Deep Learning',
            color: 'var(--cyan)',
            items: [
                { id: 'ai7', title: 'Neural Networks & Deep Learning', xp: 600, time: '5 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Deep Learning Specialization (Coursera)', 'fast.ai', '3Blue1Brown Neural Nets'] },
                { id: 'ai8', title: 'NLP & Transformers', xp: 550, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'HuggingFace Course', 'Jay Alammar Blog', 'Andrej Karpathy YouTube'] },
                { id: 'ai9', title: 'Computer Vision (CNN)', xp: 500, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'CS231n Stanford', 'PyTorch Vision Docs'] },
            ]
        },
        {
            phase: 'MLOps & Applications',
            color: '#F59E0B',
            items: [
                { id: 'ai10', title: 'LangChain & LLM Apps', xp: 600, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'LangChain Docs', 'LlamaIndex', 'Deeplearning.ai Short Courses'] },
                { id: 'ai11', title: 'MLOps & Model Deployment', xp: 500, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'MLflow Docs', 'Weights & Biases', 'FastAPI for ML'] },
                { id: 'ai12', title: 'Kaggle Competitions', xp: 700, time: 'Ongoing', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Kaggle.com', 'Kaggle Notebooks'] },
            ]
        },
    ],

    data: [
        {
            phase: 'Data Foundation',
            color: 'var(--green)',
            items: [
                { id: 'ds1', title: 'Python & Pandas', xp: 300, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Kaggle Pandas Course', 'Real Python', 'Python Docs'] },
                { id: 'ds2', title: 'SQL Mastery', xp: 350, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Mode SQL Tutorial', 'SQLZoo', 'LeetCode SQL'] },
                { id: 'ds3', title: 'Statistics & Probability', xp: 400, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'StatQuest YouTube', 'Khan Academy Stats', 'Think Stats (Book)'] },
            ]
        },
        {
            phase: 'Data Analysis',
            color: '#F59E0B',
            items: [
                { id: 'ds4', title: 'Data Visualization (Matplotlib, Seaborn, Plotly)', xp: 300, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Matplotlib Docs', 'Plotly Python', 'Data Viz Course Kaggle'] },
                { id: 'ds5', title: 'Exploratory Data Analysis (EDA)', xp: 400, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Kaggle EDA Notebooks', 'Pandas Profiling'] },
                { id: 'ds6', title: 'Excel & Google Sheets for Data', xp: 200, time: '1 week', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Excel for Data Analysis (YouTube)'] },
            ]
        },
        {
            phase: 'Machine Learning',
            color: 'var(--purple)',
            items: [
                { id: 'ds7', title: 'Scikit-Learn ML Pipeline', xp: 500, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Scikit-Learn Docs', 'Kaggle ML Courses', 'Andrew Ng Coursera'] },
                { id: 'ds8', title: 'Feature Engineering', xp: 350, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Kaggle Feature Engineering'] },
                { id: 'ds9', title: 'Time Series Analysis', xp: 400, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Prophet Docs', 'Time Series Kaggle Course'] },
            ]
        },
        {
            phase: 'Big Data & Tools',
            color: 'var(--cyan)',
            items: [
                { id: 'ds10', title: 'Power BI / Tableau', xp: 350, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Power BI Microsoft Learn', 'Tableau Free Training'] },
                { id: 'ds11', title: 'Apache Spark Basics', xp: 500, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Spark Docs', 'Databricks Community'] },
                { id: 'ds12', title: 'Data Engineering Fundamentals', xp: 600, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Data Engineering Zoomcamp', 'dbt Docs'] },
            ]
        },
    ],

    devops: [
        {
            phase: 'Linux & Networking',
            color: 'var(--green)',
            items: [
                { id: 'do1', title: 'Linux Command Line', xp: 300, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Linux Journey', 'OverTheWire (Bandit)', 'Ryan\'s Tutorials'] },
                { id: 'do2', title: 'Networking Fundamentals', xp: 350, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Professor Messer', 'NetworkChuck YouTube', 'Cisco CCNA free'] },
                { id: 'do3', title: 'Shell Scripting (Bash)', xp: 250, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Bash Manual', 'ShellScripting.sh'] },
            ]
        },
        {
            phase: 'Containers & CI/CD',
            color: 'var(--cyan)',
            items: [
                { id: 'do4', title: 'Docker & Docker Compose', xp: 400, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Docker Docs', 'TechWorld with Nana', 'Play with Docker'] },
                { id: 'do5', title: 'Kubernetes', xp: 600, time: '5 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Kubernetes Docs', 'TechWorld with Nana K8s', 'KodeKloud'] },
                { id: 'do6', title: 'CI/CD with GitHub Actions / Jenkins', xp: 400, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'GitHub Actions Docs', 'Jenkins Docs', 'KodeKloud'] },
            ]
        },
        {
            phase: 'Cloud Platforms',
            color: '#F59E0B',
            items: [
                { id: 'do7', title: 'AWS Fundamentals (EC2, S3, Lambda)', xp: 500, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'AWS Skill Builder', 'A Cloud Guru', 'AWS Free Tier'] },
                { id: 'do8', title: 'Infrastructure as Code (Terraform)', xp: 500, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Terraform Docs', 'HashiCorp Learn'] },
                { id: 'do9', title: 'Monitoring (Prometheus, Grafana)', xp: 400, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Prometheus Docs', 'Grafana Labs'] },
            ]
        },
        {
            phase: 'Advanced DevOps',
            color: 'var(--purple)',
            items: [
                { id: 'do10', title: 'GitOps & ArgoCD', xp: 500, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'ArgoCD Docs', 'GitOps Book'] },
                { id: 'do11', title: 'Security in DevOps (DevSecOps)', xp: 450, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'OWASP DevSecOps', 'Snyk'] },
                { id: 'do12', title: 'AWS/Azure Certification Prep', xp: 700, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Stephane Maarek Udemy', 'ExamTopics', 'Tutorials Dojo'] },
            ]
        },
    ],

    cyber: [
        {
            phase: 'Foundations',
            color: 'var(--green)',
            items: [
                { id: 'cy1', title: 'Networking & Protocols (TCP/IP, HTTP, DNS)', xp: 400, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Professor Messer', 'NetworkChuck', 'Cisco NetAcad'] },
                { id: 'cy2', title: 'Linux for Security', xp: 350, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'OverTheWire Bandit', 'TryHackMe Pre-Security'] },
                { id: 'cy3', title: 'Cryptography Basics', xp: 300, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'CryptoHack', 'Coursera Crypto I (Dan Boneh)'] },
            ]
        },
        {
            phase: 'Ethical Hacking',
            color: '#F72585',
            items: [
                { id: 'cy4', title: 'Web Application Security (OWASP Top 10)', xp: 500, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'PortSwigger Web Security Academy', 'OWASP Juice Shop'] },
                { id: 'cy5', title: 'Network Penetration Testing', xp: 550, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'TryHackMe', 'HackTheBox', 'eJPT Cert'] },
                { id: 'cy6', title: 'Vulnerability Assessment & Scanning', xp: 400, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Nmap Docs', 'Metasploit Unleashed'] },
            ]
        },
        {
            phase: 'Specialization',
            color: 'var(--cyan)',
            items: [
                { id: 'cy7', title: 'Malware Analysis & Reverse Engineering', xp: 600, time: '5 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Malware Unicorn', 'Any.run Sandbox', 'x64dbg'] },
                { id: 'cy8', title: 'Cloud Security', xp: 500, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'AWS Security Specialty', 'Cloud Security Alliance'] },
                { id: 'cy9', title: 'Incident Response & Forensics', xp: 500, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'BlueTeamLabs', 'SANS Reading Room'] },
            ]
        },
        {
            phase: 'Certifications',
            color: 'var(--purple)',
            items: [
                { id: 'cy10', title: 'CompTIA Security+', xp: 600, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Professor Messer S+', 'ExamCompass Practice'] },
                { id: 'cy11', title: 'CEH or eJPT Certification', xp: 700, time: '6 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'EC-Council CEH', 'INE eJPT'] },
                { id: 'cy12', title: 'Bug Bounty on HackerOne/Bugcrowd', xp: 800, time: 'Ongoing', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'HackerOne', 'Bugcrowd', 'NahamCon Talks'] },
            ]
        },
    ],

    mobile: [
        {
            phase: 'Programming Foundation',
            color: 'var(--green)',
            items: [
                { id: 'mb1', title: 'JavaScript / TypeScript Basics', xp: 300, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'javascript.info', 'TypeScript Handbook'] },
                { id: 'mb2', title: 'UI & UX Design Principles', xp: 200, time: '1 week', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Google Material Design', 'Apple HIG', 'Refactoring UI (Book)'] },
                { id: 'mb3', title: 'Git & Project Setup', xp: 150, time: '1 week', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Git Documentation', 'Expo Docs'] },
            ]
        },
        {
            phase: 'React Native / Flutter',
            color: '#8B5CF6',
            items: [
                { id: 'mb4', title: 'React Native Core Concepts', xp: 500, time: '4 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'React Native Docs', 'William Candillon (YouTube)', 'Expo Docs'] },
                { id: 'mb5', title: 'Navigation & State Management', xp: 400, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'React Navigation Docs', 'Zustand for Mobile'] },
                { id: 'mb6', title: 'Native APIs (Camera, GPS, Push Notifs)', xp: 350, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Expo SDK Docs', 'React Native Community'] },
            ]
        },
        {
            phase: 'Backend Integration',
            color: 'var(--cyan)',
            items: [
                { id: 'mb7', title: 'Firebase / Supabase for Mobile', xp: 400, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Firebase Docs', 'Supabase Docs', 'Fireship YouTube'] },
                { id: 'mb8', title: 'REST & GraphQL API Calls', xp: 300, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Axios Docs', 'Apollo Client Docs'] },
                { id: 'mb9', title: 'Offline Storage & Caching', xp: 350, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'MMKV', 'WatermelonDB', 'AsyncStorage Docs'] },
            ]
        },
        {
            phase: 'Publishing & Advanced',
            color: '#F59E0B',
            items: [
                { id: 'mb10', title: 'App Store & Play Store Deployment', xp: 400, time: '2 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Apple App Store Connect', 'Google Play Console', 'Expo EAS Build'] },
                { id: 'mb11', title: 'Performance Optimization', xp: 500, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'Flipper Debugger', 'React Native Performance Docs'] },
                { id: 'mb12', title: 'Animation (Reanimated 3)', xp: 550, time: '3 weeks', resources: ['TeachyTechie (https://www.teachytechie.com/)', 'React Native Reanimated Docs', 'William Candillon Courses'] },
            ]
        },
    ],
};

// Helper: get first locked node (the one to work on next) for a career & completedIds set
export function getNextNode(career, completedIds = []) {
    const phases = roadmapData[career] || roadmapData.fullstack;
    for (const phase of phases) {
        for (const item of phase.items) {
            if (!completedIds.includes(item.id)) return item;
        }
    }
    return null;
}

// Helper: compute overall progress %
export function getProgress(career, completedIds = []) {
    const phases = roadmapData[career] || roadmapData.fullstack;
    const all = phases.flatMap(p => p.items);
    return all.length ? Math.round((completedIds.length / all.length) * 100) : 0;
}
