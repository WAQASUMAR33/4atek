// src/app/api/login/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";

// 🔒 hard-coded credentials
const USER = "admin";
const PASS = "786@786";

export async function POST(req) {
    try {
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
