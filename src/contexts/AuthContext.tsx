import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {
    auth,
    db,
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    loginWithGitHub,
    logoutUser,
    getUserProfile,
    setUserProfile,
} from '../firebase';

interface AuthContextValue {
    currentUser: any;
    userProfile: any;
    updateProfile: (updates: any) => any;
    signup: (name: string, email: string, password: string) => Promise<any>;
    login: (email: string, password: string) => Promise<any>;
    signInWithGoogle: () => Promise<any>;
    signInWithGitHub: (username?: string) => Promise<any>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);
export function useAuth() { return useContext(AuthContext); }

// ── Default Profile Factory ────────────────────────────────────────────────────

function makeDefaultProfile(uid: string, displayName: string, email: string, extra: any = {}) {
    return {
        uid,
        displayName,
        email,
        photoURL: extra.photoURL || null,
        authProvider: extra.authProvider || 'email',
        career: null,
        secondaryDomains: [],
        skillLevels: {},
        status: null,
        level: 1,
        goalTimeline: '6_months',
        xp: 0,
        streak: 0,
        completedNodes: [],
        secondaryProgress: {},
        activityLog: [],
        behavioralTraits: {
            focus: 5,
            discipline: 5,
            consistency: 5,
            procrastination: 2
        },
        learningSpeed: 'standard',
        onboardingDone: false,
        createdAt: new Date().toISOString(),
        github: extra.github || null,
    };
}

/**
 * Derives behavioral traits and learning speed from activity patterns
 */
export function computeUserInsights(profile: any) {
    if (!profile || !profile.activityLog) return profile;

    const logs = profile.activityLog;
    if (logs.length < 3) return profile;

    const now = new Date();
    const last7Days = logs.filter((l: any) => {
        const d = new Date(l.timestamp);
        return (now.getTime() - d.getTime()) < (7 * 24 * 60 * 60 * 1000);
    });

    // Derive consistency 
    const consistency = Math.min(10, Math.max(1, profile.streak || 1));
    
    // Derive focus (tasks per active day)
    const activeDays = new Set(last7Days.map((l: any) => new Date(l.timestamp).toDateString())).size;
    const focus = Math.min(10, Math.max(1, activeDays > 0 ? (last7Days.length / activeDays) * 2 : 1));

    // Derive learning speed
    let speed = 'standard';
    if (last7Days.length > 10) speed = 'intensive';
    else if (last7Days.length < 3) speed = 'relaxed';

    return {
        ...profile,
        behavioralTraits: {
            ...profile.behavioralTraits,
            consistency: Math.round(consistency),
            focus: Math.round(focus),
            discipline: Math.min(10, Math.round((consistency + focus) / 2)),
            procrastination: Math.max(0, 10 - Math.round(activeDays * 1.5))
        },
        learningSpeed: speed
    };
}

