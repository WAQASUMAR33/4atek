"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ---- animations
const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const gridStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const logoIntro = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

// ---- 4 logos only (as in the screenshot)
const LOGOS = [
    { src: "/assets/logos/06.png", alt: "Digifloat" },
    { src: "/assets/logos/07.png", alt: "Digital Fueling" },
    { src: "/assets/logos/08.png", alt: "Saufik" },
    { src: "/assets/logos/09.png", alt: "Terafort" },
];

export default function ConsultingPartners() {
    return (
        <section className="w-full py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Content block (matches screenshot copy/structure) */}
                <div className="mx-auto max-w-4xl text-center">
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.5 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0f6f70]"
                    >
                        Our Consulting Partners
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.5 }}
                        className="mt-4 text-lg sm:text-xl font-semibold text-neutral-900"
                    >
                        Insight-Driven Solutions, Outstanding Results
                    </motion.p>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.5 }}
                        className="mt-4 text-base leading-7 text-neutral-600"
                    >
                        At 4A Tek, we leverage our deep industry expertise and strategic partnerships to
                        deliver customized solutions that enhance efficiency, boost scalability, and
                        drive tangible results. Our commitment to innovation and excellence ensures your
                        business thrives in a dynamic market.
                    </motion.p>
                </div>

                {/* Logos box (exactly 4 items) */}
                <motion.ul
                    variants={gridStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="
            mx-auto mt-10 max-w-5xl overflow-hidden rounded-xl border border-neutral-300 bg-white
            grid grid-cols-2 md:grid-cols-4
            divide-x divide-y md:divide-y-0 divide-neutral-300
          "
                >
                    {LOGOS.map((logo) => (
                        <motion.li
                            key={logo.alt}
                            variants={logoIntro}
                            className="relative flex items-center justify-center bg-white"
                        >
                            <div className="relative h-24 sm:h-28 md:h-32 w-full p-6">
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    fill
                                    loading="lazy"
                                    className="object-contain"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                                />
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}
