export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "../../../util/prisma"; // from [id]/route.js → ../../util/prisma

// GET one service
export async function GET(_req, ctx) {
    try {
        const { id } = await ctx.params;        // ✅ await params
        const item = await prisma.service.findUnique({ where: { id } });
        if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(item);
    } catch (e) {
        console.error("[GET /api/services/:id]", e);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

// UPDATE a service
export async function PUT(req, ctx) {
    try {
        const { id } = await ctx.params;        // ✅ await params
        const body = await req.json();
        const existing = await prisma.service.findUnique({ where: { id } });
        if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

        const updated = await prisma.service.update({
            where: { id },
            data: {
                title: body.title ?? existing.title,
                slug: body.slug ?? existing.slug,
                subtitle: body.subtitle ?? existing.subtitle,
                coverImage: body.coverImage ?? existing.coverImage,
                image1: body.image1 ?? existing.image1,
                details: body.details ?? existing.details,
                highlights: body.highlights ?? existing.highlights, // <-- keep highlights support
                q1: body.q1 ?? existing.q1,
                q2: body.q2 ?? existing.q2,
                q3: body.q3 ?? existing.q3,
                q4: body.q4 ?? existing.q4,
                q5: body.q5 ?? existing.q5,
            },
        });

        return NextResponse.json(updated);
    } catch (e) {
        console.error("[PUT /api/services/:id]", e);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

// DELETE a service
export async function DELETE(_req, ctx) {
    try {
        const { id } = await ctx.params;        // ✅ await params
        await prisma.service.delete({ where: { id } });
        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("[DELETE /api/services/:id]", e);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
