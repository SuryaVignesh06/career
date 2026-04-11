// ─── Career-specific roadmap data ────────────────────────────────────────────
// Each career has: label, emoji, phases[], each phase has items[]

export const careerMeta = {
    fullstack: { label: 'Full Stack Dev', emoji: '⚡', color: 'var(--cyan)', salary: '₹6L – ₹14L' },
    aiml:      { label: 'AI / ML Engineer', emoji: '🧠', color: 'var(--purple)', salary: '₹8L – ₹18L' },
    data:      { label: 'Data Science', emoji: '📊', color: '#F59E0B', salary: '₹7L – ₹15L' },
    devops:    { label: 'Cloud & DevOps', emoji: '☁️', color: '#10B981', salary: '₹7L – ₹14L' },
    cyber:     { label: 'Cybersecurity', emoji: '🛡️', color: '#F72585', salary: '₹6L – ₹13L' },
    mobile:    { label: 'Mobile Dev', emoji: '📱', color: '#8B5CF6', salary: '₹5L – ₹12L' },
    uiux:      { label: 'Drawing', emoji: '🎨', color: '#EC4899', salary: '₹5L – ₹12L' },
    technicalWriting: { label: 'Literature', emoji: '✍️', color: '#6366F1', salary: '₹4L – ₹10L' },
};

