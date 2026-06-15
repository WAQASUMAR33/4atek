"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function AboutHero({
    // replace with your actual image path
    img = "/assets/about-hero.jpg",
}) {
    return (
        <section className="relative w-full">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/partners-hero.webp"
                    alt="Team wearing a VR headset"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />
                {/* Teal tint + gradient overlay (top-left stronger) */}
                <div className="absolute inset-0 bg-[#0f6f70]/70" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f6f70]/0 via-[#0f6f70]/5 to-[#0f6f70]/10" />
            </div>

            {/* Content */}
            <div className="relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Use min-height to get the tall hero feel */}
                    <div className="flex min-h-[68vh] sm:min-h-[72vh] lg:min-h-[80vh] items-center">
                        <div className="max-w-3xl">
                            <motion.h1
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.5 }}
                                className="
                  text-white font-extrabold leading-[1.05]
                  text-3xl sm:text-5xl lg:text-[50px]
                "
                            >
                                <span className="block">Our Valued Partners</span>
                            </motion.h1>

                            <motion.p
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: 0.08 }}
                                className="mt-6 max-w-2xl text-white/90 text-[15px] sm:text-[16px] leading-7"
                            >
                                At 4A Tek, we collaborate with industry-leading partners to deliver innovative, reliable, 
                                &amp; high-performance solutions. Together, we drive efficiency, growth, and lasting success for our clients.
                            </motion.p>

                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ delay: 0.16 }}
                                className="mt-8"
                            >
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 rounded-full bg-[#19d3c5] px-6 py-3
                             text-[#063c3c] text-[14px] font-semibold shadow
                             hover:brightness-105 active:brightness-95 transition"
                                >
                                    Get Started
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
