import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Sparkles, TrendingUp, Search, Filter, Share2, Bookmark, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

const mockFeed = [
    {
        id: 1,
        title: "React 19 RC: What Frontend Engineers need to know",
        summary: "The React team has released the RC for version 19. Key features include Actions API, useOptimistic, and the new React Compiler that automates memoization.",
        source: "React Blog",
        time: "2h ago",
        tag: "Frontend",
        relevance: 95,
        url: "https://react.dev/blog/2024/04/25/react-19"
    },
    {
        id: 2,
        title: "GPT-4o: The shift in AI Engineering patterns",
        summary: "Multimodal capabilities are changing how we build AI-native apps. Engineers should focus on token efficiency and structured outputs over complex prompt chains.",
        source: "OpenAI",
        time: "5h ago",
        tag: "AI/ML",
        relevance: 88,
        url: "#"
    },
    {
        id: 3,
        title: "Platform Engineering vs DevOps in 2024",
        summary: "Internal Developer Platforms (IDPs) are becoming the standard for scaling tech teams. Understanding Backstage and Pulumi is now a high-priority skill.",
        source: "Platform Engineering Org",
        time: "8h ago",
        tag: "DevOps",
        relevance: 82,
        url: "#"
    },
    {
        id: 4,
        title: "The rise of Bun and the future of Node.js",
        summary: "Bun 1.1 brings Windows support and massive speed improvements. Is it time to switch your production workloads? Let's take a look at the trade-offs.",
        source: "Bun Blog",
        time: "1d ago",
        tag: "Backend",
        relevance: 75,
        url: "#"
    },
    {
        id: 5,
        title: "Figma Variables: The New Design System Era",
        summary: "Figma's advanced variables are blurring the lines between design and code. Learn how to architect multi-theme UI components effectively.",
        source: "Design Systems",
        time: "12h ago",
        tag: "UI/UX",
        relevance: 90,
        url: "#"
    },
    {
        id: 6,
        title: "Writing API Documentation that Developers Actually Read",
        summary: "Good documentation is a developer's best friend. Let's explore the core principles of using Swagger and OpenAPI specs for maximum clarity.",
        source: "Tech Writer Weekly",
        time: "14h ago",
        tag: "Tech Writing",
        relevance: 85,
        url: "#"
    },
    {
        id: 7,
        title: "Zero Trust Architecture: Evolving past the VPN",
        summary: "The perimeter is dead. Modern cybersecurity demands continuous verification. A deep dive into implementing Zero Trust for distributed microservices.",
        source: "Cyber Daily",
        time: "1d ago",
        tag: "Cybersecurity",
        relevance: 80,
        url: "#"
    },
    {
        id: 8,
        title: "Next.js 15: Streaming and Partial Prerendering",
        summary: "Vercel's latest release pushes the boundaries of web performance. Exploring how PPR combines static edge delivery with dynamic server execution.",
        source: "Vercel News",
        time: "2d ago",
        tag: "Fullstack",
        relevance: 98,
        url: "#"
    },
    {
        id: 9,
        title: "Tailwind CSS v4: An Engine Rewrite",
        summary: "Tailwind is dropping PostCSS for a custom Rust-based engine. Expect 10x faster build times and native CSS variables support.",
        source: "Tailwind Labs",
        time: "2d ago",
        tag: "Frontend",
        relevance: 89,
        url: "#"
    },
    {
        id: 10,
        title: "Google's Gemini 2.5 Pro: Next Gen Capabilities",
        summary: "The context window wars continue. How developers can leverage Gemini's massive 2.5 Pro model for code base refactoring and video analysis.",
        source: "Google AI",
        time: "3d ago",
        tag: "AI/ML",
        relevance: 92,
        url: "#"
    },
    {
        id: 11,
        title: "Micro-Frontends: Are they worth the complexity?",
        summary: "We dissect the pros and cons of using Module Federation versus iframes or build-time integration for enterprise scale applications.",
        source: "Arch Digest",
        time: "3d ago",
        tag: "Architecture",
        relevance: 70,
        url: "#"
    },
    {
        id: 12,
        title: "Aesthetics in Software: Why beauty matters",
        summary: "A deep dive into how high-fidelity visual design impacts user trust and conversion rates in B2B SaaS products.",
        source: "UX Collective",
        time: "4d ago",
        tag: "UI/UX",
        relevance: 85,
        url: "#"
    }
];

