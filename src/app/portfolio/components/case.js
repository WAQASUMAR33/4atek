"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/* -------------------- Animations -------------------- */
const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/**
 * items: Array<{ id, slug, title, image, shortDes }>
 * We’ll render your same full-clickable card. If you want bullets,
 * you can add them to your schema later—right now we show shortDes.
 */
export default function CardGrid({ items = [] }) {
    if (!items.length) {
        return (
            <div className="mt-10 text-center text-gray-500">
                No portfolio items yet.
            </div>
        );
    }

    return (
        <div className="mt-10 grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2">
            {items.map((it) => (
                <CaseCard
                    key={it.id}
                    slug={it.slug}
                    title={it.title}
                    img={it.image || "/assets/portfolio/placeholder.jpg"}
                    lead={it.shortDes || "—"}
                />
            ))}
        </div>
    );
}

/* -------------------- Full clickable card -------------------- */
function CaseCard({ slug, title, lead, img }) {
    return (
        <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
        >
            <Link
                href={`/portfolio/${slug}`}
                className="group block focus:outline-none"
                aria-label={`${title} – view case study`}
            >
                <motion.article
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="rounded-2xl border border-black/5 shadow-sm bg-white overflow-hidden ring-1 ring-black/5
                     hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#0f6f70] transition"
                >
                    {/* Image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                            src={img}
                            alt={title}
                            fill
                            className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={false}
                        />
                        {/* Teal edge gradient for brand feel */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f6f70]/15 via-transparent to-transparent" />
                    </div>

                    {/* Body */}
                    <div className="p-5 sm:p-6">
                        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0f6f70]">
                            {title}
                        </h3>
                        <p className="mt-2 text-[15px] sm:text-[16px] leading-7 text-[#1D2939] line-clamp-3">
                            {lead}
                        </p>

                        {/* Optional bullets area (kept for your design).
                If/when you add bullets to DB, map them here.
            */}
                        {/* <ul className="mt-4 space-y-2">
              {bullets.slice(0, 3).map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[2px] inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0f6f70]/10">
                    <CheckCircle2 className="h-4 w-4 text-[#0f6f70]" />
                  </span>
                  <span className="text-[14.5px] sm:text-[15px] leading-7 text-[#1D2939]">
                    {b}
                  </span>
                </li>
              ))}
            </ul> */}

                        {/* CTA row */}
                        <div className="mt-5 flex items-center justify-between">
                            <span className="text-sm text-[#0f6f70]/80 group-hover:text-[#0f6f70] transition">
                                View case study
                            </span>
                            <span
                                className="inline-flex h-9 items-center justify-center rounded-xl border border-[#0f6f70]/30 px-3 text-sm
                           text-[#0f6f70] group-hover:bg-[#0f6f70] group-hover:text-white transition"
                            >
                                Read more
                            </span>
                        </div>
                    </div>
                </motion.article>
            </Link>
        </motion.div>
    );
}
