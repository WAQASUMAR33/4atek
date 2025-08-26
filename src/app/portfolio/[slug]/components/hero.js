"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function PortfolioHero() {
    return (
        <section className="relative w-full">
            <div className="relative min-h-[58vh] sm:min-h-[64vh] md:min-h-[68vh] pt-[108px]">
                {/* Background image */}
                <Image
                    src="/assets/portofolio-slug.png" // <-- replace with your image path
                    alt="Projects overview"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />

                {/* Teal overlay & soft gradient for readability */}
                <div className="absolute inset-0 bg-[#0f6f70]/65 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />

                {/* Content */}
                <div className="relative h-full">
                    <div className="mx-auto flex h-full max-w-7xl items-center px-8 sm:px-6 lg:px-8">
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <p className="text-[13px] font-semibold tracking-widest text-white/90 uppercase">
                                Our Work
                            </p>
                            <h1 className="mt-2 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                                Portfolio
                            </h1>
                            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-white/90">
                                A selection of products, apps, and digital experiences we’ve
                                crafted for startups and enterprises—designed to scale and
                                built for performance.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
