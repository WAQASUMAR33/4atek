"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ServicesHero({
    title = "Services",
    // Put your exact line here if you want to tweak the text
    subtitle = "End-to-end design & development tailored to your growth.",
    img = "/assets/hero/services.jpg",
}) {
    const fadeUp = {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
    };

    return (
        <section className="relative w-full">
            <div className="relative overflow-hidden">
                <div className="relative h-[56svh] min-h-[420px] md:h-[64svh] lg:h-[72svh]">
                    {/* Background image */}
                    <Image
                        src="/assets/services-hero.png"
                        alt="Background for Services"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />

                    {/* Teal wash + soft gradient */}
                    <div className="absolute inset-0 bg-[#0f6f70]/70 mix-blend-multiply" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-black/10" />

                    {/* Content */}
                    <div className="relative z-10 h-full">
                        <div
                            className="
                mx-auto flex h-full max-w-7xl
                items-center justify-center
                px-4 sm:px-6 lg:px-8
              "
                        >
                            {/* pt on small screens to keep clear of overlay header; centered on md+ */}
                            <div className="w-full pt-24 md:pt-0 text-center">
                                <motion.h1
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true, amount: 0.5 }}
                                    className="
                    mx-auto max-w-5xl
                    text-white font-extrabold tracking-tight
                    text-[38px] leading-[1.05]
                    sm:text-[48px] md:text-[56px] lg:text-[64px]
                  "
                                >
                                    {title}
                                </motion.h1>

                                {subtitle && (
                                    <motion.p
                                        variants={fadeUp}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, amount: 0.55 }}
                                        transition={{ delay: 0.06 }}
                                        className="mx-auto mt-4 max-w-3xl text-white/90 text-[15px] sm:text-[16px] leading-7"
                                    >
                                        {subtitle}
                                    </motion.p>
                                )}

                                {/* CTA removed per request */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
