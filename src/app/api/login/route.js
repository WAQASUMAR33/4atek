// src/app/api/login/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";

// 🔒 credentials from environment variables
const USER = process.env.ADMIN_USER || process.env.ADMIN_USERNAME;
const PASS = process.env.ADMIN_PASS || process.env.ADMIN_PASSWORD;

export async function POST(req) {
    try {
        // Debug: Check if environment variables are loaded
        if (!USER || !PASS) {
            console.error("Admin credentials not configured in environment variables");
            return NextResponse.json({ ok: false, error: "Server configuration error" }, { status: 500 });
        }

        const { username, password } = await req.json();

        if (username === USER && password === PASS) {
            const res = NextResponse.json({ ok: true });

            res.cookies.set("adm", "1", {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });

            return res;
        }

        return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
    } catch (e) {
        return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
    }
}
