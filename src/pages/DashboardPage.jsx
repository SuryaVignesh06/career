import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Bot, FileText, Home, ChevronRight, Flame, Zap, Target, CheckCircle, Trophy, LogOut, Lock, BookOpen, Sparkles, Star, Briefcase, ExternalLink, Award, PenSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { roadmapData, careerMeta, careerCompletionData, getNextNode, getProgress } from '../data/roadmaps';

const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Bot, label: 'AI Mentor', path: '/mentor' },
    { icon: FileText, label: 'Analyzer', path: '/analyzer' },
    { icon: FileText, label: 'Resume', path: '/resume' },
];

// Compute level from XP
function xpToLevel(xp) {
    if (xp < 300) return 1;
    if (xp < 800) return 2;
    if (xp < 1500) return 3;
    if (xp < 2500) return 4;
    if (xp < 4000) return 5;
    return Math.floor(xp / 800);
}
function xpForNextLevel(level) { return [300, 800, 1500, 2500, 4000][Math.min(level - 1, 4)] || level * 800; }

// Map roadmap node statuses from completedIds
function getNodeStatus(nodeId, completedIds, allIds) {
    if (completedIds.includes(nodeId)) return 'done';
    const idx = allIds.indexOf(nodeId);
    if (idx === 0 || completedIds.includes(allIds[idx - 1])) return 'active';
    return 'locked';
}

