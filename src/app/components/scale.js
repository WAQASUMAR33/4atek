"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* --------- CountUp (no external deps) ---------- */
function CountUp({ to = 100, duration = 1500, start = false }) {
    const [val, setVal] = useState(0);
    const rafRef = useRef();

    useEffect(() => {
        if (!start) return;

        const from = 0;
        const d = Math.max(300, duration);
        let startTs;

        const step = (ts) => {
            if (!startTs) startTs = ts;
            const p = Math.min(1, (ts - startTs) / d);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            const curr = Math.round(from + (to - from) * eased);
            setVal(curr);
            if (p < 1) {
                rafRef.current = requestAnimationFrame(step);
            }
        };

        rafRef.current = requestAnimationFrame(step);
        return () => cancelAnimationFrame(rafRef.current);
    }, [start, to, duration]);

    return <>{val.toLocaleString()}</>;
}

/* -------------- Animations ---------------- */
const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

/* -------------- Component ----------------- */
export default function ScaleWithTeams() {
    const statsRef = useRef(null);
    const inView = useInView(statsRef, { amount: 0.35, once: true });

    const STATS = [
        { label: "Projects Completed", value: 100, suffix: "+" },
        { label: "Satification Rate", value:99, suffix: "%" },
        { label: "Happy Clients", value: 100, suffix: "+" },
        { label: "Years of Experience", value: 4, suffix: "+" },
    ];

    return (
        <section className="relative w-full">
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/assets/aboutus/whyus.png"   
                    alt="Digital network background"
                    fill
                    priority={false}
                    className="object-cover object-center"
                    sizes="100vw"
                />
                {/* dark overlay with subtle teal tint */}
                <div className="absolute inset-0 bg-black/70" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f6f70]/20 via-transparent to-black/20" />
            </div>

            {/* Content */}
            <div className="relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="py-16 md:py-20 lg:py-24">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                            {/* Left: Heading + copy */}
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.45 }}
                                className="lg:col-span-7"
                            >
                                <h2
                                    className="font-extrabold leading-[1.05] text-[#19d3c5]
                             text-3xl sm:text-4xl lg:text-[45px]"
                                >
                                    Building Tomorrow's Digital Solutions Today 
                                </h2>

                                <p className="mt-6 max-w-2xl text-white/90 text-[15px] sm:text-[16px] leading-7">
                                    At 4A Tek, we believe in the power of innovation to transform businesses
                                    and create meaningful connections in the digital landscape. Our passion
                                    for technology drives us to deliver exceptional solutions that make
                                    a real difference.
                                </p>
                                <p className="mt-4 max-w-3xl text-white/90 text-[15px] sm:text-[16px] leading-7">
                                    Since our founding, we have evolved into a comprehensive digital
                                    solutions provider, specializing in custom software development,
                                    mobile applications, and strategic technology consulting. Our
                                    expertise spans across industries, helping businesses worldwide
                                    achieve their digital transformation goals.
                                </p>
                            </motion.div>

                            {/* Right: Stats */}
                            <motion.div
                                ref={statsRef}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.45 }}
                                className="lg:col-span-5"
                            >
                                <div
                                    className="grid grid-cols-2 gap-x-8 gap-y-10 md:gap-x-12"
                                >
                                    {STATS.map((s) => (
                                        <div key={s.label} className="text-left">
                                            <div className="text-[#19d3c5] font-extrabold leading-none
                                    text-3xl sm:text-4xl lg:text-4xl">
                                                <CountUp to={s.value} duration={2000} start={inView} />
                                                {s.suffix}
                                            </div>
                                            <div className="mt-2 text-white/85 text-sm sm:text-[15px]">
                                                {s.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
