import Link from "next/link";
import { prisma } from "../../util/prisma";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPortfolioList() {
    const items = await prisma.portfolio.findMany({
        orderBy: { updatedAt: "desc" },
        select: { id: true, title: true, slug: true, status: true, updatedAt: true },
    });

    return (
        <section className="space-y-4">
            {/* Card header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold tracking-tight text-[#0f6f70]">
                    Portfolio
                </h2>
                <Link
                    href="/dashboard/portfolio/new"
                    className="rounded-lg bg-[#0f6f70] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#0d5a5b]"
                >
                    + New
                </Link>
            </div>

            {/* Card */}
            <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
                <div className="border-b border-black/5 bg-gradient-to-r from-[#f0fbfb] via-white to-[#f0fbfb] px-4 py-3 text-sm text-[#0f6f70]/80">
                    Manage your case studies
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[#F7FAFA]">
                            <tr className="text-left text-gray-600">
                                <th className="px-4 py-2 font-medium">Title</th>
                                <th className="px-4 py-2 font-medium">Slug</th>
                                <th className="px-4 py-2 font-medium text-center">Status</th>
                                <th className="px-4 py-2 font-medium">Updated</th>
                                <th className="px-4 py-2 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((it) => (
                                <tr key={it.id} className="border-t">
                                    <td className="px-4 py-3">{it.title}</td>
                                    <td className="px-4 py-3 text-gray-500">{it.slug}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs ${it.status === "PUBLISHED"
                                                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80"
                                                    : "bg-amber-50 text-amber-700 ring-1 ring-amber-200/80"
                                                }`}
                                        >
                                            {it.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {new Date(it.updatedAt).toLocaleString()}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link
                                            href={`/dashboard/portfolio/${it.id}/edit`}
                                            className="mr-3 rounded-md border px-3 py-1.5 text-sm text-[#0f6f70] hover:bg-[#f0fbfb]"
                                        >
                                            Edit
                                        </Link>
                                        <DeleteButton id={it.id} />
                                    </td>
                                </tr>
                            ))}

                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center text-gray-500">
                                        No items yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
