import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Map, Bot, FileText, AlertCircle, CheckCircle, TrendingUp, ChevronDown, Award, Briefcase, Code, Target, Search, PenSquare } from 'lucide-react';

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

const mockAnalysis = {
    score: 62,
    company: 'Swiggy',
    role: 'SDE 1',
    weaknesses: [
        { area: 'Dynamic Programming', severity: 'high', tip: 'You failed 3 out of 4 DP questions. Focus on LCS, Knapsack, and Coin Change patterns for 2 weeks.' },
        { area: 'System Design Communication', severity: 'high', tip: 'Interviewers noted you jumped to implementation without discussing trade-offs. Practice the SWIM framework (Scope, Width, Internals, Monitor).' },
        { area: 'Time Complexity Analysis', severity: 'medium', tip: 'You gave correct solutions but couldn\'t explain Big-O clearly. Practice analyzing each DS operation.' },
    ],
    strengths: [
        'Strong on Arrays and Strings',
        'Solid JavaScript fundamentals',
        'Good behavioral answers',
    ],
    plan: [
        { week: 1, task: 'Complete 20 DP problems (easy → medium) on LeetCode' },
        { week: 2, task: 'Practice System Design: design URL shortener, ride-sharing app' },
        { week: 3, task: 'Mock interview on Pramp or Interviewing.io' },
        { week: 4, task: 'Final revision + apply again to Swiggy/Zepto' },
    ]
};

