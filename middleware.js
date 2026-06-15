// src/middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
    const { pathname, search } = req.nextUrl;

    // let login and auth APIs through
    if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/api/login") ||
        pathname.startsWith("/api/logout")
    ) {
        return NextResponse.next();
    }

    // protect dashboard
    if (pathname.startsWith("/dashboard")) {
        const cookie = req.cookies.get("adm")?.value;
        if (cookie === "1") return NextResponse.next();

        // not signed-in -> go to /login?next=<original>
        const url = req.nextUrl.clone();
        url.pathname = "/login";
        url.search = `?next=${encodeURIComponent(pathname + search)}`;
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/api/login", "/api/logout"],
};
