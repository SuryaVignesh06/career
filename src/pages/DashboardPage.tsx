import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
    Map, Bot, FileText, Home, ChevronRight, Flame, Zap, Target,
    CheckCircle, Trophy, LogOut, Lock, BookOpen, Sparkles, Star,
    Briefcase, ExternalLink, Award, PenSquare, ChevronDown, ChevronUp,
    Code, User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { roadmapData, careerMeta, careerCompletionData, getNextNode, getProgress, careerCertificationsData } from '../data/roadmaps';

const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Bot, label: 'AI Mentor', path: '/mentor' },
    { icon: Award, label: 'Certifications', path: '/certifications' },
    { icon: Briefcase, label: 'Internships', path: '/internships' },
    { icon: Code, label: 'Visualizer', path: '/visualizer' },
    { icon: FileText, label: 'Analyzer', path: '/analyzer' },
    { icon: FileText, label: 'Resume', path: '/resume' },
];

function xpToLevel(xp: number) {
    if (xp < 300) return 1;
    if (xp < 800) return 2;
    if (xp < 1500) return 3;
    if (xp < 2500) return 4;
    if (xp < 4000) return 5;
    return Math.floor(xp / 800);
}
function xpForNextLevel(level: number) {
    return [300, 800, 1500, 2500, 4000][Math.min(level - 1, 4)] || level * 800;
}

function getNodeStatus(nodeId: string, completedIds: string[], allIds: string[]) {
    if (completedIds.includes(nodeId)) return 'done';
    const idx = allIds.indexOf(nodeId);
    if (idx === 0 || completedIds.includes(allIds[idx - 1])) return 'active';
    return 'locked';
}