export default function FeedPage() {
    const { userProfile } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');

    const tags = ['All', 'Frontend', 'Backend', 'AI/ML', 'DevOps', 'Cybersecurity'];
    const filteredFeed = mockFeed.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.summary.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag === 'All' || item.tag === selectedTag;
        return matchesSearch && matchesTag;
    });

    return (
        <div className="bg-cc-bg min-h-screen flex font-dm">
            <Sidebar />

            <main className="ml-64 flex-1 p-8 overflow-y-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-cc-red font-black text-xs uppercase tracking-[0.2em] mb-2">
                            <Sparkles size={14} /> Intelligence Feed
                        </div>
                        <h1 className="text-4xl font-black text-cc-text">Domain Intelligence.</h1>
                        <p className="text-cc-muted font-bold mt-2">
                            Real-time trends curated for your <span className="text-cc-red">{userProfile?.career || 'Fullstack'}</span> path.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cc-muted group-focus-within:text-cc-text transition-colors" size={18} />
                            <input 
                                type="text"
                                placeholder="Search intel..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white border-2 border-cc-border rounded-xl py-2.5 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-cc-yellow/20 w-full md:w-64 shadow-[2px_2px_0px_#1A1A1A] transition-all"
                            />
                        </div>
                        <button className="neo-card bg-cc-yellow p-2.5 group hover:scale-105 transition-transform">
                            <Filter size={20} className="text-cc-text" />
                        </button>
                    </div>
                </header>

                {/* Tag Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {tags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-4 py-2 rounded-full text-xs font-black border-2 transition-all ${
                                selectedTag === tag 
                                ? 'bg-cc-text text-white border-cc-text shadow-[3px_3px_0px_#FAFAFA]' 
                                : 'bg-white text-cc-text border-cc-border hover:bg-cc-gray'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Feed Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredFeed.map((item, i) => (
                            <motion.article
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="neo-card bg-white flex flex-col gap-4 group hover:-translate-y-1 transition-all"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2.5 py-1 rounded bg-cc-purple/20 text-cc-purple text-[10px] font-black uppercase border border-cc-purple/30">
                                            {item.tag}
                                        </span>
                                        <span className="text-[10px] font-bold text-cc-muted">{item.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 hover:bg-cc-gray rounded-lg transition-colors"><Bookmark size={14} /></button>
                                        <button className="p-1.5 hover:bg-cc-gray rounded-lg transition-colors"><Share2 size={14} /></button>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-black text-cc-text group-hover:text-cc-red transition-colors cursor-pointer">
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                            {item.title} <ExternalLink size={16} className="inline opacity-0 group-hover:opacity-100" />
                                        </a>
                                    </h3>
                                    <p className="text-sm text-cc-text/80 font-medium mt-2 leading-relaxed h-12 overflow-hidden line-clamp-2">
                                        {item.summary}
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t-2 border-cc-border/10 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-cc-gray border border-cc-border flex items-center justify-center text-[10px] font-black uppercase">
                                            {item.source[0]}
                                        </div>
                                        <span className="text-xs font-bold text-cc-muted">{item.source}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <TrendingUp size={14} className="text-green-600" />
                                        <span className="text-xs font-black text-green-600">{item.relevance}% Match</span>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredFeed.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-16 h-16 bg-cc-gray border-2 border-cc-border rounded-full flex items-center justify-center mb-4">
                            <Newspaper size={32} className="text-cc-muted" />
                        </div>
                        <h3 className="text-xl font-black text-cc-text">No intel found.</h3>
                        <p className="text-cc-muted font-bold">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
