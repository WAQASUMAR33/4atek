"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { uploadImageFile } from "@/app/lib/upload";
import Image from 'next/image';

export default function NewServicePage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [image1, setImage1] = useState("");
    const [details, setDetails] = useState("");

    // NEW: highlights (one bullet per line)
    const [highlights, setHighlights] = useState("");

    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [q5, setQ5] = useState("");
    const [saving, setSaving] = useState(false);

    const coverRef = useRef(null);
    const img1Ref = useRef(null);

    const submit = async () => {
        if (!title.trim()) return alert("Title is required");
        setSaving(true);
        const res = await fetch("/api/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                slug: slug || undefined,
                subtitle,
                coverImage: coverImage || null,
                image1: image1 || null,
                details,

                // NEW
                highlights,

                q1, q2, q3, q4, q5,
            }),
        });
        setSaving(false);
        if (!res.ok) return alert("Failed to create");
        const created = await res.json();
        router.replace(`/dashboard/services/${created.id}/edit`);
    };

    return (
        <div className="space-y-6">
            <div className="-mx-5 border-b border-black/5 bg-white px-5 py-3">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <div className="text-base font-medium text-[#0f6f70]">New Service</div>
                    <button
                        onClick={submit}
                        disabled={saving}
                        className="rounded-lg bg-[#0f6f70] px-4 py-2 text-sm text-white hover:bg-[#0d5a5b]"
                    >
                        {saving ? "Saving…" : "Create"}
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                {/* Left */}
                <section className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Title</label>
                        <input
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Slug (optional)</label>
                        <input
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            placeholder="auto-generated from title"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Subtitle (short description)</label>
                        <input
                            className="mt-1 w-full rounded-md border px-3 py-2"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Details (plain text)</label>
                        <textarea
                            className="mt-1 min-h-[200px] w-full rounded-md border px-3 py-2"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Longer description if needed…"
                        />
                    </div>

                    {/* NEW: Highlights */}
                    <div>
                        <label className="text-sm text-gray-600">Highlights (one per line)</label>
                        <textarea
                            className="mt-1 w-full rounded-md border px-3 py-2 min-h-[120px]"
                            value={highlights}
                            onChange={(e) => setHighlights(e.target.value)}
                            placeholder={"e.g.\nResponsive Websites\nReact / Next.js Apps\nPerformance & SEO"}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            These appear on the hover panel of the service card. One line = one bullet.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                            <label className="text-sm text-gray-600">Q1 (Heading: description)</label>
                            <input className="mt-1 w-full rounded-md border px-3 py-2" value={q1} onChange={(e) => setQ1(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Q2 (Heading: description)</label>
                            <input className="mt-1 w-full rounded-md border px-3 py-2" value={q2} onChange={(e) => setQ2(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Q3 (Heading: description)</label>
                            <input className="mt-1 w-full rounded-md border px-3 py-2" value={q3} onChange={(e) => setQ3(e.target.value)} />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Q4 (Heading: description)</label>
                            <input className="mt-1 w-full rounded-md border px-3 py-2" value={q4} onChange={(e) => setQ4(e.target.value)} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-sm text-gray-600">Q5 (Heading: description)</label>
                            <input className="mt-1 w-full rounded-md border px-3 py-2" value={q5} onChange={(e) => setQ5(e.target.value)} />
                        </div>
                    </div>
                </section>

                {/* Right */}
                <aside className="space-y-4">
                    {/* Cover image */}
                    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                        <div className="mb-2 text-sm font-medium text-[#0f6f70]">Cover Image</div>
                        <div className="flex gap-2">
                            <input
                                className="w-full rounded-md border px-3 py-2"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                placeholder="https://…"
                            />
                            <button
                                type="button"
                                onClick={() => coverRef.current?.click()}
                                className="rounded-md border px-3 py-2 text-sm text-[#0f6f70] hover:bg-[#f0fbfb]"
                            >
                                Upload
                            </button>
                            <input
                                ref={coverRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const f = e.target.files?.[0];
                                    if (!f) return;
                                    try {
                                        const url = await uploadImageFile(f);
                                        setCoverImage(url);
                                    } catch (err) {
                                        alert(err.message);
                                    } finally {
                                        e.target.value = "";
                                    }
                                }}
                            />
                        </div>
                        {!!coverImage && (
                            <div className="mt-3 overflow-hidden rounded">
                                {/* Give Image a sized, relative box + aspect ratio */}
                                <div className="relative w-full aspect-[16/9]">
                                    <Image
                                        src={coverImage}
                                        alt="Cover"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 320px"
                                        className="object-cover"
                                        priority={false}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Image 1 */}
                    <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
                        <div className="mb-2 text-sm font-medium text-[#0f6f70]">Image 1</div>
                        <div className="flex gap-2">
                            <input
                                className="w-full rounded-md border px-3 py-2"
                                value={image1}
                                onChange={(e) => setImage1(e.target.value)}
                                placeholder="https://…"
                            />
                            <button
                                type="button"
                                onClick={() => img1Ref.current?.click()}
                                className="rounded-md border px-3 py-2 text-sm text-[#0f6f70] hover:bg-[#f0fbfb]"
                            >
                                Upload
                            </button>
                            <input
                                ref={img1Ref}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const f = e.target.files?.[0];
                                    if (!f) return;
                                    try {
                                        const url = await uploadImageFile(f);
                                        setImage1(url);
                                    } catch (err) {
                                        alert(err.message);
                                    } finally {
                                        e.target.value = "";
                                    }
                                }}
                            />
                        </div>

                        {!!image1 && (
                            <div className="mt-3 overflow-hidden rounded">
                                <div className="relative w-full aspect-[16/9]">
                                    <Image
                                        src={image1}
                                        alt="Service image 1"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 320px"
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}
