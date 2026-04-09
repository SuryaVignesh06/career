import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Map, Bot, FileText, CheckCircle, Lock, ChevronRight, Clock, BookOpen, ExternalLink, PenSquare, Trophy, Briefcase, Code, Award, Target, Zap, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { roadmapData, careerMeta, getProgress } from '../data/roadmaps';

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

function getNodeStatus(nodeId, completedIds, allIds) {
    if (completedIds.includes(nodeId)) return 'done';
    const idx = allIds.indexOf(nodeId);
    if (idx === 0 || completedIds.includes(allIds[idx - 1])) return 'active';
    return 'locked';
}

// Pastel alternate colors for phases
const phaseColors = ['neo-card-yellow', 'neo-card-purple', 'neo-card-blue'];

export default function RoadmapPage() {
    const location = useLocation();
    const [expanded, setExpanded] = useState(null);
    const { userProfile, updateProfile } = useAuth();

    const career = userProfile?.career || 'fullstack';
    const completedIds = userProfile?.completedNodes || [];
    const xp = userProfile?.xp || 0;
    const activity = userProfile?.activityLog || [];

    const meta = careerMeta[career] || careerMeta.fullstack;
    const phases = roadmapData[career] || roadmapData.fullstack;
    const allNodes = phases.flatMap(p => p.items);
    const allIds = allNodes.map(n => n.id);
    const progress = getProgress(career, completedIds);
    const totalXPAvailable = allNodes.reduce((sum, n) => sum + n.xp, 0);

    const markComplete = (node) => {
        if (completedIds.includes(node.id)) return;
        const gainedXp = node.xp;
        updateProfile({
            completedNodes: [...completedIds, node.id],
            xp: xp + gainedXp,
            activityLog: [
                { action: `Completed "${node.title}"`, xp: `+${gainedXp} XP`, timestamp: new Date().toISOString() },
                ...activity.slice(0, 9),
            ],
        });
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

            {/* Main Content Area */}
            <main className="dashboard-main xl:ml-[280px]">
                <div className="p-8 lg:p-12 pb-24 overflow-y-auto h-full relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        
                        {/* Header */}
                        <div className="flex flex-col mb-10 border-b-2 border-cc-border/10 pb-8">
                            <h1 className="text-4xl font-bold text-cc-text mb-2">
                                {meta.label} Roadmap.
                            </h1>
                            <p className="text-cc-muted font-bold text-sm tracking-wide">
                                EST. SALARY: {meta.salary} · {allNodes.length} MODULES · {totalXPAvailable.toLocaleString()} XP TOTAL
                            </p>
                        </div>

                        {/* Progress Header */}
                        <div className="neo-card-red mb-12 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
                            <div className="flex items-center gap-8 z-10 w-full md:w-auto">
                                <div className="flex flex-col items-center">
                                    <div className="text-4xl font-bold">{completedIds.length}</div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white/80 mt-1">Completed</div>
                                </div>
                                <div className="h-12 w-0.5 bg-white/20 hidden md:block"></div>
                                <div className="flex flex-col items-center">
                                    <div className="text-4xl font-bold">{xp.toLocaleString()}</div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white/80 mt-1">XP Earned</div>
                                </div>
                                <div className="h-12 w-0.5 bg-white/20 hidden md:block"></div>
                                <div className="flex flex-col items-center">
                                    <div className="text-4xl font-bold">{allNodes.length - completedIds.length}</div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-white/80 mt-1">Remaining</div>
                                </div>
                            </div>

                            <div className="flex-1 w-full z-10 max-w-sm ml-auto">
                                <div className="flex justify-between text-xs font-bold text-white mb-2">
                                    <span>Overall Progress</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full h-3 bg-white/20 rounded-full border-2 border-cc-border overflow-hidden">
                                    <div className="h-full bg-white rounded-full border-r-2 border-cc-border" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                            
                            {/* Decorative Background Elements */}
                            <Trophy size={150} className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-10" />
                        </div>

                        {/* Phases Timeline */}
                        <div className="flex flex-col gap-12 max-w-3xl">
                            {phases.map((phase, phaseIdx) => {
                                const phaseCompleted = phase.items.filter(n => completedIds.includes(n.id)).length;
                                const isPhaseComplete = phaseCompleted === phase.items.length;
                                const bgStyle = phaseColors[phaseIdx % phaseColors.length];

                                return (
                                    <div key={phase.phase} className="relative">
                                        
                                        {/* Connector Line */}
                                        {phaseIdx !== phases.length - 1 && (
                                            <div className="absolute left-[38px] top-16 bottom-[-48px] w-1.5 bg-cc-border z-0"></div>
                                        )}

                                        {/* Phase header */}
                                        <div className="flex items-center gap-4 mb-6 relative z-10">
                                            <div className={`w-[78px] h-[78px] rounded-full border-4 border-cc-bg flex items-center justify-center shrink-0 ${isPhaseComplete ? 'bg-cc-red text-white' : 'bg-white shadow-[0_0_0_2px_#1A1A1A]'}`}>
                                                {isPhaseComplete ? <CheckCircle size={32} /> : <div className="text-xl font-bold">P{phaseIdx + 1}</div>}
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold bg-white px-2 leading-none">{phase.phase}</h2>
                                                <span className="text-xs font-bold text-cc-muted bg-white px-2 mt-1 block">
                                                    {phaseCompleted}/{phase.items.length} MODULES COMPLETED
                                                </span>
                                            </div>
                                        </div>

                                        {/* Nodes */}
                                        <div className="flex flex-col gap-4 ml-16 relative z-10 pl-6">
                                            {phase.items.map((node) => {
                                                const status = getNodeStatus(node.id, completedIds, allIds);
                                                const isExp = expanded === node.id;
                                                return (
                                                    <motion.div key={node.id}
                                                        className={`border-2 border-cc-border rounded-xl transition-all overflow-hidden ${status === 'active' ? `${bgStyle} shadow-[4px_4px_0px_#1A1A1A]` : status === 'done' ? 'bg-cc-gray' : 'bg-transparent border-cc-border/20 opacity-60'}`}
                                                    >
                                                        {/* Node header */}
                                                        <div
                                                            className={`flex items-center gap-4 p-5 cursor-pointer select-none ${status === 'locked' ? 'cursor-not-allowed' : ''}`}
                                                            onClick={() => status !== 'locked' && setExpanded(isExp ? null : node.id)}
                                                        >
                                                            <div className={`w-12 h-12 rounded-xl border-2 shrink-0 flex items-center justify-center font-bold ${status === 'done' ? 'border-cc-border bg-cc-bg text-cc-text' : status === 'active' ? 'border-cc-border bg-cc-text text-white' : 'border-cc-border/20 bg-transparent text-cc-muted'}`}>
                                                                {status === 'done' ? '✓' : status === 'active' ? <BookOpen size={20} /> : <Lock size={20} />}
                                                            </div>

                                                            <div className="flex-1 min-w-0 pr-4">
                                                                <div className="font-bold text-lg text-cc-text leading-tight mb-1 truncate">{node.title}</div>
                                                                <div className="flex items-center gap-3 text-xs text-cc-text/70 font-bold uppercase tracking-wide">
                                                                    <span className="flex items-center gap-1"><Clock size={12} /> {node.time} M</span>
                                                                    <span className="flex items-center gap-1"><Zap size={12} fill="currentColor" className="text-amber-500" /> +{node.xp} XP</span>
                                                                </div>
                                                            </div>

                                                            {status === 'active' && (
                                                                <button
                                                                    onClick={(e) => { e.stopPropagation(); markComplete(node); }}
                                                                    className="hidden md:flex items-center justify-center px-4 py-2 text-xs font-bold text-white bg-cc-text hover:bg-cc-red rounded-lg transition-colors border-2 border-cc-border shadow-[2px_2px_0px_#1A1A1A]"
                                                                >
                                                                    Complete
                                                                </button>
                                                            )}
                                                            {status !== 'locked' && (
                                                                <ChevronRight size={20} className={`text-cc-text transition-transform ${isExp ? 'rotate-90' : ''}`} />
                                                            )}
                                                        </div>

                                                        {/* Expanded resources container */}
                                                        <AnimatePresence>
                                                            {isExp && node.resources && (
                                                                <motion.div
                                                                    initial={{ height: 0 }}
                                                                    animate={{ height: 'auto' }}
                                                                    exit={{ height: 0 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="p-5 border-t-2 border-cc-border/10 bg-white">
                                                                        <p className="text-xs font-bold uppercase tracking-widest text-cc-muted mb-4">Curated Resources</p>
                                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                                                            {node.resources.map((r, i) => {
                                                                                const urlMatch = r.match(/\(?(https?:\/\/[^\s)]+)\)?/);
                                                                                const url = urlMatch ? urlMatch[1] : null;
                                                                                const label = r.replace(/\s*\(https?:\/\/[^\s)]+\)/, '').trim();
                                                                                return url ? (
                                                                                    <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                                                                                        className="flex items-center gap-3 p-3 rounded-lg border-2 border-cc-border bg-cc-bg hover:bg-cc-yellow transition-colors group text-sm font-bold shadow-[2px_2px_0px_#1A1A1A]">
                                                                                        <ExternalLink size={16} className="text-cc-red shrink-0" />
                                                                                        <span className="flex-1 truncate">{label}</span>
                                                                                    </a>
                                                                                ) : (
                                                                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border-2 border-cc-border/20 bg-cc-gray text-sm font-bold text-cc-muted">
                                                                                        <BookOpen size={16} className="shrink-0" />
                                                                                        <span className="truncate">{r}</span>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                        {status === 'active' && (
                                                                            <button
                                                                                onClick={() => markComplete(node)}
                                                                                className="w-full btn-neo bg-cc-red text-white py-3 border-cc-border shadow-[4px_4px_0px_#1A1A1A]"
                                                                            >
                                                                                Mark Module Complete (+{node.xp} XP)
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
