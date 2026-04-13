import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, X, CheckCircle, AlertCircle, ExternalLink, Eye, EyeOff, Cpu } from 'lucide-react';
import { getApiConfig, setApiConfig, hasApiConfig, clearApiConfig, AiConfig } from '../lib/apiKeyStore';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeySubmitted: () => void;
}

const PROVIDERS = [
  { id: 'anthropic', name: 'Anthropic (Claude)', prefix: 'sk-ant-', link: 'https://console.anthropic.com/settings/keys' },
  { id: 'openai', name: 'OpenAI (GPT-4o)', prefix: 'sk-', link: 'https://platform.openai.com/api-keys' },
  { id: 'gemini', name: 'Google Gemini', prefix: '', link: 'https://aistudio.google.com/app/apikey' }
];

export default function ApiKeyModal({ isOpen, onClose, onKeySubmitted }: ApiKeyModalProps) {
  const [provider, setProvider] = useState<AiConfig['provider']>('anthropic');
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const existing = getApiConfig();
      if (existing) {
        setProvider(existing.provider);
        setKey(existing.key);
      }
      setSaved(false);
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = key.trim();

    if (!trimmed) {
      setError('Please enter your API key.');
      return;
    }

    const currentProvider = PROVIDERS.find(p => p.id === provider);
    if (currentProvider && currentProvider.prefix && !trimmed.startsWith(currentProvider.prefix)) {
      setError(`Invalid key format. ${currentProvider.name} API keys usually start with "${currentProvider.prefix}".`);
      return;
    }

    if (trimmed.length < 20) {
      setError('This key seems too short. Please check and try again.');
      return;
    }

    setApiConfig({ provider, key: trimmed });
    setSaved(true);
    setError('');
    setTimeout(() => {
      onKeySubmitted();
      onClose();
    }, 800);
  };

  const handleClear = () => {
    clearApiConfig();
    setKey('');
    setSaved(false);
  };

  if (!isOpen) return null;

  const currentProvider = PROVIDERS.find(p => p.id === provider);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[101] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="neo-card bg-white w-full max-w-lg p-8 shadow-[8px_8px_0px_#1A1A1A] relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg border-2 border-cc-border flex items-center justify-center hover:bg-cc-gray transition-colors"
              >
                <X size={16} className="text-cc-text" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cc-yellow border-2 border-cc-border flex items-center justify-center shadow-[3px_3px_0px_#1A1A1A]">
                  <Key size={24} className="text-cc-text" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-cc-text">Add Your API Key</h2>
                  <p className="text-xs font-bold text-cc-muted uppercase tracking-widest">Required for AI features</p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-cc-blue/30 border-2 border-cc-border rounded-xl p-4 mb-6">
                <p className="text-sm font-bold text-cc-text leading-relaxed">
                  CareerCraft supports multiple AI models. Your API key is stored <span className="font-black">locally on your device</span> and sent directly to the provider — never saved on our servers.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Provider Selection */}
                <div>
                  <label className="text-xs font-black text-cc-text uppercase tracking-widest mb-2 block">
                    Choose AI Provider
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {PROVIDERS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => { setProvider(p.id as any); setError(''); setSaved(false); }}
                        className={`p-3 rounded-xl border-2 text-center text-xs font-black transition-all ${
                          provider === p.id
                            ? 'border-cc-border bg-cc-yellow shadow-[3px_3px_0px_#1A1A1A] text-cc-text -translate-y-0.5'
                            : 'border-cc-border/30 bg-white text-cc-muted hover:border-cc-border hover:bg-cc-gray'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black text-cc-text uppercase tracking-widest mb-2 block">
                    {currentProvider?.name} API Key
                  </label>
                  <div className="relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={key}
                      onChange={(e) => { setKey(e.target.value); setError(''); setSaved(false); }}
                      placeholder={`${currentProvider?.prefix || 'AIizaSy...'}...`}
                      className="w-full bg-white border-2 border-cc-border rounded-xl py-3.5 px-4 pr-12 text-cc-text font-bold font-mono text-sm placeholder:text-cc-muted focus:outline-none focus:bg-cc-yellow/10 focus:shadow-[3px_3px_0px_#1A1A1A] transition-all"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-cc-muted hover:text-cc-text transition-colors"
                    >
                      {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-sm font-bold text-white bg-cc-red border-2 border-cc-border rounded-xl px-4 py-3 shadow-[2px_2px_0px_#1A1A1A] overflow-hidden"
                    >
                      <AlertCircle size={16} className="shrink-0" /> {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success */}
                <AnimatePresence>
                  {saved && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-2 text-sm font-bold text-white bg-green-500 border-2 border-cc-border rounded-xl px-4 py-3 shadow-[2px_2px_0px_#1A1A1A] overflow-hidden"
                    >
                      <CheckCircle size={16} className="shrink-0" /> API key saved! Redirecting...
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    type="submit"
                    disabled={saved}
                    className="btn-neo bg-cc-red text-white py-3 px-8 flex-1 shadow-[4px_4px_0px_#1A1A1A] disabled:opacity-60 font-black"
                  >
                    {saved ? 'Saved ✓' : hasApiConfig() ? 'Update Key' : 'Save & Continue'}
                  </button>
                  {hasApiConfig() && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="btn-neo bg-cc-gray text-cc-text py-3 px-4 shadow-[2px_2px_0px_#1A1A1A] font-black"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </form>

              {/* Get Key Link */}
              <div className="mt-6 pt-4 border-t-2 border-cc-border/10 text-center">
                <a
                  href={currentProvider?.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-black text-cc-red uppercase tracking-widest hover:underline inline-flex items-center gap-1.5"
                >
                  Get your free API key from {currentProvider?.name} <ExternalLink size={12} />
                </a>
                <p className="text-[10px] font-bold text-cc-muted mt-2 leading-relaxed">
                  Go to {currentProvider?.name} → Generate a new key → Paste above.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook: useRequireApiKey
 * Use this in any page that needs the API key.
 * Returns { showModal, setShowModal, apiKeyReady, triggerCheck }
 */
export function useRequireApiKey() {
  const [showModal, setShowModal] = useState(false);
  const [apiKeyReady, setApiKeyReady] = useState(false);

  useEffect(() => {
    setApiKeyReady(hasApiConfig());
  }, []);

  const triggerCheck = (): boolean => {
    if (hasApiConfig()) {
      setApiKeyReady(true);
      return true;
    }
    setShowModal(true);
    return false;
  };

  const onKeySubmitted = () => {
    setApiKeyReady(true);
    setShowModal(false);
  };

  return { showModal, setShowModal, apiKeyReady, triggerCheck, onKeySubmitted };
}
