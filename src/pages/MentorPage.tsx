import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Send, Settings } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import Sidebar from '../components/Sidebar';
import ApiKeyModal, { useRequireApiKey } from '../components/ApiKeyModal';
import { chatWithMentor } from '../lib/api';
import { hasApiKey } from '../lib/apiKeyStore';
import { useAuth } from '../contexts/AuthContext';

const suggestions = [
    "What should I learn after React?",
    "How do I prepare for a DSA interview?",
    "Which companies hire freshers for 8L+?",
    "Explain closures in JavaScript"
];

export default function MentorPage() {
    const location = useLocation();
    const { userProfile } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { showModal, setShowModal, apiKeyReady, triggerCheck, onKeySubmitted } = useRequireApiKey();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const sendMessage = async (text = input) => {
        if (!text.trim()) return;

        // Check for API key — show popup if missing
        if (!hasApiKey()) {
            triggerCheck();
            return;
        }

        const userMsg = { role: 'user' as const, text };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const userContext = {
                career: userProfile?.career || 'fullstack',
                status: userProfile?.status || 'engineering student',
                completedNodes: userProfile?.completedNodes || [],
                xp: userProfile?.xp || 0,
                level: userProfile?.level || 1,
                streak: userProfile?.streak || 0,
            };

            const result = await chatWithMentor(newMessages, userContext);

            if (result.success && result.message) {
                setMessages(prev => [...prev, { role: 'assistant', text: result.message }]);
            } else {
                const errMsg = result.error || 'Something went wrong. Please try again.';
                setMessages(prev => [...prev, { role: 'assistant', text: `⚠️ ${errMsg}` }]);

                // If it's an API key error, show the popup
                if (errMsg.toLowerCase().includes('api key')) {
                    setTimeout(() => setShowModal(true), 1000);
                }
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', text: '⚠️ Could not connect to the backend. Make sure the Python server is running.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-cc-outer min-h-[100vh] w-full flex p-4 font-dm border-box overflow-hidden">
            
            <Sidebar />

            {/* API Key Modal */}
            <ApiKeyModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onKeySubmitted={onKeySubmitted}
            />

            {/* Chat Area - Neo Brutalist Style */}
            <main className="dashboard-main xl:ml-[280px] flex flex-col relative !p-0">
                
                {/* Header */}
                <div className="p-6 border-b-2 border-cc-border flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-[32px]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border-2 border-cc-border bg-cc-red flex items-center justify-center rounded-xl shadow-[2px_2px_0px_#1A1A1A]">
                            <Bot size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">CareerCraft Mentor</h1>
                            <p className="text-xs font-bold text-cc-muted tracking-wide uppercase">
                                Powered by Claude AI
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border-2 border-cc-border transition-all shadow-[2px_2px_0px_#1A1A1A] hover:-translate-y-0.5 ${
                            apiKeyReady
                                ? 'bg-green-100 text-green-700'
                                : 'bg-cc-yellow text-cc-text animate-pulse'
                        }`}
                    >
                        <Settings size={14} />
                        {apiKeyReady ? 'Key Active' : 'Add API Key'}
                    </button>
                </div>

                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-8 w-full pb-32 pt-8">
                    <div className="max-w-4xl mx-auto flex flex-col">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center mt-[10vh]">
                                <div className="w-20 h-20 border-2 border-cc-border bg-cc-yellow rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#1A1A1A] mb-8">
                                    <Bot size={40} className="text-cc-text" />
                                </div>
                                <h2 className="text-3xl font-bold text-cc-text mb-3">How can I help you today?</h2>
                                {!apiKeyReady && (
                                    <p className="text-sm font-bold text-cc-red mb-6 bg-cc-red/10 px-4 py-2 rounded-xl border-2 border-cc-red/20">
                                        ⚡ Add your Anthropic API key above to start chatting
                                    </p>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                                    {suggestions.map((s, idx) => (
                                        <button 
                                            key={idx} 
                                            onClick={() => sendMessage(s)}
                                            className="text-left px-5 py-4 border-2 border-cc-border rounded-xl text-cc-text font-bold hover:bg-cc-blue transition-colors shadow-[2px_2px_0px_#1A1A1A]"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`flex w-full mb-8 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'assistant' ? (
                                        <div className="flex gap-4 w-full">
                                            <div className="w-10 h-10 border-2 border-cc-border rounded-xl bg-cc-yellow flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1A1A1A]">
                                                <Bot size={20} className="text-cc-text" />
                                            </div>
                                            <div className="bg-white border-2 border-cc-border p-5 rounded-2xl rounded-tl-none shadow-[4px_4px_0px_#1A1A1A] text-cc-text text-[15px] font-medium leading-relaxed max-w-3xl overflow-hidden prose prose-p:leading-relaxed prose-pre:bg-cc-gray prose-pre:border-2 prose-pre:border-cc-border prose-pre:text-cc-text prose-pre:shadow-[2px_2px_0px_#1A1A1A]">
                                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-cc-bg border-2 border-cc-border p-4 rounded-2xl rounded-tr-none px-6 shadow-[4px_4px_0px_#1A1A1A] text-cc-text text-[15px] font-bold max-w-2xl whitespace-pre-wrap">
                                            {msg.text}
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                        {loading && (
                            <div className="flex w-full mb-8 justify-start">
                                <div className="flex gap-4 w-full">
                                    <div className="w-10 h-10 border-2 border-cc-border rounded-xl bg-cc-purple flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#1A1A1A]">
                                        <Bot size={20} className="text-cc-text" />
                                    </div>
                                    <div className="bg-white border-2 border-cc-border p-5 rounded-2xl rounded-tl-none shadow-[2px_2px_0px_#1A1A1A] flex items-center gap-2 h-[64px]">
                                        <span className="w-2.5 h-2.5 border-2 border-cc-border bg-cc-red animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2.5 h-2.5 border-2 border-cc-border bg-cc-yellow animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2.5 h-2.5 border-2 border-cc-border bg-cc-blue animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} className="h-10" />
                    </div>
                </div>

                {/* Input Area */}
                <div className="w-full bg-white/90 backdrop-blur-md pt-4 pb-6 px-4 absolute bottom-0 left-0 right-0 rounded-b-[32px]">
                    <div className="max-w-4xl mx-auto relative">
                        <div className="bg-white border-2 border-cc-border rounded-2xl flex items-end p-2 px-3 shadow-[4px_4px_0px_#1A1A1A] focus-within:bg-cc-gray transition-colors">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                placeholder="Ask CareerCraft..."
                                className="flex-1 bg-transparent text-cc-text p-2 max-h-48 resize-none focus:outline-none min-h-[44px] text-[15px] font-bold placeholder:text-cc-muted"
                                rows={1}
                            />
                            <button
                                onClick={() => sendMessage()}
                                disabled={!input.trim() || loading}
                                className="mb-1 ml-2 w-10 h-10 flex items-center justify-center border-2 border-cc-border bg-cc-red text-white font-bold rounded-xl disabled:bg-cc-gray disabled:text-cc-muted transition-colors shrink-0 shadow-[2px_2px_0px_#1A1A1A] disabled:shadow-none hover:shadow-none translate-y-[-2px] hover:translate-y-0"
                            >
                                <Send size={18} className={input.trim() ? "translate-x-[1px]" : ""} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
