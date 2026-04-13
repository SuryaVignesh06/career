/**
 * API Key Store — localStorage helper for the user's AI API config.
 * Supports Anthropic, OpenAI, and Gemini.
 */

const STORAGE_KEY = 'cc_ai_config';
const LEGACY_STORAGE_KEY = 'cc_anthropic_api_key';

export interface AiConfig {
  provider: 'anthropic' | 'openai' | 'gemini';
  key: string;
}

export function getApiConfig(): AiConfig | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Migration
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy) {
      const config: AiConfig = { provider: 'anthropic', key: legacy };
      setApiConfig(config);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
      return config;
    }
    return null;
  } catch {
    return null;
  }
}

export function setApiConfig(config: AiConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    provider: config.provider,
    key: config.key.trim()
  }));
}

export function clearApiConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

export function hasApiConfig(): boolean {
  const config = getApiConfig();
  return !!config && config.key.length > 5;
}

// Deprecated: use getApiConfig instead. Kept for backwards compatibility if needed.
export function getApiKey(): string | null {
  const config = getApiConfig();
  return config ? config.key : null;
}

export function hasApiKey(): boolean {
  return hasApiConfig();
}

export function clearApiKey(): void {
  clearApiConfig();
}
