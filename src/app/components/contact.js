"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { PK, US } from "country-flag-icons/react/3x2"; // 🇵🇰 🇺🇸 flags

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut", delay: 0.05 } },
};

export default function ContactOverlay() {
    const [status, setStatus] = useState({ type: "", msg: "" });

    async function onSubmit(e) {
        e.preventDefault();
        setStatus({ type: "", msg: "" });

        const data = Object.fromEntries(new FormData(e.currentTarget));
        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            setStatus({ type: "ok", msg: "Thanks! We’ll get back to you shortly." });
            e.currentTarget.reset();
        } else {
            const { error } = await res.json().catch(() => ({ error: "Something went wrong." }));
            setStatus({ type: "error", msg: error || "Something went wrong." });
        }
    }

    return (
        <section className="w-full">
            {/* ===== Top banner with fixed padding on mobile ===== */}
            <div className="relative w-full">
                {/* Background image & overlays (behind content) */}
                <div className="absolute inset-0">
                    <Image
                        src="/assets/contact.jpg"
                        alt="Teal abstract background"
                        fill
                        priority={false}
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-[#0f6f70]/70" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10" />
                </div>

                {/* Content wrapper controls min-height + vertical padding */}
                <div className="relative">
                    <div
                        className="
              mx-auto max-w-7xl
              px-4 sm:px-6 lg:px-8
              min-h:[300px] sm:min-h-[340px] lg:min-h-[360px]
              pt-8 pb-8 sm:pt-12 sm:pb-12 lg:pt-0 lg:pb-0
              flex items-center
            "
                    >
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            className="max-w-3xl text-white"
                        >
                            <h2 className="text-[24px] font-extrabold tracking-tight leading-snug">
                                Ready to Transform Your Business with 4A Tek?
                            </h2>
                            <p className="mt-3 text-[14px] leading-6 text-white/90">
                                Take your business to the next level with 4A Tek's comprehensive digital solutions.
                                We specialize in creating innovative web applications, mobile apps, and strategic
                                technology consulting that drives real results and measurable growth.
                            </p>
                            <p className="mt-3 text-[14px] leading-6 text-white/90">
                                Our expert team combines cutting-edge technology with strategic thinking to deliver
                                solutions that not only meet your current needs but scale with your future ambitions.
                                Partner with us and experience the difference that true expertise makes.
                            </p>

                            <div className="mt-5">
                                <a
                                    href="#contact"
                                    className="inline-flex items-center rounded-full bg-[#19d3c5] px-5 py-2.5 text-[14px] font-semibold text-[#063c3c] shadow hover:brightness-105 active:brightness-95 transition"
                                >
                                    Get Started Today!
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ===== Bottom panel with contact info + overlapping form ===== */}
            <div className="relative bg-[#172a3a]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10 lg:py-16">
                        {/* Left: contact info (UPDATED to match screenshot) */}
                        <motion.div
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.35 }}
                            className="lg:col-span-6 text-white"
                        >
                            <h3 className="text-[22px] sm:text-[24px] font-extrabold">Contact Information</h3>
                            <p className="mt-1 text-[14px] text-white/80">
                                Feel free to contact &amp; reach us !!
                            </p>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* USA Office */}
                                <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
                                    <div className="flex items-center gap-3">
                                        <US title="United States" className="h-5 w-7 rounded-sm shadow-sm" />
                                        <span className="text-[18px] font-bold">USA Office</span>
                                    </div>

                                    <ul className="mt-4 space-y-3 text-[14px] leading-6 text-white/90">
                                        <li className="flex items-start gap-2">
                                            <MapPin className="mt-0.5 h-4 w-4 text-[#19d3c5]" />
                                            <span>9604 57th 7D, Corona NY, United States, 11368</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Phone className="mt-0.5 h-4 w-4 text-[#19d3c5]" />
                                            <span>+1 (832) 861-8727</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Mail className="mt-0.5 h-4 w-4 text-[#19d3c5]" />
                                            <a href="mailto:contact@fouratek.com" className="hover:underline">
                                                contact@fouratek.com
                                            </a>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Phone className="mt-0.5 h-4 w-4 text-[#19d3c5]" />
                                            <span>+1 (336) 848-6076</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Pakistan Office */}
                                <div className="rounded-xl bg-white/5 p-5 ring-1 ring-white/10">
                                    <div className="flex items-center gap-3">
                                        <PK title="Pakistan" className="h-5 w-7 rounded-sm shadow-sm" />
                                        <span className="text-[18px] font-bold">Pakistan Office</span>
                                    </div>

                                    <ul className="mt-4 space-y-3 text-[14px] leading-6 text-white/90">
                                        <li className="flex items-start gap-2">
                                            <MapPin className="mt-0.5 h-4 w-4 text-[#19d3c5]" />
                                            <span>C-01, Block A, Kazimabad, Karachi</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Phone className="mt-0.5 h-4 w-4 text-[#19d3c5]" />
                                            <span>+92 321 5231986</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Mail className="mt-0.5 h-4 w-4 text-[#19d3c5]" />
                                            <a href="mailto:contact@fouratek.com" className="hover:underline">
                                                contact@fouratek.com
                                            </a>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Phone className="mt-0.5 h-4 w-4 text-[#19d3c5]" />
                                            <span>+92 331 5465434</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: form card (unchanged) */}
                        <motion.div
                            variants={fadeInRight}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.35 }}
                            className="lg:col-span-6 lg:-mt-28"
                        >
                            <div id="contact" className="rounded-2xl bg-[#eef3fc] p-5 sm:p-6 md:p-7 shadow-xl ring-1 ring-black/10">
                                <h4 className="text-[24px] font-bold text-[#172a3a]">Your Success Starts Here!</h4>

                                <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Honeypot */}
                                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="Full Name *"
                                        required
                                        className="h-11 rounded-md border border-black/10 bg-white px-3 text-[14px] outline-none focus:ring-2 focus:ring-[#19d3c5]"
                                    />
                                    <input
                                        name="company"
                                        type="text"
                                        placeholder="Company / Organization *"
                                        required
                                        className="h-11 rounded-md border border-black/10 bg-white px-3 text-[14px] outline-none focus:ring-2 focus:ring-[#19d3c5]"
                                    />
                                    <input
                                        name="phone"
                                        type="tel"
                                        placeholder="Phone Number *"
                                        required
                                        className="h-11 rounded-md border border-black/10 bg-white px-3 text-[14px] outline-none focus:ring-2 focus:ring-[#19d3c5]"
                                    />
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Company Email *"
                                        required
                                        className="h-11 rounded-md border border-black/10 bg-white px-3 text-[14px] outline-none focus:ring-2 focus:ring-[#19d3c5]"
                                    />
                                    <input
                                        name="subject"
                                        type="text"
                                        placeholder="Subject *"
                                        required
                                        className="col-span-1 sm:col-span-2 h-11 rounded-md border border-black/10 bg-white px-3 text-[14px] outline-none focus:ring-2 focus:ring-[#19d3c5]"
                                    />
                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Message"
                                        className="col-span-1 sm:col-span-2 rounded-md border border-black/10 bg-white px-3 py-2 text-[14px] outline-none focus:ring-2 focus:ring-[#19d3c5]"
                                    />

                                    <div className="col-span-1 sm:col-span-2">
                                        <button
                                            type="submit"
                                            className="inline-flex h-11 items-center justify-center rounded-md px-5 text-[14px] font-semibold text-white bg-black hover:bg-black/90"
                                        >
                                            Submit Now
                                        </button>
                                    </div>

                                    {status.msg && (
                                        <p className={`col-span-1 sm:col-span-2 text-[14px] mt-1 ${status.type === "ok" ? "text-emerald-600" : "text-rose-600"}`}>
                                            {status.msg}
                                        </p>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
