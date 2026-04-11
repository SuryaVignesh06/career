import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Zap, BrainCircuit, BarChart3, Cloud, Shield, Smartphone, PenTool, Layout, Laptop } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const steps = [
    {
        id: 0,
        title: "What's your current status?",
        subtitle: "Tell us where you are in your journey.",
        field: 'status',
        options: [
            { value: '1st_year', label: '1st Year B.Tech', icon: PenTool },
            { value: '2nd_year', label: '2nd Year B.Tech', icon: Layout },
            { value: '3rd_year', label: '3rd Year B.Tech', icon: Laptop },
            { value: '4th_year', label: '4th Year / Final', icon: AwardIcon },
            { value: 'fresher', label: 'Recent Graduate', icon: Zap },
        ]
    },
    {
        id: 1,
        title: "What's your target career?",
        subtitle: "Pick the path you're most excited about.",
        field: 'career',
        options: [
            { value: 'fullstack', label: 'Full Stack Dev', icon: CodeIcon },
            { value: 'aiml', label: 'AI / ML Engineer', icon: BrainCircuit },
            { value: 'data', label: 'Data Science', icon: BarChart3 },
            { value: 'devops', label: 'Cloud & DevOps', icon: Cloud },
            { value: 'cyber', label: 'Cybersecurity', icon: Shield },
            { value: 'mobile', label: 'Mobile Dev', icon: Smartphone },
        ]
    },
    {
        id: 2,
        title: "How comfortable are you with coding?",
        subtitle: "Be honest — we'll build the perfect roadmap either way.",
        field: 'level',
        options: [
            { value: 'beginner', label: 'Beginner — just started', icon: EggIcon },
            { value: 'intermediate', label: 'Intermediate — know basics', icon: WrenchIcon },
            { value: 'advanced', label: 'Advanced — built projects', icon: FlameIcon },
        ]
    },
    {
        id: 3,
        title: "Which companies are you targeting?",
        subtitle: "Select all that apply. Multiple options allowed.",
        field: 'companies',
        multi: true,
        options: [
            { value: 'google', label: 'Google / Meta / Big Tech', icon: TrophyIcon },
            { value: 'startup', label: 'Startups (Swiggy, Zepto)', icon: RocketIcon },
            { value: 'product', label: 'Product Companies', icon: BriefcaseIcon },
            { value: 'mnc', label: 'MNCs (TCS, Infosys)', icon: BuildingIcon },
            { value: 'open', label: 'Open to anything', icon: GlobeIcon },
        ]
    },
    {
        id: 4,
        title: "Any secondary interests?",
        subtitle: "Stay competent in multiple domains. (Optional)",
        field: 'secondaryDomains',
        multi: true,
        options: [
            { value: 'aiml', label: 'AI / ML Engineer', icon: BrainCircuit },
            { value: 'devops', label: 'Cloud & DevOps', icon: Cloud },
            { value: 'cyber', label: 'Cybersecurity', icon: Shield },
            { value: 'mobile', label: 'Mobile Dev', icon: Smartphone },
            { value: 'data', label: 'Data Science', icon: BarChart3 },
        ]
    },
    {
        id: 5,
        title: "What's your goal timeline?",
        subtitle: "How fast do you want to be job-ready?",
        field: 'goalTimeline',
        options: [
            { value: '3_months', label: '3 Months (Intensive)', icon: Zap },
            { value: '6_months', label: '6 Months (Standard)', icon: Laptop },
            { value: '12_months', label: '1 Year (Relaxed)', icon: GlobeIcon },
        ]
    },
];

// Helper icons mappings for UI
function AwardIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>; }
function CodeIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>; }
function EggIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c6 0 8-6 8-10S16 2 12 2 4 8 4 12s2 10 8 10Z"/></svg>; }
function WrenchIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>; }
function FlameIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>; }
function TrophyIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>; }
function RocketIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>; }
function BriefcaseIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>; }
function BuildingIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>; }
function GlobeIcon(props: any) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>; }

