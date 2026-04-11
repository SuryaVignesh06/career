import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, CheckCircle, Github, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const GitHubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
);

export default function LoginPage() {
    const [tab, setTab] = useState('login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [oauthLoading, setOauthLoading] = useState('');
    const [formLoading, setFormLoading] = useState(false);

    const { login, signup, signInWithGoogle, signInWithGitHub } = useAuth();
    const navigate = useNavigate();

    const switchTab = (t: string) => {
        setTab(t);
        setError('');
        setSuccess('');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPass('');
    };

    /** Parse Firebase error codes into user-friendly messages */
    function friendlyError(err: any): string {
        const code = err?.code || '';
        const msg = err?.message || 'An unknown error occurred.';
        
        if (code === 'auth/email-already-in-use') return 'An account with this email already exists. Please sign in instead.';
        if (code === 'auth/invalid-email') return 'Please enter a valid email address.';
        if (code === 'auth/user-not-found') return 'No account found with this email.';
        if (code === 'auth/wrong-password') return 'Incorrect password. Please try again.';
        if (code === 'auth/invalid-credential') return 'Incorrect email or password. Please try again.';
        if (code === 'auth/weak-password') return 'Password is too weak. Use at least 6 characters.';
        if (code === 'auth/too-many-requests') return 'Too many attempts. Please wait a moment and try again.';
        if (code === 'auth/popup-closed-by-user') return 'Sign-in popup was closed. Please try again.';
        if (code === 'auth/account-exists-with-different-credential') return 'An account already exists with this email using a different sign-in method.';
        if (code === 'auth/popup-blocked') return 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
        
        return msg;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (tab === 'signup') {
            if (!name.trim()) return setError('Please enter your full name.');
            if (password.length < 6) return setError('Password must be at least 6 characters.');
            if (password !== confirmPass) return setError('Passwords do not match.');
        }

        setFormLoading(true);
        try {
            if (tab === 'signup') {
                await signup(name.trim(), email.trim(), password);
                setSuccess('Account created! Redirecting to setup...');
                setTimeout(() => navigate('/onboarding'), 1000);
            } else {
                const result = await login(email.trim(), password);
                const dest = result?.profile?.onboardingDone ? '/dashboard' : '/onboarding';
                setSuccess(dest === '/dashboard' ? 'Welcome back! Loading dashboard...' : 'Welcome! Let\'s set up your profile...');
                setTimeout(() => navigate(dest), 800);
            }
        } catch (err: any) {
            setError(friendlyError(err));
        }
        setFormLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setOauthLoading('google');
        setError('');
        try {
            const result = await signInWithGoogle();
            const dest = result?.profile?.onboardingDone ? '/dashboard' : '/onboarding';
            setSuccess(dest === '/dashboard' ? 'Signed in with Google!' : 'Welcome! Let\'s set up your profile...');
            setTimeout(() => navigate(dest), 800);
        } catch (err: any) {
            if (err?.code !== 'auth/popup-closed-by-user') {
                setError(friendlyError(err));
            }
        }
        setOauthLoading('');
    };

    const handleGitHubSignIn = async () => {
        setOauthLoading('github');
        setError('');
        try {
            const result = await signInWithGitHub();
            const dest = result?.profile?.onboardingDone ? '/dashboard' : '/onboarding';
            setSuccess(dest === '/dashboard' ? 'Signed in with GitHub!' : 'Welcome! Let\'s set up your profile...');
            setTimeout(() => navigate(dest), 800);
        } catch (err: any) {
            if (err?.code !== 'auth/popup-closed-by-user') {
                setError(friendlyError(err));
            }
        }
        setOauthLoading('');
    };

    const strength = (() => {
        if (!password) return 0;
        let s = 0;
        if (password.length >= 6) s++;
        if (/[A-Z]/.test(password)) s++;
        if (/[0-9]/.test(password)) s++;
        if (/[^A-Za-z0-9]/.test(password)) s++;
        return s;
    })();
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColor = ['', 'bg-cc-red', 'bg-orange-500', 'bg-cc-yellow', 'bg-green-500'];

    return (
        <div className="bg-cc-bg min-h-screen flex font-dm border-box items-center justify-center border-[16px] border-cc-outer relative">

            <div className="w-full max-w-[1000px] flex flex-col lg:flex-row neo-card bg-white shadow-[8px_8px_0px_#1A1A1A] mx-4 lg:mx-0 overflow-hidden min-h-[600px]">
                
                {/* ── Left panel (Hero) ── */}
                <div className="hidden lg:flex flex-col justify-between w-1/2 neo-card-purple border-b-0 border-r-2 border-t-0 border-l-0 p-12 relative shadow-none">
                    <Link to="/" className="flex items-center gap-2 z-10 relative w-fit hover:-translate-y-0.5 transition-transform">
                        <span className="font-bold text-2xl text-cc-text tracking-tight">CareerCraft<span className="text-cc-red">.</span></span>
                    </Link>
                    <div className="z-10 relative flex flex-col gap-8">
                        <div>
                            <h2 className="text-5xl font-black text-cc-text leading-tight mb-4">
                                Your Career.<br />Your Rules.<br />
                                <span className="text-cc-red">No Guesswork.</span>
                            </h2>
                            <p className="font-bold text-cc-text/80 leading-relaxed max-w-sm">
                                Join our network of students building smarter careers with verified data-driven roadmaps.
                            </p>
                        </div>
                        <div className="bg-white border-2 border-cc-border p-5 rounded-xl shadow-[4px_4px_0px_#1A1A1A]">
                            <p className="text-sm font-bold text-cc-text mb-4 leading-relaxed">
                                "CareerCraft showed me exactly which skills to build. I cracked my dream role in 6 weeks."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-cc-blue border-2 border-cc-border flex items-center justify-center font-black text-cc-text shadow-[2px_2px_0px_#1A1A1A]">R</div>
                                <div>
                                    <div className="text-sm font-black text-cc-text uppercase tracking-wider">Rahul M.</div>
                                    <div className="text-xs font-bold text-cc-muted uppercase">Backend Developer</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-xs font-bold text-cc-text/60 uppercase tracking-widest z-10 relative">© {new Date().getFullYear()} CareerCraft</p>
                </div>

                {/* ── Right panel (Form) ── */}
                <div className="flex-1 flex items-center justify-center p-8 lg:p-12 relative bg-white">
                    <Link to="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-cc-muted hover:text-cc-text font-bold transition-colors text-sm">
                        <ArrowLeft size={16} /> Home
                    </Link>
                    <motion.div className="w-full max-w-sm" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <div className="lg:hidden flex items-center justify-center mb-8">
                            <span className="font-bold text-3xl tracking-tight text-cc-text">CareerCraft<span className="text-cc-red">.</span></span>
                        </div>

                        {/* Tab switcher */}
                        <div className="flex bg-cc-gray border-2 border-cc-border rounded-xl p-1 mb-8 shadow-neo">
                            {[['login', 'Sign In'], ['signup', 'Sign Up']].map(([t, label]) => (
                                <button key={t} onClick={() => switchTab(t)}
                                    className={`flex-1 py-3 rounded-lg text-sm font-black uppercase tracking-wider transition-all ${tab === t
                                        ? 'bg-cc-yellow border-2 border-cc-border text-cc-text shadow-[2px_2px_0px_#1A1A1A]'
                                        : 'text-cc-muted border-2 border-transparent hover:text-cc-text'}`}
                                >{label}</button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                                <h1 className="text-3xl font-black text-cc-text mb-2 tracking-tight">
                                    {tab === 'login' ? 'Welcome back.' : 'Join the network.'}
                                </h1>
                                <p className="text-cc-muted font-bold text-sm mb-6">
                                    {tab === 'login' ? 'Sign in to access your tech roadmap.' : "It's free. No credit card required."}
                                </p>

                                {/* OAuth Buttons — real Firebase popups */}
                                <div className="flex flex-col gap-3 mb-6">
                                    <button type="button" onClick={handleGoogleSignIn} disabled={!!oauthLoading}
                                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white border-2 border-cc-border text-cc-text font-bold hover:bg-cc-gray transition-colors shadow-neo disabled:opacity-50">
                                        {oauthLoading === 'google' ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : <><GoogleIcon /> {tab === 'login' ? 'Continue with Google' : 'Sign up with Google'}</>}
                                    </button>
                                    <button type="button" onClick={handleGitHubSignIn} disabled={!!oauthLoading}
                                        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-cc-outer border-2 border-cc-border text-white font-bold hover:bg-gray-800 transition-colors shadow-neo disabled:opacity-50">
                                        {oauthLoading === 'github' ? <><Loader2 size={16} className="animate-spin" /> Connecting...</> : <><GitHubIcon /> {tab === 'login' ? 'Continue with GitHub' : 'Sign up with GitHub'}</>}
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex-1 h-0.5 bg-cc-border/20" />
                                    <span className="text-xs font-bold text-cc-muted uppercase tracking-widest">or with email</span>
                                    <div className="flex-1 h-0.5 bg-cc-border/20" />
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                                    {tab === 'signup' && (
                                        <div className="relative">
                                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cc-muted pointer-events-none" strokeWidth={3} />
                                            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-white border-2 border-cc-border rounded-xl py-3 pl-12 pr-4 text-cc-text font-bold placeholder:text-cc-muted focus:outline-none focus:bg-cc-yellow/10 focus:shadow-neo transition-all" required />
                                        </div>
                                    )}
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cc-muted pointer-events-none" strokeWidth={3} />
                                        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-white border-2 border-cc-border rounded-xl py-3 pl-12 pr-4 text-cc-text font-bold placeholder:text-cc-muted focus:outline-none focus:bg-cc-yellow/10 focus:shadow-neo transition-all" required />
                                    </div>
                                    <div>
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cc-muted pointer-events-none" strokeWidth={3} />
                                            <input type={showPass ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-white border-2 border-cc-border rounded-xl py-3 pl-12 pr-12 text-cc-text font-bold placeholder:text-cc-muted focus:outline-none focus:bg-cc-yellow/10 focus:shadow-neo transition-all" required />
                                            <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-cc-muted hover:text-cc-text transition-colors">
                                                {showPass ? <EyeOff size={18} strokeWidth={3} /> : <Eye size={18} strokeWidth={3} />}
                                            </button>
                                        </div>
                                        {tab === 'signup' && password && (
                                            <div className="mt-3 flex items-center gap-2 px-1">
                                                <div className="flex gap-1 flex-1">
                                                    {[1, 2, 3, 4].map(i => (
                                                        <div key={i} className={`flex-1 h-2 border-2 border-cc-border transition-all duration-300 ${i <= strength ? strengthColor[strength] : 'bg-cc-gray'}`} />
                                                    ))}
                                                </div>
                                                <span className={`text-[10px] font-black uppercase tracking-widest ${strength >= 3 ? 'text-green-600' : 'text-cc-red'}`}>{strengthLabel[strength]}</span>
                                            </div>
                                        )}
                                    </div>
                                    {tab === 'signup' && (
                                        <div className="relative">
                                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-cc-muted pointer-events-none" strokeWidth={3} />
                                            <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm Password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)}
                                                className={`w-full bg-white border-2 rounded-xl py-3 pl-12 pr-12 text-cc-text font-bold placeholder:text-cc-muted focus:outline-none transition-all ${confirmPass && confirmPass !== password ? 'border-cc-red focus:shadow-neo bg-red-50' : 'border-cc-border focus:bg-cc-yellow/10 focus:shadow-neo'}`} required />
                                            {confirmPass && confirmPass === password && (
                                                <CheckCircle size={18} strokeWidth={3} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                                            )}
                                        </div>
                                    )}

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                                className="text-sm font-bold text-cc-bg bg-cc-red border-2 border-cc-border rounded-xl px-4 py-3 shadow-[2px_2px_0px_#1A1A1A] mt-2">{error}</motion.div>
                                        )}
                                        {success && (
                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                                className="flex items-center gap-2 text-sm font-bold text-white bg-green-500 border-2 border-cc-border rounded-xl px-4 py-3 shadow-[2px_2px_0px_#1A1A1A] mt-2">
                                                <CheckCircle size={18} strokeWidth={3} /> {success}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <button type="submit" disabled={formLoading || !!success}
                                        className="btn-neo bg-cc-red text-white py-3 mt-2 shadow-[4px_4px_0px_#1A1A1A] disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none">
                                        {formLoading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}
                                    </button>
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
