import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextValue {
    currentUser: any;
    userProfile: any;
    updateProfile: (updates: any) => any;
    signup: (name: string, email: string, password: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    logout: () => void;
    demoLogin: () => void;
    loading?: boolean;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);
export function useAuth() { return useContext(AuthContext); }

// ── Storage helpers ────────────────────────────────────────────────────────────
const USERS_KEY    = 'cc_users';
const SESSION_KEY  = 'cc_session';
const profileKey   = (uid) => `cc_profile_${uid}`;

function getUsers()          { try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; } }
function saveUsers(u)        { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
function getRawSession()     { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; } }
function saveSession(u)      { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); }
function clearSession()      { localStorage.removeItem(SESSION_KEY); }

// Per-user profile ─ fresh for every new account
function getProfile(uid)     { try { return JSON.parse(localStorage.getItem(profileKey(uid))) || null; } catch { return null; } }
function saveProfile(uid, p) { localStorage.setItem(profileKey(uid), JSON.stringify(p)); }

function makeDefaultProfile(uid, displayName, email) {
    return {
        uid,
        displayName,
        email,
        career: null,          // set after onboarding
        status: null,
        level: null,
        companies: [],
        xp: 0,
        streak: 0,
        completedNodes: [],    // array of node IDs the user has finished
        activityLog: [],       // [{ action, xp, timestamp }]
        onboardingDone: false,
        createdAt: new Date().toISOString(),
    };
}

// ── Provider ───────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser]   = useState(() => getRawSession());
    const [userProfile, setUserProfile]   = useState(() => {
        const s = getRawSession();
        return s ? getProfile(s.uid) : null;
    });

    // Keep profile in sync whenever currentUser changes
    useEffect(() => {
        if (currentUser?.uid) {
            const p = getProfile(currentUser.uid);
            setUserProfile(p);
        } else {
            setUserProfile(null);
        }
    }, [currentUser]);

    /** Update a subset of the current user's profile and persist it */
    function updateProfile(updates) {
        if (!currentUser?.uid) return;
        const existing = getProfile(currentUser.uid) || makeDefaultProfile(currentUser.uid, currentUser.displayName, currentUser.email);
        const merged = { ...existing, ...updates };
        saveProfile(currentUser.uid, merged);
        setUserProfile(merged);
        return merged;
    }

    /** Sign up — creates fresh account + fresh profile */
    async function signup(name, email, password) {
        await delay(600);
        const users = getUsers();
        if (users.find(u => u.email === email)) {
            throw new Error('An account with this email already exists. Please sign in instead.');
        }
        const uid = `local_${Date.now()}`;
        const newUser = { uid, displayName: name, email, password, createdAt: new Date().toISOString() };
        saveUsers([...users, newUser]);

        const session = { uid, displayName: name, email };
        saveSession(session);
        setCurrentUser(session);

        // Create a completely fresh profile for this new account
        const profile = makeDefaultProfile(uid, name, email);
        saveProfile(uid, profile);
        setUserProfile(profile);

        return session;
    }

    /** Sign in — loads that account's own profile */
    async function login(email, password) {
        await delay(600);
        const users = getUsers();
        const user  = users.find(u => u.email === email && u.password === password);
        if (!user) throw new Error('Incorrect email or password. Please try again.');

        const session = { uid: user.uid, displayName: user.displayName, email: user.email };
        saveSession(session);
        setCurrentUser(session);

        // Load that account's profile (creates default if missing)
        let profile = getProfile(user.uid);
        if (!profile) {
            profile = makeDefaultProfile(user.uid, user.displayName, user.email);
            saveProfile(user.uid, profile);
        }
        setUserProfile(profile);

        return session;
    }

    /** Demo login — always a fresh profile so it's predictable */
    function demoLogin() {
        const demo = { uid: 'demo', displayName: 'Demo User', email: 'demo@careercraft.in' };
        saveSession(demo);
        setCurrentUser(demo);
        const profile = makeDefaultProfile('demo', 'Demo User', 'demo@careercraft.in');
        saveProfile('demo', profile);
        setUserProfile(profile);
    }

    /** Sign out */
    function logout() {
        clearSession();
        setCurrentUser(null);
        setUserProfile(null);
    }

    const value = { currentUser, userProfile, updateProfile, signup, login, logout, demoLogin };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
