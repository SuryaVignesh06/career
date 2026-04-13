import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// ── Auth Functions ────────────────────────────────────────────────────────────

/** Sign up with email + password, then set displayName */
export async function registerWithEmail(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    return cred.user;
}

/** Sign in with email + password */
export async function loginWithEmail(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
}

/** Sign in with Google popup */
export async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
}

/** Sign in with GitHub popup */
export async function loginWithGitHub() {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user;
}

/** Sign out */
export async function logoutUser() {
    return signOut(auth);
}

// ── Firestore Helpers ─────────────────────────────────────────────────────────

/** Get user profile from Firestore */
export async function getUserProfile(uid) {
    let data = null;
    
    try {
        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists()) {
            data = snap.data();
        }
    } catch (err) {
        console.warn("Firestore read failed, checking local storage...", err);
    }
    
    // Check local storage
    let localData = null;
    try {
        const local = localStorage.getItem('cc_profile_' + uid);
        if (local) localData = JSON.parse(local);
    } catch (e) {}
    
    // If Firestore read succeeded but user already completed onboarding locally (write may have failed)
    if (data && localData && localData.onboardingDone && !data.onboardingDone) {
        data = { ...data, ...localData };
    } else if (!data && localData) {
        data = localData;
    }
    
    if (data) {
        try { localStorage.setItem('cc_profile_' + uid, JSON.stringify(data)); } catch (e) {}
    }
    
    return data;
}

/** Create or overwrite user profile in Firestore */
export async function setUserProfile(uid, data) {
    try { localStorage.setItem('cc_profile_' + uid, JSON.stringify(data)); } catch (e) {}
    try {
        await setDoc(doc(db, 'users', uid), data, { merge: true });
    } catch (err) {
        console.warn("Firestore write failed, saved to local storage fallback.", err);
    }
}

/** Update specific fields in user profile */
export async function updateUserProfile(uid, updates) {
    try {
        const local = localStorage.getItem('cc_profile_' + uid);
        if (local) {
            const merged = { ...JSON.parse(local), ...updates };
            localStorage.setItem('cc_profile_' + uid, JSON.stringify(merged));
        }
    } catch (e) {}
    
    try {
        await updateDoc(doc(db, 'users', uid), updates);
    } catch (err) {
        console.warn("Firestore update failed, updated in local storage fallback.", err);
    }
}

export { app, auth, db, storage, googleProvider, githubProvider };
