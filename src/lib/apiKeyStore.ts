/**
 * API Key Store — localStorage helper for the user's Anthropic API key.
 * The key is stored locally on the user's machine and sent with each AI request.
 * It never touches the server's environment or database.
 */

const STORAGE_KEY = 'cc_anthropic_api_key';

export function getApiKey(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setApiKey(key: string): void {
  localStorage.setItem(STORAGE_KEY, key.trim());
}

export function clearApiKey(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasApiKey(): boolean {
  const key = getApiKey();
  return !!key && key.length > 10;
}
