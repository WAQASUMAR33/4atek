export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import { prisma } from "../../../util/prisma";

// GET one (by id) - for editing
export async function GET(_req, { params }) {
    const { id } = await params;
    try {
        const item = await prisma.portfolio.findUnique({ where: { id } });
        if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(item);
    } catch (e) {
        console.error("[GET /api/portfolio/:id]", e);
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

// PUT update
export async function PUT(req, { params }) {
    const { id } = await params;
    try {
        const body = await req.json();
        const updated = await prisma.portfolio.update({
            where: { id },
            data: {
                title: typeof body.title === "string" ? body.title.trim() : undefined,
                image: typeof body.image === "string" ? body.image.trim() : undefined,
                shortDes:
                    typeof body.shortDes === "string"
                        ? body.shortDes.trim()
                        : typeof body["short-des"] === "string"
                            ? body["short-des"].trim()
                            : undefined,
                contentHtml: typeof body.contentHtml === "string" ? body.contentHtml : undefined,
                status: body.status === "DRAFT" ? "DRAFT" : body.status === "PUBLISHED" ? "PUBLISHED" : undefined,
            },
        });
        return NextResponse.json(updated);
    } catch (e) {
        console.error("[PUT /api/portfolio/:id]", e);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

// DELETE
export async function DELETE(_req, { params }) {
    const { id } = await params;
    try {
        await prisma.portfolio.delete({ where: { id } });
        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error("[DELETE /api/portfolio/:id]", e);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