export default function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [generating, setGenerating] = useState(false);
    const navigate = useNavigate();
    const { updateProfile } = useAuth();

    const current = steps[step];
    const selected = answers[current.field];

    const handleSelect = (value: any) => {
        if (current.multi) {
            const prev = answers[current.field] || [];
            const updated = prev.includes(value) ? prev.filter((v: any) => v !== value) : [...prev, value];
            setAnswers(prev => ({ ...prev, [current.field]: updated }));
        } else {
            setAnswers(prev => ({ ...prev, [current.field]: value }));
        }
    };

    const isSelected = (value: any) => {
        if (current.multi) return (selected || []).includes(value);
        return selected === value;
    };

    const canContinue = current.multi ? (selected || []).length > 0 : !!selected;

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(s => s + 1);
        } else {
            handleFinish();
        }
    };

    const handleFinish = async () => {
        setGenerating(true);
        // Save onboarding answers to the user's profile
        updateProfile({
            career: answers.career || 'fullstack',
            secondaryDomains: answers.secondaryDomains || [],
            goalTimeline: answers.goalTimeline || '6_months',
            status: answers.status || null,
            level:  1,
            companies: answers.companies || [],
            onboardingDone: true,
        });
        // Simulate AI generating roadmap
        await new Promise(r => setTimeout(r, 2500));
        navigate('/dashboard');
    };

    const progress = ((step) / steps.length) * 100;

    if (generating) {
        return (
            <div className="bg-cc-bg min-h-screen flex flex-col items-center justify-center gap-8 px-4 font-dm border-[16px] border-cc-outer">
                <motion.div
                    className="flex flex-col items-center gap-8 text-center max-w-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="w-24 h-24 rounded-full border-[3px] border-cc-border bg-cc-yellow flex items-center justify-center shadow-[4px_4px_0px_#1A1A1A] animate-pulse">
                        <BrainCircuit size={40} className="text-cc-text" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-cc-text mb-4">Building Your Path.</h2>
                        <p className="text-cc-text/80 font-bold leading-relaxed mb-8">Our AI is computing the exact sequence of skills required for your dream role...</p>
                        <div className="w-full h-4 bg-white border-2 border-cc-border rounded-full overflow-hidden shadow-[2px_2px_0px_#1A1A1A]">
                            <motion.div
                                className="h-full bg-cc-red border-r-2 border-cc-border"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2.5 }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-cc-bg min-h-screen flex items-center justify-center px-4 font-dm py-12 border-[16px] border-cc-outer">

            <div className="w-full max-w-2xl bg-white neo-card shadow-[8px_8px_0px_#1A1A1A] p-6 sm:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-white">
                    <motion.div
                        className="h-full bg-cc-red"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                    />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-12 mt-2">
                    <span className="font-bold text-2xl tracking-tighter text-cc-text">CareerCraft<span className="text-cc-red">.</span></span>
                    <span className="text-xs font-black uppercase tracking-widest text-cc-text/50 bg-cc-gray px-3 py-1.5 rounded-md border-2 border-cc-border">
                        Step {step + 1} / {steps.length}
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full"
                    >
                        <h2 className="text-3xl sm:text-4xl font-black text-cc-text mb-3 leading-tight">{current.title}</h2>
                        <p className="text-cc-muted font-bold tracking-wide uppercase text-xs mb-10">{current.subtitle}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                            {current.options.map((opt) => {
                                const Icon = opt.icon;
                                const isSel = isSelected(opt.value);
                                return (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleSelect(opt.value)}
                                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 text-left group ${isSel
                                            ? 'border-cc-border bg-cc-yellow shadow-[4px_4px_0px_#1A1A1A] -translate-y-1'
                                            : 'border-cc-border/20 bg-white hover:border-cc-border hover:bg-cc-gray hover:shadow-[4px_4px_0px_transparent]'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0 ${isSel ? 'border-cc-border bg-white text-cc-text' : 'border-cc-border bg-cc-bg text-cc-text'}`}>
                                            <Icon size={20} strokeWidth={isSel ? 2.5 : 2} />
                                        </div>
                                        <span className={`font-bold text-base ${isSel ? 'text-cc-text' : 'text-cc-text/80'}`}>
                                            {opt.label}
                                        </span>
                                        {isSel && (
                                            <CheckCircle size={20} className="text-cc-text ml-auto shrink-0" strokeWidth={3} />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-cc-border/10">
                            <button
                                onClick={() => setStep(s => s - 1)}
                                disabled={step === 0}
                                className="flex items-center gap-2 text-sm font-bold border-2 border-transparent px-4 py-3 rounded-xl text-cc-muted hover:text-cc-text hover:bg-cc-gray transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                            >
                                <ArrowLeft size={16} /> Back
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!canContinue}
                                className="btn-neo bg-cc-red text-white py-3 px-6 shadow-[4px_4px_0px_#1A1A1A] disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
                            >
                                {step === steps.length - 1 ? 'Build Roadmap' : 'Continue'}
                                {step < steps.length - 1 && <ArrowRight size={18} className="ml-2" />}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
