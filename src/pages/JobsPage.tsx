import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Target, ExternalLink, Sparkles, TrendingUp, Filter, Search, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

const mockJobs = [
    {
        id: 1,
        title: "Frontend Engineer (Intern)",
        company: "Zepto",
        location: "Mumbai",
        salary: "₹40k - 60k",
        match: 92,
        tags: ["React", "TypeScript", "Tailwind"],
        career: "fullstack",
        skills: [
            { name: "React", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "Node.js", level: 40, required: true },
            { name: "Next.js", level: 30, required: true }
        ],
        url: "https://simplify.jobs/internships"
    },
    {
        id: 2,
        title: "SDE Intern",
        company: "Google",
        location: "Bangalore",
        salary: "₹1L - 1.2L",
        match: 78,
        tags: ["DSA", "Python", "Cloud"],
        career: "fullstack",
        skills: [
            { name: "Python", level: 80 },
            { name: "DSA", level: 85 },
            { name: "Go", level: 20, required: true },
            { name: "Distributed Systems", level: 15, required: true }
        ],
        url: "#"
    },
    {
        id: 3,
        title: "Full Stack Developer",
        company: "Razorpay",
        location: "Remote",
        salary: "₹15L - 25L",
        match: 85,
        tags: ["React", "Node.js", "PostgreSQL"],
        career: "fullstack",
        skills: [
            { name: "React", level: 90 },
            { name: "Node.js", level: 75 },
            { name: "Docker", level: 50, required: true },
            { name: "AWS", level: 30, required: true }
        ],
        url: "#"
    },
    {
        id: 4,
        title: "UI/UX Designer",
        company: "Cred",
        location: "Bangalore",
        salary: "₹12L - 18L",
        match: 95,
        tags: ["Figma", "Prototyping", "Design Systems"],
        career: "drawing",
        skills: [
            { name: "Figma", level: 95 },
            { name: "UI Design", level: 90 },
            { name: "User Research", level: 60, required: true },
            { name: "Interaction Design", level: 70, required: true }
        ],
        url: "#"
    },
    {
        id: 5,
        title: "AI Research Intern",
        company: "Microsoft",
        location: "Hyderabad",
        salary: "₹80k - 1L",
        match: 88,
        tags: ["PyTorch", "LLMs", "Research"],
        career: "aiml",
        skills: [
            { name: "Python", level: 90 },
            { name: "PyTorch", level: 85 },
            { name: "NLP", level: 60, required: true },
            { name: "Transformers", level: 75, required: true }
        ],
        url: "#"
    },
    {
        id: 6,
        title: "Technical Writer",
        company: "Postman",
        location: "Remote",
        salary: "₹10L - 16L",
        match: 90,
        tags: ["Documentation", "API", "Markdown"],
        career: "literature",
        skills: [
            { name: "Technical Writing", level: 90 },
            { name: "API Documentation", level: 80 },
            { name: "Markdown", level: 95, required: true },
            { name: "OpenAPI", level: 60, required: true }
        ],
        url: "#"
    }
];

