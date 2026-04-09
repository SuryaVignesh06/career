import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Map, Bot, FileText, Download, Wand2, CheckCircle, Plus, Trash2, Award, Briefcase, Code, Target, PenSquare, FileDown } from 'lucide-react';

const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Bot, label: 'AI Mentor', path: '/mentor' },
    { icon: Award, label: 'Certifications', path: '/certifications' },
    { icon: Briefcase, label: 'Internships', path: '/internships' },
    { icon: Code, label: 'Visualizer', path: '/visualizer' },
    { icon: Target, label: 'Analyzer', path: '/analyzer' },
    { icon: PenSquare, label: 'Resume', path: '/resume' },
];

const atsScore = 84;
const atsTips = [
    { tip: 'Add measurable metrics to "Built a web app"', done: false },
    { tip: 'Include keywords: React, REST API, Database', done: false },
    { tip: 'Phone number missing from contact section', done: false },
    { tip: 'Skills section is well-structured', done: true },
    { tip: 'Education section includes valid CGPA', done: true },
];

export default function ResumePage() {
    const location = useLocation();
    const [form, setForm] = useState({
        name: 'Chaitu Reddy',
        email: 'chaitu@gmail.com',
        phone: '+91 9876543210',
        linkedin: 'linkedin.com/in/chaitu',
        github: 'github.com/chaitu',
        summary: 'Final year B.Tech CSE student passionate about Full Stack development. Built 3 production-ready apps with React and Node.js. Seeking SDE roles at product companies.',
        skills: 'React, JavaScript, Node.js, Express, MongoDB, SQL, Git, REST APIs, CSS, TailwindCSS',
        projects: [
            { name: 'CareerCraft Clone', desc: 'Full-stack career platform using React, Firebase and Tailwind. 200+ users.', link: 'github.com/chaitu/careercraft' },
            { name: 'FoodCart App', desc: 'E-commerce food ordering app with cart, auth, and Stripe payments.', link: 'github.com/chaitu/foodcart' },
        ],
        education: 'B.Tech Computer Science | XYZ University | 2022-2026 | CGPA: 8.4',
    });

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    return (
        <div className="bg-cc-outer min-h-[100vh] w-full flex p-4 font-dm border-box overflow-hidden">
            
            {/* Sidebar */}
            <aside className="w-64 hidden xl:flex flex-col gap-6 py-6 px-4 fixed h-[calc(100vh-2rem)] shrink-0 z-30">
                <Link to="/dashboard" className="flex items-center gap-2 px-3 mb-4">
                    <span className="font-bold text-2xl text-white tracking-tight">CareerCraft<span className="text-cc-red">.</span></span>
                </Link>

                <nav className="flex flex-col gap-2">
                    {navItems.map(({ icon: Icon, label, path }) => {
                        const isActive = location.pathname.includes(path);
                        return (
                            <Link key={path} to={path} className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${isActive ? 'bg-cc-yellow border-cc-border text-cc-text shadow-[2px_2px_0px_#1A1A1A]' : 'border-transparent text-gray-400 hover:text-white'}`}>
                                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} /> {label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="dashboard-main xl:ml-[280px]">
                <div className="p-8 lg:p-12 pb-24 overflow-y-auto h-full max-w-6xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b-2 border-cc-border/10 pb-8">
                            <div>
                                <h1 className="text-4xl font-bold text-cc-text mb-2">ATS Resume Builder.</h1>
                                <p className="text-cc-muted font-bold text-sm tracking-wide uppercase">Build a verified resume that gets past company filters.</p>
                            </div>
                            <button className="btn-neo bg-cc-bg text-cc-text py-3 px-6 shrink-0 shadow-[4px_4px_0px_#1A1A1A]">
                                <FileDown size={18} className="mr-2" /> Export PDF Map
                            </button>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                            
                            {/* Editor Form */}
                            <div className="xl:col-span-2 flex flex-col gap-6">
                                
                                {/* Basic Info */}
                                <div className="neo-card bg-white p-8">
                                    <h3 className="font-bold text-xl text-cc-text mb-6">Personal Info</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {[['name', 'Full Name'], ['email', 'Email Address'], ['phone', 'Phone Number'], ['linkedin', 'LinkedIn Profile'], ['github', 'GitHub URL']].map(([key, label]) => (
                                            <div key={key} className={key === 'name' ? 'sm:col-span-2' : ''}>
                                                <label className="text-xs font-bold text-cc-text uppercase tracking-widest mb-2 block">{label}</label>
                                                <input value={form[key]} onChange={e => set(key, e.target.value)} className="w-full bg-white border-2 border-cc-border rounded-xl py-3 px-4 text-cc-text font-bold placeholder:text-cc-muted focus:outline-none focus:bg-cc-yellow/10 transition-colors shadow-[2px_2px_0px_transparent] focus:shadow-[2px_2px_0px_#1A1A1A]" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Summary */}
                                <div className="neo-card bg-white p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-xl text-cc-text">Professional Summary</h3>
                                        <button className="flex items-center gap-2 text-xs font-bold text-cc-bg uppercase tracking-wide bg-cc-text px-3 py-1.5 rounded-lg hover:bg-cc-red transition-colors shadow-[2px_2px_0px_#1A1A1A]">
                                            <Wand2 size={14} /> AI Improve
                                        </button>
                                    </div>
                                    <textarea value={form.summary} onChange={e => set('summary', e.target.value)} rows={3} className="w-full bg-white border-2 border-cc-border rounded-xl py-4 px-4 text-cc-text font-bold focus:outline-none focus:bg-cc-yellow/10 transition-colors resize-none shadow-[2px_2px_0px_transparent] focus:shadow-[2px_2px_0px_#1A1A1A]" />
                                </div>

                                {/* Skills */}
                                <div className="neo-card bg-white p-8">
                                    <h3 className="font-bold text-xl text-cc-text mb-4">Technical Skills</h3>
                                    <textarea value={form.skills} onChange={e => set('skills', e.target.value)} rows={2} placeholder="Comma-separated skills..." className="w-full bg-white border-2 border-cc-border rounded-xl py-4 px-4 text-cc-text font-bold focus:outline-none focus:bg-cc-yellow/10 transition-colors resize-none shadow-[2px_2px_0px_transparent] focus:shadow-[2px_2px_0px_#1A1A1A]" />
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {form.skills.split(',').map(s => s.trim()).filter(Boolean).map((s, i) => (
                                            <span key={i} className="text-xs px-3 py-1.5 rounded-md font-bold uppercase tracking-wider border-2 border-cc-border bg-cc-yellow shadow-[2px_2px_0px_#1A1A1A]">{s}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Projects */}
                                <div className="neo-card bg-white p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-xl text-cc-text">Key Projects</h3>
                                        <button onClick={() => set('projects', [...form.projects, { name: '', desc: '', link: '' }])} className="flex items-center gap-2 text-xs font-bold text-cc-text uppercase tracking-wide px-3 py-1.5 rounded-lg hover:bg-cc-yellow border-2 border-cc-border transition-colors shadow-[2px_2px_0px_#1A1A1A]">
                                            <Plus size={14} /> Add Project
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        {form.projects.map((p, i) => (
                                            <div key={i} className="flex flex-col gap-3 p-5 bg-cc-gray rounded-xl border-2 border-cc-border shadow-neo">
                                                <div className="flex items-center gap-3">
                                                    <input value={p.name} onChange={e => { const ps = [...form.projects]; ps[i].name = e.target.value; set('projects', ps); }} placeholder="Project Name" className="flex-1 bg-white border-2 border-cc-border rounded-lg py-2.5 px-3 text-cc-text font-bold text-sm focus:outline-none" />
                                                    <button onClick={() => set('projects', form.projects.filter((_, j) => j !== i))} className="w-10 h-10 flex items-center justify-center bg-cc-red text-white rounded-lg border-2 border-cc-border hover:-translate-y-0.5 shadow-[2px_2px_0px_#1A1A1A] transition-transform">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <textarea value={p.desc} onChange={e => { const ps = [...form.projects]; ps[i].desc = e.target.value; set('projects', ps); }} rows={2} placeholder="Description with impact metrics..." className="bg-white border-2 border-cc-border rounded-lg py-2.5 px-3 text-cc-text font-bold text-sm focus:outline-none resize-none" />
                                                <input value={p.link} onChange={e => { const ps = [...form.projects]; ps[i].link = e.target.value; set('projects', ps); }} placeholder="GitHub / Live Demo Link" className="bg-white border-2 border-cc-border rounded-lg py-2.5 px-3 text-cc-muted font-bold text-sm focus:outline-none" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Education */}
                                <div className="neo-card bg-white p-8">
                                    <h3 className="font-bold text-xl text-cc-text mb-4">Education</h3>
                                    <input value={form.education} onChange={e => set('education', e.target.value)} className="w-full bg-white border-2 border-cc-border rounded-xl py-3 px-4 text-cc-text font-bold focus:outline-none focus:bg-cc-yellow/10 transition-colors shadow-[2px_2px_0px_transparent] focus:shadow-[2px_2px_0px_#1A1A1A]" />
                                </div>
                            </div>

                            {/* Verification Sidebar */}
                            <div className="flex flex-col gap-6">
                                <div className="neo-card-blue p-8 sticky top-8 shadow-[8px_8px_0px_#1A1A1A]">
                                    <h3 className="font-bold text-2xl text-cc-text mb-8">ATS Analysis</h3>
                                    
                                    <div className="flex flex-col items-center gap-4 mb-8">
                                        <div className="relative w-36 h-36">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                <circle cx="18" cy="18" r="15.9" fill="white" stroke="#1A1A1A" strokeWidth="2" />
                                                <motion.circle cx="18" cy="18" r="15.9" fill="none" stroke="#10B981" strokeWidth="4"
                                                    strokeDasharray={`${atsScore} ${100 - atsScore}`} strokeLinecap="square"
                                                    initial={{ strokeDasharray: '0 100' }}
                                                    animate={{ strokeDasharray: `${atsScore} ${100 - atsScore}` }}
                                                    transition={{ duration: 1.5, delay: 0.3 }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-4xl font-black text-cc-text">{atsScore}</span>
                                                <span className="text-xs font-bold text-cc-text uppercase tracking-widest mt-1">Score</span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="bg-cc-bg border-2 border-cc-border px-4 py-1.5 rounded-md font-black text-green-600 shadow-[2px_2px_0px_#1A1A1A] inline-block mb-2">GOOD RATING</div>
                                            <div className="text-xs font-bold text-cc-text/80 leading-tight">Fix 3 issues to heavily increase <br/> screening pass rate.</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <p className="text-xs text-cc-text/70 uppercase tracking-widest font-black mb-2">Actionable Checks</p>
                                        {atsTips.map((t, i) => (
                                            <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-colors ${t.done ? 'border-transparent bg-cc-bg/50 opacity-60' : 'border-cc-border bg-white shadow-[2px_2px_0px_#1A1A1A]'}`}>
                                                <CheckCircle size={18} className={`mt-0.5 shrink-0 ${t.done ? 'text-green-600' : 'text-cc-muted'}`} strokeWidth={3} />
                                                <span className={`text-sm font-bold ${t.done ? 'line-through text-cc-text' : 'text-cc-text'}`}>{t.tip}</span>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <button className="btn-neo bg-cc-bg text-cc-text w-full mt-6 shadow-[2px_2px_0px_#1A1A1A]">
                                        Run Full ATS Scan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
