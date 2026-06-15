"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const fadeRight = {
    hidden: { opacity: 0, x: 35 },
    show: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const fadeLeft = {
    hidden: { opacity: 0, x: -35 },
    show: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

export default function ApproachAndValues() {
    return (
        <section className="w-full py-14 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Row 1 — Approach (text left, image right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.45 }}
                        className="lg:col-span-6"
                    >
                        <h2 className="text-[#0f6f70] font-extrabold leading-[1.05] text-3xl sm:text-4xl">
                            How We Work:
                        </h2>
                        <h3 className="mt-3 text-xl sm:text-2xl font-bold text-[#0f6f70]/90">
                            Partnership-Driven Excellence
                        </h3>

                        <p className="mt-4 text-[15px] sm:text-[16px] leading-7 text-[#1D2939]">
                            At 4A Tek, we believe that exceptional results come from deep collaboration
                            and strategic thinking. Our proven methodology combines cutting-edge technology
                            with personalized attention to detail, ensuring every project delivers
                            measurable impact and exceeds expectations from concept to completion.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        className="lg:col-span-6"
                    >
                        <div className="relative w-full aspect-[16/9]">
                            <Image
                                src="/assets/aboutus/1.webp"  // ← replace with your image
                                alt="Team unity - hands together"
                                fill
                                priority={false}
                                className="object-cover object-center rounded-xl shadow-md ring-1 ring-black/5"
                                sizes="(max-width: 1024px) 100vw, 680px"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Spacer between rows */}
                <div className="h-12 sm:h-16" />

                {/* Row 2 — Values (image left, text right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        className="lg:col-span-6 order-1 lg:order-none"
                    >
                        <div className="relative w-full aspect-[16/9]">
                            <Image
                                src="/assets/aboutus/2.webp"   // ← replace with your image
                                alt="Team collaborating around a table"
                                fill
                                className="object-cover object-center rounded-xl shadow-md ring-1 ring-black/5"
                                sizes="(max-width: 1024px) 100vw, 680px"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.45 }}
                        className="lg:col-span-6 order-2 lg:order-none"
                    >
                        <h2 className="text-[#0f6f70] font-extrabold leading-[1.05] text-3xl sm:text-4xl">
                            What Drives Us:
                        </h2>
                        <h3 className="mt-3 text-xl sm:text-2xl font-bold text-[#0f6f70]/90">
                            Excellence Through Innovation
                        </h3>

                        <p className="mt-4 text-[15px] sm:text-[16px] leading-7 text-[#1D2939]">
                            At 4A Tek, our commitment to excellence is unwavering. We combine technical
                            expertise with creative vision to deliver solutions that not only meet
                            current needs but anticipate future challenges. Our dedication to quality,
                            innovation, and client success drives everything we do, creating lasting
                            partnerships built on trust and exceptional results.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
