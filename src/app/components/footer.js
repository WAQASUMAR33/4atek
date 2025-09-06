"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const partners = [
    { src: "/assets/footer/01.webp", alt: "Google Business", w: 72, h: 48 },
    { src: "/assets/footer/02.webp", alt: "Clutch", w: 130, h: 40 },
    { src: "/assets/footer/03.webp", alt: "Companies List", w: 132, h: 28 },
    { src: "/assets/footer/04.webp", alt: "Proven Expert", w: 140, h: 36 },
    { src: "/assets/footer/05.webp", alt: "Serchen", w: 120, h: 34 },
    { src: "/assets/footer/06.webp", alt: "Trustpilot", w: 130, h: 36 },
];

const fade = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export default function SiteFooter() {
    return (
        <>
            <footer className="bg-[#172a3a] text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    {/* BRAND / EMAIL / SOCIAL */}
                    <motion.div
                        variants={fade}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="relative w-[160px] h-[64px] sm:w-[190px] sm:h-[72px]">
                            <Image
                                src="/assets/logo.png"
                                alt="4A Tek"
                                fill
                                className="object-contain"
                                sizes="190px"
                            />
                        </div>

                        <Link
                            href="mailto:contact@fouratek.com"
                            className="mt-4 text-[#19d3c5] text-[14px] sm:text-[15px] font-medium hover:underline"
                        >
                            contact@fouratek.com
                        </Link>

                        <div className="mt-4 flex items-center gap-5">
                            <a aria-label="Facebook" href="https://www.facebook.com/share/177tYNgQ88/" target="_blank" className="text-white/80 hover:text-white transition">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a aria-label="Instagram" href="https://instagram.com" target="_blank" className="text-white/80 hover:text-white transition">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a aria-label="LinkedIn" href="https://www.linkedin.com/company/fouratek/" target="_blank" className="text-white/80 hover:text-white transition">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* PARTNER LOGOS ROW */}
                    <motion.ul
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.35 }}
                        className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-8 items-center justify-items-center"
                    >
                        {partners.map((p) => (
                            <motion.li key={p.alt} variants={fade} className="opacity-95">
                                <div className="relative" style={{ width: p.w, height: p.h }}>
                                    <Image
                                        src={p.src}
                                        alt={p.alt}
                                        fill
                                        className="object-contain"
                                        sizes={`${p.w}px`}
                                    />
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* BOTTOM BAR */}
                    <div className="mt-10 flex flex-col items-center gap-2 text-white/70">
                        <p className="text-[13px] text-center">
                            Copyright © {new Date().getFullYear()} – 4A Tek – All rights reserved
                        </p>
                    </div>
                </div>
            </footer>

            {/* Floating WhatsApp Icon */}
            <a
                href="https://wa.me/18328618727"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-4 right-4 z-50"
            >
                <Image
                    src="/assets/whatsapp.png" // <-- place your WhatsApp icon PNG in public/assets
                    alt="WhatsApp"
                    width={150}
                    height={150}
                    className="hover:scale-110 transition-transform duration-200"
                />
            </a>
        </>
    );
}
