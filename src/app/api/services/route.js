export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "../../util/prisma";

const MAX_TAKE = 50;

function slugify(s) {
    return s
        .toString()
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
        .slice(0, 80);
}

/** List services (search + cursor pagination) */
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const takeParam = Number(searchParams.get("take") ?? 20);
        const take = Number.isFinite(takeParam)
            ? Math.min(Math.max(takeParam, 1), MAX_TAKE)
            : 20;

        const cursor = searchParams.get("cursor") || undefined;
        const search = (searchParams.get("search") || "").trim();

        const where = search
            ? {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { subtitle: { contains: search, mode: "insensitive" } },
                ],
            }
            : undefined;

        const items = await prisma.service.findMany({
            where,
            orderBy: { updatedAt: "desc" },
            take,
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            // include highlights so cards can render hover bullets
            select: {
                id: true,
                title: true,
                slug: true,
                subtitle: true,
                coverImage: true,
                image1: true,
                highlights: true,   // <-- NEW
                updatedAt: true,
                // status: true,
            },
        });

        const nextCursor = items.length === take ? items[items.length - 1].id : null;
        return NextResponse.json({ items, nextCursor });
    } catch (e) {
        console.error("[GET /api/services]", e);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

/** Create a service (auto slug; accepts all fields from your schema) */
export async function POST(req) {
    try {
        if (!req.headers.get("content-type")?.includes("application/json")) {
            return NextResponse.json(
                { error: "Content-Type must be application/json" },
                { status: 415 }
            );
        }

        const body = await req.json();
        const title = typeof body.title === "string" ? body.title.trim() : "";
        if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

        // slug (allow override, else generate)
        let slug =
            typeof body.slug === "string" && body.slug.trim()
                ? slugify(body.slug)
                : slugify(title);
        if (!slug) slug = slugify(`${title}-${Date.now()}`);

        // ensure slug uniqueness
        const exists = await prisma.service.findUnique({ where: { slug } });
        if (exists) slug = slugify(`${slug}-${Date.now()}`);

        const created = await prisma.service.create({
            data: {
                title,
                slug,
                subtitle: body.subtitle ?? null,
                coverImage: body.coverImage ?? null,
                image1: body.image1 ?? null,
                details: body.details ?? null,

                // NEW
                highlights: body.highlights ?? null,

                q1: body.q1 ?? null,
                q2: body.q2 ?? null,
                q3: body.q3 ?? null,
                q4: body.q4 ?? null,
                q5: body.q5 ?? null,
                // ...(body.status ? { status: body.status } : {}),
            },
        });

        return NextResponse.json(created, { status: 201 });
    } catch (e) {
        console.error("[POST /api/services]", e);
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}
