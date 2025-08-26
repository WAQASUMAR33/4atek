"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ClientSatisfaction() {
    return (
        <section className="relative w-full overflow-visible">
            {/* IMAGE — Desktop only */}
            <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="
          hidden lg:block
          relative z-30
          lg:absolute lg:right-[10%] lg:top-[40px] lg:h-[550px] lg:w-[520px]
          xl:right-[10%] xl:top-[66px] xl:h-[570px] xl:w-[560px]
        "
            >
                <Image
                    src="/assets/satisfaction.png"
                    alt="Happy client overlapping the teal panel"
                    fill
                    priority
                    className="object-contain object-right pointer-events-none select-none drop-shadow-xl"
                />
            </motion.div>

            {/* Content container */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 lg:pt-16">
                {/* Intro paragraph */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="max-w-3xl text-[18px] leading-8 text-[#1D2939]"
                >
                    At 4A Tek, we empower businesses to unlock their full potential with our
                    proven software solutions designed for both local and international market
                    domination. Our team combines leading-edge technology with professional
                    design and development expertise to deliver comprehensive business
                    enhancement.
                </motion.p>

                {/* Teal block */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="
            mt-6 rounded-none bg-[#005F61] text-white
            px-6 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-4
            lg:pr-[38%] xl:pr-[40%]
            relative z-10
          "
                >
                    <h2 className="leading-tight">
                        <span className="block text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#00E0D1]">
                            Driven by Client
                        </span>
                        <span className="block text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#00E0D1]">
                            Satisfaction
                        </span>
                    </h2>

                    <p className="mt-5 sm:mt-6 text-[16px] leading-7 text-white/90">
                        At our core, client satisfaction is paramount. We go above and beyond
                        to understand your unique business needs and challenges, crafting
                        tailor-made software solutions that propel your growth and success. Our
                        commitment to excellence ensures that every project we undertake is
                        executed with precision and care, fostering enduring partnerships built
                        on trust and mutual success.
                    </p>

                    <p className="mt-5 sm:mt-6 text-[16px] leading-7 text-white/90">
                        With 4A Tek by your side, you can confidently navigate the
                        ever-evolving digital landscape and stay ahead of the competition. Let
                        us help you unleash the full potential of your business with our
                        innovative software solutions.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