// ── Provider ───────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [userProfile, setUserProfile_] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Listen to Firebase Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userObj = {
                    uid: firebaseUser.uid,
                    displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
                    email: firebaseUser.email,
                    photoURL: firebaseUser.photoURL,
                };
                setCurrentUser(userObj);

                // Load profile from Firestore
                try {
                    let profile = await getUserProfile(firebaseUser.uid);
                    if (!profile) {
                        // First-time user — create default profile in Firestore
                        profile = makeDefaultProfile(
                            firebaseUser.uid,
                            userObj.displayName,
                            userObj.email || '',
                            {
                                authProvider: firebaseUser.providerData?.[0]?.providerId || 'email',
                                photoURL: firebaseUser.photoURL,
                            }
                        );
                        await setUserProfile(firebaseUser.uid, profile);
                    }
                    setUserProfile_(computeUserInsights(profile));
                } catch (err) {
                    console.error('Error loading profile from Firestore:', err);
                    // Fallback: create local profile so app doesn't break
                    const fallback = makeDefaultProfile(firebaseUser.uid, userObj.displayName, userObj.email || '');
                    setUserProfile_(fallback);
                }
            } else {
                setCurrentUser(null);
                setUserProfile_(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    /** Update a subset of the current user's profile and persist to Firestore */
    async function updateProfile(updates: any) {
        if (!currentUser?.uid) return;
        const existing = userProfile || makeDefaultProfile(currentUser.uid, currentUser.displayName, currentUser.email);
        const merged = { ...existing, ...updates };
        const processed = computeUserInsights(merged);
        
        // Update local state immediately for responsiveness
        setUserProfile_(processed);
        
        // Persist to Firestore in background
        try {
            await setUserProfile(currentUser.uid, processed);
        } catch (err) {
            console.error('Error saving profile to Firestore:', err);
        }
        
        return processed;
    }

    /** Sign up with email + password */
    async function signup(name: string, email: string, password: string) {
        const firebaseUser = await registerWithEmail(email, password, name);
        
        // Create profile in Firestore (graceful fallback if rules block it)
        const profile = makeDefaultProfile(firebaseUser.uid, name, email, { authProvider: 'email' });
        const processed = computeUserInsights(profile);
        try {
            await setUserProfile(firebaseUser.uid, processed);
        } catch (err) {
            console.warn('Firestore write blocked (check security rules). Using local profile.', err);
        }
        setUserProfile_(processed);

        return { uid: firebaseUser.uid, displayName: name, email, profile: processed };
    }

    /** Sign in with email + password */
    async function login(email: string, password: string) {
        const firebaseUser = await loginWithEmail(email, password);
        let profile = null;
        try {
            profile = await getUserProfile(firebaseUser.uid);
        } catch (err) {
            console.warn('Firestore read blocked (check security rules). Using local profile.', err);
        }
        if (!profile) {
            profile = makeDefaultProfile(firebaseUser.uid, firebaseUser.displayName || email.split('@')[0], email, { authProvider: 'email' });
            setUserProfile_(computeUserInsights(profile));
        }
        return { uid: firebaseUser.uid, displayName: firebaseUser.displayName, email: firebaseUser.email, profile };
    }

    /** Google sign-in — real Firebase popup */
    async function handleGoogleSignIn() {
        const firebaseUser = await loginWithGoogle();
        
        let profile = null;
        try {
            profile = await getUserProfile(firebaseUser.uid);
            if (!profile) {
                profile = makeDefaultProfile(
                    firebaseUser.uid,
                    firebaseUser.displayName || 'Google User',
                    firebaseUser.email || '',
                    { authProvider: 'google.com', photoURL: firebaseUser.photoURL }
                );
                await setUserProfile(firebaseUser.uid, profile);
            }
        } catch (err) {
            console.warn('Firestore access blocked (check security rules). Using local profile.', err);
            profile = makeDefaultProfile(
                firebaseUser.uid,
                firebaseUser.displayName || 'Google User',
                firebaseUser.email || '',
                { authProvider: 'google.com', photoURL: firebaseUser.photoURL }
            );
        }
        setUserProfile_(computeUserInsights(profile));

        return { uid: firebaseUser.uid, displayName: firebaseUser.displayName, email: firebaseUser.email, profile };
    }

    /** GitHub sign-in — real Firebase popup + fetch GitHub API data */
    async function handleGitHubSignIn(username?: string) {
        const firebaseUser = await loginWithGitHub();
        
        // Try to get GitHub username from Firebase user or use the provided one
        const ghUsername = username || 
            (firebaseUser.providerData?.find((p: any) => p.providerId === 'github.com') as any)?.uid ||
            firebaseUser.displayName;

        let githubProfile = null;

        // Fetch real GitHub data if we have a username
        if (ghUsername) {
            try {
                const res = await fetch(`https://api.github.com/users/${ghUsername}`);
                if (res.ok) {
                    const ghData = await res.json();
                    const reposRes = await fetch(`https://api.github.com/users/${ghUsername}/repos?per_page=100&sort=updated`);
                    const repos = reposRes.ok ? await reposRes.json() : [];

                    githubProfile = {
                        username: ghData.login,
                        name: ghData.name,
                        bio: ghData.bio,
                        avatar: ghData.avatar_url,
                        url: ghData.html_url,
                        publicRepos: ghData.public_repos,
                        followers: ghData.followers,
                        following: ghData.following,
                        createdAt: ghData.created_at,
                        company: ghData.company,
                        location: ghData.location,
                        blog: ghData.blog,
                        repos: repos.slice(0, 20).map((r: any) => ({
                            name: r.name,
                            description: r.description,
                            language: r.language,
                            stars: r.stargazers_count,
                            forks: r.forks_count,
                            url: r.html_url,
                            updatedAt: r.updated_at,
                        })),
                        totalStars: repos.reduce((sum: number, r: any) => sum + (r.stargazers_count || 0), 0),
                        languages: [...new Set(repos.map((r: any) => r.language).filter(Boolean))],
                    };
                }
            } catch (err) {
                console.warn('Could not fetch GitHub data:', err);
            }
        }

        // Check if profile exists in Firestore (graceful fallback)
        let profile = null;
        try {
            profile = await getUserProfile(firebaseUser.uid);
            if (!profile) {
                profile = makeDefaultProfile(
                    firebaseUser.uid,
                    firebaseUser.displayName || ghUsername || 'GitHub User',
                    firebaseUser.email || '',
                    {
                        authProvider: 'github.com',
                        photoURL: firebaseUser.photoURL,
                        github: githubProfile,
                    }
                );
                await setUserProfile(firebaseUser.uid, profile);
            } else if (githubProfile) {
                profile = { ...profile, github: githubProfile, photoURL: firebaseUser.photoURL || profile.photoURL };
                await setUserProfile(firebaseUser.uid, profile);
            }
        } catch (err) {
            console.warn('Firestore access blocked (check security rules). Using local profile.', err);
            profile = makeDefaultProfile(
                firebaseUser.uid,
                firebaseUser.displayName || ghUsername || 'GitHub User',
                firebaseUser.email || '',
                {
                    authProvider: 'github.com',
                    photoURL: firebaseUser.photoURL,
                    github: githubProfile,
                }
            );
        }
        setUserProfile_(computeUserInsights(profile));

        return { uid: firebaseUser.uid, displayName: firebaseUser.displayName, email: firebaseUser.email, profile };
    }

    /** Sign out */
    async function logout() {
        await logoutUser();
        setCurrentUser(null);
        setUserProfile_(null);
    }

    const value: AuthContextValue = {
        currentUser,
        userProfile,
        updateProfile,
        signup,
        login,
        signInWithGoogle: handleGoogleSignIn,
        signInWithGitHub: handleGitHubSignIn,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
