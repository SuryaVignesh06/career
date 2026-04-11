import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, TrendingUp, ChevronDown, Search } from 'lucide-react';

import Sidebar from '../components/Sidebar';
import ApiKeyModal, { useRequireApiKey } from '../components/ApiKeyModal';
import { analyzeInterview } from '../lib/api';
import { hasApiKey } from '../lib/apiKeyStore';
import { useAuth } from '../contexts/AuthContext';

export default function AnalyzerPage() {
    const location = useLocation();
    const { userProfile } = useAuth();
    const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [text, setText] = useState('');
    const [expanded, setExpanded] = useState<number | null>(null);
    const [analysis, setAnalysis] = useState<any>(null);
    const [error, setError] = useState('');
    const { showModal, setShowModal, triggerCheck, onKeySubmitted } = useRequireApiKey();

    const handleAnalyze = async () => {
        if (!text.trim()) return;

        if (!hasApiKey()) {
            triggerCheck();
            return;
        }

        setStep('loading');
        setError('');

        try {
            const result = await analyzeInterview({
                company: company || 'Unknown Company',
                role: role || 'SDE',
                interviewContent: text,
                userCareer: userProfile?.career || 'fullstack',
                userLevel: userProfile?.status || 'fresher',
            });

            if (result.success && result.data) {
                setAnalysis(result.data);
                setStep('result');
            } else {
                setError(result.error || 'Analysis failed. Please try again.');
                setStep('input');

                if (result.error?.toLowerCase().includes('api key')) {
                    setShowModal(true);
                }
            }
        } catch {
            setError('Could not connect to the backend. Make sure the Python server is running.');
            setStep('input');
        }
    };

    const severityColor: Record<string, string> = {
        HIGH: 'bg-cc-red text-white border-cc-border',
        MEDIUM: 'bg-cc-yellow text-cc-text border-cc-border',
        LOW: 'bg-cc-blue text-cc-text border-cc-border',
        high: 'bg-cc-red text-white border-cc-border',
        medium: 'bg-cc-yellow text-cc-text border-cc-border',
        low: 'bg-cc-blue text-cc-text border-cc-border',
    };

    return (
        <div className="bg-cc-outer min-h-[100vh] w-full flex p-4 font-dm border-box overflow-hidden">
            
            <Sidebar />

            <ApiKeyModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onKeySubmitted={onKeySubmitted}
            />

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
                                        {error && (
                                            <div className="flex items-center gap-2 text-sm font-bold text-white bg-cc-red border-2 border-cc-border rounded-xl px-4 py-3 shadow-[2px_2px_0px_#1A1A1A]">
                                                <AlertCircle size={16} /> {error}
                                            </div>
                                        )}
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
                                                placeholder={"Q1: Find the longest substring without repeating characters...\nMy answer: I used brute force with O(n³)...\n\nQ2: Design a URL shortener...\nMy answer: I said we could use SQL..."}
                                                className="w-full bg-white border-2 border-cc-border rounded-xl py-4 px-5 text-cc-text font-bold placeholder:text-cc-muted focus:outline-none focus:bg-cc-yellow/10 focus:shadow-[4px_4px_0px_#1A1A1A] transition-all resize-y min-h-[200px]"
                                            />
                                        </div>
                                        <button onClick={handleAnalyze} disabled={!text.trim()} className="btn-neo bg-cc-red text-white py-4 text-lg w-full md:w-auto md:ml-auto disabled:opacity-50 disabled:translate-y-0 disabled:shadow-[4px_4px_0px_#1A1A1A]">
                                            <Search size={20} className="mr-2" /> Analyze My Interview
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'loading' && (
                                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-6 py-32 neo-card bg-white">
                                    <div className="w-20 h-20 border-4 border-cc-border rounded-full border-t-cc-red animate-spin" />
                                    <h2 className="text-2xl font-bold text-cc-text">Analyzing Interview...</h2>
                                    <p className="text-cc-muted font-bold tracking-wide uppercase text-sm">Claude AI is validating weak areas & building recovery plan</p>
                                </motion.div>
                            )}

                            {step === 'result' && analysis && (
                                <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8">
                                    
                                    {/* Score Header */}
                                    <div className="neo-card-yellow p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-[8px_8px_0px_#1A1A1A]">
                                        <div className="relative w-32 h-32 shrink-0 bg-white border-4 border-cc-border rounded-full shadow-[4px_4px_0px_#1A1A1A] flex items-center justify-center overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full bg-cc-red z-0" style={{ height: `${100 - analysis.score}%` }}></div>
                                            <div className="absolute bottom-0 left-0 w-full bg-cc-bg z-0" style={{ height: `${analysis.score}%` }}></div>
                                            <div className="absolute inset-2 bg-white rounded-full z-10 flex items-center justify-center border-4 border-cc-border">
                                                <span className="text-4xl font-black text-cc-text">{analysis.score}</span>
                                            </div>
                                        </div>
                                        <div className="text-center md:text-left flex-1">
                                            <div className="text-xs font-bold text-cc-text/70 uppercase tracking-widest mb-2">Diagnostic Score</div>
                                            <h2 className="text-3xl font-bold text-cc-text mb-2">{company || 'Interview'} — {role || 'SDE'}</h2>
                                            <p className="text-cc-text font-bold opacity-80 max-w-lg">{analysis.keyInsight}</p>
                                        </div>
                                        <button onClick={() => { setStep('input'); setAnalysis(null); setError(''); }} className="btn-neo bg-white border-2 border-cc-border text-cc-text shadow-[4px_4px_0px_#1A1A1A] hover:bg-cc-gray">
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
                                                    {(analysis.weaknesses || []).map((w: any, i: number) => (
                                                        <div key={i} className={`border-2 border-cc-border rounded-xl p-5 cursor-pointer shadow-[2px_2px_0px_#1A1A1A] transition-all hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_#1A1A1A] ${expanded === i ? 'bg-cc-gray' : 'bg-white'}`} onClick={() => setExpanded(expanded === i ? null : i)}>
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-bold text-lg text-cc-text pr-4">{w.area}</span>
                                                                <div className="flex items-center gap-3 shrink-0">
                                                                    <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-md border-2 ${severityColor[w.severity] || severityColor.MEDIUM}`}>
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
                                                                            {w.detail && <p className="text-xs font-bold text-cc-muted mt-2 leading-relaxed">{w.detail}</p>}
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
                                                    {(analysis.strengths || []).map((s: any, i: number) => (
                                                        <div key={i} className="flex items-start gap-4 text-base font-bold text-cc-text bg-white p-4 border-2 border-cc-border rounded-xl shadow-[2px_2px_0px_#1A1A1A]">
                                                            <div className="w-6 h-6 rounded-full bg-cc-bg border-2 border-cc-border flex items-center justify-center shrink-0">
                                                                <CheckCircle size={14} className="text-cc-text" /> 
                                                            </div>
                                                            <div>
                                                                <div className="font-black">{s.area}</div>
                                                                {s.evidence && <div className="text-xs text-cc-muted mt-1">{s.evidence}</div>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recovery Plan */}
                                        <div className="neo-card bg-white p-8 relative overflow-hidden h-fit">
                                            <TrendingUp size={120} className="absolute -right-10 -top-10 text-cc-purple opacity-20" />
                                            <h3 className="font-bold text-2xl text-cc-text mb-8 flex items-center gap-3 relative z-10">
                                                <TrendingUp size={24} className="text-cc-purple" /> Recovery Plan
                                            </h3>
                                            <div className="flex flex-col gap-4 relative z-10">
                                                {(analysis.recoveryPlan || []).map((p: any) => (
                                                    <div key={p.week} className="flex gap-4 p-5 bg-white border-2 border-cc-border rounded-xl shadow-[4px_4px_0px_#1A1A1A] group hover:-translate-y-1 transition-transform">
                                                        <div className="w-12 h-12 rounded-xl border-2 border-cc-border bg-cc-purple flex items-center justify-center text-white font-black text-lg shrink-0 shadow-[2px_2px_0px_#1A1A1A] group-hover:scale-110 transition-transform">
                                                            W{p.week}
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            {(p.tasks || []).map((task: string, ti: number) => (
                                                                <p key={ti} className="text-sm font-bold text-cc-text leading-tight">• {task}</p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
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
