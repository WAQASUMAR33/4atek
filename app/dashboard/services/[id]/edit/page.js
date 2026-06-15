"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { uploadImageFile } from "@/app/lib/upload";

export default function EditServicePage() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [savedAt, setSavedAt] = useState(null);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [image1, setImage1] = useState("");
    const [details, setDetails] = useState("");

    // NEW
    const [highlights, setHighlights] = useState("");

    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [q5, setQ5] = useState("");

    const coverRef = useRef(null);
    const img1Ref = useRef(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/services/${id}`);
            if (!res.ok) {
                alert("Not found");
                router.replace("/dashboard/services");
                return;
            }
            const s = await res.json();
            setTitle(s.title || "");
            setSlug(s.slug || "");
            setSubtitle(s.subtitle || "");
            setCoverImage(s.coverImage || "");
            setImage1(s.image1 || "");
            setDetails(s.details || "");

            // NEW
            setHighlights(s.highlights || "");

            setQ1(s.q1 || "");
            setQ2(s.q2 || "");
            setQ3(s.q3 || "");
            setQ4(s.q4 || "");
            setQ5(s.q5 || "");
            setLoading(false);
        })();
    }, [id, router]);

    const save = async () => {
        setSaving(true);
        const res = await fetch(`/api/services/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                slug,
                subtitle,
                coverImage,
                image1,
                details,

                // NEW
                highlights,

                q1,
                q2,
                q3,
                q4,
                q5,
            }),
        });
        setSaving(false);
        if (!res.ok) return alert("Failed to save");
        setSavedAt(new Date());
        router.refresh();
    };

    const del = async () => {
        if (!confirm("Delete this service?")) return;
        const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
        if (!res.ok) return alert("Failed to delete");
        router.replace("/dashboard/services");
    };

    if (loading) return <div className="p-6">Loading…</div>;

    return (
        <div className="space-y-6">
            <div className="-mx-5 border-b border-black/5 bg-white px-5 py-3">
                <div className="mx-auto flex max-w-6xl items-center justify-between">
                    <div className="min-w-0">
                        <div className="text-xs text-gray-500">Editing</div>
                        <div className="truncate text-base font-medium text-[#0f6f70]">
                            {title || "Untitled"}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-500">
                            {saving ? "Saving…" : savedAt ? `Saved ${savedAt.toLocaleTimeString()}` : ""}
                        </div>
                        {slug && (
                            <a
                                href={`/services/${slug}`}
                                target="_blank"
                                className="rounded-md border px-3 py-1.5 text-sm text-[#0f6f70] hover:bg-[#f0fbfb]"
                            >
                                View
                            </a>
                        )}
                        <button
                            onClick={save}
                            disabled={saving}
                            className="rounded-lg bg-[#0f6f70] px-4 py-2 text-sm text-white hover:bg-[#0d5a5b]"
                        >
                            Save
                        </button>
                        <button
                            onClick={del}
                            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
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
                        <label className="text-sm text-gray-600">Slug</label>
                        <input
                            className="mt-1 w-full rounded-md border px-3 py-2"
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
                        />
                    </div>

                    {/* NEW: Highlights */}
                    <div>
                        <label className="text-sm text-gray-600">Highlights (one per line)</label>
                        <textarea
                            className="mt-1 w-full rounded-md border px-3 py-2 min-h-[120px]"
                            value={highlights}
                            onChange={(e) => setHighlights(e.target.value)}
                            placeholder={"Responsive Websites\nReact / Next.js Apps\nPerformance & SEO"}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            These appear on the hover panel of the service card.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                            <label className="text-sm text-gray-600">Q1 (Heading: description)</label>
                            <input
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                value={q1}
                                onChange={(e) => setQ1(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Q2 (Heading: description)</label>
                            <input
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                value={q2}
                                onChange={(e) => setQ2(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Q3 (Heading: description)</label>
                            <input
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                value={q3}
                                onChange={(e) => setQ3(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600">Q4 (Heading: description)</label>
                            <input
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                value={q4}
                                onChange={(e) => setQ4(e.target.value)}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-sm text-gray-600">Q5 (Heading: description)</label>
                            <input
                                className="mt-1 w-full rounded-md border px-3 py-2"
                                value={q5}
                                onChange={(e) => setQ5(e.target.value)}
                            />
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
                            <div className="relative mt-3 h-32 w-full overflow-hidden rounded">
                                <Image
                                    src={coverImage}
                                    alt="cover"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 320px"
                                />
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
                            <div className="relative mt-3 h-32 w-full overflow-hidden rounded">
                                <Image
                                    src={image1}
                                    alt="image1"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 320px"
                                />
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}
