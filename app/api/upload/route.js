// src/app/api/upload/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";

const REMOTE_UPLOAD_URL =
    process.env.IMAGE_UPLOAD_PHP_URL ||
    "https://a4tech.virgocrumbs.com/upload_Image.php";

const PUBLIC_BASE =
    process.env.NEXT_PUBLIC_IMAGE_UPLOAD_BASE ||
    "https://a4tech.virgocrumbs.com/uploads";

/* -------------------------- helpers -------------------------- */
function stripDataUrl(s) {
    if (typeof s !== "string") return "";
    const i = s.indexOf(";base64,");
    return i !== -1 ? s.slice(i + ";base64,".length) : s.trim();
}

function makeAbsolute(url) {
    if (!/^https?:\/\//i.test(url)) {
        return `${PUBLIC_BASE.replace(/\/+$/, "")}/${String(url).replace(/^\/+/, "")}`;
    }
    return url;
}

function guessMime(filename) {
    const ext = String(filename || "").toLowerCase().split(".").pop();
    switch (ext) {
        case "png": return "image/png";
        case "jpg":
        case "jpeg": return "image/jpeg";
        case "webp": return "image/webp";
        case "gif": return "image/gif";
        default: return "image/jpeg";
    }
}

/* ---------------------- single JSON method -------------------- */
async function uploadViaJson({ filename, dataUrl, base64 }) {
    const payload = {
        filename: filename || "upload.jpg",
        // What your Postman test used (Hostinger/PHP friendly)
        imageBase64: dataUrl,
        // Extra copies in case the PHP script accepts these
        image: base64,
        data: base64,
    };

    const res = await fetch(REMOTE_UPLOAD_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // some shared hosts block unknown agents
            "User-Agent": "NextUpload/1.0",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
    });

    const text = await res.text();
    let json; try { json = JSON.parse(text); } catch { json = {}; }

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`);
    if (json.error) throw new Error(json.error);

    const url = json.url || json.image_url || json.path || json.file || text.trim();
    if (!url || /error/i.test(String(url))) throw new Error(text.trim() || "No URL/filename returned");
    return makeAbsolute(url);
}

/* -------------------------- handler --------------------------- */
export async function POST(req) {
    try {
        if (!REMOTE_UPLOAD_URL) {
            return NextResponse.json(
                { error: "IMAGE_UPLOAD_PHP_URL not configured" },
                { status: 500 }
            );
        }

        const body = await req.json().catch(() => ({}));
        const filename = (body.filename || "").toString().trim() || "upload.jpg";
        const raw = body.imageBase64 || body.image || body.data || "";

        if (!raw) {
            return NextResponse.json(
                { error: "Provide imageBase64 | image | data" },
                { status: 400 }
            );
        }

        const base64 = stripDataUrl(raw);
        if (!base64) {
            return NextResponse.json({ error: "Invalid base64" }, { status: 400 });
        }

        // ~size guard (5MB)
        const approxBytes = Math.ceil(base64.length * 3 / 4);
        if (approxBytes > 5 * 1024 * 1024) {
            return NextResponse.json({ error: "Image too large (>5MB)" }, { status: 413 });
        }

        // ensure we have a full data URL (in case client sent raw base64)
        const dataUrl = /^data:.*;base64,/.test(raw)
            ? raw
            : `data:${guessMime(filename)};base64,${base64}`;

        const url = await uploadViaJson({ filename, dataUrl, base64 });
        return NextResponse.json({ url });
    } catch (e) {
        console.error("[/api/upload] error", e);
        return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
    }
}
