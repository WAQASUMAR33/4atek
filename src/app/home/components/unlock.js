"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 1.0, ease: "easeOut", delay: 0.1 } },
};

export default function Unlock() {
    return (
        <section className="w-full py-24 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Image FIRST on mobile, RIGHT on desktop */}
                    <motion.div
                        variants={fadeInRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="
              order-1 lg:order-2
              lg:col-span-5 xl:col-span-4
              relative w-full
              rounded-[28px] overflow-hidden
              shadow-xl ring-1 ring-black/10
              aspect-[4/3] lg:aspect-[5/4]
              lg:ml-auto
            "
                    >
                        <Image
                            src="/assets/unlock.webp"
                            alt="Analytics dashboard on tablet by a window"
                            fill
                            priority={false}
                            className="object-cover object-center select-none"
                            sizes="(max-width: 1024px) 100vw, 480px"
                        />
                    </motion.div>

                    {/* Text SECOND on mobile, LEFT on desktop */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="order-2 lg:order-1 lg:col-span-7 xl:col-span-8"
                    >
                        <h2
                            className="
                font-extrabold tracking-tight text-[#0f6f70]
                text-[35px] leading-[1.05]
                sm:text-[28px] md:text-[30px] lg:text-[40px]
              "
                        >
                            Elevate Your Digital Presence
                        </h2>

                        <p className="mt-6 max-w-3xl text-[15px] leading-8 text-[#1D2939]">
                            At 4A Tek, we specialize in creating digital experiences that captivate audiences
                            and drive meaningful engagement. Our comprehensive approach combines strategic
                            thinking with cutting-edge technology to deliver solutions that make a lasting
                            impact on your business growth.
                        </p>

                        <p className="mt-5 max-w-3xl text-[15px] leading-8 text-[#1D2939]">
                            Our multidisciplinary team of designers, developers, and strategists work
                            collaboratively to bring your vision to life. From initial concept to final
                            deployment, we ensure every detail is crafted with precision and purpose.
                            Whether you're launching a new product or enhancing an existing platform,
                            we provide the expertise and support you need to succeed in the digital realm.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
