"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const bullets = [
    "Expertise in end-to-end digital solutions, from concept development to market-ready products that drive real results.",
    "Comprehensive technology consulting that helps businesses make informed decisions and optimize their digital strategy.",
    "Cost-effective solutions that maximize your ROI while delivering premium quality and exceptional user experiences.",
    "Personalized approach with dedicated project managers who ensure seamless communication and timely delivery.",
    "Long-term partnership mindset that grows with your business, providing ongoing support and scalable solutions.",
];

// animations
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};
const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 1.3, ease: "easeOut", delay: 0.15 } },
};
const listStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
};
const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function WhyChooseSection() {
    return (
        <section className="w-full py-20 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Right on desktop, top on mobile */}
                    <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="
              order-1 lg:order-2
              lg:col-span-5 xl:col-span-5
              mx-auto
            "
                    >
                        {/* Circular image with soft aqua ring */}
                        <div className="relative mx-auto w-[320px] sm:w-[380px] lg:w-[440px] aspect-square">
                            {/* aqua brush/ring feel */}
                            <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(25,211,197,0.18)_0%,rgba(25,211,197,0.08)_38%,transparent_62%)] -z-10" />
                            <div className="absolute inset-0 rounded-full overflow-hidden shadow-xl ring-1 ring-black/10 bg-white">
                                <Image
                                    src="/assets/choose.jpg" // <-- replace with your image
                                    alt="Happy client with analytics tablet"
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 1024px) 80vw, 480px"
                                    priority={false}
                                />
                            </div>

                            {/* tiny overlay “card” like in the mock */}
                            <div className="absolute left-[-12%] bottom-[18%] sm:left-[-10%] sm:bottom-[16%] w-[56%] sm:w-[54%] rounded-2xl bg-white/95 backdrop-blur p-3 shadow-md ring-1 ring-black/5">
                                <p className="text-[10px] sm:text-xs font-medium text-neutral-700">Business Growth</p>
                                <div className="mt-2 h-2 w-full rounded-full bg-neutral-200 overflow-hidden">
                                    <div className="h-full w-[90%] rounded-full bg-[#19d3c5]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Left: Heading + bullets */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="order-2 lg:order-1 lg:col-span-7 xl:col-span-7"
                    >
                        <h2
                            className="
                text-[#0f6f70] font-extrabold tracking-tight
                text-[24px] sm:text-[38px] md:text-[44px] leading-[1.04]
              "
                        >
                            Why Choose 4A Tek for
                            <br className="hidden md:block" /> Your Business?
                        </h2>

                        <motion.ul
                            variants={listStagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            className="mt-8 space-y-5"
                        >
                            {bullets.map((text) => (
                                <motion.li key={text} variants={item} className="flex items-start gap-3">
                                    <span className="mt-[10px] inline-block h-3 w-3 rounded-full bg-[#19d3c5]" />
                                    <p className="text-[#1D2939] text-[12px] sm:text-[14px] leading-5">{text}</p>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
