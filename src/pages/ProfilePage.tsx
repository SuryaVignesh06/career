import React, { useMemo, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github, Star, GitFork, MapPin, Building2, Globe, Users,
    Award, Flame, Zap, TrendingUp, Code, Target, BookOpen,
    CheckCircle, ExternalLink, Calendar, Edit3, X, Save, Loader2
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { careerMeta } from '../data/roadmaps';
import { updateProfile as updateFirebaseAuthProfile } from 'firebase/auth';
import { auth } from '../firebase';

// ── Contribution Heatmap ─────────────────────────────────────────────────────
function ContributionGraph({ activityLog }: { activityLog: any[] }) {
    const WEEKS = 26; // ~6 months
    const DAYS = 7;

    const heatmapData = useMemo(() => {
        const now = new Date();
        const cells: { date: string; count: number; level: number }[] = [];

        for (let w = WEEKS - 1; w >= 0; w--) {
            for (let d = 0; d < DAYS; d++) {
                const date = new Date(now);
                date.setDate(date.getDate() - (w * 7 + (6 - d)));
                const dateStr = date.toISOString().split('T')[0];

                // Count activities on this date
                const count = (activityLog || []).filter((l: any) => {
                    const logDate = new Date(l.timestamp).toISOString().split('T')[0];
                    return logDate === dateStr;
                }).length;

                let level = 0;
                if (count >= 4) level = 4;
                else if (count >= 3) level = 3;
                else if (count >= 2) level = 2;
                else if (count >= 1) level = 1;

                cells.push({ date: dateStr, count: count, level });
            }
        }
        return cells;
    }, [activityLog]);

    const levelColors = [
        'bg-white/5 border-white/10',
        'bg-green-900/60 border-green-800',
        'bg-green-700/70 border-green-600',
        'bg-green-500/80 border-green-400',
        'bg-green-400 border-green-300',
    ];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

    return (
        <div className="w-full overflow-x-auto">
            <div className="flex gap-[3px] items-start min-w-[500px]">
                <div className="flex flex-col gap-[3px] mr-1 pt-5">
                    {dayLabels.map((d, i) => (
                        <div key={i} className="h-[14px] text-[9px] font-bold text-gray-500 flex items-center">{d}</div>
                    ))}
                </div>
                <div className="flex gap-[3px]">
                    {Array.from({ length: WEEKS }).map((_, w) => (
                        <div key={w} className="flex flex-col gap-[3px]">
                            {w % 4 === 0 && (
                                <div className="text-[9px] font-bold text-gray-500 h-4 mb-[2px]">
                                    {months[new Date(Date.now() - (WEEKS - 1 - w) * 7 * 86400000).getMonth()]}
                                </div>
                            )}
                            {w % 4 !== 0 && <div className="h-4 mb-[2px]" />}
                            {heatmapData.slice(w * DAYS, (w + 1) * DAYS).map((cell, d) => (
                                <motion.div
                                    key={d}
                                    className={`w-[14px] h-[14px] rounded-[3px] border ${levelColors[cell.level]} cursor-pointer`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: (w * 7 + d) * 0.002, duration: 0.15 }}
                                    title={`${cell.date}: ${cell.count} activities`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center gap-2 mt-3 justify-end">
                <span className="text-[10px] font-bold text-gray-500">Less</span>
                {levelColors.map((c, i) => (
                    <div key={i} className={`w-[12px] h-[12px] rounded-[2px] border ${c}`} />
                ))}
                <span className="text-[10px] font-bold text-gray-500">More</span>
            </div>
        </div>
    );
}

// ── Language Bar Chart ────────────────────────────────────────────────────────
function LanguageBar({ repos }: { repos: any[] }) {
    const langCounts: Record<string, number> = {};
    (repos || []).forEach(r => {
        if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    });
    const sorted = Object.entries(langCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const total = sorted.reduce((s, [, c]) => s + c, 0);
    const langColors: Record<string, string> = {
        JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3776AB',
        Java: '#ED8B00', HTML: '#E34F26', CSS: '#1572B6', 'C++': '#00599C',
        C: '#555555', 'C#': '#68217A', Go: '#00ADD8', Rust: '#DEA584',
        Ruby: '#CC342D', PHP: '#777BB4', Swift: '#FA7343', Kotlin: '#7F52FF',
    };

    if (sorted.length === 0) return null;
    return (
        <div>
            <div className="w-full h-3 rounded-full overflow-hidden flex border-2 border-cc-border">
                {sorted.map(([lang, count]) => (
                    <div key={lang} style={{ width: `${(count / total) * 100}%`, backgroundColor: langColors[lang] || '#888' }} className="h-full" />
                ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
                {sorted.map(([lang, count]) => (
                    <div key={lang} className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                        <div className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: langColors[lang] || '#888' }} />
                        {lang} <span className="text-gray-600">{((count / total) * 100).toFixed(0)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) {
    return (
        <motion.div
            className="neo-card bg-white p-5 flex items-center gap-4 shadow-[4px_4px_0px_#1A1A1A]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
        >
            <div className={`w-12 h-12 rounded-xl border-2 border-cc-border flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A] ${color}`}>
                <Icon size={22} className="text-cc-text" />
            </div>
            <div>
                <div className="text-2xl font-black text-cc-text">{value}</div>
                <div className="text-xs font-bold text-cc-muted uppercase tracking-widest">{label}</div>
            </div>
        </motion.div>
    );
}

// ── Edit Profile Modal ────────────────────────────────────────────────────────
function EditProfileModal({ userProfile, currentUser, onSave, onClose }: {
    userProfile: any;
    currentUser: any;
    onSave: (updates: any) => Promise<void>;
    onClose: () => void;
}) {
    const [editName, setEditName] = useState(userProfile?.displayName || currentUser?.displayName || '');
    const [editStatus, setEditStatus] = useState(userProfile?.status || '');
    const [editCareer, setEditCareer] = useState(userProfile?.career || 'fullstack');
    const [editTimeline, setEditTimeline] = useState(userProfile?.goalTimeline || '6_months');
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const statusOptions = [
        { value: '1st_year', label: '1st Year B.Tech' },
        { value: '2nd_year', label: '2nd Year B.Tech' },
        { value: '3rd_year', label: '3rd Year B.Tech' },
        { value: '4th_year', label: '4th Year / Final' },
        { value: 'fresher', label: 'Recent Graduate' },
    ];
    const careerOptions = Object.entries(careerMeta).map(([key, val]) => ({ value: key, label: (val as any).label }));
    const timelineOptions = [
        { value: '3_months', label: '3 Months (Intensive)' },
        { value: '6_months', label: '6 Months (Standard)' },
        { value: '12_months', label: '1 Year (Relaxed)' },
    ];

    const handleSave = async () => {
        setSaving(true);
        try {
            // Update Firebase Auth displayName  
            if (auth.currentUser && editName.trim() !== currentUser?.displayName) {
                await updateFirebaseAuthProfile(auth.currentUser, { displayName: editName.trim() });
            }
            // Update Firestore profile
            await onSave({
                displayName: editName.trim(),
                status: editStatus,
                career: editCareer,
                goalTimeline: editTimeline,
            });
            setSaved(true);
            setTimeout(() => { onClose(); }, 600);
        } catch (err) {
            console.error('Error saving profile:', err);
        }
        setSaving(false);
    };

    return (
        <>
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <motion.div
                className="fixed inset-0 flex items-center justify-center z-[101] px-4"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
                <motion.div
                    className="neo-card bg-white w-full max-w-lg p-8 shadow-[8px_8px_0px_#1A1A1A] max-h-[85vh] overflow-y-auto"
                    initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-cc-text">Edit Profile</h3>
                        <button onClick={onClose} className="w-10 h-10 rounded-xl border-2 border-cc-border flex items-center justify-center hover:bg-cc-gray transition-colors">
                            <X size={18} className="text-cc-text" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Display Name */}
                        <div>
                            <label className="text-xs font-black text-cc-text uppercase tracking-widest mb-2 block">Full Name</label>
                            <input
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                className="w-full bg-white border-2 border-cc-border rounded-xl py-3 px-4 text-cc-text font-bold placeholder:text-cc-muted focus:outline-none focus:bg-cc-yellow/10 focus:shadow-[3px_3px_0px_#1A1A1A] transition-all"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="text-xs font-black text-cc-text uppercase tracking-widest mb-2 block">Current Status</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {statusOptions.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setEditStatus(opt.value)}
                                        className={`p-3 rounded-xl border-2 text-left text-sm font-bold transition-all ${editStatus === opt.value
                                            ? 'border-cc-border bg-cc-yellow shadow-[3px_3px_0px_#1A1A1A] text-cc-text -translate-y-0.5'
                                            : 'border-cc-border/30 bg-white text-cc-muted hover:border-cc-border hover:bg-cc-gray'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Career Path */}
                        <div>
                            <label className="text-xs font-black text-cc-text uppercase tracking-widest mb-2 block">Career Path</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {careerOptions.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setEditCareer(opt.value)}
                                        className={`p-3 rounded-xl border-2 text-left text-sm font-bold transition-all ${editCareer === opt.value
                                            ? 'border-cc-border bg-cc-yellow shadow-[3px_3px_0px_#1A1A1A] text-cc-text -translate-y-0.5'
                                            : 'border-cc-border/30 bg-white text-cc-muted hover:border-cc-border hover:bg-cc-gray'}`}
                                    >
                                        {(careerMeta as any)[opt.value]?.emoji} {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Goal Timeline */}
                        <div>
                            <label className="text-xs font-black text-cc-text uppercase tracking-widest mb-2 block">Goal Timeline</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {timelineOptions.map(opt => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setEditTimeline(opt.value)}
                                        className={`p-3 rounded-xl border-2 text-center text-sm font-bold transition-all ${editTimeline === opt.value
                                            ? 'border-cc-border bg-cc-yellow shadow-[3px_3px_0px_#1A1A1A] text-cc-text -translate-y-0.5'
                                            : 'border-cc-border/30 bg-white text-cc-muted hover:border-cc-border hover:bg-cc-gray'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-8 pt-6 border-t-2 border-cc-border/10">
                        <button
                            onClick={handleSave}
                            disabled={saving || saved || !editName.trim()}
                            className="btn-neo bg-cc-red text-white py-3 flex-1 shadow-[4px_4px_0px_#1A1A1A] disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {saved ? <><CheckCircle size={16} /> Saved!</> : saving ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
                        </button>
                        <button onClick={onClose} className="btn-neo bg-cc-gray text-cc-text py-3 px-6 shadow-[2px_2px_0px_#1A1A1A]">Cancel</button>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}

// ── Main ProfilePage ──────────────────────────────────────────────────────────
export default function ProfilePage() {
    const location = useLocation();
    const { currentUser, userProfile, updateProfile } = useAuth();
    const [showEditModal, setShowEditModal] = useState(false);

    const github = userProfile?.github;
    const career = userProfile?.career || 'fullstack';
    const meta = careerMeta[career] || careerMeta.fullstack;
    const xp = userProfile?.xp || 0;
    const streak = userProfile?.streak || 0;
    const completedNodes = userProfile?.completedNodes || [];
    const level = xp < 300 ? 1 : xp < 800 ? 2 : xp < 1500 ? 3 : xp < 2500 ? 4 : xp < 4000 ? 5 : Math.floor(xp / 800);

    // Certification count from completed nodes
    const certCount = completedNodes.length >= 3 ? Math.floor(completedNodes.length / 3) : 0;

    // Behavioral traits
    const traits = userProfile?.behavioralTraits || { focus: 5, discipline: 5, consistency: 5, procrastination: 2 };

    // Status label
    const statusLabels: Record<string, string> = {
        '1st_year': '1st Year B.Tech', '2nd_year': '2nd Year B.Tech',
        '3rd_year': '3rd Year B.Tech', '4th_year': '4th Year / Final',
        'fresher': 'Recent Graduate',
    };
    const timelineLabels: Record<string, string> = {
        '3_months': '3 Month Sprint', '6_months': '6 Month Standard', '12_months': '1 Year Relaxed',
    };

    const handleSaveProfile = async (updates: any) => {
        await updateProfile(updates);
    };

    return (
        <div className="bg-cc-outer min-h-[100vh] w-full flex p-4 font-dm border-box overflow-hidden">
            <Sidebar />

            <main className="dashboard-main xl:ml-[280px]">
                <div className="p-8 lg:p-12 pb-24 overflow-y-auto h-full max-w-6xl mx-auto">
                    
                    {/* ── Edit Modal ────────────────────────────────────── */}
                    <AnimatePresence>
                        {showEditModal && (
                            <EditProfileModal
                                userProfile={userProfile}
                                currentUser={currentUser}
                                onSave={handleSaveProfile}
                                onClose={() => setShowEditModal(false)}
                            />
                        )}
                    </AnimatePresence>

                    {/* ── Profile Header ──────────────────────────────────── */}
                    <motion.div
                        className="neo-card bg-white p-8 md:p-10 mb-8 shadow-[8px_8px_0px_#1A1A1A] relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Edit Button */}
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-cc-border bg-white text-cc-text text-xs font-black uppercase tracking-widest hover:bg-cc-yellow hover:shadow-[3px_3px_0px_#1A1A1A] hover:-translate-y-0.5 transition-all shadow-[2px_2px_0px_#1A1A1A]"
                        >
                            <Edit3 size={14} /> Edit Profile
                        </button>

                        <div className="flex flex-col md:flex-row items-start gap-8">
                            {/* Avatar */}
                            <div className="relative">
                                {github?.avatar || userProfile?.photoURL ? (
                                    <img
                                        src={github?.avatar || userProfile?.photoURL}
                                        alt="Avatar"
                                        className="w-28 h-28 rounded-2xl border-4 border-cc-border shadow-[4px_4px_0px_#1A1A1A] object-cover"
                                    />
                                ) : (
                                    <div className="w-28 h-28 rounded-2xl border-4 border-cc-border shadow-[4px_4px_0px_#1A1A1A] bg-cc-yellow flex items-center justify-center">
                                        <span className="text-5xl font-black text-cc-text">
                                            {(userProfile?.displayName?.[0] || currentUser?.displayName?.[0] || 'U').toUpperCase()}
                                        </span>
                                    </div>
                                )}
                                <div className="absolute -bottom-2 -right-2 bg-cc-red text-white text-xs font-black px-3 py-1 rounded-lg border-2 border-cc-border shadow-[2px_2px_0px_#1A1A1A]">
                                    LVL {level}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h1 className="text-4xl font-black text-cc-text mb-1">
                                    {userProfile?.displayName || currentUser?.displayName || 'User'}
                                </h1>
                                <p className="text-sm font-bold text-cc-muted mb-3">{currentUser?.email}</p>
                                
                                {github?.bio && (
                                    <p className="text-sm font-bold text-cc-text/80 mb-4 max-w-lg leading-relaxed">{github.bio}</p>
                                )}

                                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-cc-muted">
                                    {github?.location && (
                                        <div className="flex items-center gap-1"><MapPin size={12} /> {github.location}</div>
                                    )}
                                    {github?.company && (
                                        <div className="flex items-center gap-1"><Building2 size={12} /> {github.company}</div>
                                    )}
                                    {github?.blog && (
                                        <a href={github.blog.startsWith('http') ? github.blog : `https://${github.blog}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-cc-red hover:underline">
                                            <Globe size={12} /> {github.blog}
                                        </a>
                                    )}
                                    {github?.url && (
                                        <a href={github.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-cc-red hover:underline">
                                            <Github size={12} /> {github.username}
                                        </a>
                                    )}
                                    <div className="flex items-center gap-1">
                                        <Calendar size={12} /> Joined {new Date(userProfile?.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                                    </div>
                                </div>

                                {/* Career + Status + Timeline Badges */}
                                <div className="flex flex-wrap items-center gap-3 mt-4">
                                    <div className="inline-flex items-center gap-2 bg-cc-yellow border-2 border-cc-border rounded-xl px-4 py-2 shadow-[2px_2px_0px_#1A1A1A]">
                                        <Target size={14} className="text-cc-text" />
                                        <span className="text-xs font-black text-cc-text uppercase tracking-widest">{meta.label}</span>
                                    </div>
                                    {userProfile?.status && (
                                        <div className="inline-flex items-center gap-2 bg-cc-blue border-2 border-cc-border rounded-xl px-4 py-2 shadow-[2px_2px_0px_#1A1A1A]">
                                            <span className="text-xs font-black text-cc-text uppercase tracking-widest">{statusLabels[userProfile.status] || userProfile.status}</span>
                                        </div>
                                    )}
                                    {userProfile?.goalTimeline && (
                                        <div className="inline-flex items-center gap-2 bg-cc-purple border-2 border-cc-border rounded-xl px-4 py-2 shadow-[2px_2px_0px_#1A1A1A]">
                                            <span className="text-xs font-black text-cc-text uppercase tracking-widest">{timelineLabels[userProfile.goalTimeline] || userProfile.goalTimeline}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Stats Grid ───────────────────────────────────────── */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard icon={Zap} label="Craft Points" value={`${xp} XP`} color="bg-cc-yellow" />
                        <StatCard icon={Flame} label="Day Streak" value={streak} color="bg-orange-200" />
                        <StatCard icon={Award} label="Certifications" value={certCount} color="bg-cc-purple" />
                        <StatCard icon={CheckCircle} label="Modules Done" value={completedNodes.length} color="bg-cc-blue" />
                        {github && (
                            <>
                                <StatCard icon={BookOpen} label="Public Repos" value={github.publicRepos || 0} color="bg-green-200" />
                                <StatCard icon={Star} label="Total Stars" value={github.totalStars || 0} color="bg-cc-yellow" />
                                <StatCard icon={Users} label="Followers" value={github.followers || 0} color="bg-cc-blue" />
                                <StatCard icon={Users} label="Following" value={github.following || 0} color="bg-cc-gray" />
                            </>
                        )}
                    </div>

                    {/* ── Contribution Graph ───────────────────────────────── */}
                    <motion.div
                        className="neo-card bg-cc-outer p-6 md:p-8 mb-8 shadow-[6px_6px_0px_#1A1A1A]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-lg font-black text-white mb-6 flex items-center gap-2">
                            <TrendingUp size={20} className="text-green-400" />
                            Activity Contributions
                        </h3>
                        <ContributionGraph activityLog={userProfile?.activityLog || []} />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* ── Behavioral Traits ────────────────────────────── */}
                        <motion.div
                            className="neo-card bg-white p-8 shadow-[6px_6px_0px_#1A1A1A]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                        >
                            <h3 className="text-lg font-black text-cc-text mb-6">Behavioral Analysis</h3>
                            <div className="flex flex-col gap-5">
                                {[
                                    { label: 'Focus', value: traits.focus, color: 'bg-cc-red' },
                                    { label: 'Discipline', value: traits.discipline, color: 'bg-cc-yellow' },
                                    { label: 'Consistency', value: traits.consistency, color: 'bg-green-500' },
                                    { label: 'Procrastination Risk', value: traits.procrastination, color: 'bg-cc-purple', invert: true },
                                ].map(t => (
                                    <div key={t.label}>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-bold text-cc-text">{t.label}</span>
                                            <span className="text-sm font-black text-cc-text">{t.value}/10</span>
                                        </div>
                                        <div className="h-3 bg-cc-gray rounded-full border-2 border-cc-border overflow-hidden">
                                            <motion.div
                                                className={`h-full rounded-full ${t.color}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(t.value / 10) * 100}%` }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* ── Languages & Skills ───────────────────────────── */}
                        <motion.div
                            className="neo-card bg-white p-8 shadow-[6px_6px_0px_#1A1A1A]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-lg font-black text-cc-text mb-6">
                                {github ? 'GitHub Languages' : 'Skills Overview'}
                            </h3>
                            {github?.repos ? (
                                <LanguageBar repos={github.repos} />
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {completedNodes.map((n: string) => (
                                        <span key={n} className="text-xs px-3 py-1.5 rounded-md font-bold bg-cc-yellow border-2 border-cc-border shadow-[1px_1px_0px_#1A1A1A]">{n}</span>
                                    ))}
                                    {completedNodes.length === 0 && (
                                        <p className="text-sm font-bold text-cc-muted">Complete roadmap modules to unlock skills.</p>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* ── GitHub Repositories ───────────────────────────────── */}
                    {github?.repos && github.repos.length > 0 && (
                        <motion.div
                            className="neo-card bg-white p-8 shadow-[6px_6px_0px_#1A1A1A]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            <h3 className="text-lg font-black text-cc-text mb-6 flex items-center gap-2">
                                <Code size={20} className="text-cc-red" />
                                Top Repositories
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {github.repos.slice(0, 6).map((repo: any) => (
                                    <a
                                        key={repo.name}
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-5 border-2 border-cc-border rounded-xl bg-white hover:bg-cc-gray transition-all shadow-[2px_2px_0px_#1A1A1A] hover:-translate-y-1 hover:shadow-[4px_4px_0px_#1A1A1A] group"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-black text-cc-red group-hover:underline">{repo.name}</span>
                                            <ExternalLink size={12} className="text-cc-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        {repo.description && (
                                            <p className="text-xs font-bold text-cc-muted mb-3 line-clamp-2 leading-relaxed">{repo.description}</p>
                                        )}
                                        <div className="flex items-center gap-4 text-xs font-bold text-cc-muted">
                                            {repo.language && (
                                                <span className="flex items-center gap-1">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-cc-yellow border border-cc-border" />
                                                    {repo.language}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1"><Star size={11} /> {repo.stars}</span>
                                            <span className="flex items-center gap-1"><GitFork size={11} /> {repo.forks}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}

                </div>
            </main>
        </div>
    );
}
