import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { currentUser, loading } = useAuth();

    // Show loading spinner while Firebase checks auth state
    if (loading) {
        return (
            <div className="min-h-screen bg-cc-bg flex items-center justify-center font-dm">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-cc-border border-t-cc-red rounded-full animate-spin" />
                    <p className="text-sm font-black text-cc-text uppercase tracking-widest">Loading...</p>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