export default function DashboardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, userProfile, logout, updateProfile } = useAuth();

    const career = userProfile?.career || 'fullstack';
    const completedIds: string[] = userProfile?.completedNodes || [];
    const xp: number = userProfile?.xp || 0;
    const streak: number = userProfile?.streak || 0;
    const level = xpToLevel(xp);
    const nextLevelXp = xpForNextLevel(level);
    const xpProgress = Math.min(100, Math.round((xp / nextLevelXp) * 100));
    const activity: any[] = userProfile?.activityLog || [];
    const progress = getProgress(career, completedIds);
    const meta = careerMeta[career] || careerMeta.fullstack;
    const nextNode = getNextNode(career, completedIds);
    const isComplete = progress === 100;
    const completion = careerCompletionData[career] || careerCompletionData.fullstack;
    const userCerts = careerCertificationsData[career] || careerCertificationsData.fullstack;
    const [expandedRole, setExpandedRole] = useState<number | null>(null);

    const allPhases = roadmapData[career] || roadmapData.fullstack;
    const allNodes = allPhases.flatMap((p: any) => p.items);
    const allIds = allNodes.map((n: any) => n.id);
    const previewNodes = allNodes.slice(0, 4).map((n: any) => ({
        ...n,
        status: getNodeStatus(n.id, completedIds, allIds),
    }));

    const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'there';
    const handleLogout = () => { logout(); navigate('/login'); };

    const markComplete = (nodeId: string, event: React.MouseEvent) => {
        if (completedIds.includes(nodeId)) return;
        const node = allNodes.find((n: any) => n.id === nodeId);
        const gainedXp = node?.xp || 100;
        const now = new Date();
        const lastActionDate = activity.length > 0 ? new Date(activity[0].timestamp) : null;
        let newStreak = streak;
        if (!lastActionDate) {
            newStreak = 1;
        } else {
            const isToday = lastActionDate.toDateString() === now.toDateString();
            const isYesterday = (now.getTime() - lastActionDate.getTime()) < (48 * 60 * 60 * 1000) && !isToday;
            if (isYesterday) newStreak += 1;
            else if (!isToday) newStreak = 1;
        }
        const newXp = xp + gainedXp;
        const oldLevel = xpToLevel(xp);
        const newLevel = xpToLevel(newXp);
        if (newLevel > oldLevel) {
            confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        } else if (event) {
            const rect = (event.target as HTMLElement).getBoundingClientRect();
            const x = (rect.left + rect.right) / 2 / window.innerWidth;
            const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
            confetti({ particleCount: 40, spread: 50, origin: { x, y } });
        }
        updateProfile({
            completedNodes: [...completedIds, nodeId],
            xp: newXp,
            streak: newStreak,
            activityLog: [
                { action: `Completed "${node?.title}"`, xp: `+${gainedXp} XP`, timestamp: now.toISOString() },
                ...activity.slice(0, 9),
            ],
        });
    };

    const isNew = completedIds.length === 0 && !userProfile?.onboardingDone;

    return (
        <div className="min-h-screen bg-cc-bg flex font-dm">
            {/* ── Neo-Brutalist Sidebar ────────────────── */}
            <aside className="w-64 shrink-0 bg-cc-outer flex flex-col py-6 px-4 gap-2 fixed h-full z-30 overflow-y-auto border-r-2 border-cc-border">
                <Link to="/" className="flex items-center gap-2 px-3 mb-6">
                    <span className="font-black text-xl text-white tracking-tight">CareerCraft<span className="text-cc-red">.</span></span>
                </Link>

                {navItems.map(({ icon: Icon, label, path }) => (
                    <Link
                        key={path} to={path}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all border-2 ${location.pathname === path
                            ? 'bg-cc-yellow text-cc-text border-cc-yellow shadow-[2px_2px_0px_#FAFAFA]'
                            : 'text-gray-400 border-transparent hover:text-white hover:bg-white/10'}`}
                    >
                        <Icon size={18} /> {label}
                    </Link>
                ))}

                {/* User + XP + Logout */}
                <div className="mt-auto flex flex-col gap-3">
                    <div className="p-4 border-2 border-white/10 rounded-xl flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-cc-yellow border-2 border-cc-border flex items-center justify-center text-sm font-black text-cc-text shrink-0">
                            {(currentUser?.displayName?.[0] || currentUser?.email?.[0] || 'U').toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-black text-white truncate">{currentUser?.displayName || 'User'}</div>
                            <div className="text-xs text-gray-400 font-bold truncate">{currentUser?.email}</div>
                        </div>
                    </div>

                    {/* XP bar */}
                    <div className="p-4 border-2 border-white/10 rounded-xl flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-400">Level {level}</span>
                            <span className="text-xs font-black text-cc-yellow">{xp} XP</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/20">
                            <motion.div
                                className="h-full bg-cc-yellow rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${xpProgress}%` }}
                                transition={{ duration: 0.8 }}
                            />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-gray-400">
                                <Flame size={12} className="text-orange-400" />
                                <span className="text-white font-black">{streak}</span> day streak
                            </div>
                            <span className="text-gray-500 font-bold">{nextLevelXp - xp} XP to next</span>
                        </div>
                    </div>

                    {/* Career badge */}
                    <div className="px-3 py-2 rounded-xl border border-white/10 text-xs flex items-center gap-2">
                        <User size={14} className="text-cc-yellow" />
                        <span className="text-white font-black">{meta.label}</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full border-2 border-transparent"
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* ── Main Content ────────────────────────── */}
            <main className="ml-64 flex-1 p-8 overflow-y-auto bg-cc-bg">
                {/* Greeting */}
                <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-black text-cc-text">
                        {streak > 0 ? `Day ${streak} Streak! ` : ''}Welcome{streak > 0 ? '' : ' back'}, {displayName}!
                    </h1>
                    <p className="text-cc-muted font-bold mt-1">
                        {isNew
                            ? "You're all set! Let's start your journey."
                            : completedIds.length === 0
                            ? 'Start your first module to earn XP and build momentum.'
                            : `${completedIds.length} module${completedIds.length !== 1 ? 's' : ''} done · ${progress}% roadmap complete`}
                    </p>
                </motion.div>

                {/* New user CTA */}
                {completedIds.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        className="mb-8 neo-card neo-card-yellow flex items-center gap-6 p-6"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-cc-red border-2 border-cc-border flex items-center justify-center shadow-[3px_3px_0px_#1A1A1A]">
                            <Sparkles size={28} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-black text-cc-text text-lg mb-1">Your {meta.label} roadmap is ready!</h3>
                            <p className="text-cc-text/70 font-bold text-sm">You're starting at Level 1 with 0 XP. Complete modules to level up and track your progress.</p>
                        </div>
                        <Link to="/roadmap" className="btn-neo bg-cc-red text-white shrink-0 text-sm flex items-center gap-2 shadow-[4px_4px_0px_#1A1A1A]">
                            <Sparkles size={14} /> Start Learning
                        </Link>
                    </motion.div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total XP', value: xp.toLocaleString(), icon: Zap, color: 'neo-card-blue' },
                        { label: 'Day Streak', value: `${streak}`, icon: Flame, color: 'neo-card-yellow' },
                        { label: 'Completed', value: completedIds.length, icon: CheckCircle, color: 'neo-card-purple' },
                        { label: 'Progress', value: `${progress}%`, icon: Target, color: 'neo-card' },
                    ].map(({ label, value, icon: Icon, color }, i) => (
                        <motion.div
                            key={label}
                            className={`${color} flex items-center gap-4 p-5`}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        >
                            <div className="w-10 h-10 bg-white border-2 border-cc-border rounded-xl flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1A1A1A]">
                                <Icon size={18} className="text-cc-text" />
                            </div>
                            <div>
                                <div className="text-xl font-black text-cc-text">{value}</div>
                                <div className="text-xs font-bold text-cc-text/70">{label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Roadmap preview */}
                    <motion.div
                        className="lg:col-span-2 neo-card bg-white"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-black text-cc-text text-lg">Your Roadmap — {meta.label}</h2>
                            <Link to="/roadmap" className="text-xs font-black text-cc-red hover:underline flex items-center gap-1">
                                View All <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            {previewNodes.map((node: any) => (
                                <div
                                    key={node.id}
                                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all group ${
                                        node.status === 'active'
                                            ? 'border-cc-yellow bg-cc-yellow/30 shadow-[2px_2px_0px_#1A1A1A]'
                                            : node.status === 'done'
                                            ? 'border-cc-blue bg-cc-blue/30'
                                            : 'border-cc-border bg-cc-gray opacity-50'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-full border-2 border-cc-border flex items-center justify-center text-sm font-black shrink-0 shadow-[1px_1px_0px_#1A1A1A] ${
                                        node.status === 'done' ? 'bg-cc-blue' : node.status === 'active' ? 'bg-cc-yellow' : 'bg-cc-gray'
                                    }`}>
                                        {node.status === 'done' ? <CheckCircle size={14} className="text-cc-text" /> : node.status === 'active' ? <BookOpen size={14} className="text-cc-text" /> : <Lock size={14} className="text-cc-muted" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-black text-cc-text">{node.title}</div>
                                        <div className="text-xs font-bold text-cc-muted mt-0.5">{node.time} · +{node.xp} XP</div>
                                    </div>
                                    {node.status === 'active' && (
                                        <button
                                            onClick={(e) => markComplete(node.id, e)}
                                            className="text-xs px-3 py-1.5 rounded-lg btn-neo bg-cc-red text-white py-1 text-[11px] opacity-0 group-hover:opacity-100 shadow-[2px_2px_0px_#1A1A1A]"
                                        >
                                            Mark Done
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right column */}
                    <div className="flex flex-col gap-6">
                        {/* Activity */}
                        <motion.div className="neo-card bg-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <h2 className="font-black text-cc-text text-lg mb-4">Recent Activity</h2>
                            {activity.length === 0 ? (
                                <div className="text-center py-6">
                                    <p className="text-cc-muted font-bold text-sm">No activity yet.</p>
                                    <p className="text-xs text-cc-muted font-bold mt-1">Complete your first module!</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {activity.slice(0, 4).map((a: any, i: number) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-cc-red mt-1.5 shrink-0 border border-cc-border" />
                                            <div>
                                                <p className="text-sm font-bold text-cc-text">{a.action}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-xs font-bold text-cc-muted">{new Date(a.timestamp).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</span>
                                                    {a.xp && <span className="text-xs font-black text-green-600">{a.xp}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Next up */}
                        <motion.div className="neo-card bg-white" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <div className="flex items-center gap-2 mb-3">
                                <Trophy size={18} className="text-cc-red" />
                                <h2 className="font-black text-cc-text">Next Up</h2>
                            </div>
                            {nextNode ? (
                                <>
                                    <p className="text-sm font-black text-cc-text mb-1">{nextNode.title}</p>
                                    <p className="text-xs font-bold text-cc-muted mb-4">Est. {nextNode.time} · +{nextNode.xp} XP</p>
                                    <Link to="/roadmap" className="btn-neo bg-cc-red text-white w-full flex items-center justify-center gap-1 py-2.5 text-sm shadow-[3px_3px_0px_#1A1A1A]">
                                        Continue Learning <ChevronRight size={16} />
                                    </Link>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm font-black text-green-600">Roadmap complete! You're a legend.</p>
                                    <a href="#completion-section" className="btn-neo bg-cc-yellow w-full flex items-center justify-center gap-2 py-2.5 text-sm">
                                        <Briefcase size={14} /> View Job Opportunities
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Quick Tools & Features */}
                <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <h2 className="text-2xl font-black text-cc-text mb-6">Quick Tools & Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Interview Failure Analyzer', icon: Target, desc: 'AI breakdown of why you failed and how to fix it.', star: true, link: '/analyzer', color: 'neo-card-yellow' },
                            { title: 'AI Mentor', icon: Bot, desc: '24/7 personal tutor for code stucks and careers.', link: '/mentor', color: 'neo-card-purple' },
                            { title: 'ATS Resume Builder', icon: FileText, desc: 'Format your projects to beat company filters.', link: '/resume', color: 'neo-card-blue' },
                            { title: 'Smart Career Roadmap', icon: Map, desc: 'Step-by-step personalized learning paths.', link: '/roadmap', color: 'neo-card' },
                            { title: 'Code Visualizer', icon: Code, desc: 'See your code execute step-by-step visually.', link: '/visualizer', color: 'neo-card-yellow' },
                        ].map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <Link to={f.link} key={i} className={`${f.color} flex flex-col gap-3 group relative overflow-hidden hover:-translate-y-1 transition-transform`}>
                                    {f.star && <div className="absolute top-3 right-3 bg-cc-red text-white text-[10px] font-black px-2 py-0.5 border border-cc-border uppercase">Hot</div>}
                                    <div className="w-10 h-10 bg-white border-2 border-cc-border rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A]">
                                        <Icon size={20} className="text-cc-text" />
                                    </div>
                                    <h3 className="font-black text-lg text-cc-text">{f.title}</h3>
                                    <p className="text-sm text-cc-text/70 font-medium">{f.desc}</p>
                                </Link>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Genuine Internships Section */}
                <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-cc-yellow border-2 border-cc-border flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A]">
                            <Briefcase size={20} className="text-cc-text" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-cc-text">Genuine Internships & Opportunities</h2>
                            <p className="text-sm font-bold text-cc-muted">Curated, real platforms for students to land verified tech internships.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Simplify.jobs', desc: '1-click apply for standard tech internships', url: 'https://simplify.jobs/internships', color: 'neo-card-blue' },
                            { title: 'Y Combinator', desc: 'Internships at fast-growing startups', url: 'https://www.ycombinator.com/jobs/internships', color: 'neo-card-yellow' },
                            { title: 'Wellfound (AngelList)', desc: 'Tech & startup internships globally', url: 'https://wellfound.com/role/internship', color: 'neo-card-purple' },
                            { title: 'Internshala', desc: 'Best for Indian stipends and remote roles', url: 'https://internshala.com/internships/', color: 'neo-card' },
                            { title: 'LinkedIn Internships', desc: 'Corporate and large-scale tech roles', url: 'https://www.linkedin.com/jobs/internship-jobs', color: 'neo-card-blue' },
                            { title: 'WayUp', desc: 'Early-career & student internships', url: 'https://www.wayup.com/s/internships/', color: 'neo-card-yellow' },
                        ].map((intern, i) => (
                            <a
                                href={intern.url} target="_blank" rel="noopener noreferrer" key={i}
                                className={`${intern.color} flex flex-col gap-3 group hover:-translate-y-1 transition-transform`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-black text-lg text-cc-text">{intern.title}</h3>
                                    <ExternalLink size={16} className="text-cc-muted group-hover:text-cc-text transition-colors" />
                                </div>
                                <p className="text-sm font-bold text-cc-text/70">{intern.desc}</p>
                                <span className="text-xs font-black text-cc-red uppercase mt-auto">Apply Now →</span>
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* AI Curated Certifications */}
                <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-cc-purple border-2 border-cc-border flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A]">
                            <Award size={20} className="text-cc-text" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-cc-text">AI Curated Top Certifications</h2>
                            <p className="text-sm font-bold text-cc-muted">
                                Highest-value, industry-recognized certificates for your <span className="text-cc-red font-black">{meta.label}</span> career.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {userCerts.map((cert: any, i: number) => (
                            <a
                                href={cert.url} target="_blank" rel="noopener noreferrer" key={i}
                                className="neo-card neo-card-purple flex flex-col gap-3 group hover:-translate-y-1 transition-transform"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-12 h-12 rounded-xl bg-white border-2 border-cc-border flex items-center justify-center text-2xl shadow-[2px_2px_0px_#1A1A1A]">
                                        {cert.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-cc-muted uppercase tracking-wider">{cert.provider}</p>
                                        <h3 className="font-black text-cc-text leading-tight">{cert.title}</h3>
                                    </div>
                                </div>
                                <div className="mt-auto pt-3 border-t-2 border-cc-border/30 flex justify-between items-center text-xs">
                                    <span className="font-bold text-cc-muted">Industry Recognized</span>
                                    <span className="font-black text-cc-text flex items-center gap-1">View Course <ExternalLink size={10} /></span>
                                </div>
                            </a>
                        ))}
                    </div>
                </motion.div>

                {/* ── POST-COMPLETION SECTION ── */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            id="completion-section"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="mt-12 flex flex-col gap-10"
                        >
                            {/* Celebration Banner */}
                            <div className="neo-card neo-card-yellow relative overflow-hidden p-8 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-cc-red border-2 border-cc-border flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_#1A1A1A]">
                                    <Trophy size={32} className="text-white" />
                                </div>
                                <h2 className="text-3xl font-black text-cc-text mb-2">Roadmap Completed!</h2>
                                <p className="text-cc-text/70 font-bold max-w-xl mx-auto">
                                    You've mastered the <span className="text-cc-red font-black">{meta.label}</span> roadmap with {xp.toLocaleString()} XP earned.
                                    Time to land your dream job!
                                </p>
                                <div className="flex items-center justify-center gap-6 mt-5">
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-cc-text">{xp.toLocaleString()}</div>
                                        <div className="text-xs font-bold text-cc-muted">Total XP</div>
                                    </div>
                                    <div className="w-px h-10 bg-cc-border" />
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-cc-text">{completedIds.length}</div>
                                        <div className="text-xs font-bold text-cc-muted">Modules Done</div>
                                    </div>
                                    <div className="w-px h-10 bg-cc-border" />
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-cc-text">{level}</div>
                                        <div className="text-xs font-bold text-cc-muted">Level Reached</div>
                                    </div>
                                </div>
                            </div>

                            {/* Recommended Job Roles */}
                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-cc-blue border-2 border-cc-border flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A]">
                                        <Briefcase size={18} className="text-cc-text" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-cc-text">Recommended Job Roles</h2>
                                        <p className="text-xs font-bold text-cc-muted">Based on your {meta.label} roadmap completion</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {completion.jobRoles.map((role: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                                            className="neo-card bg-white flex flex-col gap-3 cursor-pointer hover:-translate-y-1 transition-transform"
                                            onClick={() => setExpandedRole(expandedRole === i ? null : i)}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-cc-blue border-2 border-cc-border flex items-center justify-center font-black text-cc-text shadow-[2px_2px_0px_#1A1A1A]">
                                                        {role.title[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-cc-text">{role.title}</div>
                                                        <div className="text-xs font-bold text-cc-muted mt-0.5">{role.salary} · India</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1.5">
                                                    <span className="text-xs px-2 py-0.5 rounded bg-cc-yellow border-2 border-cc-border font-black">{role.tag}</span>
                                                    <span className="text-xs font-black text-green-600">{role.match}% match</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-1.5 bg-cc-gray border border-cc-border rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-cc-text rounded-full"
                                                    initial={{ width: 0 }} animate={{ width: `${role.match}%` }}
                                                    transition={{ duration: 0.8, delay: 0.2 * i }}
                                                />
                                            </div>
                                            <AnimatePresence>
                                                {expandedRole === i && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-3 border-t-2 border-cc-border/20 flex flex-wrap gap-2">
                                                            <span className="text-xs font-black text-cc-muted w-full mb-1">Apply on:</span>
                                                            <a href={role.links.linkedin} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                                                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 btn-neo bg-cc-blue text-cc-text text-[11px] shadow-[2px_2px_0px_#1A1A1A]">
                                                                <ExternalLink size={11} /> LinkedIn
                                                            </a>
                                                            <a href={role.links.naukri} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                                                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 btn-neo bg-cc-yellow text-cc-text text-[11px] shadow-[2px_2px_0px_#1A1A1A]">
                                                                <ExternalLink size={11} /> Naukri
                                                            </a>
                                                            <a href={role.links.indeed} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                                                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 btn-neo bg-cc-purple text-cc-text text-[11px] shadow-[2px_2px_0px_#1A1A1A]">
                                                                <ExternalLink size={11} /> Indeed
                                                            </a>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            <div className="flex items-center justify-end gap-1 text-xs font-black text-cc-muted">
                                                {expandedRole === i ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                                {expandedRole === i ? 'Collapse' : 'Apply links'}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Checklist + Resume Tips */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="neo-card bg-white flex flex-col gap-4">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="w-9 h-9 rounded-xl bg-cc-blue border-2 border-cc-border flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A]">
                                            <CheckCircle size={18} className="text-cc-text" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-cc-text">Job Application Checklist</h3>
                                            <p className="text-xs font-bold text-cc-muted">Complete these before applying</p>
                                        </div>
                                    </div>
                                    {[
                                        { step: 'Update your resume with latest skills', done: true },
                                        { step: 'Create / polish your LinkedIn profile', done: true },
                                        { step: 'Build 2–3 portfolio projects', done: false },
                                        { step: 'Write a tailored cover letter template', done: false },
                                        { step: 'Set job alerts on LinkedIn & Naukri', done: false },
                                        { step: 'Prepare for behavioral (HR) interviews', done: false },
                                        { step: 'Practice DSA & system design problems', done: false },
                                        { step: 'Connect with 10+ recruiters on LinkedIn', done: false },
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all ${item.done ? 'border-cc-blue bg-cc-blue/30' : 'border-cc-border hover:bg-cc-gray'}`}>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${item.done ? 'border-cc-text bg-cc-blue' : 'border-cc-border bg-white'}`}>
                                                {item.done && <CheckCircle size={11} className="text-cc-text" />}
                                            </div>
                                            <span className={`text-sm font-bold ${item.done ? 'text-cc-text/60 line-through' : 'text-cc-text'}`}>{item.step}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="neo-card bg-white flex flex-col gap-4">
                                    <div className="flex items-center gap-3 mb-1">
                                        <div className="w-9 h-9 rounded-xl bg-cc-purple border-2 border-cc-border flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A]">
                                            <PenSquare size={18} className="text-cc-text" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-cc-text">Resume Update Guide</h3>
                                            <p className="text-xs font-bold text-cc-muted">Tailored for {meta.label} roles</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-cc-muted mb-2 uppercase tracking-wider">Skills to Add</p>
                                        <div className="flex flex-wrap gap-2">
                                            {completion.resumeSkills.map((skill: string, i: number) => (
                                                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-cc-purple border-2 border-cc-border font-black text-cc-text shadow-[1px_1px_0px_#1A1A1A]">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-cc-muted mb-2 uppercase tracking-wider">Pro Tips</p>
                                        <div className="flex flex-col gap-2">
                                            {completion.resumeTips.map((tip: string, i: number) => (
                                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-cc-gray border-2 border-cc-border">
                                                    <span className="text-cc-red font-black text-sm shrink-0">→</span>
                                                    <span className="text-sm font-bold text-cc-text">{tip}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Link to="/resume" className="btn-neo bg-cc-red text-white w-full flex items-center justify-center gap-2 mt-1 shadow-[3px_3px_0px_#1A1A1A]">
                                        <PenSquare size={15} /> Open ATS Resume Builder
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
