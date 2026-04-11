import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, CheckCircle, Code, Briefcase, TrendingUp, Monitor,
    Shield, Database, Layout, Star, Zap, Target,
    MapPin, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Careers', href: '#careers' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
];

const LandingPage = () => {
    return (
        <div className="bg-cc-bg font-dm w-full block overflow-x-hidden">
            <Navbar />
            <Ticker />
            <main className="w-full block overflow-x-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full">
                    <HeroSection />
                    <HowItWorks />
                    <CareerPathsGrid />
                    <JobMarketPulse />
                    <FeaturesGrid />
                    <CompanyTable />
                    <Testimonials />
                    <Pricing />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b-2 border-cc-border shadow-[0_2px_0px_#1A1A1A]' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-black text-2xl tracking-tight text-cc-text">CareerCraft</span>
                    <span className="w-2 h-2 rounded-full bg-cc-red" />
                </div>
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-sm font-bold text-cc-muted hover:text-cc-text transition-colors uppercase tracking-wide">
                            {link.name}
                        </a>
                    ))}
                </div>
                <div>
                    <Link to="/login" className="btn-neo bg-cc-red text-white py-2.5 px-6 text-sm flex items-center gap-2">
                        Start Free <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}

function Ticker() {
    const items = [
        "React developers in 847% demand",
        "AI Engineer salaries up 34% YoY — avg 18L",
        "Node.js hiring doubled in 2024",
        "Data Science roles up 210% in Hyderabad",
        "System Design is now mandatory at FAANG",
    ];
    return (
        <div className="w-full mt-20 border-y-2 border-cc-border bg-cc-yellow overflow-hidden flex whitespace-nowrap py-3">
            <div className="animate-marquee flex gap-12 text-sm text-cc-text font-black tracking-wide uppercase">
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="flex items-center gap-3 shrink-0">
                        <span className="w-2 h-2 bg-cc-red rounded-full inline-block" />
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

function HeroSection() {
    return (
        <section className="w-full min-h-[80vh] flex flex-col lg:flex-row items-center justify-between py-20 gap-12">
            <div className="lg:w-1/2 flex flex-col items-start gap-8 z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-cc-border rounded-full shadow-[2px_2px_0px_#1A1A1A] w-fit">
                    <Target size={14} className="text-cc-red" />
                    <span className="text-xs font-black uppercase tracking-wide">No Guesswork</span>
                </div>

                <motion.h1
                    className="text-5xl md:text-6xl font-black leading-tight text-cc-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Your Career.<br />
                    <span className="text-cc-red">Your Roadmap.</span>
                </motion.h1>

                <motion.p
                    className="text-lg md:text-xl text-cc-text/80 font-medium max-w-lg leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    AI-driven personalized roadmaps for Indian B.Tech engineering students.
                    Stop following generic advice and start building your future.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row gap-4 w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Link to="/onboarding" className="btn-neo bg-cc-red text-white shadow-[4px_4px_0px_#1A1A1A] text-base px-8 py-4 flex items-center gap-2 justify-center">
                        Build My Roadmap <ArrowRight size={20} />
                    </Link>
                    <Link to="/login" className="btn-neo bg-white text-cc-text py-4 px-8 flex items-center gap-2 justify-center">
                        Sign In
                    </Link>
                </motion.div>

                <motion.div
                    className="flex items-center gap-6 text-sm font-bold text-cc-text pt-2 border-t-2 border-cc-border/20 mt-2 w-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-cc-red" /> 12,400+ Students</div>
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-cc-red" /> 94% Job Match</div>
                    <div className="flex items-center gap-2"><CheckCircle size={16} className="text-cc-red" /> Updated Weekly</div>
                </motion.div>
            </div>

            <div className="lg:w-1/2 w-full h-full relative flex items-center justify-center p-4">
                <HeroRoadmapPreview />
            </div>
        </section>
    );
}

function HeroRoadmapPreview() {
    return (
        <div className="relative w-full max-w-md h-[420px] flex flex-col justify-between py-10 items-center neo-card bg-white shadow-[8px_8px_0px_#1A1A1A]">
            <div className="absolute top-4 left-4 right-4 text-xs font-black uppercase text-cc-muted tracking-widest">Your Learning Path</div>
            <div className="flex flex-col items-center gap-6 relative w-full px-8 mt-8">
                <div className="absolute left-1/2 top-4 bottom-4 w-0.5 border-l-2 border-dashed border-cc-border -translate-x-1/2" />
                {[
                    { label: 'React & State', done: true, color: 'bg-cc-blue' },
                    { label: 'Node.js Backend', active: true, color: 'bg-cc-yellow' },
                    { label: 'System Design', color: 'bg-cc-gray' },
                ].map((step, i) => (
                    <motion.div
                        key={i}
                        className="w-full relative z-10 flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.4 + 0.8, duration: 0.5 }}
                    >
                        <div className={`w-10 h-10 rounded-full border-2 border-cc-border flex items-center justify-center text-sm font-black shadow-[2px_2px_0px_#1A1A1A] ${step.color}`}>
                            {step.done ? <CheckCircle size={18} className="text-cc-text" /> : <span className="text-cc-text">{i + 1}</span>}
                        </div>
                        <div className={`mt-3 p-4 w-full border-2 border-cc-border rounded-xl ${step.active ? 'bg-cc-yellow' : 'bg-white'} shadow-[3px_3px_0px_#1A1A1A]`}>
                            <div className="text-sm font-black text-cc-text mb-2">{step.label}</div>
                            <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden border border-cc-border">
                                <div className={`h-full bg-cc-text rounded-full ${step.done ? 'w-full' : step.active ? 'w-1/2' : 'w-0'} transition-all duration-700`} />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function HowItWorks() {
    const steps = [
        { num: '01', title: 'Tell Us About You', desc: 'Share your skills, interests and goals. We analyze your profile in seconds.' },
        { num: '02', title: 'Get Your Roadmap', desc: 'Our AI generates a step-by-step custom path for your target career.' },
        { num: '03', title: 'Learn, Track, Get Hired', desc: 'Complete resources, track XP, ace interviews and land your dream job.' },
    ];
    return (
        <section id="how-it-works" className="w-full py-24 border-t-2 border-cc-border">
            <h2 className="text-4xl font-black text-cc-text text-center mb-16">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((s, i) => (
                    <div key={i} className="neo-card bg-white flex flex-col gap-4 hover:-translate-y-1 transition-transform">
                        <span className="text-6xl font-black text-cc-red">{s.num}</span>
                        <h3 className="text-xl font-black text-cc-text">{s.title}</h3>
                        <p className="text-cc-muted font-medium leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function CareerPathsGrid() {
    const paths = [
        { title: 'Full Stack', icon: Code, salary: '₹6L - ₹12L', time: '5-6 months', dm: '85%', color: 'neo-card-blue' },
        { title: 'AI & ML', icon: TrendingUp, salary: '₹8L - ₹15L', time: '6-8 months', dm: '95%', color: 'neo-card-yellow' },
        { title: 'Data Science', icon: Database, salary: '₹7L - ₹14L', time: '4-6 months', dm: '90%', color: 'neo-card-purple' },
        { title: 'Cloud & DevOps', icon: Layout, salary: '₹7L - ₹13L', time: '5-7 months', dm: '88%', color: 'neo-card' },
        { title: 'Cybersecurity', icon: Shield, salary: '₹6L - ₹12L', time: '6-8 months', dm: '80%', color: 'neo-card-blue' },
        { title: 'Mobile Dev', icon: Monitor, salary: '₹5L - ₹10L', time: '4-5 months', dm: '75%', color: 'neo-card-yellow' },
    ];
    return (
        <section id="careers" className="w-full py-24">
            <h2 className="text-4xl font-black text-cc-text text-center mb-16">Top Career Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paths.map((p, i) => {
                    const Icon = p.icon;
                    return (
                        <div key={i} className={`${p.color} flex flex-col gap-4 group cursor-pointer hover:-translate-y-1 transition-transform`}>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white border-2 border-cc-border rounded-xl shadow-[2px_2px_0px_#1A1A1A]">
                                    <Icon size={22} className="text-cc-text" />
                                </div>
                                <h3 className="text-xl font-black text-cc-text">{p.title}</h3>
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-cc-muted">Avg Salary</span>
                                    <span className="text-cc-text">{p.salary}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold">
                                    <span className="text-cc-muted">Time to Job</span>
                                    <span className="text-cc-text">{p.time}</span>
                                </div>
                                <div className="mt-3">
                                    <div className="flex justify-between text-xs font-black mb-1 uppercase">
                                        <span className="text-cc-muted">Market Demand</span>
                                        <span className="text-cc-text">{p.dm}</span>
                                    </div>
                                    <div className="w-full h-2 bg-black/10 border border-cc-border rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-cc-text rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: p.dm }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="w-full py-2 btn-neo bg-white text-cc-text text-sm">
                                    View Roadmap Preview
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function JobMarketPulse() {
    const skills = [['React', '94%'], ['Python', '89%'], ['DSA', '87%'], ['Node.js', '78%'], ['AWS', '72%']];
    const trending = [
        { name: 'LangChain', badge: 'HOT', badgeClass: 'bg-cc-red text-white' },
        { name: 'TypeScript', badge: 'UP', badgeClass: 'bg-cc-blue text-cc-text' },
        { name: 'System Design', badge: 'HOT', badgeClass: 'bg-cc-red text-white' },
        { name: 'Kubernetes', badge: 'UP', badgeClass: 'bg-cc-blue text-cc-text' },
        { name: 'Rust', badge: 'NEW', badgeClass: 'bg-cc-purple text-cc-text' },
    ];
    return (
        <section className="w-full py-24 border-t-2 border-cc-border">
            <h2 className="text-4xl font-black text-cc-text text-center mb-16">Live Job Market Pulse</h2>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 neo-card bg-white">
                    <h3 className="text-xl font-black text-cc-text mb-6">Top In-Demand Skills</h3>
                    {skills.map(([skill, pct], i) => (
                        <div key={i} className="mb-4">
                            <div className="flex justify-between text-sm font-bold mb-1">
                                <span className="text-cc-text">{skill}</span>
                                <span className="text-cc-red font-black">{pct}</span>
                            </div>
                            <div className="w-full h-2.5 bg-cc-gray border border-cc-border rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-cc-text rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: pct }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex-1 neo-card bg-white">
                    <h3 className="text-xl font-black text-cc-text mb-6">Trending Skills</h3>
                    <div className="flex flex-wrap gap-3">
                        {trending.map((s, i) => (
                            <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-cc-border bg-cc-gray shadow-[2px_2px_0px_#1A1A1A] hover:shadow-[4px_4px_0px_#1A1A1A] hover:-translate-y-0.5 transition-all cursor-default">
                                <span className="font-black text-cc-text">{s.name}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${s.badgeClass} border border-cc-border`}>{s.badge}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeaturesGrid() {
    const features = [
        { title: 'Smart Career Roadmap', icon: MapPin, desc: 'Step-by-step personalized learning paths curated by AI.', star: false, color: 'neo-card-blue' },
        { title: 'Interview Failure Analyzer', icon: Target, desc: 'AI breakdown of why you failed and exactly how to fix it.', star: true, color: 'neo-card-yellow' },
        { title: 'Live Resource Hub', icon: Zap, desc: 'Real-time updated YouTube and Dev.to learning resources.', star: false, color: 'neo-card-purple' },
        { title: 'AI Mentor', icon: Users, desc: '24/7 personal tutor for code stucks and career decisions.', star: false, color: 'neo-card' },
        { title: 'ATS Resume Builder', icon: Briefcase, desc: 'Format your projects to beat company ATS filters.', star: false, color: 'neo-card-blue' },
        { title: 'XP & Gamification', icon: Star, desc: 'Earn XP, level up, and stay on a hot streak.', star: false, color: 'neo-card-yellow' },
    ];
    return (
        <section id="features" className="w-full py-24">
            <h2 className="text-4xl font-black text-cc-text text-center mb-16">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f, i) => {
                    const Icon = f.icon;
                    return (
                        <div key={i} className={`${f.color} flex flex-col gap-3 group relative overflow-hidden hover:-translate-y-1 transition-transform`}>
                            {f.star && <div className="absolute top-4 right-4 bg-cc-red text-white text-[10px] font-black px-2 py-1 border-2 border-cc-border uppercase tracking-wide">Popular</div>}
                            <div className="w-12 h-12 bg-white border-2 border-cc-border rounded-xl flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A] mb-2">
                                <Icon size={22} className="text-cc-text" />
                            </div>
                            <h3 className="font-black text-lg text-cc-text">{f.title}</h3>
                            <p className="text-sm text-cc-text/70 font-medium leading-relaxed">{f.desc}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function CompanyTable() {
    const rows = [
        { name: 'Zoho', role: 'SDE 1', skills: ['C/C++', 'DS/Algo', 'System Design'], lvl: 'Entry', hiring: true },
        { name: 'Freshworks', role: 'Frontend Dev', skills: ['React', 'JavaScript', 'CSS'], lvl: 'Junior', hiring: false },
        { name: 'Swiggy', role: 'Backend Eng.', skills: ['Go', 'Node.js', 'System Design'], lvl: 'Mid', hiring: true },
        { name: 'Google', role: 'Software Eng.', skills: ['DS/Algo', 'Python', 'System Design'], lvl: 'L3', hiring: true },
    ];
    return (
        <section className="w-full py-24 border-t-2 border-cc-border">
            <h2 className="text-4xl font-black text-cc-text text-center mb-16">Company Intelligence</h2>
            <div className="neo-card bg-white overflow-hidden !p-0">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-cc-border bg-cc-yellow text-cc-text text-xs font-black uppercase tracking-wide">
                            <th className="p-5 py-4">Company</th>
                            <th className="p-5 font-black">Role</th>
                            <th className="p-5 font-black">Skills Required</th>
                            <th className="p-5 font-black">Level</th>
                            <th className="p-5 font-black text-right pr-8">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-cc-border/20">
                        {rows.map((r, i) => (
                            <tr key={i} className="hover:bg-cc-gray/50 transition-colors group">
                                <td className="p-5 font-black text-cc-text">{r.name}</td>
                                <td className="p-5 text-cc-muted font-bold">{r.role}</td>
                                <td className="p-5">
                                    <div className="flex gap-2 flex-wrap">
                                        {r.skills.map(s => (
                                            <span key={s} className="px-2 py-1 bg-cc-blue border-2 border-cc-border text-cc-text text-xs font-black rounded-lg shadow-[1px_1px_0px_#1A1A1A]">{s}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-5 text-sm font-black text-cc-muted">{r.lvl}</td>
                                <td className="p-5 text-right pr-8">
                                    {r.hiring ? (
                                        <div className="inline-flex items-center gap-2 bg-cc-yellow border-2 border-cc-border px-3 py-1 rounded-full shadow-[2px_2px_0px_#1A1A1A]">
                                            <span className="w-2 h-2 rounded-full bg-green-500" />
                                            <span className="text-xs font-black text-cc-text uppercase">Hiring</span>
                                        </div>
                                    ) : (
                                        <span className="text-xs font-black text-cc-muted uppercase px-3 py-1 bg-cc-gray border-2 border-cc-border rounded-full">Closed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function Testimonials() {
    const reviews = [
        { text: "The Interview Failure Analyzer completely changed my prep. I failed Swiggy, pasted the questions, and Claude told me my DP was weak. 2 weeks later I cracked Zoho.", author: "Rahul M.", info: "SRM / Backend Dev" },
        { text: "Instead of paying ₹50k for a bootcamp, the Certification Guide showed me exactly which ₹2000 AWS cert to get. I got 3 interviews last week.", author: "Sneha P.", info: "VIT / Cloud Eng" },
        { text: "CareerCraft doesn't just list tutorials. It literally builds a tree of exactly what I need and removes the guesswork. Incredible tool.", author: "Aditya S.", info: "NIT W / Full Stack" },
    ];
    return (
        <section className="w-full py-24">
            <h2 className="text-4xl font-black text-cc-text text-center mb-16">Student Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map((r, i) => (
                    <div key={i} className={`neo-card flex flex-col justify-between ${i % 3 === 0 ? 'neo-card-yellow' : i % 3 === 1 ? 'neo-card-blue' : 'neo-card-purple'}`}>
                        <p className="text-cc-text font-bold leading-relaxed italic mb-6">"{r.text}"</p>
                        <div className="flex items-center gap-3 border-t-2 border-cc-border/30 pt-4">
                            <div className="w-10 h-10 rounded-xl bg-white border-2 border-cc-border shadow-[2px_2px_0px_#1A1A1A] flex items-center justify-center font-black text-cc-text">
                                {r.author[0]}
                            </div>
                            <div>
                                <div className="font-black text-cc-text">{r.author}</div>
                                <div className="text-xs font-bold text-cc-muted">{r.info}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function Pricing() {
    const [annual, setAnnual] = useState(false);
    return (
        <section id="pricing" className="w-full py-24 mb-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-cc-text mb-4">Simple Pricing</h2>
                <p className="text-cc-muted font-bold">No hidden fees. Start free, scale when ready.</p>
            </div>

            <div className="flex items-center justify-center gap-3 mb-12">
                <span className={`text-sm font-black ${!annual ? 'text-cc-text' : 'text-cc-muted'}`}>Monthly</span>
                <button
                    onClick={() => setAnnual(!annual)}
                    className={`w-14 h-8 rounded-full p-1 border-2 border-cc-border relative transition-colors ${annual ? 'bg-cc-yellow' : 'bg-cc-gray'} shadow-[2px_2px_0px_#1A1A1A]`}
                >
                    <div className={`w-6 h-6 rounded-full bg-cc-text transition-transform ${annual ? 'translate-x-6' : ''}`} />
                </button>
                <span className={`text-sm font-black flex items-center gap-2 ${annual ? 'text-cc-text' : 'text-cc-muted'}`}>
                    Yearly <span className="text-xs font-black text-white bg-cc-red border border-cc-border px-2 py-0.5 rounded shadow-[1px_1px_0px_#1A1A1A]">Save 40%</span>
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">

                {/* Free */}
                <div className="neo-card bg-white p-8 flex flex-col">
                    <h3 className="text-2xl font-black text-cc-text mb-2">Free</h3>
                    <p className="text-cc-muted font-medium text-sm mb-6">Get started with the basics.</p>
                    <div className="text-5xl font-black text-cc-text mb-8">
                        ₹0<span className="text-lg font-bold text-cc-muted">/mo</span>
                    </div>
                    <ul className="flex flex-col gap-3 mb-8 flex-1">
                        {[
                            'Smart Career Roadmap',
                            'Live Resource Hub (Basic)',
                            'XP & Badges',
                            'Community Access',
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold">
                                <CheckCircle size={16} className="text-cc-muted shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                    <Link to="/login" className="btn-neo bg-cc-gray text-cc-text w-full justify-center">Get Started Free</Link>
                </div>

                {/* Pro */}
                <div className="neo-card bg-white p-8 flex flex-col relative overflow-hidden shadow-[5px_5px_0px_#1A1A1A]">
                    <div className="absolute top-0 right-0 bg-cc-red text-white px-5 py-1.5 border-b-2 border-l-2 border-cc-border font-black text-xs uppercase tracking-widest">PRO</div>
                    <h3 className="text-2xl font-black text-cc-text mb-2">Pro</h3>
                    <p className="text-cc-muted font-medium text-sm mb-6">Unlock AI mentoring & analysis.</p>
                    <div className="text-5xl font-black text-cc-text mb-1">
                        ₹{annual ? '209' : '299'}<span className="text-lg font-bold text-cc-muted">/mo</span>
                    </div>
                    <p className="text-xs font-bold text-cc-muted mb-6">
                        {annual ? 'Billed as ₹2,508/yr' : 'Or switch to yearly & save'}
                    </p>
                    <ul className="flex flex-col gap-3 mb-8 flex-1">
                        {[
                            'Everything in Free',
                            'AI Mentor (Unlimited)',
                            'Interview Failure Analyzer',
                            'ATS Resume Builder',
                            'Live Market Data',
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold">
                                <CheckCircle size={16} className="text-cc-red shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                    <Link to="/login" className="btn-neo bg-cc-yellow border-cc-border w-full justify-center">Upgrade to Pro</Link>
                </div>

                {/* Max */}
                <div className="neo-card bg-cc-outer p-8 flex flex-col relative overflow-hidden border-cc-yellow" style={{ boxShadow: '6px 6px 0px #F4D35E' }}>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-cc-yellow" />
                    <div className="absolute top-0 right-0 bg-cc-yellow text-cc-text px-5 py-1.5 border-b-2 border-l-2 border-cc-yellow font-black text-xs uppercase tracking-widest">MAX</div>
                    <h3 className="text-2xl font-black text-white mb-2">Max</h3>
                    <p className="text-gray-400 font-medium text-sm mb-6">Everything, unlimited, forever mode.</p>

                    {annual ? (
                        <>
                            <div className="text-5xl font-black text-cc-yellow mb-1">
                                ₹1,599<span className="text-xl font-bold text-gray-400">/yr</span>
                            </div>
                            <div className="mb-6">
                                <span className="text-xs font-black text-cc-text bg-cc-yellow px-3 py-1 rounded-full border border-cc-yellow/30">
                                    Best Value — Save ₹2,389 vs Monthly
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-5xl font-black text-cc-yellow mb-1">
                                ₹332<span className="text-xl font-bold text-gray-400">/mo</span>
                            </div>
                            <p className="text-xs font-bold text-cc-yellow mb-6">Switch to yearly — only ₹1,599/yr</p>
                        </>
                    )}

                    <ul className="flex flex-col gap-3 mb-8 flex-1">
                        {[
                            'Everything in Pro',
                            'Code Visualizer (AI Tracing)',
                            'Priority AI Mentor (Claude)',
                            '1-on-1 Mock Interviews',
                            'Resume Review by Expert',
                            'Lifetime Roadmap Updates',
                            'Early Access to New Features',
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                                <CheckCircle size={16} className="text-cc-yellow shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                    <Link to="/login" className="inline-flex items-center justify-center font-black text-sm px-6 py-3 rounded-full border-2 border-cc-yellow bg-cc-yellow text-cc-text w-full shadow-[3px_3px_0px_rgba(250,250,250,0.3)] hover:-translate-y-0.5 transition-all">
                        Go Max — Best Value
                    </Link>
                </div>

            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="w-full bg-cc-outer py-16 border-t-2 border-cc-border">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
                <div className="flex flex-col max-w-xs">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="font-black text-xl tracking-tight text-white">CareerCraft</span>
                        <span className="w-2 h-2 rounded-full bg-cc-red" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6">Built for Indian engineering students. Navigate your career without the guesswork.</p>
                </div>
                <div className="flex gap-16">
                    <div className="flex flex-col gap-3 text-sm">
                        <span className="text-white font-black mb-2 uppercase tracking-wider">Platform</span>
                        <Link to="/roadmap" className="text-gray-400 hover:text-white transition-colors font-bold">Roadmap</Link>
                        <Link to="/analyzer" className="text-gray-400 hover:text-white transition-colors font-bold">Interview Analyzer</Link>
                        <Link to="/mentor" className="text-gray-400 hover:text-white transition-colors font-bold">AI Mentor</Link>
                        <Link to="/resume" className="text-gray-400 hover:text-white transition-colors font-bold">Resume Builder</Link>
                    </div>
                    <div className="flex flex-col gap-3 text-sm">
                        <span className="text-white font-black mb-2 uppercase tracking-wider">Company</span>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors font-bold">About Us</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors font-bold">Careers</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors font-bold">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors font-bold">Terms of Service</a>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500 font-bold">
                &copy; {new Date().getFullYear()} CareerCraft. All rights reserved.
            </div>
        </footer>
    );
}
