import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Play, Code, ChevronLeft, ChevronRight, RotateCcw,
    Box, Terminal, MessageSquare, Settings, Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import ApiKeyModal, { useRequireApiKey } from '../components/ApiKeyModal';
import { visualizeCode } from '../lib/api';
import { hasApiKey } from '../lib/apiKeyStore';

export default function CodeVisualizerPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, userProfile, logout } = useAuth();
    const { showModal, setShowModal, triggerCheck, onKeySubmitted } = useRequireApiKey();

    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [trace, setTrace] = useState<any | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVisualize = async () => {
        if (!code.trim()) return;

        if (!hasApiKey()) {
            triggerCheck();
            return;
        }

        setLoading(true);
        setError('');
        setTrace(null);
        setCurrentStep(0);

        try {
            const result = await visualizeCode(code, language);

            if (result.success && result.data) {
                setTrace(result.data);
            } else {
                setError(result.error || 'Failed to visualize code. Please try again.');
                if (result.error?.toLowerCase().includes('api key')) {
                    setShowModal(true);
                }
            }
        } catch {
            setError('Could not connect to the backend. Make sure the Python server is running.');
        } finally {
            setLoading(false);
        }
    };

    const steps = trace?.steps || [];
    const nextStep = () => { if (currentStep < steps.length - 1) setCurrentStep(c => c + 1); };
    const prevStep = () => { if (currentStep > 0) setCurrentStep(c => c - 1); };

    const activeStepData = steps[currentStep] || null;
    const codeLines = code.split('\n');

    return (
        <div className="min-h-screen bg-cc-bg flex font-dm">
            <Sidebar />

            <ApiKeyModal isOpen={showModal} onClose={() => setShowModal(false)} onKeySubmitted={onKeySubmitted} />

            <main className="ml-64 flex-1 p-8 h-screen flex flex-col bg-cc-bg">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cc-yellow border-2 border-cc-border flex items-center justify-center shadow-[2px_2px_0px_#1A1A1A]">
                            <Code size={20} className="text-cc-text" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-cc-text">Code Visualizer</h1>
                            <p className="text-cc-muted font-bold mt-0.5 text-sm">See your code execute line by line, visually track variables and memory.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border-2 border-cc-border transition-all shadow-[2px_2px_0px_#1A1A1A] ${
                            hasApiKey() ? 'bg-green-100 text-green-700' : 'bg-cc-yellow text-cc-text'
                        }`}
                    >
                        <Settings size={14} />
                        {hasApiKey() ? 'Key Active' : 'Add API Key'}
                    </button>
                </div>

                <div className="flex-1 neo-card bg-white flex flex-col min-h-0 shadow-[6px_6px_0px_#1A1A1A]">
                    {!trace ? (
                        /* Setup View */
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-black text-cc-text uppercase tracking-wide">Select Language</label>
                                <select
                                    className="bg-cc-gray text-cc-text text-sm border-2 border-cc-border rounded-xl px-3 py-2 outline-none focus:shadow-neo font-bold"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="python">Python</option>
                                    <option value="java">Java</option>
                                    <option value="cpp">C++</option>
                                    <option value="c">C</option>
                                </select>
                            </div>

                            <div className="flex-1 rounded-xl border-2 border-cc-border overflow-hidden flex flex-col bg-cc-outer shadow-[4px_4px_0px_#1A1A1A]">
                                <div className="bg-cc-outer/80 px-4 py-2 flex items-center gap-2 border-b-2 border-cc-border">
                                    <Code size={14} className="text-gray-400" />
                                    <span className="text-xs text-gray-400 font-mono font-bold">
                                        main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language}
                                    </span>
                                    <div className="ml-auto px-2 py-0.5 bg-cc-yellow border border-cc-border rounded text-[10px] font-black text-cc-text">{language.toUpperCase()}</div>
                                </div>
                                <textarea
                                    className="flex-1 w-full p-4 bg-transparent text-gray-300 font-mono text-sm resize-none outline-none leading-relaxed"
                                    placeholder={`// Paste your code here to visualize...\n// Example:\nlet x = 5;\nfor(let i = 0; i < 3; i++) {\n  x += i;\n  console.log(x);\n}`}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    spellCheck={false}
                                />
                            </div>

                            {error && (
                                <div className="text-cc-red text-sm font-bold bg-cc-red/10 p-3 rounded-xl border-2 border-cc-red shadow-[2px_2px_0px_#EB6D51]">{error}</div>
                            )}

                            <button
                                onClick={handleVisualize}
                                disabled={!code.trim() || loading}
                                className="btn-neo bg-cc-red text-white py-3 flex items-center justify-center gap-2 w-full disabled:opacity-50 disabled:cursor-not-allowed text-base font-black shadow-[4px_4px_0px_#1A1A1A]"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        Claude is tracing execution...
                                    </>
                                ) : (
                                    <>
                                        <Play size={20} /> Build Native Visualization
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        /* Native Visualizer View */
                        <div className="flex-1 flex flex-col min-h-0">
                            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-cc-border">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setTrace(null)}
                                        className="btn-neo bg-cc-gray text-cc-text text-xs px-3 py-1.5 shadow-[2px_2px_0px_#1A1A1A] flex items-center gap-1"
                                    >
                                        <RotateCcw size={14} /> Editor
                                    </button>
                                    <div className="px-2 py-1 bg-cc-yellow border-2 border-cc-border rounded-lg text-xs font-black uppercase shadow-[2px_2px_0px_#1A1A1A]">
                                        {language}
                                    </div>
                                    <span className="text-sm font-bold text-cc-muted">Claude AI Execution Engine</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-black text-cc-text font-mono px-3 py-1.5 bg-cc-gray border-2 border-cc-border rounded-xl">
                                        Step {currentStep + 1} / {steps.length}
                                    </span>
                                    <button
                                        onClick={prevStep}
                                        disabled={currentStep === 0}
                                        className="btn-neo bg-cc-gray text-cc-text text-sm flex items-center gap-1.5 px-4 py-2 disabled:opacity-30 shadow-[2px_2px_0px_#1A1A1A]"
                                    >
                                        <ChevronLeft size={16} /> Previous
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        disabled={currentStep === steps.length - 1}
                                        className="btn-neo bg-cc-red text-white text-sm flex items-center gap-1.5 px-6 py-2 disabled:opacity-30 shadow-[3px_3px_0px_#1A1A1A]"
                                    >
                                        Next Step <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Split Pane */}
                            <div className="flex-1 flex gap-6 min-h-0">
                                {/* Source Code */}
                                <div className="flex-1 rounded-xl border-2 border-cc-border overflow-hidden flex flex-col bg-cc-outer shadow-[4px_4px_0px_#1A1A1A]">
                                    <div className="bg-cc-outer/80 px-4 py-2 flex items-center gap-2 border-b-2 border-cc-border">
                                        <Code size={14} className="text-gray-400" />
                                        <span className="text-xs text-gray-400 font-mono font-bold">Source Code</span>
                                    </div>
                                    <div className="flex-1 overflow-auto p-4 text-sm font-mono leading-[1.6]">
                                        {codeLines.map((lineText, i) => {
                                            const lineNum = i + 1;
                                            const isActive = activeStepData && (activeStepData.activeLine || activeStepData.line) === lineNum;
                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex rounded-md transition-colors ${isActive ? 'bg-cc-yellow/30 border-l-4 border-cc-red' : 'border-l-4 border-transparent hover:bg-white/5'}`}
                                                >
                                                    <div className={`w-8 shrink-0 text-right pr-3 select-none font-black ${isActive ? 'text-cc-red' : 'text-gray-600'}`}>
                                                        {lineNum}
                                                    </div>
                                                    <div className={`flex-1 whitespace-pre pl-1 ${isActive ? 'text-white font-bold' : 'text-gray-300'}`}>
                                                        {lineText}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Right: State & Output */}
                                <div className="w-[400px] flex flex-col gap-4">
                                    {/* Action Explanation */}
                                    <div className="neo-card neo-card-yellow p-4 shrink-0 shadow-[4px_4px_0px_#1A1A1A]">
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-cc-border">
                                            <MessageSquare size={16} className="text-cc-text" />
                                            <h3 className="text-sm font-black text-cc-text">What's happening?</h3>
                                        </div>
                                        <p className="text-sm font-bold text-cc-text/80 leading-relaxed">
                                            {activeStepData?.explanation || 'Loading step state...'}
                                        </p>
                                    </div>

                                    {/* Local Variables */}
                                    <div className="neo-card bg-white p-4 flex-1 flex flex-col overflow-hidden shadow-[4px_4px_0px_#1A1A1A]">
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-cc-border shrink-0">
                                            <Box size={16} className="text-cc-text" />
                                            <h3 className="text-sm font-black text-cc-text">Local Variables</h3>
                                        </div>
                                        <div className="flex-1 overflow-auto">
                                            {activeStepData?.variables && Object.keys(activeStepData.variables).length > 0 ? (
                                                <div className="space-y-2">
                                                    {Object.entries(activeStepData.variables).map(([key, val]) => (
                                                        <div key={key} className="flex flex-col bg-cc-gray p-2 rounded-lg border-2 border-cc-border shadow-[1px_1px_0px_#1A1A1A]">
                                                            <div className="text-xs font-black text-cc-muted font-mono mb-1">{key}</div>
                                                            <div className="text-sm font-black text-cc-red font-mono break-all">{String(val)}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-xs font-bold text-cc-muted text-center mt-4">
                                                    No variables allocated in current scope.
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Output Console */}
                                    <div className="neo-card bg-cc-outer p-4 shrink-0 h-32 flex flex-col shadow-[4px_4px_0px_#1A1A1A]">
                                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10 shrink-0">
                                            <Terminal size={16} className="text-green-400" />
                                            <h3 className="text-sm font-black text-white">Console Output</h3>
                                        </div>
                                        <div className="flex-1 overflow-auto bg-black/30 rounded-lg p-3 border border-white/10">
                                            <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
                                                {activeStepData?.consoleOutput || activeStepData?.output || ''}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
