"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 1.0, ease: "easeOut", delay: 0.1 } },
};

export default function AccelerateSection() {
    return (
        <section className="w-full py-20 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    {/* Left: Image (top on mobile) */}
                    <motion.div
                        variants={fadeInLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="
              order-1 lg:order-1
              lg:col-span-6 xl:col-span-6
              relative w-full
              rounded-[24px] overflow-hidden
              shadow-xl ring-1 ring-black/10
              aspect-[5/3] sm:aspect-[16/9] lg:aspect-[5/3]
            "
                    >
                        <Image
                            src="/assets/accelarate.webp"  // <-- replace with your image
                            alt="Product mockup and person working"
                            fill
                            priority={false}
                            className="object-cover object-center select-none"
                            sizes="(max-width: 1024px) 100vw, 640px"
                        />
                    </motion.div>

                    {/* Right: Heading + paragraphs */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="order-2 lg:order-2 lg:col-span-6 xl:col-span-6"
                    >
                        <h2
                            className="
                    text-[#0f6f70] font-extrabold tracking-tight
                    text-[20px] sm:text-[35px] md:text-[40px] leading-[1.08]
                    "
                        >
                            Transform Your Vision Into Reality with
                            4A Tek
                        </h2>

                        <p className="mt-6 max-w-3xl text-[13px] sm:text-[15px] leading-6 text-[#1D2939]">
                            Experience the power of cutting-edge technology and strategic innovation that drives measurable results for your business.
                        </p>

                        <p className="mt-5 max-w-3xl text-[13px] sm:text-[15px] leading-6 text-[#1D2939]">
                            At 4A Tek, we specialize in crafting digital experiences that captivate audiences and convert prospects into loyal customers.
                            Our comprehensive approach combines creativity with technical excellence to deliver solutions that exceed expectations.
                        </p>

                        <p className="mt-5 max-w-3xl text-[13px] sm:text-[15px] leading-6 text-[#1D2939]">
                            From concept to launch, we handle every aspect of your digital transformation journey. Our multidisciplinary team
                            brings together design expertise, development prowess, and strategic thinking to create solutions that not only
                            meet your current needs but scale with your future ambitions. Partner with 4A Tek and watch your business soar.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
