import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Home, Map, Bot, FileText, Award, Briefcase, Code, Target, 
    PenSquare, Newspaper, LogOut, Flame, User, Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { careerMeta } from '../data/roadmaps';

export const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'Roadmap', path: '/roadmap' },
    { icon: Bot, label: 'AI Mentor', path: '/mentor' },
    { icon: Newspaper, label: 'Intelligence Feed', path: '/feed' },
    { icon: Briefcase, label: 'Job Matching', path: '/jobs' },
    { icon: Award, label: 'Certifications', path: '/certifications' },
    { icon: Code, label: 'Code Visualizer', path: '/visualizer' },
    { icon: Target, label: 'Interview Analyzer', path: '/analyzer' },
    { icon: PenSquare, label: 'ATS Resume', path: '/resume' },
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

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, userProfile, logout } = useAuth();

    const career = userProfile?.career || 'fullstack';
    const xp = userProfile?.xp || 0;
    const streak = userProfile?.streak || 0;
    const level = xpToLevel(xp);
    const nextLevelXp = xpForNextLevel(level);
    const xpProgress = Math.min(100, Math.round((xp / nextLevelXp) * 100));
    const meta = careerMeta[career] || careerMeta.fullstack;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-64 shrink-0 bg-cc-outer flex flex-col py-6 px-4 gap-2 fixed h-full z-30 overflow-y-auto border-r-2 border-cc-border">
            <Link to="/" className="flex items-center gap-2 px-3 mb-6">
                <span className="font-black text-xl text-white tracking-tight">CareerCraft<span className="text-cc-red">.</span></span>
            </Link>

            <nav className="flex flex-col gap-1">
                {navItems.map(({ icon: Icon, label, path }) => {
                    const isActive = location.pathname === path;
                    return (
                        <Link
                            key={path} to={path}
                            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-all border-2 ${isActive
                                ? 'bg-cc-yellow text-cc-text border-cc-yellow shadow-[2px_2px_0px_#FAFAFA]'
                                : 'text-gray-400 border-transparent hover:text-white hover:bg-white/10'}`}
                        >
                            <Icon size={18} /> {label}
                        </Link>
                    );
                })}
            </nav>

            {/* User + XP + Logout */}
            <div className="mt-auto pt-6 flex flex-col gap-3">
                <Link to="/profile" className="p-4 border-2 border-white/10 rounded-xl flex items-center gap-3 hover:border-cc-yellow/30 hover:bg-white/5 transition-all cursor-pointer group">
                    {userProfile?.photoURL || userProfile?.github?.avatar ? (
                        <img src={userProfile.photoURL || userProfile.github?.avatar} alt="" className="w-9 h-9 rounded-full border-2 border-cc-border object-cover shrink-0 group-hover:scale-110 transition-transform" />
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-cc-yellow border-2 border-cc-border flex items-center justify-center text-sm font-black text-cc-text shrink-0 group-hover:scale-110 transition-transform">
                            {(currentUser?.displayName?.[0] || currentUser?.email?.[0] || 'U').toUpperCase()}
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-black text-white truncate">{currentUser?.displayName || 'User'}</div>
                        <div className="text-xs text-gray-400 font-bold truncate">{currentUser?.email}</div>
                    </div>
                </Link>

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
    );
}