export default function JobsPage() {
    const { userProfile } = useAuth();
    const userCareer = userProfile?.career || 'fullstack';
    const [searchQuery, setSearchQuery] = useState('');

    // Sort jobs: matching career first, then by match %
    const sortedJobs = [...mockJobs].sort((a, b) => {
        if (a.career === userCareer && b.career !== userCareer) return -1;
        if (a.career !== userCareer && b.career === userCareer) return 1;
        return b.match - a.match;
    });

    const [selectedJob, setSelectedJob] = useState<any>(sortedJobs[0]);

    const filteredJobs = sortedJobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-cc-bg min-h-screen flex font-dm">
            <Sidebar />

            <main className="ml-64 flex-1 p-8 overflow-y-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-cc-blue font-black text-xs uppercase tracking-[0.2em] mb-2">
                            <Briefcase size={14} /> Job Matching Engine
                        </div>
                        <h1 className="text-4xl font-black text-cc-text">Opportunities For You.</h1>
                        <p className="text-cc-muted font-bold mt-2">
                            Matches calculated based on your <span className="text-cc-blue">{userProfile?.career || 'Fullstack'}</span> progress.
                        </p>
                    </div>

                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cc-muted" size={18} />
                        <input 
                            type="text"
                            placeholder="Search roles or companies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border-2 border-cc-border rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold focus:outline-none w-full md:w-80 shadow-[2px_2px_0px_#1A1A1A]"
                        />
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    {/* Jobs List */}
                    <div className="xl:col-span-5 flex flex-col gap-4">
                        <h2 className="font-black text-sm text-cc-muted uppercase tracking-widest mb-2">Top Matches</h2>
                        {filteredJobs.map(job => (
                            <motion.div
                                key={job.id}
                                onClick={() => setSelectedJob(job)}
                                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                                    selectedJob?.id === job.id
                                    ? 'bg-white border-cc-blue shadow-[6px_6px_0px_#1A1A1A] -translate-y-1'
                                    : 'bg-cc-gray border-cc-border hover:bg-white hover:border-cc-blue/50'
                                }`}
                                whileHover={{ x: 5 }}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-cc-blue border-2 border-cc-border flex items-center justify-center font-black text-cc-text shadow-[2px_2px_0px_#1A1A1A]">
                                            {job.company[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-cc-text leading-tight">{job.title}</h3>
                                            <p className="text-xs font-bold text-cc-muted mt-0.5">{job.company} · {job.location}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-green-600 bg-green-100 px-2 py-1 rounded border border-green-200">
                                        {job.match}% Match
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase">
                                    {job.tags.map(t => (
                                        <span key={t} className="px-2 py-0.5 rounded bg-white border border-cc-border">{t}</span>
                                    ))}
                                    <span className="ml-auto text-cc-text/80">{job.salary}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Skill Gap Analysis Area */}
                    <div className="xl:col-span-7">
                        <AnimatePresence mode="wait">
                            {selectedJob ? (
                                <motion.div
                                    key={selectedJob.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="neo-card bg-white p-8 sticky top-8"
                                >
                                    <div className="flex items-center justify-between mb-8 border-b-2 border-cc-border/10 pb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-cc-blue border-3 border-cc-border flex items-center justify-center text-xl font-black text-cc-text shadow-[3px_3px_0px_#1A1A1A]">
                                                {selectedJob.company[0]}
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black text-cc-text">{selectedJob.title}</h2>
                                                <p className="text-sm font-bold text-cc-muted">{selectedJob.company} · {selectedJob.location}</p>
                                            </div>
                                        </div>
                                        <a 
                                            href={selectedJob.url} target="_blank" rel="noopener noreferrer"
                                            className="btn-neo bg-cc-text text-white py-3 px-6 shadow-[4px_4px_0px_#1A1A1A] flex items-center gap-2"
                                        >
                                            Apply Now <ExternalLink size={18} />
                                        </a>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                        <div>
                                            <h3 className="font-black text-cc-text mb-4 flex items-center gap-2">
                                                <Target size={18} className="text-cc-blue" /> Skill Gap Analysis
                                            </h3>
                                            <div className="flex flex-col gap-4">
                                                {selectedJob.skills.map((skill: any) => (
                                                    <div key={skill.name}>
                                                        <div className="flex justify-between text-xs font-bold mb-1.5">
                                                            <span className="flex items-center gap-1.5">
                                                                {skill.level >= 60 ? <CheckCircle size={12} className="text-green-600" /> : <AlertCircle size={12} className="text-cc-red" />}
                                                                {skill.name}
                                                            </span>
                                                            <span className={skill.level >= 60 ? 'text-green-600' : 'text-cc-red'}>{skill.level}% Proficiency</span>
                                                        </div>
                                                        <div className="w-full h-2 bg-cc-gray rounded-full overflow-hidden border border-cc-border">
                                                            <motion.div
                                                                className={`h-full rounded-full ${skill.level >= 60 ? 'bg-green-500' : 'bg-cc-red'}`}
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${skill.level}%` }}
                                                                transition={{ duration: 1, delay: 0.5 }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="neo-card-purple p-6">
                                            <h3 className="font-black text-cc-text text-sm mb-3 flex items-center gap-2">
                                                <Sparkles size={16} className="text-cc-purple" /> AI Recommendation
                                            </h3>
                                            <p className="text-xs font-bold text-cc-text/80 leading-relaxed">
                                                To reach a <span className="text-cc-red font-black">98% Match</span>, complete the <span className="underline">Next.js Authentication</span> module in your roadmap. You are already strong in React and TypeScript.
                                            </p>
                                            <div className="mt-4 pt-4 border-t border-cc-text/10 flex flex-col gap-2">
                                                <p className="text-[10px] font-black text-cc-text/60 uppercase">Recommended Module:</p>
                                                <div className="flex items-center justify-between bg-white/50 p-2 rounded-lg border border-cc-text/10">
                                                    <span className="text-[11px] font-bold">Advanced Next.js APIs</span>
                                                    <ChevronRight size={14} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <h3 className="font-black text-cc-text text-sm">Potential Career Path Impact</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 p-3 rounded-xl bg-cc-blue/10 border-2 border-cc-blue/20 flex items-center gap-3">
                                                <TrendingUp size={20} className="text-cc-blue" />
                                                <div>
                                                    <p className="text-[11px] font-black text-cc-text">Networking Growth</p>
                                                    <p className="text-[10px] font-bold text-cc-muted">+240 Industry Connections</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 p-3 rounded-xl bg-cc-purple/10 border-2 border-cc-purple/20 flex items-center gap-3">
                                                <Sparkles size={20} className="text-cc-purple" />
                                                <div>
                                                    <p className="text-[11px] font-black text-cc-text">Skill Unlock</p>
                                                    <p className="text-[10px] font-bold text-cc-muted">Production Architecture</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-cc-muted font-bold text-lg opacity-30 italic">
                                    Select a job to view detailed analysis...
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
