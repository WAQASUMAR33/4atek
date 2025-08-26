"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const fadeInRight = {
    hidden: { opacity: 0, x: 48 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.05 } },
};

export default function CostHero() {
    return (
        <section className="w-full bg-black py-10 md:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8">
                    {/* Left: copy */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        className="lg:col-span-7"
                    >
                        <h1 className="font-extrabold tracking-tight uppercase leading-[1.06]">
                            <span className="block text-[#19d3c5] text-[20px] sm:text-[30px] md:text-[35px]">
                                What does quality tech cost?
                            </span>
                            <span className="block text-white text-[20px] sm:text-[30px] md:text-[35px]">
                                Find out with 4A Tek!
                            </span>
                        </h1>

                        <p className="mt-4 max-w-2xl text-white/85 text-[14px] sm:text-[15px] leading-7">
                            Are you wondering about the cost of top-notch tech solutions like web development,
                            mobile apps, and e-commerce? Look no further than 4A Tek! We provide transparent
                            pricing for tailored services, including cybersecurity. Explore our budget-friendly
                            options and kickstart your digital journey today!
                        </p>

                        <div className="mt-6">
                            <a
                                href="#contact"
                                className="
                  inline-flex items-center justify-center
                  rounded-full border-2 border-[#19d3c5]
                  px-5 sm:px-6 py-2.5 sm:py-3
                  text-[#19d3c5] text-[14px] sm:text-[15px] font-semibold
                  hover:bg-[#19d3c5]/10 transition
                "
                            >
                                Get quote now!
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: image */}
                    <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        className="lg:col-span-5 relative w-full aspect-[16/9] lg:aspect-[16/8]"
                    >
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-l from-black via-black/20 to-transparent" />
                        </div>

                        <Image
                            src="/assets/cost.webp"
                            alt="Analytics dashboard on a laptop"
                            width={1200}
                            height={675}
                            className="w-full h-auto object-contain"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
