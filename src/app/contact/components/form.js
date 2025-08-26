"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Building2,
    Send,
} from "lucide-react";

/* ----- Animations ----- */
const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export default function ContactPageForm() {
    const [status, setStatus] = useState({ type: "", msg: "" });

    async function onSubmit(e) {
        e.preventDefault();
        setStatus({ type: "", msg: "" });

        const form = new FormData(e.currentTarget);
        // Honeypot (bots fill this):
        if (form.get("website")?.toString().trim()) {
            setStatus({
                type: "error",
                msg: "Something went wrong. Please try again.",
            });
            return;
        }

        const payload = Object.fromEntries(form);
        try {
            // Wire this to your API if available:
            // const res = await fetch("/api/contact", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(payload),
            // });
            // if (!res.ok) throw new Error();

            // Simulate success for now:
            await new Promise((r) => setTimeout(r, 500));
            setStatus({ type: "ok", msg: "Thanks! We’ll be in touch shortly." });
            e.currentTarget.reset();
        } catch {
            setStatus({ type: "error", msg: "Could not send. Please try again." });
        }
    }

    return (
        <section className="w-full py-14 md:py-18">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    className="text-center"
                >
                    <p className="text-[13px] font-semibold tracking-widest text-[#19d3c5] uppercase">
                        Get In Touch
                    </p>
                    <h2 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-[#0f6f70]">
                        We’d Love To Hear From You
                    </h2>
                    <p className="mt-3 text-[15px] leading-7 text-[#1D2939] max-w-2xl mx-auto">
                        Tell us about your project, timeline, or goals. We’ll reply with a
                        tailored plan and next steps.
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Left: Info Card */}
                    <motion.aside
                        variants={fadeUp}
                        className="rounded-2xl bg-gradient-to-b from-white to-white/90 ring-1 ring-black/5 shadow-sm p-6"
                    >
                        <h3 className="text-[18px] font-bold text-[#0f6f70]">
                            Contact Details
                        </h3>
                        <p className="mt-2 text-[14px] text-[#1D2939]">
                            Prefer email or a quick call? Here are the ways to reach us.
                        </p>

                        <div className="mt-5 space-y-3">
                            <InfoRow Icon={Mail} label="Email" value="contact@fouratek.com" />
                            <InfoRow Icon={Phone} label="Phone" value="+92 321 5231986" />
                            <InfoRow Icon={Phone} label="US" value="+1 (832) 861-8727" />
                            <InfoRow
                                Icon={MapPin}
                                label="Address"
                                value="C-01, Block A, Kazimabad, Karachi"
                            />
                            {/* NEW: US Address */}
                            <InfoRow
                                Icon={MapPin}
                                label="US Address"
                                value="9604 57th 7D, Corona NY, United States, 11368"
                            />
                            <InfoRow Icon={Clock} label="Hours" value="Mon–Fri · 9am–6pm" />
                            <InfoRow Icon={Building2} label="Company" value="4A Tek" />
                        </div>

                        <div className="mt-6 rounded-xl bg-[#0f6f70]/5 p-4">
                            <p className="text-[13px] text-[#0f6f70] font-semibold">
                                Quick Tip
                            </p>
                            <p className="text-[14px] text-[#1D2939]">
                                Include your budget & timeline so we can suggest the best
                                approach and options.
                            </p>
                        </div>
                    </motion.aside>

                    {/* Right: Form */}
                    <motion.div
                        variants={fadeUp}
                        className="lg:col-span-2 rounded-2xl bg-white ring-1 ring-black/5 shadow-sm p-6 md:p-7"
                    >
                        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* honeypot */}
                            <input
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                className="hidden"
                                aria-hidden="true"
                            />

                            {/* Row 1 */}
                            <FormInput label="Full Name" name="name" required />
                            <FormInput label="Company" name="company" />

                            {/* Row 2 */}
                            <FormInput label="Email" name="email" type="email" required />
                            <FormInput label="Phone" name="phone" type="tel" />

                            {/* Row 3 */}
                            <FormSelect
                                label="Budget"
                                name="budget"
                                options={[
                                    "Under $5k",
                                    "$5k–$15k",
                                    "$15k–$30k",
                                    "$30k–$75k",
                                    "$75k+",
                                ]}
                            />
                            <FormSelect
                                label="Timeline"
                                name="timeline"
                                options={["ASAP", "1–3 months", "3–6 months", "Flexible"]}
                            />

                            {/* Row 4 (subject spans 2) */}
                            <div className="md:col-span-2">
                                <FormInput label="Subject" name="subject" required />
                            </div>

                            {/* Row 5 (message spans 2) */}
                            <div className="md:col-span-2">
                                <FormTextArea
                                    label="Project Details"
                                    name="message"
                                    rows={6}
                                    placeholder="Tell us about your goals, features, integrations, or links to references…"
                                />
                            </div>

                            {/* Submit */}
                            <div className="md:col-span-2 mt-2 flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-md bg-[#0f6f70] px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm hover:bg-[#0d5c5d] focus:outline-none focus:ring-2 focus:ring-[#19d3c5] focus:ring-offset-2"
                                >
                                    <Send className="h-4 w-4" />
                                    Send Message
                                </button>
                                <p
                                    className={`text-[14px] ${status.type === "ok"
                                            ? "text-emerald-600"
                                            : status.type === "error"
                                                ? "text-rose-600"
                                                : "text-[#1D2939]"
                                        }`}
                                    aria-live="polite"
                                >
                                    {status.msg}
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/* ----- Small Subcomponents ----- */
function InfoRow({ Icon, label, value }) {
    return (
        <div className="flex items-start gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0f6f70]/10">
                <Icon className="h-5 w-5 text-[#0f6f70]" />
            </span>
            <div>
                <p className="text-[13px] font-semibold text-[#0f6f70]">{label}</p>
                <p className="text-[14px] text-[#1D2939]">{value}</p>
            </div>
        </div>
    );
}

function FormInput({ label, name, type = "text", required = false }) {
    return (
        <label className="block">
            <span className="text-[13px] font-medium text-[#0f6f70]">{label}</span>
            <input
                name={name}
                type={type}
                required={required}
                className="mt-1 block w-full rounded-md border border-black/10 bg-white px-3 py-2 text-[14px] text-[#1D2939] outline-none focus:ring-2 focus:ring-[#19d3c5]"
            />
        </label>
    );
}

function FormTextArea({ label, name, rows = 5, placeholder }) {
    return (
        <label className="block">
            <span className="text-[13px] font-medium text-[#0f6f70]">{label}</span>
            <textarea
                name={name}
                rows={rows}
                placeholder={placeholder}
                className="mt-1 block w-full rounded-md border border-black/10 bg-white px-3 py-2 text-[14px] text-[#1D2939] outline-none focus:ring-2 focus:ring-[#19d3c5]"
            />
        </label>
    );
}

function FormSelect({ label, name, options = [] }) {
    return (
        <label className="block">
            <span className="text-[13px] font-medium text-[#0f6f70]">{label}</span>
            <select
                name={name}
                className="mt-1 block w-full rounded-md border border-black/10 bg-white px-3 py-2 text-[14px] text-[#1D2939] outline-none focus:ring-2 focus:ring-[#19d3c5]"
                defaultValue=""
            >
                <option value="" disabled>
                    Select…
                </option>
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
        </label>
    );
}
