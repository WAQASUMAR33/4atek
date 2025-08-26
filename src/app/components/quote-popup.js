"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, X } from "lucide-react";

const OVERLAY_FADE = { hidden: { opacity: 0 }, show: { opacity: 1 } };
const MODAL_POP = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function QuotePopup() {
    const [open, setOpen] = useState(false);
    const [timeReady, setTimeReady] = useState(false);
    const [scrollReady, setScrollReady] = useState(false);
    const [status, setStatus] = useState({ type: "", msg: "" });
    const hasShownRef = useRef(false);

    // show once per session
    useEffect(() => {
        const dismissed = sessionStorage.getItem("quotePopupDismissed");
        if (dismissed) hasShownRef.current = true;
    }, []);

    // timer (e.g., 7s)
    useEffect(() => {
        const t = setTimeout(() => setTimeReady(true), 7000);
        return () => clearTimeout(t);
    }, []);

    // scroll (e.g., > 200px)
    useEffect(() => {
        function onScroll() {
            if (window.scrollY > 200) setScrollReady(true);
        }
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // when both conditions pass, open once per session
    useEffect(() => {
        if (!hasShownRef.current && timeReady && scrollReady) {
            hasShownRef.current = true;
            setOpen(true);
        }
    }, [timeReady, scrollReady]);

    // close + remember
    function close() {
        sessionStorage.setItem("quotePopupDismissed", "1");
        setOpen(false);
    }

    // Submit w/ honeypot
    async function onSubmit(e) {
        e.preventDefault();
        setStatus({ type: "", msg: "" });

        const data = Object.fromEntries(new FormData(e.currentTarget));
        if (data.website) {
            // bot caught
            setStatus({ type: "ok", msg: "Thanks! We'll be in touch." });
            close();
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus({ type: "ok", msg: "Thanks! We'll be in touch shortly." });
                setTimeout(close, 1200);
                e.currentTarget.reset();
            } else {
                const { error } = await res.json().catch(() => ({ error: "Something went wrong." }));
                setStatus({ type: "error", msg: error || "Something went wrong." });
            }
        } catch (err) {
            setStatus({ type: "error", msg: "Network error. Please try again." });
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-[2px]"
                        variants={OVERLAY_FADE}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        onClick={close}
                    />
                    {/* Modal */}
                    <div className="fixed inset-0 z-[90] grid place-items-center p-4">
                        <motion.div
                            className="
                relative w-full max-w-4xl overflow-hidden rounded-2xl
                bg-white shadow-2xl ring-1 ring-black/10
                grid grid-cols-1 md:grid-cols-2
              "
                            variants={MODAL_POP}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                        >
                            {/* Close */}
                            <button
                                aria-label="Close"
                                onClick={close}
                                className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            {/* Left: Form */}
                            <div className="bg-[#0f3840] p-6 sm:p-7 md:p-8 text-white">
                                <p className="text-[13px] tracking-widest text-[#19d3c5]">LET&apos;S CONNECT</p>
                                <h3 className="mt-2 text-[26px] sm:text-[30px] leading-tight font-extrabold">
                                    Request a Quote
                                </h3>
                                <p className="mt-3 text-white/80 text-[14.5px] leading-6">
                                    By delivering superior digital solutions, we continuously surpass expectations.
                                    Get in touch with us for a free quote!
                                </p>

                                <div className="mt-4 flex flex-wrap gap-5 text-[14px] text-white/90">
                                    <span className="inline-flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-[#19d3c5]" />
                                        +92 321 5231986
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-[#19d3c5]" />
                                        contact@fouratek.com
                                    </span>
                                </div>

                                <form onSubmit={onSubmit} className="mt-5 space-y-3">
                                    {/* Honeypot */}
                                    <input
                                        type="text"
                                        name="website"
                                        autoComplete="off"
                                        tabIndex={-1}
                                        className="hidden"
                                    />

                                    <input
                                        name="name"
                                        required
                                        placeholder="Full Name"
                                        className="h-11 w-full rounded-md border border-white/15 bg-white/10 px-3 text-[14px]
                               placeholder:text-white/70 text-white outline-none focus:ring-2 focus:ring-[#19d3c5]"
                                    />
                                    <input
                                        name="email"
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                        className="h-11 w-full rounded-md border border-white/15 bg-white/10 px-3 text-[14px]
                               placeholder:text-white/70 text-white outline-none focus:ring-2 focus:ring-[#19d3c5]"
                                    />
                                    <textarea
                                        name="message"
                                        rows={5}
                                        placeholder="Project Details"
                                        className="w-full rounded-md border border-white/15 bg-white/10 px-3 py-2 text-[14px]
                               placeholder:text-white/70 text-white outline-none focus:ring-2 focus:ring-[#19d3c5]"
                                    />

                                    <button
                                        type="submit"
                                        className="mt-1 inline-flex h-11 w-full items-center justify-center rounded-md
                               bg-[#19d3c5] text-[#063c3c] text-[14px] font-semibold
                               hover:brightness-105 active:brightness-95 transition"
                                    >
                                        SUBMIT REQUEST
                                    </button>

                                    {status.msg && (
                                        <p
                                            className={`text-[13px] ${status.type === "ok" ? "text-emerald-300" : "text-rose-300"
                                                }`}
                                        >
                                            {status.msg}
                                        </p>
                                    )}
                                </form>
                            </div>

                            {/* Right: Image */}
                            <div className="relative hidden md:block">
                                {/* Replace with your own image path */}
                                <Image
                                    src="/assets/hero-popup.avif"
                                    alt="People collaborating at a table"
                                    fill
                                    sizes="50vw"
                                    className="object-cover"
                                    priority={false}
                                />
                                {/* teal overlay */}
                                <div className="absolute inset-0 bg-[#0f6f70]/25 mix-blend-multiply" />
                                {/* bottom badge (optional) */}
                                
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
