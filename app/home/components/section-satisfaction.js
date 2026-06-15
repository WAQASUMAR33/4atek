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
                transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
                className="
          hidden lg:block
          relative z-30
          lg:absolute lg:right-[10%] lg:top-[40px] lg:h-[550px] lg:w-[520px]
          xl:right-[10%] xl:top-[124px] xl:h-[570px] xl:w-[560px]
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
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="max-w-3xl text-[18px] leading-8 text-[#1D2939]"
                >
                    At 4A Tek, we revolutionize how businesses connect with their audiences through
                    innovative digital solutions that blend creativity with cutting-edge technology.
                    Our expertise spans across web development, mobile applications, and digital
                    marketing strategies that drive real results and measurable growth.
                </motion.p>

                {/* Teal block */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 1.0, ease: "easeOut" }}
                    className="
            mt-6 rounded-none bg-[#005F61] text-white
            px-6 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-4
            lg:pr-[38%] xl:pr-[40%]
            relative z-10
          "
                >
                    <h2 className="leading-tight">
                        <span className="block text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#00E0D1]">
                            Excellence Through
                        </span>
                        <span className="block text-[32px] sm:text-[36px] lg:text-[40px] font-extrabold text-[#00E0D1]">
                            Innovation
                        </span>
                    </h2>

                    <p className="mt-5 sm:mt-6 text-[16px] leading-7 text-white/90">
                        We believe that exceptional results come from understanding your vision and
                        translating it into powerful digital experiences. Our collaborative approach
                        ensures that every solution we create is perfectly aligned with your business
                        objectives, delivering not just what you asked for, but what you truly need
                        to thrive in today&apos;s competitive marketplace.
                    </p>

                    <p className="mt-5 sm:mt-6 text-[16px] leading-7 text-white/90">
                        From concept to deployment, we handle every detail with meticulous attention
                        to quality and performance. Our team of skilled professionals brings together
                        years of experience in design, development, and digital strategy to create
                        solutions that not only meet your current needs but scale with your future
                        ambitions. Partner with 4A Tek and experience the difference that
                        true expertise makes.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
