"use client";

import { motion } from "framer-motion";
import { Lightbulb, Cog, Target, Crosshair } from "lucide-react";

const items = [
    { label: "CREATIVITY", Icon: Lightbulb },
    { label: "PASSION", Icon: Cog },
    { label: "GOAL", Icon: Target },
    { label: "PURPOSE", Icon: Crosshair },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemAnim = {
    hidden: { opacity: 0, y: 14, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function ValuesStrip() {
    return (
        <section className="w-full bg-[#0f6f70]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* MOBILE: 2×2 squares with thin dividers (pixel-tight) */}
                <motion.ul
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    className="
            md:hidden
            mt-0 overflow-hidden
            grid grid-cols-2
            border border-white/10
            divide-x divide-y divide-white/10
          "
                >
                    {items.map(({ label, Icon }) => (
                        <motion.li
                            key={label}
                            variants={itemAnim}
                            className="
                aspect-square    /* make each cell a perfect square */
                flex flex-col items-center justify-center text-center
                bg-[#0f6f70]
              "
                        >
                            <Icon className="h-10 w-10" strokeWidth={2.2} color="#19d3c5" />
                            <span className="mt-3 text-white font-extrabold uppercase tracking-wide text-2xl">
                                {label}
                            </span>
                        </motion.li>
                    ))}
                </motion.ul>

                {/* DESKTOP/TABLET: original horizontal strip */}
                <motion.ul
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    className="
            hidden md:grid
            grid-cols-4 gap-x-10 py-10
          "
                >
                    {items.map(({ label, Icon }) => (
                        <motion.li key={label} variants={itemAnim} className="flex items-center gap-5">
                            <Icon className="h-11 w-11" strokeWidth={2.2} color="#19d3c5" />
                            <span className="text-white font-extrabold uppercase tracking-wide text-3xl">
                                {label}
                            </span>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}
