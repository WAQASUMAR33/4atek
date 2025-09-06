// src/app/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [next, setNext] = useState("/dashboard/portfolio");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Get the next parameter from URL on client side only
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            const nextParam = urlParams.get("next");
            if (nextParam) {
                setNext(nextParam);
            }
        }
    }, []);

    async function submit(e) {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (!res.ok) {
                setErr("Login failed. Check username/password.");
            } else {
                router.replace(next);
            }
        } catch {
            setErr("Network error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid place-items-center bg-[#0a2c30]">
            <form
                onSubmit={submit}
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-md"
            >
                <h1 className="mb-4 text-xl font-semibold text-[#0f6f70]">Admin Login</h1>

                <label className="block text-sm text-gray-700">Username</label>
                <input
                    className="mt-1 mb-3 w-full rounded-md border px-3 py-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="username"
                />

                <label className="block text-sm text-gray-700">Password</label>
                <input
                    className="mt-1 mb-4 w-full rounded-md border px-3 py-2"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                />

                {err && <p className="mb-3 text-sm text-red-600">{err}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-[#0f6f70] py-2 text-white hover:bg-[#0d5a5b] disabled:opacity-60"
                >
                    {loading ? "Signing in…" : "Sign in"}
                </button>
            </form>
        </div>
    );
}
