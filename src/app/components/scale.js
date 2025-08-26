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
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* -------------- Component ----------------- */
export default function ScaleWithTeams() {
    const statsRef = useRef(null);
    const inView = useInView(statsRef, { amount: 0.35, once: true });

    const STATS = [
        { label: "Projects Completed", value: 1000, suffix: "+" },
        { label: "In-house engineers", value: 300, suffix: "+" },
        { label: "Industries Served", value: 20, suffix: "+" },
        { label: "Years of Experience", value: 6, suffix: "+" },
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
                                    In Pursuit Of Scaling The Digital Ecosystem 
                                </h2>

                                <p className="mt-6 max-w-2xl text-white/90 text-[15px] sm:text-[16px] leading-7">
                                    4A Tek came into existence after two tech enthusiasts from
                                    different backgrounds joined forces to create something bound
                                    to become a difference-maker in the digital world.
                                </p>
                                <p className="mt-4 max-w-3xl text-white/90 text-[15px] sm:text-[16px] leading-7">
                                    The company started in 2018 as a mobile app development
                                    company but has since grown into a full-stack digital
                                    transformation organization offering enterprise software
                                    development and technical consultancy services for businesses
                                    worldwide.
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
                                                <CountUp to={s.value} duration={1400} start={inView} />
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
