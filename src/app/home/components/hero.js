"use client";

import Image from "next/image";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);
    const prefersReduced = useReducedMotion();

    // Animation variants (subtle, cubic-bezier, with stagger)
    const ease = [0.22, 1, 0.36, 1];

    // ⬇️ faster stagger
    const wrapVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, when: "beforeChildren" }, // was 0.08
        },
    };

    // ⬇️ faster left column entrance
    const leftVariants = {
        hidden: { opacity: 0, x: prefersReduced ? 0 : -16 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.4, ease }, // was 0.55
        },
    };

    // ⬇️ faster underline line grow
    const lineVariants = {
        hidden: { scaleX: 0, opacity: 0 },
        visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.35, ease, delay: 0.03, transformOrigin: "left" }, // was 0.5, 0.05
        },
    };

    // ⬇️ faster image entrance
    const imgVariants = {
        hidden: { opacity: 0, y: prefersReduced ? 0 : 14, scale: 0.995 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.45, ease, delay: 0.03 }, // was 0.6, 0.05
        },
    };

    return (
        <section className="relative isolate overflow-hidden pt-[92px] pb-4 sm:pt-[98px] md:pt-[104px] lg:pt-[112px] md:pb-0">
            {/* MOBILE bg image behind text (dull) */}
            <div className="absolute inset-0 -z-30 md:hidden">
                <Image
                    src="/assets/hero.png"
                    alt="Futuristic woman with visor"
                    fill
                    sizes="100vw"
                    className="object-cover opacity-30 brightness-75"
                    priority
                />
            </div>

            {/* Particles (subtle) */}
            <Particles
                id="4A Tek-constellation"
                init={particlesInit}
                className="pointer-events-none absolute inset-0 -z-20"
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 60,
                    fullScreen: { enable: false },
                    detectRetina: true,
                    particles: {
                        number: { value: 80, density: { enable: true, area: 900 } },
                        color: { value: "#ffffff" },
                        opacity: { value: 0.28 },
                        size: { value: { min: 1, max: 3 } },
                        links: { enable: true, distance: 140, opacity: 0.2, width: 1, color: "#ffffff" },
                        move: { enable: true, speed: 0.5, direction: "none", outModes: { default: "bounce" } },
                    },
                    interactivity: { events: { onHover: { enable: false }, onClick: { enable: false }, resize: true } },
                }}
            />

            {/* Uniform dark backdrop */}
            <div className="pointer-events-none absolute inset-0 -z-40 bg-[#0b2230]/95" />

            {/* Content */}
            <motion.div
                variants={wrapVariants}
                initial="hidden"
                animate="visible"
                className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-8 lg:gap-10 md:min-h-[500px] lg:min-h-[520px]"
            >
                {/* Left column */}
                <motion.div variants={leftVariants} className="relative z-10 text-center md:text-left">
                    <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[60px] xl:leading-[1.05]">
                        4A Tek - Agency You Can Rely Upon !
                    </h1>

                    <p className="mt-4 text-lg font-semibold tracking-wide text-[#28e1b9] sm:text-xl">
                        Tailored Digital Solutions
                    </p>

                    <motion.div
                        variants={lineVariants}
                        className="mx-auto mt-2 h-[4px] w-32 rounded-full bg-[#28e1b9] md:mx-0"
                    />

                    <p className="mt-4 max-w-2xl text-sm text-white/85 sm:text-base md:text-lg">
                        We are here to assist you in pushing beyond the boundaries and achieving incredible milestones.
                        Come and lets thrive together in the digital metropolis.
                    </p>

                    <div className="mt-6">
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center rounded-full border-2 border-[#28e1b9] px-6 py-2 text-base font-semibold text-[#28e1b9] transition hover:bg-[#28e1b9]/10"
                        >
                            Get Started
                        </a>
                    </div>
                </motion.div>

                {/* Right image – pinned to bottom */}
                <motion.div
                    variants={imgVariants}
                    className="relative hidden w-full md:flex md:items-end md:justify-end"
                >
                    <div className="relative h-[330px] w-full lg:h-[430px] xl:h-[490px] mb-[-30px]">
                        <Image
                            src="/assets/hero.png"
                            alt="Futuristic woman with visor"
                            fill
                            sizes="(max-width: 1280px) 50vw, 680px"
                            className="object-contain object-[right_bottom]"
                            priority
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