export default function DashboardPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, userProfile, logout, updateProfile } = useAuth();

    // ── Derived stats from profile ──────────────────────────────────────────
    const career     = userProfile?.career || 'fullstack';
    const completedIds = userProfile?.completedNodes || [];
    const xp         = userProfile?.xp || 0;
    const streak     = userProfile?.streak || 0;
    const level      = xpToLevel(xp);
    const nextLevelXp = xpForNextLevel(level);
    const xpProgress  = Math.min(100, Math.round((xp / nextLevelXp) * 100));
    const activity   = userProfile?.activityLog || [];
    const progress   = getProgress(career, completedIds);
    const meta       = careerMeta[career] || careerMeta.fullstack;
    const nextNode   = getNextNode(career, completedIds);
    const isComplete = progress === 100;
    const completion = careerCompletionData[career] || careerCompletionData.fullstack;
    const [expandedRole, setExpandedRole] = useState(null);

    // Get first 4 nodes of this career's roadmap with computed statuses
    const allPhases  = roadmapData[career] || roadmapData.fullstack;
    const allNodes   = allPhases.flatMap(p => p.items);
    const allIds     = allNodes.map(n => n.id);
    const previewNodes = allNodes.slice(0, 4).map(n => ({
        ...n,
        status: getNodeStatus(n.id, completedIds, allIds),
    }));

    const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'there';

    const handleLogout = () => { logout(); navigate('/login'); };

    // Mark a node complete (for demo interactivity)
    const markComplete = (nodeId) => {
        if (completedIds.includes(nodeId)) return;
        const node = allNodes.find(n => n.id === nodeId);
        const gainedXp = node?.xp || 100;
        updateProfile({
            completedNodes: [...completedIds, nodeId],
            xp: xp + gainedXp,
            streak: streak,
            activityLog: [
                { action: `Completed "${node?.title}"`, xp: `+${gainedXp} XP`, timestamp: new Date().toISOString() },
                ...activity.slice(0, 9),
            ],
        });
    };

    const isNew = completedIds.length === 0 && !userProfile?.onboardingDone;

    return (
        <div className="min-h-screen bg-[var(--bg)] flex">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] flex flex-col py-6 px-4 gap-2 fixed h-full z-30 overflow-y-auto">
                <Link to="/" className="flex items-center gap-2 px-3 mb-6">
                    <span className="font-heading text-xl font-bold text-white">CareerCraft</span>
                    <span className="w-2 h-2 rounded-full bg-[var(--cyan)]" />
                </Link>

                {navItems.map(({ icon: Icon, label, path }) => (
                    <Link key={path} to={path} className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${location.pathname === path ? 'bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20' : 'text-[var(--muted)] hover:text-white hover:bg-[var(--surface2)]'}`}>
                        <Icon size={18} /> {label}
                    </Link>
                ))}

                {/* User + XP + Logout */}
                <div className="mt-auto flex flex-col gap-3">
                    {/* Avatar + name */}
                    <div className="glass-card p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--purple)] flex items-center justify-center text-sm font-bold text-white shrink-0">
                            {(currentUser?.displayName?.[0] || currentUser?.email?.[0] || 'U').toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white truncate">{currentUser?.displayName || 'User'}</div>
                            <div className="text-xs text-[var(--muted)] truncate">{currentUser?.email}</div>
                        </div>
                    </div>

                    {/* XP bar */}
                    <div className="glass-card p-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-[var(--muted)] font-medium">Level {level}</span>
                            <span className="text-xs text-[var(--cyan)] font-bold">{xp} XP</span>
                        </div>
                        <div className="w-full h-1.5 bg-[var(--surface2)] rounded-full overflow-hidden">
                            <motion.div className="h-full bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)]"
                                initial={{ width: 0 }} animate={{ width: `${xpProgress}%` }} transition={{ duration: 0.8 }} />
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1 text-[var(--muted)]">
                                <Flame size={12} className="text-orange-400" />
                                <span className="text-white font-bold">{streak}</span> day streak
                            </div>
                            <span className="text-[var(--muted)]">{nextLevelXp - xp} XP to next</span>
                        </div>
                    </div>

                    {/* Career badge */}
                    <div className="px-3 py-2 rounded-xl border border-[var(--border)] text-xs flex items-center gap-2 text-[var(--muted)]">
                        <span>{meta.emoji}</span>
                        <span className="text-white font-medium">{meta.label}</span>
                    </div>

                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-red-400 hover:bg-red-500/10 transition-all w-full">
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="ml-64 flex-1 p-8 overflow-y-auto">
                {/* Greeting */}
                <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-heading font-bold text-white">
                        {streak > 0 ? `🔥 Day ${streak} streak, ` : ''}Welcome{streak > 0 ? '' : ' back'}, {displayName}!
                    </h1>
                    <p className="text-[var(--muted)] mt-1">
                        {isNew
                            ? "You're all set! Let's start your journey. 🚀"
                            : completedIds.length === 0
                            ? 'Start your first module to earn XP and build momentum.'
                            : `${completedIds.length} module${completedIds.length !== 1 ? 's' : ''} done · ${progress}% roadmap complete`}
                    </p>
                </motion.div>

                {/* New user CTA */}
                {completedIds.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 glass-card p-6 border-[var(--cyan)]/30 bg-gradient-to-r from-[var(--cyan)]/5 to-[var(--purple)]/5 flex items-center gap-6"
                    >
                        <span className="text-4xl">{meta.emoji}</span>
                        <div className="flex-1">
                            <h3 className="font-bold text-white text-lg mb-1">Your {meta.label} roadmap is ready!</h3>
                            <p className="text-[var(--muted)] text-sm">You're starting at Level 1 with 0 XP. Complete modules to level up and track your progress.</p>
                        </div>
                        <Link to="/roadmap" className="btn-primary shrink-0 text-sm">
                            <Sparkles size={14} /> Start Learning
                        </Link>
                    </motion.div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total XP', value: xp.toLocaleString(), icon: Zap, color: 'text-[var(--cyan)]', bg: 'bg-[var(--cyan)]/10' },
                        { label: 'Day Streak', value: streak > 0 ? `${streak}🔥` : '0', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                        { label: 'Completed', value: completedIds.length, icon: CheckCircle, color: 'text-[var(--green)]', bg: 'bg-[var(--green)]/10' },
                        { label: 'Progress', value: `${progress}%`, icon: Target, color: 'text-[var(--purple)]', bg: 'bg-[var(--purple)]/10' },
                    ].map(({ label, value, icon: Icon, color, bg }, i) => (
                        <motion.div key={label} className="glass-card p-5 flex items-center gap-4"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                                <Icon size={18} className={color} />
                            </div>
                            <div>
                                <div className="text-xl font-bold text-white">{value}</div>
                                <div className="text-xs text-[var(--muted)]">{label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Roadmap preview */}
                    <motion.div className="lg:col-span-2 glass-card p-6"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-bold text-white text-lg">
                                {meta.emoji} Your Roadmap — {meta.label}
                            </h2>
                            <Link to="/roadmap" className="text-xs text-[var(--cyan)] hover:underline flex items-center gap-1">
                                View All <ChevronRight size={14} />
                            </Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            {previewNodes.map((node) => (
                                <div key={node.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all group ${node.status === 'active' ? 'border-[var(--cyan)]/40 bg-[var(--cyan)]/5' : node.status === 'done' ? 'border-[var(--green)]/30 bg-[var(--green)]/5' : 'border-[var(--border)] opacity-40'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${node.status === 'done' ? 'bg-[var(--green)]/20 text-[var(--green)]' : node.status === 'active' ? 'bg-[var(--cyan)]/20 text-[var(--cyan)] animate-pulse' : 'bg-[var(--surface2)] text-[var(--muted)]'}`}>
                                        {node.status === 'done' ? '✓' : node.status === 'active' ? <BookOpen size={14} /> : <Lock size={14} />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-white">{node.title}</div>
                                        <div className="text-xs text-[var(--muted)] mt-0.5">{node.time} · +{node.xp} XP</div>
                                    </div>
                                    {node.status === 'active' && (
                                        <button onClick={() => markComplete(node.id)}
                                            className="text-xs px-3 py-1.5 rounded-lg bg-[var(--cyan)]/20 text-[var(--cyan)] border border-[var(--cyan)]/30 hover:bg-[var(--cyan)]/30 transition-all opacity-0 group-hover:opacity-100">
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
                        <motion.div className="glass-card p-6"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                            <h2 className="font-bold text-white text-lg mb-4">Recent Activity</h2>
                            {activity.length === 0 ? (
                                <div className="text-center py-6">
                                    <p className="text-[var(--muted)] text-sm">No activity yet.</p>
                                    <p className="text-xs text-[var(--muted)] mt-1">Complete your first module!</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {activity.slice(0, 4).map((a, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-[var(--cyan)] mt-1.5 shrink-0" />
                                            <div>
                                                <p className="text-sm text-white">{a.action}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-xs text-[var(--muted)]">{new Date(a.timestamp).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</span>
                                                    {a.xp && <span className="text-xs font-bold text-[var(--green)]">{a.xp}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Next up */}
                        <motion.div className="glass-card p-6"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <div className="flex items-center gap-2 mb-3">
                                <Trophy size={18} className="text-[var(--amber)]" />
                                <h2 className="font-bold text-white">Next Up</h2>
                            </div>
                            {nextNode ? (
                                <>
                                    <p className="text-sm text-white font-medium mb-1">{nextNode.title}</p>
                                    <p className="text-xs text-[var(--muted)] mb-4">Est. {nextNode.time} · +{nextNode.xp} XP</p>
                                    <Link to="/roadmap" className="btn-primary w-full text-sm py-2.5">
                                        Continue Learning <ChevronRight size={16} />
                                    </Link>
                                </>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm text-[var(--green)] font-bold">🎉 Roadmap complete! You're a legend.</p>
                                    <a href="#completion-section" className="btn-primary w-full text-sm py-2.5 text-center flex items-center justify-center gap-2">
                                        <Briefcase size={14} /> View Job Opportunities
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Quick Tools & Features */}
                <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <h2 className="text-2xl font-bold text-white mb-6">Quick Tools & Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Interview Failure Analyzer', icon: '🔁', desc: 'AI breakdown of why you failed and how to fix it.', star: true, link: '/analyzer' },
                            { title: 'AI Mentor', icon: '🤖', desc: '24/7 personal tutor for code stucks and careers.', link: '/mentor' },
                            { title: 'ATS Resume Builder', icon: '📄', desc: 'Format your projects to beat company filters.', link: '/resume' },
                            { title: 'Smart Career Roadmap', icon: '🗺️', desc: 'Step-by-step personalized learning paths.', link: '/roadmap' },
                            { title: 'XP & Gamification', icon: '🎮', desc: 'Earn XP, badges and stay on a hot streak.', link: '#' }
                        ].map((f, i) => (
                            <Link to={f.link} key={i} className={`glass-card p-6 flex flex-col gap-3 group relative overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] ${f.star ? 'border-[var(--cyan)]/40 shadow-[0_0_15px_rgba(0,229,255,0.05)]' : ''}`}>
                                {f.star && <div className="absolute top-0 right-0 p-2 text-yellow-400"><Star size={16} fill="currentColor" /></div>}
                                <div className="text-3xl group-hover:scale-110 transition-transform">{f.icon}</div>
                                <h3 className="font-bold text-lg text-white group-hover:text-[var(--cyan)] transition-colors">{f.title}</h3>
                                <p className="text-sm text-[var(--muted)]">{f.desc}</p>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* ── POST-COMPLETION SECTION ─────────────────────────── */}
                <AnimatePresence>
                {isComplete && (
                    <motion.div
                        id="completion-section"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mt-12 flex flex-col gap-10"
                    >
                        {/* 🎉 Celebration Banner */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative overflow-hidden rounded-2xl border border-[var(--cyan)]/30 bg-gradient-to-r from-[var(--cyan)]/10 via-[var(--purple)]/10 to-[var(--cyan)]/10 p-8 text-center"
                        >
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.08),transparent_70%)]" />
                            <div className="text-5xl mb-3">🏆</div>
                            <h2 className="text-3xl font-heading font-bold text-white mb-2">Roadmap Completed!</h2>
                            <p className="text-[var(--muted)] max-w-xl mx-auto">
                                You've mastered the <span className="text-[var(--cyan)] font-semibold">{meta.label}</span> roadmap with {xp.toLocaleString()} XP earned.
                                Time to land your dream job! Here's everything you need.
                            </p>
                            <div className="flex items-center justify-center gap-6 mt-5">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--cyan)]">{xp.toLocaleString()}</div>
                                    <div className="text-xs text-[var(--muted)]">Total XP</div>
                                </div>
                                <div className="w-px h-10 bg-[var(--border)]" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--green)]">{completedIds.length}</div>
                                    <div className="text-xs text-[var(--muted)]">Modules Done</div>
                                </div>
                                <div className="w-px h-10 bg-[var(--border)]" />
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--amber)]">{level}</div>
                                    <div className="text-xs text-[var(--muted)]">Level Reached</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* 💼 Recommended Job Roles */}
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-9 h-9 rounded-xl bg-[var(--cyan)]/10 flex items-center justify-center">
                                    <Briefcase size={18} className="text-[var(--cyan)]" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Recommended Job Roles</h2>
                                    <p className="text-xs text-[var(--muted)]">Based on your {meta.label} roadmap completion</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {completion.jobRoles.map((role, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="glass-card p-5 flex flex-col gap-3 group hover:-translate-y-1 transition-all hover:shadow-[0_0_20px_rgba(0,229,255,0.12)] cursor-pointer"
                                        onClick={() => setExpandedRole(expandedRole === i ? null : i)}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{role.icon}</span>
                                                <div>
                                                    <div className="font-bold text-white group-hover:text-[var(--cyan)] transition-colors">{role.title}</div>
                                                    <div className="text-xs text-[var(--muted)] mt-0.5">{role.salary} · India</div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1.5">
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--cyan)]/15 text-[var(--cyan)] font-medium border border-[var(--cyan)]/20">{role.tag}</span>
                                                <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                                                    <span className="text-[var(--green)] font-bold">{role.match}%</span> match
                                                </div>
                                            </div>
                                        </div>
                                        {/* Match bar */}
                                        <div className="w-full h-1 bg-[var(--surface2)] rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)] rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${role.match}%` }}
                                                transition={{ duration: 0.8, delay: 0.2 * i }}
                                            />
                                        </div>
                                        {/* Apply links — expand on click */}
                                        <AnimatePresence>
                                        {expandedRole === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-3 border-t border-[var(--border)] flex flex-wrap gap-2">
                                                    <span className="text-xs text-[var(--muted)] w-full mb-1">Apply on:</span>
                                                    <a href={role.links.linkedin} target="_blank" rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
                                                        onClick={e => e.stopPropagation()}>
                                                        <ExternalLink size={11} /> LinkedIn
                                                    </a>
                                                    <a href={role.links.naukri} target="_blank" rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 hover:bg-orange-500/20 transition-all"
                                                        onClick={e => e.stopPropagation()}>
                                                        <ExternalLink size={11} /> Naukri
                                                    </a>
                                                    <a href={role.links.indeed} target="_blank" rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all"
                                                        onClick={e => e.stopPropagation()}>
                                                        <ExternalLink size={11} /> Indeed
                                                    </a>
                                                </div>
                                            </motion.div>
                                        )}
                                        </AnimatePresence>
                                        <div className="flex items-center justify-end gap-1 text-xs text-[var(--muted)]">
                                            {expandedRole === i ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                                            {expandedRole === i ? 'Collapse' : 'Apply links'}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* 📋 Job Application Checklist + 📄 Resume Tips — side by side */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Job Application Checklist */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="glass-card p-6 flex flex-col gap-4"
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-9 h-9 rounded-xl bg-[var(--green)]/10 flex items-center justify-center">
                                        <CheckCircle size={18} className="text-[var(--green)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">Job Application Checklist</h3>
                                        <p className="text-xs text-[var(--muted)]">Complete these before applying</p>
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
                                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                                        item.done
                                            ? 'border-[var(--green)]/30 bg-[var(--green)]/5'
                                            : 'border-[var(--border)] hover:border-[var(--cyan)]/30 hover:bg-[var(--surface2)]'
                                    }`}>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                                            item.done ? 'border-[var(--green)] bg-[var(--green)]/20' : 'border-[var(--border)]'
                                        }`}>
                                            {item.done && <CheckCircle size={11} className="text-[var(--green)]" />}
                                        </div>
                                        <span className={`text-sm ${ item.done ? 'text-[var(--green)] line-through opacity-70' : 'text-white'}`}>{item.step}</span>
                                    </div>
                                ))}
                            </motion.div>

                            {/* Resume Update Tips */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="glass-card p-6 flex flex-col gap-4"
                            >
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-9 h-9 rounded-xl bg-[var(--purple)]/10 flex items-center justify-center">
                                        <PenSquare size={18} className="text-[var(--purple)]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">Resume Update Guide</h3>
                                        <p className="text-xs text-[var(--muted)]">Tailored for {meta.label} roles</p>
                                    </div>
                                </div>

                                {/* Skills to add */}
                                <div>
                                    <p className="text-xs text-[var(--muted)] mb-2 font-medium uppercase tracking-wider">Skills to Add</p>
                                    <div className="flex flex-wrap gap-2">
                                        {completion.resumeSkills.map((skill, i) => (
                                            <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[var(--cyan)]/10 text-[var(--cyan)] border border-[var(--cyan)]/20">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Resume tips */}
                                <div>
                                    <p className="text-xs text-[var(--muted)] mb-2 font-medium uppercase tracking-wider">Pro Tips</p>
                                    <div className="flex flex-col gap-2">
                                        {completion.resumeTips.map((tip, i) => (
                                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
                                                <span className="text-[var(--amber)] font-bold text-sm shrink-0">→</span>
                                                <span className="text-sm text-white">{tip}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA to Resume Builder */}
                                <Link to="/resume" className="btn-primary w-full text-sm py-3 flex items-center justify-center gap-2 mt-1">
                                    <PenSquare size={15} /> Open ATS Resume Builder
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </main>
        </div>
    );
}
