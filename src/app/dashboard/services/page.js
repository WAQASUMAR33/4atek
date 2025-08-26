"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function ServicesListPage() {
    const { data, error, isLoading, mutate } = useSWR("/api/services?take=50", fetcher);

    const onDelete = async (id) => {
        if (!confirm("Delete this service?")) return;
        const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
        if (!res.ok) {
            const t = await res.text();
            alert(`Failed to delete: ${t}`);
            return;
        }
        mutate(); // refresh list
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-[#0f6f70]">Services</h1>
                <Link
                    href="/dashboard/services/new"
                    className="rounded-lg bg-[#0f6f70] px-4 py-2 text-white text-sm hover:bg-[#0d5a5b]"
                >
                    New Service
                </Link>
            </div>

            {isLoading && <div>Loading…</div>}
            {error && <div className="text-red-600">Failed to load</div>}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(data?.items ?? []).map((s) => (
                    <div key={s.id} className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
                        <div className="text-xs text-gray-500">
                            Updated {new Date(s.updatedAt).toLocaleString()}
                        </div>
                        <div className="mt-1 font-medium text-[#0f6f70]">{s.title}</div>
                        <div className="text-xs text-gray-500 truncate">/{s.slug}</div>

                        {s.coverImage && (
                            <div className="relative mt-3 h-32 w-full overflow-hidden rounded">
                                <Image
                                    src={s.coverImage}
                                    alt={s.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                />
                            </div>
                        )}

                        <div className="mt-4 flex items-center gap-2">
                            <Link
                                href={`/dashboard/services/${s.id}/edit`}
                                className="rounded-md border px-3 py-1.5 text-sm text-[#0f6f70] hover:bg-[#f0fbfb]"
                            >
                                Edit
                            </Link>
                            <a
                                href={`/services/${s.slug}`}
                                target="_blank"
                                className="rounded-md border px-3 py-1.5 text-sm text-[#0f6f70] hover:bg-[#f0fbfb]"
                            >
                                View
                            </a>
                            <button
                                onClick={() => onDelete(s.id)}
                                className="ml-auto rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
