"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    {
        quote:
            "Excellent feedback and support from your side. Now I feel we should have done this much earlier. But definitely we are heading in the right direction and we will grow together",
        author: "Lily Carter",
        location: "New York",
    },
    {
        quote:
            "Rock-solid delivery and clear communication. The team anticipated issues before they happened and kept us moving fast.",
        author: "Imran Sheikh",
        location: "Dubai",
    },
    {
        quote:
            "From brief to launch, everything felt effortless. Our KPIs improved within weeks and support has been outstanding.",
        author: "Amelia Brown",
        location: "London",
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const slideVariants = {
    enter: { opacity: 0, x: -24 },
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
    exit: { opacity: 0, x: 24, transition: { duration: 0.35, ease: "easeIn" } },
};

export default function HappyClients() {
    const [index, setIndex] = useState(0);
    const [hovered, setHovered] = useState(false);

    // autoplay (pauses on hover)
    useEffect(() => {
        if (hovered) return;
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(id);
    }, [hovered]);

    return (
        <section className="w-full py-16 md:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Heading + subcopy */}
                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-[#0f6f70] font-extrabold tracking-tight text-[24px] sm:text-[42px] md:text-[54px] leading-[1.05]"
                >
                    Our Happy Clients
                </motion.h2>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.05 }}
                    className="mt-4 max-w-3xl text-[16px] sm:text-[17px] leading-7 text-[#1D2939]"
                >
                    Discover why they choose us as their trusted partner and hear firsthand about
                    the exceptional service and results we deliver.
                </motion.p>

                {/* Robot (mobile: above panel) */}
                <div className="mt-8 lg:mt-0">
                    <div className="lg:hidden mx-auto mb-6 w-full max-w-[360px]">
                        <Image
                            src="/assets/robot.png"
                            alt="Assistant robot"
                            width={700}
                            height={700}
                            className="w-full h-auto object-contain select-none"
                            priority={false}
                        />
                    </div>
                </div>

                {/* Teal panel + desktop robot overlap */}
                <div className="relative">
                    {/* Desktop robot overlapping to the right */}
                    <div
                        className="hidden lg:block absolute right-[-40px] -top-60
                       w-[520px] max-w-[38vw] pointer-events-none select-none z-30"
                    >
                        <Image
                            src="/assets/robot.png"
                            alt="Assistant robot"
                            width={900}
                            height={900}
                            className="w-full h-auto object-contain"
                            priority={false}
                        />
                    </div>

                    <motion.div
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        className="
              relative z-10
              mt-2 bg-[#0f6f70] text-white
              px-6 sm:px-10 md:px-14
              lg:pr-[38%] xl:pr-[40%]    /* reserve space so text never goes under robot */
              py-10 md:py-14
              overflow-hidden
            "
                    >
                        {/* subtle diagonal overlays */}
                        <div className="pointer-events-none absolute inset-0">
                            <div className="absolute -top-8 -left-6 h-[220%] w-[40%] rotate-6 bg-white/6" />
                            <div className="absolute -top-10 left-[22%] h-[220%] w-[26%] rotate-6 bg-white/8" />
                            <div className="absolute -top-12 left-[42%] h-[220%] w-[20%] rotate-6 bg-white/5" />
                        </div>

                        {/* Slide */}
                        <div className="relative z-10 max-w-4xl" aria-live="polite">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                >
                                    <p className="text-white/95 text-[13px] sm:text-[16px] md:text-[18px] leading-7">
                                        “{testimonials[index].quote}”
                                    </p>

                                    <div className="mt-8">
                                        <p className="font-semibold text-white text-[13px] sm:text-[14px]">
                                            {testimonials[index].author}
                                        </p>
                                        <p className="text-white/80 -mt-1 text-[12px] sm:text-[13px]">
                                            {testimonials[index].location}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Dots */}
                        <div className="relative z-10 mt-10 flex items-center gap-3">
                            {testimonials.map((_, i) => {
                                const active = i === index;
                                return (
                                    <button
                                        key={i}
                                        aria-label={`Go to slide ${i + 1}`}
                                        onClick={() => setIndex(i)}
                                        className={`h-3 w-3 rounded-full transition ${active ? "bg-[#19d3c5]" : "bg-white/80 hover:bg-white"
                                            }`}
                                    />
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
