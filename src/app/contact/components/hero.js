"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactHero() {
    return (
        <section className="relative isolate h-[62vh] min-h-[420px] w-full">
            {/* Background image */}
            <Image
                src="/assets/contact.jpg" // <-- replace with your image path
                alt="Work desk with devices"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
            />

            {/* Teal overlay + subtle gradient for depth */}
            <div className="absolute inset-0 bg-[#0f6f70]/75 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />

            {/* Centered title */}
            <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="
            text-white text-center font-extrabold uppercase tracking-tight
            text-[40px] sm:text-[56px] md:text-[72px] leading-[1.05]
            drop-shadow-md
          "
                >
                    Contact Us
                </motion.h1>
            </div>
        </section>
    );
}
