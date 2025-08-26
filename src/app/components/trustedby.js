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

// ---- logos with new folder & naming
const LOGOS = [
    { src: "/assets/logos/01.png", alt: "Logo 01" },
    { src: "/assets/logos/02.png", alt: "Logo 02" },
    { src: "/assets/logos/03.png", alt: "Logo 03" },
    { src: "/assets/logos/04.png", alt: "Logo 04" },
    { src: "/assets/logos/05.png", alt: "Logo 05" },
];

// ✅ Only 5 logos will be rendered
export default function TrustedBy() {
    return (
        <section className="w-full py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-center text-[#0f6f70] font-bold tracking-tight
                     text-2xl sm:text-3xl md:text-4xl"
                >
                    Trusted by{" "}
                    <span className="align-middle inline-block rounded-xl border-2 border-[#0f6f70] px-3 py-1
                           text-[#0f6f70] bg-white">
                        250+
                    </span>{" "}
                    companies small business & industry leaders alike
                </motion.h2>

                {/* Logos grid */}
                <motion.ul
                    variants={gridStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    className="
            mt-10 overflow-hidden rounded-xl border border-neutral-300 bg-white
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5
            divide-x divide-y divide-neutral-300
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
                                    priority={false}
                                    loading="lazy"
                                    className="object-contain"
                                    sizes="(max-width: 1024px) 33vw, 20vw"
                                />
                            </div>
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
}