export default function AnalyzerPage() {
    const location = useLocation();
    const [step, setStep] = useState('input'); // input | loading | result
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [text, setText] = useState('');
    const [expanded, setExpanded] = useState(null);

    const analyze = async () => {
        if (!text.trim()) return;
        setStep('loading');
        await new Promise(r => setTimeout(r, 2500));
        setStep('result');
    };

    const severityColor = { 
        high: 'bg-cc-red text-white border-cc-border', 
        medium: 'bg-cc-yellow text-cc-text border-cc-border', 
        low: 'bg-cc-blue text-cc-text border-cc-border' 
    };

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

            {/* Main Area */}
            <main className="dashboard-main xl:ml-[280px]">
                <div className="p-8 lg:p-12 pb-24 overflow-y-auto h-full max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="mb-10 text-center lg:text-left flex flex-col gap-2">
                            <h1 className="text-4xl font-bold text-cc-text leading-tight">Interview Failure Analyzer.</h1>
                            <p className="text-cc-muted font-bold text-sm tracking-wide uppercase">Paste questions → Get AI breakdown + Recovery plan.</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 'input' && (
                                <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div className="neo-card p-8 md:p-12 bg-white flex flex-col gap-8 shadow-[8px_8px_0px_#1A1A1A]">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="text-xs font-bold text-cc-text uppercase tracking-widest mb-3 block">Company Name</label>
                                                <input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Swiggy, Google" className="w-full bg-white border-2 border-cc-border rounded-xl py-4 px-5 text-cc-text font-bold placeholder:text-cc-muted focus:outline-none focus:bg-cc-yellow/10 focus:shadow-[4px_4px_0px_#1A1A1A] transition-all" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-cc-text uppercase tracking-widest mb-3 block">Role Applied</label>
                                                <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. SDE 1, Frontend Dev" className="w-full bg-white border-2 border-cc-border rounded-xl py-4 px-5 text-cc-text font-bold placeholder:text-cc-muted focus:outline-none focus:bg-cc-yellow/10 focus:shadow-[4px_4px_0px_#1A1A1A] transition-all" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-cc-text uppercase tracking-widest mb-3 block">Paste Interview Experience & Answers</label>
                                            <textarea
                                                value={text}
                                                onChange={e => setText(e.target.value)}
                                                rows={8}
                                                placeholder="Q1: Find the longest substring without repeating characters...&#10;My answer: I used brute force with O(n³)...&#10;&#10;Q2: Design a URL shortener...&#10;My answer: I said we could use SQL..."
                                                className="w-full bg-white border-2 border-cc-border rounded-xl py-4 px-5 text-cc-text font-bold placeholder:text-cc-muted focus:outline-none focus:bg-cc-yellow/10 focus:shadow-[4px_4px_0px_#1A1A1A] transition-all resize-y min-h-[200px]"
                                            />
                                        </div>
                                        <button onClick={analyze} disabled={!text.trim()} className="btn-neo bg-cc-red text-white py-4 text-lg w-full md:w-auto md:ml-auto disabled:opacity-50 disabled:translate-y-0 disabled:shadow-[4px_4px_0px_#1A1A1A]">
                                            <Search size={20} className="mr-2" /> Analyze My Interview
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'loading' && (
                                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-6 py-32 neo-card bg-white">
                                    <div className="w-20 h-20 border-4 border-cc-border rounded-full border-t-cc-red animate-spin" />
                                    <h2 className="text-2xl font-bold text-cc-text">Analyzing Interview...</h2>
                                    <p className="text-cc-muted font-bold tracking-wide uppercase text-sm">Validating weak areas & building recovery plan</p>
                                </motion.div>
                            )}

                            {step === 'result' && (
                                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                                    
                                    {/* Score Header */}
                                    <div className="neo-card-yellow p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-[8px_8px_0px_#1A1A1A]">
                                        <div className="relative w-32 h-32 shrink-0 bg-white border-4 border-cc-border rounded-full shadow-[4px_4px_0px_#1A1A1A] flex items-center justify-center overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full bg-cc-red z-0" style={{ height: `${100 - mockAnalysis.score}%` }}></div>
                                            <div className="absolute bottom-0 left-0 w-full bg-cc-bg z-0" style={{ height: `${mockAnalysis.score}%` }}></div>
                                            <div className="absolute inset-2 bg-white rounded-full z-10 flex items-center justify-center border-4 border-cc-border">
                                                <span className="text-4xl font-black text-cc-text">{mockAnalysis.score}</span>
                                            </div>
                                        </div>
                                        <div className="text-center md:text-left flex-1">
                                            <div className="text-xs font-bold text-cc-text/70 uppercase tracking-widest mb-2">Diagnostic Score</div>
                                            <h2 className="text-3xl font-bold text-cc-text mb-2">{mockAnalysis.company} — {mockAnalysis.role}</h2>
                                            <p className="text-cc-text font-bold opacity-80 max-w-lg">You were close! Based on your answers, 3 key conceptual areas held you back. Here's exactly how to recover.</p>
                                        </div>
                                        <button onClick={() => setStep('input')} className="btn-neo bg-white border-2 border-cc-border text-cc-text shadow-[4px_4px_0px_#1A1A1A] hover:bg-cc-gray">
                                            Analyze Another
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        
                                        <div className="flex flex-col gap-8">
                                            {/* Weaknesses */}
                                            <div className="neo-card bg-white p-8">
                                                <h3 className="font-bold text-2xl text-cc-text mb-6 flex items-center gap-3">
                                                    <AlertCircle size={24} className="text-cc-red" /> Areas to Fix
                                                </h3>
                                                <div className="flex flex-col gap-4">
                                                    {mockAnalysis.weaknesses.map((w, i) => (
                                                        <div key={i} className={`border-2 border-cc-border rounded-xl p-5 cursor-pointer shadow-[2px_2px_0px_#1A1A1A] transition-all hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#1A1A1A] ${expanded === i ? 'bg-cc-gray' : 'bg-white'}`} onClick={() => setExpanded(expanded === i ? null : i)}>
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-bold text-lg text-cc-text pr-4">{w.area}</span>
                                                                <div className="flex items-center gap-3 shrink-0">
                                                                    <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-md border-2 ${severityColor[w.severity]}`}>
                                                                        {w.severity} PRIORITY
                                                                    </span>
                                                                    <ChevronDown size={20} className={`transition-transform text-cc-text ${expanded === i ? 'rotate-180' : ''}`} />
                                                                </div>
                                                            </div>
                                                            <AnimatePresence>
                                                                {expanded === i && (
                                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                                                        <div className="pt-4 mt-4 border-t-2 border-cc-border/10">
                                                                            <p className="text-sm font-bold text-cc-text leading-relaxed">{w.tip}</p>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Strengths */}
                                            <div className="neo-card bg-cc-blue p-8">
                                                <h3 className="font-bold text-2xl text-cc-text mb-6 flex items-center gap-3">
                                                    <CheckCircle size={24} className="text-cc-text" /> What You Did Well
                                                </h3>
                                                <div className="flex flex-col gap-3">
                                                    {mockAnalysis.strengths.map((s, i) => (
                                                        <div key={i} className="flex items-center gap-4 text-base font-bold text-cc-text bg-white p-4 border-2 border-cc-border rounded-xl shadow-[2px_2px_0px_#1A1A1A]">
                                                            <div className="w-6 h-6 rounded-full bg-cc-bg border-2 border-cc-border flex items-center justify-center shrink-0">
                                                                <CheckCircle size={14} className="text-cc-text" /> 
                                                            </div>
                                                            {s}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* 4-Week Plan */}
                                        <div className="neo-card bg-white p-8 relative overflow-hidden h-fit">
                                            <TrendingUp size={120} className="absolute -right-10 -top-10 text-cc-purple opacity-20" />
                                            <h3 className="font-bold text-2xl text-cc-text mb-8 flex items-center gap-3 relative z-10">
                                                <TrendingUp size={24} className="text-cc-purple" /> 4-Week Recovery Plan
                                            </h3>
                                            <div className="flex flex-col gap-4 relative z-10">
                                                {mockAnalysis.plan.map((p) => (
                                                    <div key={p.week} className="flex gap-4 p-5 bg-white border-2 border-cc-border rounded-xl shadow-[4px_4px_0px_#1A1A1A] group hover:-translate-y-1 transition-transform">
                                                        <div className="w-12 h-12 rounded-xl border-2 border-cc-border bg-cc-purple flex items-center justify-center text-white font-black text-lg shrink-0 shadow-[2px_2px_0px_#1A1A1A] group-hover:scale-110 transition-transform">
                                                            W{p.week}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="text-base font-bold text-cc-text leading-tight">{p.task}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="btn-neo bg-cc-purple text-white w-full mt-8 shadow-[4px_4px_0px_#1A1A1A]">
                                                Add to Roadmap Tracker
                                            </button>
                                        </div>

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
