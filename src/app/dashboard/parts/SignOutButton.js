// src/app/dashboard/parts/SignOutButton.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignOutButton({ className = "" }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function signOut() {
        try {
            setLoading(true);
            await fetch("/api/logout", { method: "POST" });
            router.replace("/login");
        } catch {
            // swallow
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={signOut}
            disabled={loading}
            className={`rounded-md border border-white/20 bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/15 disabled:opacity-60 ${className}`}
            title="Sign out"
        >
            {loading ? "Signing out…" : "Sign out"}
        </button>
    );
}