export const careerCertificationsData = {
    fullstack: [
        { title: 'Meta Front-End Developer', provider: 'Coursera', url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer', icon: '⚛️' },
        { title: 'IBM Full Stack Developer', provider: 'Coursera', url: 'https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer', icon: '🌐' },
        { title: 'AWS Certified Developer', provider: 'AWS', url: 'https://aws.amazon.com/certification/certified-developer-associate/', icon: '☁️' }
    ],
    aiml: [
        { title: 'DeepLearning.AI TensorFlow', provider: 'Coursera', url: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice', icon: '🧠' },
        { title: 'AWS Machine Learning', provider: 'AWS', url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/', icon: '🤖' },
        { title: 'IBM AI Engineering', provider: 'Coursera', url: 'https://www.coursera.org/professional-certificates/ai-engineer', icon: '⚡' }
    ],
    data: [
        { title: 'Google Data Analytics', provider: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-data-analytics', icon: '📊' },
        { title: 'IBM Data Science', provider: 'Coursera', url: 'https://www.coursera.org/professional-certificates/ibm-data-science', icon: '🔬' },
        { title: 'Microsoft Power BI Analyst', provider: 'Microsoft', url: 'https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/', icon: '📈' }
    ],
    devops: [
        { title: 'AWS Solutions Architect', provider: 'AWS', url: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/', icon: '☁️' },
        { title: 'Certified Kubernetes Admin', provider: 'CNCF', url: 'https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/', icon: '⛴️' },
        { title: 'Terraform Associate', provider: 'HashiCorp', url: 'https://www.hashicorp.com/certification/terraform-associate', icon: '🏗️' }
    ],
    cyber: [
        { title: 'CompTIA Security+', provider: 'CompTIA', url: 'https://www.comptia.org/certifications/security', icon: '🛡️' },
        { title: 'Certified Ethical Hacker', provider: 'EC-Council', url: 'https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/', icon: '🥷' },
        { title: 'eJPT Certification', provider: 'INE', url: 'https://ine.com/learning/certifications/internal/ejpt', icon: '🔐' }
    ],
    mobile: [
        { title: 'Meta Android Developer', provider: 'Coursera', url: 'https://www.coursera.org/professional-certificates/meta-android-developer', icon: '📱' },
        { title: 'Meta iOS Developer', provider: 'Coursera', url: 'https://www.coursera.org/professional-certificates/meta-ios-developer', icon: '🍎' },
        { title: 'Associate Android Developer', provider: 'Google', url: 'https://developer.android.com/certification', icon: '🤖' }
    ],
    uiux: [
        { title: 'Google UX Design', provider: 'Coursera', url: 'https://www.coursera.org/professional-certificates/google-ux-design', icon: '🎨' },
        { title: 'UI/UX Specialization', provider: 'CalArts', url: 'https://www.coursera.org/specializations/ui-ux-design', icon: '🖍️' },
        { title: 'Figma to Code', provider: 'Udemy', url: '#', icon: '⚡' }
    ],
    technicalWriting: [
        { title: 'Creative Writing Specialization', provider: 'Wesleyan', url: 'https://www.coursera.org/specializations/creative-writing', icon: '📝' },
        { title: 'The Art of Storytelling', provider: 'Pixar', url: '#', icon: '🎭' },
        { title: 'Modern and Contemporary Poetry', provider: 'UPenn', url: 'https://www.coursera.org/learn/modpo', icon: '📜' }
    ]
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
    uiux: {
        jobRoles: [
            { title: 'UI/UX Designer', salary: '₹5L – ₹12L', match: 95, icon: '🎨', tag: 'Top Pick', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=ui+ux+designer', naukri: 'https://www.naukri.com/ui-ux-designer-jobs', indeed: 'https://in.indeed.com/jobs?q=ui+ux+designer' } },
            { title: 'Product Designer', salary: '₹7L – ₹15L', match: 90, icon: '💡', tag: 'High Growth', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=product+designer', naukri: 'https://www.naukri.com/product-designer-jobs', indeed: 'https://in.indeed.com/jobs?q=product+designer' } },
        ],
        resumeSkills: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Interaction Design', 'Usability Testing'],
        resumeTips: ['Include a link to your Behance or Dribbble portfolio', 'Showcase 3 detailed case studies', 'Focus on problem-solving over just visuals'],
    },
    technicalWriting: {
        jobRoles: [
            { title: 'Author & Novelist', salary: '₹3L – ₹15L', match: 95, icon: '📚', tag: 'Top Pick', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=creative+writer', naukri: 'https://www.naukri.com/creative-writing-jobs', indeed: 'https://in.indeed.com/jobs?q=author' } },
            { title: 'Copywriter & Editor', salary: '₹4L – ₹12L', match: 88, icon: '🖋️', tag: 'High Growth', links: { linkedin: 'https://www.linkedin.com/jobs/search/?keywords=editor', naukri: 'https://www.naukri.com/editor-jobs', indeed: 'https://in.indeed.com/jobs?q=copywriter' } },
        ],
        resumeSkills: ['Creative Writing', 'Editing & Proofreading', 'Storytelling', 'Copywriting', 'Content Strategy', 'Publishing'],
        resumeTips: ['Include links to your published essays or blog posts', 'Mention specific writing awards or literary magazine features', 'Highlight editorial experience if applicable'],
    },
};

export const roadmapData = {
    fullstack: [
        {
            phase: 'Foundation',
            color: 'var(--green)',
            items: [
                { id: 'fs1', title: 'HTML & CSS Fundamentals', xp: 200, time: '2 weeks', resources: ['ClassCentral HTML/CSS (https://www.classcentral.com/subject/html5)', 'TeachyTechie (https://www.teachytechie.com/)', 'FreeCodeCamp HTML/CSS', 'CSS Tricks Guide'] },
                { id: 'fs2', title: 'JavaScript Essentials', xp: 350, time: '3 weeks', resources: ['ClassCentral JavaScript (https://www.classcentral.com/subject/javascript)', 'TeachyTechie (https://www.teachytechie.com/)', 'javascript.info', 'Akshay Saini JS'] },
                { id: 'fs3', title: 'Git & Version Control', xp: 150, time: '1 week', resources: ['ClassCentral Git (https://www.classcentral.com/subject/git)', 'TeachyTechie (https://www.teachytechie.com/)', 'Git Documentation', 'The Odin Project Git'] },
            ]
        },
        {
            phase: 'Frontend',
            color: 'var(--cyan)',
            items: [
                { id: 'fs4', title: 'React & Hooks', xp: 500, time: '4 weeks', resources: ['ClassCentral React (https://www.classcentral.com/subject/react)', 'TeachyTechie (https://www.teachytechie.com/)', 'React Docs (react.dev)', 'Scrimba React'] },
                { id: 'fs5', title: 'State Management (Redux / Zustand)', xp: 350, time: '2 weeks', resources: ['ClassCentral Redux (https://www.classcentral.com/subject/redux)', 'TeachyTechie (https://www.teachytechie.com/)', 'Redux Toolkit Docs'] },
                { id: 'fs6', title: 'TypeScript Basics', xp: 300, time: '2 weeks', resources: ['ClassCentral TypeScript (https://www.classcentral.com/subject/typescript)', 'TeachyTechie (https://www.teachytechie.com/)', 'TypeScript Handbook'] },
            ]
        },
        {
            phase: 'Backend',
            color: 'var(--purple)',
            items: [
                { id: 'fs7', title: 'Node.js & Express', xp: 450, time: '3 weeks', resources: ['ClassCentral Node.js (https://www.classcentral.com/subject/nodejs)', 'TeachyTechie (https://www.teachytechie.com/)', 'Node.js Docs'] },
                { id: 'fs8', title: 'REST API Design', xp: 300, time: '2 weeks', resources: ['ClassCentral API (https://www.classcentral.com/subject/web-api)', 'TeachyTechie (https://www.teachytechie.com/)', 'REST API Tutorial'] },
                { id: 'fs9', title: 'Databases (SQL + MongoDB)', xp: 400, time: '3 weeks', resources: ['ClassCentral Databases (https://www.classcentral.com/subject/databases)', 'TeachyTechie (https://www.teachytechie.com/)', 'SQLZoo'] },
            ]
        },
        {
            phase: 'Advanced',
            color: '#F59E0B',
            items: [
                { id: 'fs10', title: 'Authentication & Security', xp: 350, time: '2 weeks', resources: ['ClassCentral Web Security (https://www.classcentral.com/subject/web-security)', 'TeachyTechie (https://www.teachytechie.com/)', 'JWT.io'] },
                { id: 'fs11', title: 'System Design Basics', xp: 600, time: '4 weeks', resources: ['ClassCentral System Design (https://www.classcentral.com/subject/system-design)', 'TeachyTechie (https://www.teachytechie.com/)', 'Gaurav Sen YouTube'] },
                { id: 'fs12', title: 'DSA for Interviews', xp: 700, time: '6 weeks', resources: ['ClassCentral DSA (https://www.classcentral.com/subject/algorithms-and-data-structures)', 'TeachyTechie (https://www.teachytechie.com/)', 'Striver A-Z Sheet'] },
            ]
        },
    ],

    aiml: [
        {
            phase: 'Math & Python Foundation',
            color: 'var(--green)',
            items: [
                { id: 'ai1', title: 'Python for Data Science', xp: 300, time: '3 weeks', resources: ['ClassCentral Python (https://www.classcentral.com/subject/python)', 'TeachyTechie (https://www.teachytechie.com/)', 'Python.org Docs'] },
                { id: 'ai2', title: 'Linear Algebra & Statistics', xp: 400, time: '3 weeks', resources: ['ClassCentral Statistics (https://www.classcentral.com/subject/statistics)', 'TeachyTechie (https://www.teachytechie.com/)', 'Khan Academy'] },
                { id: 'ai3', title: 'NumPy & Pandas', xp: 250, time: '2 weeks', resources: ['ClassCentral Pandas (https://www.classcentral.com/subject/data-analysis)', 'TeachyTechie (https://www.teachytechie.com/)', 'Kaggle Pandas'] },
            ]
        },
        {
            phase: 'Machine Learning',
            color: 'var(--purple)',
            items: [
                { id: 'ai4', title: 'Supervised Learning (Regression, Classification)', xp: 500, time: '4 weeks', resources: ['ClassCentral Machine Learning (https://www.classcentral.com/subject/machine-learning)', 'TeachyTechie (https://www.teachytechie.com/)', 'Andrew Ng ML'] },
                { id: 'ai5', title: 'Unsupervised Learning & Clustering', xp: 400, time: '3 weeks', resources: ['ClassCentral Unsupervised ML (https://www.classcentral.com/subject/machine-learning)', 'TeachyTechie (https://www.teachytechie.com/)', 'Google ML Crash Course'] },
                { id: 'ai6', title: 'Model Evaluation & Feature Engineering', xp: 350, time: '2 weeks', resources: ['ClassCentral Feature Engineering (https://www.classcentral.com/subject/machine-learning)', 'TeachyTechie (https://www.teachytechie.com/)'] },
            ]
        },
        {
            phase: 'Deep Learning',
            color: 'var(--cyan)',
            items: [
                { id: 'ai7', title: 'Neural Networks & Deep Learning', xp: 600, time: '5 weeks', resources: ['ClassCentral Deep Learning (https://www.classcentral.com/subject/deep-learning)', 'TeachyTechie (https://www.teachytechie.com/)', 'fast.ai'] },
                { id: 'ai8', title: 'NLP & Transformers', xp: 550, time: '4 weeks', resources: ['ClassCentral NLP (https://www.classcentral.com/subject/nlp)', 'TeachyTechie (https://www.teachytechie.com/)', 'HuggingFace Course'] },
                { id: 'ai9', title: 'Computer Vision (CNN)', xp: 500, time: '3 weeks', resources: ['ClassCentral Computer Vision (https://www.classcentral.com/subject/computer-vision)', 'TeachyTechie (https://www.teachytechie.com/)', 'CS231n Stanford'] },
            ]
        },
        {
            phase: 'MLOps & Applications',
            color: '#F59E0B',
            items: [
                { id: 'ai10', title: 'LangChain & LLM Apps', xp: 600, time: '3 weeks', resources: ['ClassCentral AI (https://www.classcentral.com/subject/artificial-intelligence)', 'TeachyTechie (https://www.teachytechie.com/)', 'LangChain Docs'] },
                { id: 'ai11', title: 'MLOps & Model Deployment', xp: 500, time: '3 weeks', resources: ['ClassCentral MLOps (https://www.classcentral.com/subject/mlops)', 'TeachyTechie (https://www.teachytechie.com/)', 'MLflow Docs'] },
                { id: 'ai12', title: 'Kaggle Competitions', xp: 700, time: 'Ongoing', resources: ['ClassCentral Kaggle Guides (https://www.classcentral.com/subject/data-science)', 'TeachyTechie (https://www.teachytechie.com/)', 'Kaggle.com'] },
            ]
        },
    ],

    data: [
        {
            phase: 'Data Foundation',
            color: 'var(--green)',
            items: [
                { id: 'ds1', title: 'Python & Pandas', xp: 300, time: '3 weeks', resources: ['ClassCentral Data Analysis (https://www.classcentral.com/subject/data-analysis)', 'TeachyTechie (https://www.teachytechie.com/)', 'Kaggle Pandas'] },
                { id: 'ds2', title: 'SQL Mastery', xp: 350, time: '3 weeks', resources: ['ClassCentral SQL (https://www.classcentral.com/subject/sql)', 'TeachyTechie (https://www.teachytechie.com/)', 'Mode SQL Tutorial'] },
                { id: 'ds3', title: 'Statistics & Probability', xp: 400, time: '3 weeks', resources: ['ClassCentral Statistics (https://www.classcentral.com/subject/statistics)', 'TeachyTechie (https://www.teachytechie.com/)', 'Khan Academy Stats'] },
            ]
        },
        {
            phase: 'Data Analysis',
            color: '#F59E0B',
            items: [
                { id: 'ds4', title: 'Data Visualization (Matplotlib, Seaborn, Plotly)', xp: 300, time: '2 weeks', resources: ['ClassCentral Data Viz (https://www.classcentral.com/subject/data-visualization)', 'TeachyTechie (https://www.teachytechie.com/)', 'Matplotlib Docs'] },
                { id: 'ds5', title: 'Exploratory Data Analysis (EDA)', xp: 400, time: '3 weeks', resources: ['ClassCentral Data Science (https://www.classcentral.com/subject/data-science)', 'TeachyTechie (https://www.teachytechie.com/)', 'Kaggle EDA'] },
                { id: 'ds6', title: 'Excel & Google Sheets for Data', xp: 200, time: '1 week', resources: ['ClassCentral Excel (https://www.classcentral.com/subject/excel)', 'TeachyTechie (https://www.teachytechie.com/)', 'Excel Tricks'] },
            ]
        },
        {
            phase: 'Machine Learning',
            color: 'var(--purple)',
            items: [
                { id: 'ds7', title: 'Scikit-Learn ML Pipeline', xp: 500, time: '4 weeks', resources: ['ClassCentral Machine Learning (https://www.classcentral.com/subject/machine-learning)', 'TeachyTechie (https://www.teachytechie.com/)', 'Scikit-Learn Docs'] },
                { id: 'ds8', title: 'Feature Engineering', xp: 350, time: '2 weeks', resources: ['ClassCentral Feature Eng (https://www.classcentral.com/subject/data-science)', 'TeachyTechie (https://www.teachytechie.com/)'] },
                { id: 'ds9', title: 'Time Series Analysis', xp: 400, time: '2 weeks', resources: ['ClassCentral Time Series (https://www.classcentral.com/subject/machine-learning)', 'TeachyTechie (https://www.teachytechie.com/)', 'Prophet Docs'] },
            ]
        },
        {
            phase: 'Big Data & Tools',
            color: 'var(--cyan)',
            items: [
                { id: 'ds10', title: 'Power BI / Tableau', xp: 350, time: '2 weeks', resources: ['ClassCentral Tableau (https://www.classcentral.com/subject/tableau)', 'TeachyTechie (https://www.teachytechie.com/)', 'Power BI Guides'] },
                { id: 'ds11', title: 'Apache Spark Basics', xp: 500, time: '3 weeks', resources: ['ClassCentral Big Data (https://www.classcentral.com/subject/big-data)', 'TeachyTechie (https://www.teachytechie.com/)', 'Spark Docs'] },
                { id: 'ds12', title: 'Data Engineering Fundamentals', xp: 600, time: '4 weeks', resources: ['ClassCentral Data Engineering (https://www.classcentral.com/subject/data-engineering)', 'TeachyTechie (https://www.teachytechie.com/)', 'dbt Docs'] },
            ]
        },
    ],

    devops: [
        {
            phase: 'Linux & Networking',
            color: 'var(--green)',
            items: [
                { id: 'do1', title: 'Linux Command Line', xp: 300, time: '2 weeks', resources: ['ClassCentral Linux (https://www.classcentral.com/subject/linux)', 'TeachyTechie (https://www.teachytechie.com/)', 'Linux Journey'] },
                { id: 'do2', title: 'Networking Fundamentals', xp: 350, time: '2 weeks', resources: ['ClassCentral Networking (https://www.classcentral.com/subject/computer-networking)', 'TeachyTechie (https://www.teachytechie.com/)', 'Professor Messer'] },
                { id: 'do3', title: 'Shell Scripting (Bash)', xp: 250, time: '2 weeks', resources: ['ClassCentral Bash (https://www.classcentral.com/subject/linux)', 'TeachyTechie (https://www.teachytechie.com/)', 'Bash Manual'] },
            ]
        },
        {
            phase: 'Containers & CI/CD',
            color: 'var(--cyan)',
            items: [
                { id: 'do4', title: 'Docker & Docker Compose', xp: 400, time: '3 weeks', resources: ['ClassCentral Docker (https://www.classcentral.com/subject/docker)', 'TeachyTechie (https://www.teachytechie.com/)', 'Docker Docs'] },
                { id: 'do5', title: 'Kubernetes', xp: 600, time: '5 weeks', resources: ['ClassCentral Kubernetes (https://www.classcentral.com/subject/kubernetes)', 'TeachyTechie (https://www.teachytechie.com/)', 'Kubernetes Docs'] },
                { id: 'do6', title: 'CI/CD with GitHub Actions / Jenkins', xp: 400, time: '3 weeks', resources: ['ClassCentral DevOps (https://www.classcentral.com/subject/devops)', 'TeachyTechie (https://www.teachytechie.com/)', 'GitHub Actions Docs'] },
            ]
        },
        {
            phase: 'Cloud Platforms',
            color: '#F59E0B',
            items: [
                { id: 'do7', title: 'AWS Fundamentals (EC2, S3, Lambda)', xp: 500, time: '4 weeks', resources: ['ClassCentral AWS (https://www.classcentral.com/subject/aws)', 'TeachyTechie (https://www.teachytechie.com/)', 'AWS Skill Builder'] },
                { id: 'do8', title: 'Infrastructure as Code (Terraform)', xp: 500, time: '3 weeks', resources: ['ClassCentral Cloud Computing (https://www.classcentral.com/subject/cloud-computing)', 'TeachyTechie (https://www.teachytechie.com/)', 'Terraform Docs'] },
                { id: 'do9', title: 'Monitoring (Prometheus, Grafana)', xp: 400, time: '2 weeks', resources: ['ClassCentral DevOps Monitoring (https://www.classcentral.com/subject/devops)', 'TeachyTechie (https://www.teachytechie.com/)', 'Prometheus Docs'] },
            ]
        },
        {
            phase: 'Advanced DevOps',
            color: 'var(--purple)',
            items: [
                { id: 'do10', title: 'GitOps & ArgoCD', xp: 500, time: '3 weeks', resources: ['ClassCentral Containerization (https://www.classcentral.com/subject/devops)', 'TeachyTechie (https://www.teachytechie.com/)', 'ArgoCD Docs'] },
                { id: 'do11', title: 'Security in DevOps (DevSecOps)', xp: 450, time: '2 weeks', resources: ['ClassCentral DevSecOps (https://www.classcentral.com/subject/cybersecurity)', 'TeachyTechie (https://www.teachytechie.com/)', 'OWASP'] },
                { id: 'do12', title: 'AWS/Azure Certification Prep', xp: 700, time: '4 weeks', resources: ['ClassCentral Azure/AWS Certs (https://www.classcentral.com/subject/cloud-computing)', 'TeachyTechie (https://www.teachytechie.com/)', 'ExamTopics'] },
            ]
        },
    ],

    cyber: [
        {
            phase: 'Foundations',
            color: 'var(--green)',
            items: [
                { id: 'cy1', title: 'Networking & Protocols (TCP/IP, HTTP, DNS)', xp: 400, time: '3 weeks', resources: ['ClassCentral Networking (https://www.classcentral.com/subject/computer-networking)', 'TeachyTechie (https://www.teachytechie.com/)', 'Professor Messer'] },
                { id: 'cy2', title: 'Linux for Security', xp: 350, time: '2 weeks', resources: ['ClassCentral Linux (https://www.classcentral.com/subject/linux)', 'TeachyTechie (https://www.teachytechie.com/)', 'OverTheWire Bandit'] },
                { id: 'cy3', title: 'Cryptography Basics', xp: 300, time: '2 weeks', resources: ['ClassCentral Cryptography (https://www.classcentral.com/subject/cryptography)', 'TeachyTechie (https://www.teachytechie.com/)', 'CryptoHack'] },
            ]
        },
        {
            phase: 'Ethical Hacking',
            color: '#F72585',
            items: [
                { id: 'cy4', title: 'Web Application Security (OWASP Top 10)', xp: 500, time: '4 weeks', resources: ['ClassCentral Web Security (https://www.classcentral.com/subject/web-security)', 'TeachyTechie (https://www.teachytechie.com/)', 'PortSwigger'] },
                { id: 'cy5', title: 'Network Penetration Testing', xp: 550, time: '4 weeks', resources: ['ClassCentral PenTesting (https://www.classcentral.com/subject/cybersecurity)', 'TeachyTechie (https://www.teachytechie.com/)', 'TryHackMe'] },
                { id: 'cy6', title: 'Vulnerability Assessment & Scanning', xp: 400, time: '2 weeks', resources: ['ClassCentral Cyber Defense (https://www.classcentral.com/subject/cybersecurity)', 'TeachyTechie (https://www.teachytechie.com/)', 'Nmap Docs'] },
            ]
        },
        {
            phase: 'Specialization',
            color: 'var(--cyan)',
            items: [
                { id: 'cy7', title: 'Malware Analysis & Reverse Engineering', xp: 600, time: '5 weeks', resources: ['ClassCentral Forensics (https://www.classcentral.com/subject/cybersecurity)', 'TeachyTechie (https://www.teachytechie.com/)', 'Reverse Engineering Guides'] },
                { id: 'cy8', title: 'Cloud Security', xp: 500, time: '3 weeks', resources: ['ClassCentral Cloud Security (https://www.classcentral.com/subject/cloud-computing)', 'TeachyTechie (https://www.teachytechie.com/)', 'AWS Security'] },
                { id: 'cy9', title: 'Incident Response & Forensics', xp: 500, time: '3 weeks', resources: ['ClassCentral Incident Response (https://www.classcentral.com/subject/cybersecurity)', 'TeachyTechie (https://www.teachytechie.com/)', 'BlueTeamLabs'] },
            ]
        },
        {
            phase: 'Certifications',
            color: 'var(--purple)',
            items: [
                { id: 'cy10', title: 'CompTIA Security+', xp: 600, time: '4 weeks', resources: ['ClassCentral Security+ (https://www.classcentral.com/subject/cybersecurity)', 'TeachyTechie (https://www.teachytechie.com/)', 'Professor Messer S+'] },
                { id: 'cy11', title: 'CEH or eJPT Certification', xp: 700, time: '6 weeks', resources: ['ClassCentral CEH Certs (https://www.classcentral.com/subject/cybersecurity)', 'TeachyTechie (https://www.teachytechie.com/)', 'EC-Council CEH'] },
                { id: 'cy12', title: 'Bug Bounty on HackerOne/Bugcrowd', xp: 800, time: 'Ongoing', resources: ['ClassCentral Bug Bounty Guides (https://www.classcentral.com/subject/cybersecurity)', 'TeachyTechie (https://www.teachytechie.com/)', 'HackerOne'] },
            ]
        },
    ],

    mobile: [
        {
            phase: 'Programming Foundation',
            color: 'var(--green)',
            items: [
                { id: 'mb1', title: 'JavaScript / TypeScript Basics', xp: 300, time: '3 weeks', resources: ['ClassCentral JS/TS (https://www.classcentral.com/subject/javascript)', 'TeachyTechie (https://www.teachytechie.com/)', 'javascript.info'] },
                { id: 'mb2', title: 'UI & UX Design Principles', xp: 200, time: '1 week', resources: ['ClassCentral UX Design (https://www.classcentral.com/subject/ux-design)', 'TeachyTechie (https://www.teachytechie.com/)', 'Google Material Design'] },
                { id: 'mb3', title: 'Git & Project Setup', xp: 150, time: '1 week', resources: ['ClassCentral Git (https://www.classcentral.com/subject/git)', 'TeachyTechie (https://www.teachytechie.com/)', 'Expo Docs'] },
            ]
        },
        {
            phase: 'React Native / Flutter',
            color: '#8B5CF6',
            items: [
                { id: 'mb4', title: 'React Native Core Concepts', xp: 500, time: '4 weeks', resources: ['ClassCentral React Native (https://www.classcentral.com/subject/mobile-development)', 'TeachyTechie (https://www.teachytechie.com/)', 'React Native Docs'] },
                { id: 'mb5', title: 'Navigation & State Management', xp: 400, time: '3 weeks', resources: ['ClassCentral App Dev (https://www.classcentral.com/subject/mobile-development)', 'TeachyTechie (https://www.teachytechie.com/)', 'React Navigation Docs'] },
                { id: 'mb6', title: 'Native APIs (Camera, GPS, Push Notifs)', xp: 350, time: '2 weeks', resources: ['ClassCentral Android Dev (https://www.classcentral.com/subject/android-development)', 'TeachyTechie (https://www.teachytechie.com/)', 'Expo SDK Docs'] },
            ]
        },
        {
            phase: 'Backend Integration',
            color: 'var(--cyan)',
            items: [
                { id: 'mb7', title: 'Firebase / Supabase for Mobile', xp: 400, time: '3 weeks', resources: ['ClassCentral Mobile Backends (https://www.classcentral.com/subject/mobile-development)', 'TeachyTechie (https://www.teachytechie.com/)', 'Firebase Docs'] },
                { id: 'mb8', title: 'REST & GraphQL API Calls', xp: 300, time: '2 weeks', resources: ['ClassCentral APIs (https://www.classcentral.com/subject/web-api)', 'TeachyTechie (https://www.teachytechie.com/)', 'Axios Docs'] },
                { id: 'mb9', title: 'Offline Storage & Caching', xp: 350, time: '2 weeks', resources: ['ClassCentral Database Connects (https://www.classcentral.com/subject/databases)', 'TeachyTechie (https://www.teachytechie.com/)', 'MMKV'] },
            ]
        },
        {
            phase: 'Publishing & Advanced',
            color: '#F59E0B',
            items: [
                { id: 'mb10', title: 'App Store & Play Store Deployment', xp: 400, time: '2 weeks', resources: ['ClassCentral iOS Dev (https://www.classcentral.com/subject/ios-development)', 'TeachyTechie (https://www.teachytechie.com/)', 'Apple App Store Connect'] },
                { id: 'mb11', title: 'Performance Optimization', xp: 500, time: '3 weeks', resources: ['ClassCentral Performance (https://www.classcentral.com/subject/software-engineering)', 'TeachyTechie (https://www.teachytechie.com/)', 'Flipper Debugger'] },
                { id: 'mb12', title: 'Animation (Reanimated 3)', xp: 550, time: '3 weeks', resources: ['ClassCentral UI Animation (https://www.classcentral.com/subject/mobile-development)', 'TeachyTechie (https://www.teachytechie.com/)', 'Reanimated Docs'] },
            ]
        },
    ],

    uiux: [
        {
            phase: 'Design Foundations',
            color: '#EC4899',
            items: [
                { id: 'ux1', title: 'Color Theory & Typography', xp: 300, time: '2 weeks', resources: ['Coursera Design Basics', 'TeachyTechie'] },
                { id: 'ux2', title: 'Layouts & Composition', xp: 350, time: '2 weeks', resources: ['DesignPrinciples.org', 'TeachyTechie'] },
                { id: 'ux3', title: 'User Research Fundamentals', xp: 400, time: '3 weeks', resources: ['Nielsen Norman Group', 'TeachyTechie'] },
            ]
        },
        {
            phase: 'Prototyping & Tools',
            color: '#8B5CF6',
            items: [
                { id: 'ux4', title: 'Figma Mastery', xp: 500, time: '4 weeks', resources: ['Figma Community Docs', 'TeachyTechie'] },
                { id: 'ux5', title: 'Wireframing & User Flows', xp: 400, time: '2 weeks', resources: ['Balsamiq Wireframing Academy', 'TeachyTechie'] },
                { id: 'ux6', title: 'High-Fidelity Prototyping', xp: 450, time: '3 weeks', resources: ['Figma Animations', 'TeachyTechie'] },
            ]
        },
        {
            phase: 'Portfolio & Delivery',
            color: 'var(--cyan)',
            items: [
                { id: 'ux7', title: 'UX Case Studies', xp: 600, time: '4 weeks', resources: ['Behance Top Portfolios', 'TeachyTechie'] },
                { id: 'ux8', title: 'Developer Handoff', xp: 350, time: '1 week', resources: ['Zeplin Guides', 'TeachyTechie'] },
            ]
        }
    ],

    technicalWriting: [
        {
            phase: 'Creative Foundations',
            color: '#6366F1',
            items: [
                { id: 'tw1', title: 'Elements of Story & Plot', xp: 300, time: '2 weeks', resources: ['Coursera Creative Writing', 'MasterClass'] },
                { id: 'tw2', title: 'Character Conception & Development', xp: 350, time: '2 weeks', resources: ['Brandonsanderson Lectures', 'Writer\'s Digest'] },
                { id: 'tw3', title: 'Worldbuilding & Setting', xp: 400, time: '3 weeks', resources: ['Fantasy Worldbuilding Guide', 'Literature Analysis'] },
            ]
        },
        {
            phase: 'Forms & Genres',
            color: '#F59E0B',
            items: [
                { id: 'tw4', title: 'Poetry & Verse', xp: 400, time: '2 weeks', resources: ['Poetry Foundation', 'UPenn ModPo'] },
                { id: 'tw5', title: 'Creative Non-Fiction & Memoirs', xp: 450, time: '2 weeks', resources: ['NPR Training', 'Creative Nonfiction Magazine'] },
                { id: 'tw6', title: 'Screenwriting & Playwriting', xp: 500, time: '3 weeks', resources: ['Pixar In A Box', 'Script Reader Pro'] },
            ]
        },
        {
            phase: 'The Publishing Industry',
            color: 'var(--green)',
            items: [
                { id: 'tw7', title: 'Editing, Revision & Critique', xp: 600, time: '4 weeks', resources: ['Scribophile', 'The Elements of Style'] },
                { id: 'tw8', title: 'Literary Agents & Query Letters', xp: 500, time: '3 weeks', resources: ['QueryShark', 'Jane Friedman Blog'] },
            ]
        }
    ]
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
