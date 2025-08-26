// src/app/api/logout/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("adm", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0, // delete
    });
    return res;
}
