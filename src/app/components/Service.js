"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, BarChart3 } from "lucide-react";

/* ---------------- helpers ---------------- */

const gridStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardMotion = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

// get heading part of "Heading: description" (also supports — | - )
function parseHead(str) {
    if (!str || typeof str !== "string") return "";
    const m = str.match(/^(.*?)(?:\s*[:|—-]\s*)(.+)$/);
    return (m ? m[1] : str).trim();
}

// split highlights (newline/comma) -> clean array
function parseHighlights(h) {
    if (!h || typeof h !== "string") return [];
    return h
        .split(/\r?\n|,/)
        .map(s => s.trim())
        .filter(Boolean);
}

// transform API row -> card model
function toCard(svc) {
    // 1) Prefer the new `highlights`
    const fromHighlights = parseHighlights(svc.highlights).slice(0, 3);

    // 2) Fallback to q1..q5 (heading part)
    const fromQs = [svc.q1, svc.q2, svc.q3, svc.q4, svc.q5]
        .map(parseHead)
        .filter(Boolean)
        .slice(0, 3);

    const bullets = fromHighlights.length ? fromHighlights : fromQs;

    return {
        title: svc.title,
        img: svc.coverImage || svc.image1 || "/assets/services/placeholder.jpg",
        items: bullets.length ? bullets : ["Details coming soon…"],
        href: `/services/${svc.slug}`,
    };
}

/* --------------- component ---------------- */

export default function ServicesSection({ title = "Our Services" }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const res = await fetch("/api/services", { cache: "no-store" });
                const json = await res.json();
                if (!alive) return;
                // supports {items:[...]} or [...]
                const cards = (json?.items || json || []).map(toCard);
                setItems(cards);
            } catch (e) {
                console.error("Load services failed:", e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    return (
        <section className="w-full py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f6f70] mb-8 sm:mb-10"
                >
                    {title}
                </motion.h2>

                {loading ? (
                    <div className="text-center text-sm text-gray-500">Loading…</div>
                ) : (
                    <motion.div
                        variants={gridStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {items.map((srv, idx) => (
                            <Card key={`${srv.title}-${idx}`} {...srv} />
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}

/* --------------- card --------------- */

function Card({ title, img, items, href }) {
    return (
        <motion.div variants={cardMotion} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.35 }}>
            <motion.article
                initial="rest"
                animate="rest"
                whileHover="hover"
                whileFocus="hover"
                tabIndex={0}
                className="group relative isolate overflow-hidden rounded-xl aspect-[16/11] shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:ring-2 hover:ring-[#19d3c5]"
            >
                {/* Background image */}
                <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.06]"
                    sizes="(max-width: 1280px) 50vw, 25vw"
                    priority={false}
                />

                {/* Title row (visible until hover) */}
                <div className="absolute left-4 right-4 bottom-4 flex items-center gap-2 pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white">
                        <BarChart3 className="h-5 w-5" />
                    </span>
                    <h3 className="text-white font-semibold text-lg drop-shadow">{title}</h3>
                </div>

                {/* Hover panel */}
                <motion.div
                    variants={{
                        rest: { y: -12, opacity: 0 },
                        hover: { y: 0, opacity: 1, transition: { duration: 0.28, ease: "easeOut" } },
                    }}
                    className="absolute inset-0 bg-gradient-to-b from-[#0f6f70]/70 via-[#0f6f70]/88 to-[#0f6f70]/96 text-white px-6 py-6 flex flex-col justify-start"
                >
                    <h4 className="text-white font-semibold text-[18px] leading-tight">{title}</h4>

                    <ul className="mt-4 space-y-2">
                        {(items || []).map((it) => (
                            <li key={it} className="flex items-start gap-2">
                                <svg className="mt-[2px] h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
                                    <path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-[13px] leading-[1.4] text-white/95">{it}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6">
                        <Link
                            href={href || "#"}
                            className="inline-flex items-center gap-2 rounded-full bg-[#19d3c5] px-5 py-2 text-[13px] font-semibold text-[#083a3b] shadow-sm hover:brightness-105 active:brightness-95 transition-all"
                        >
                            Learn More
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                </motion.div>
            </motion.article>
        </motion.div>
    );
}
