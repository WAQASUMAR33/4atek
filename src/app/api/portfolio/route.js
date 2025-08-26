// src/app/api/portfolio/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "../../util/prisma";
import { revalidateTag } from "next/cache";

const MAX_TAKE = 50;

const slugify = (s) =>
    s
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const takeParam = Number(searchParams.get("take") ?? 20);
        const take = Number.isFinite(takeParam)
            ? Math.min(Math.max(takeParam, 1), MAX_TAKE)
            : 20;

        const cursor = searchParams.get("cursor") || undefined;
        const search = (searchParams.get("search") || "").trim();
        const includeDrafts = searchParams.get("includeDrafts") === "1";

        const where = {
            ...(search ? { title: { contains: search } } : {}),
            ...(includeDrafts ? {} : { status: "PUBLISHED" }),
        };

        const items = await prisma.portfolio.findMany({
            where,
            orderBy: { id: "desc" }, // stable with id-cursor
            take,
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            select: {
                id: true,
                title: true,
                slug: true,
                image: true,
                shortDes: true,
                updatedAt: true,
                status: true,
            },
        });

        const nextCursor =
            items.length === take ? items[items.length - 1].id : null;

        return NextResponse.json({ items, nextCursor });
    } catch (error) {
        console.error("[GET /api/portfolio]", error);
        return NextResponse.json(
            { error: "Failed to fetch portfolio" },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const ct = (req.headers.get("content-type") || "").toLowerCase();
        if (!ct.includes("application/json")) {
            return NextResponse.json(
                { error: "Content-Type must be application/json" },
                { status: 415 }
            );
        }

        const body = await req.json();

        const title = typeof body.title === "string" ? body.title.trim() : "";
        if (!title)
            return NextResponse.json({ error: "Title is required" }, { status: 400 });

        // generate unique slug from title
        const baseSlug = slugify(title) || "post";
        let slug = baseSlug;
        let i = 2;
        while (await prisma.portfolio.findUnique({ where: { slug } })) {
            slug = `${baseSlug}-${i++}`;
        }

        const created = await prisma.portfolio.create({
            data: {
                title,
                slug,
                image: typeof body.image === "string" ? body.image.trim() : null,
                shortDes:
                    typeof body.shortDes === "string"
                        ? body.shortDes.trim()
                        : typeof body["short-des"] === "string"
                            ? body["short-des"].trim()
                            : null,
                context: typeof body.context === "string" ? body.context : null,
                url: typeof body.url === "string" ? body.url.trim() : null,
                contentHtml:
                    typeof body.contentHtml === "string" ? body.contentHtml : null,
                status: body.status === "DRAFT" ? "DRAFT" : "PUBLISHED",
            },
            select: { id: true, title: true, slug: true, status: true },
        });

        revalidateTag("portfolio");
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        console.error("[POST /api/portfolio]", error);
        return NextResponse.json(
            { error: "Failed to create portfolio" },
            { status: 500 }
        );
    }
}
