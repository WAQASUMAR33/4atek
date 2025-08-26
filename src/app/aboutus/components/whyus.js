"use client";

import { motion } from "framer-motion";
import {
    Ear,
    ShieldCheck,
    Sparkles,
    BarChart3,
    BadgeCheck,
    DollarSign,
} from "lucide-react";

// Data
const FEATURES = [
    {
        title: "We Listen and Improve",
        desc:
            "We start by understanding your business objectives. All decisions are made with your goals in mind. We listen to your feedback and provide suggestions to enhance your website’s effectiveness.",
        Icon: Ear,
    },
    {
        title: "Integrity Matters",
        desc:
            "We conduct business honestly, ethically, and with genuine concern for your well-being. We won’t sell you anything you don’t need. You can trust us to always be courteous and respectful.",
        Icon: ShieldCheck,
    },
    {
        title: "Unique Designs",
        desc:
            "We create one-of-a-kind site designs to elevate your company’s status and outperform your competition. A professional website enhances your reputation and attracts clients.",
        Icon: Sparkles,
    },
    {
        title: "Best Price Guaranteed",
        desc:
            "We promise the best value for your investment. If you find a lower price for the same service, we’ll match it—guaranteed..",
        Icon: DollarSign,
    },
    {
        title: "Finance Analysis",
        desc:
            "Gain a clear understanding of your financial performance and make informed decisions with our comprehensive analysis and strategic recommendations.",
        Icon: BarChart3,
    },
    {
        title: "Professional Team",
        desc:
            "With a wealth of experience and a passion for innovation, our professionals are committed to providing top-notch solutions and exceptional service.",
        Icon: BadgeCheck,
    },
];

// Animations
const gridStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardAnim = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

export default function WhyChooseUs() {
    return (
        <section className="w-full py-14 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={gridStagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                    {FEATURES.map(({ title, desc, Icon }) => (
                        <motion.article
                            key={title}
                            variants={cardAnim}
                            className="
                rounded-2xl border border-black/10 bg-white
                p-6 sm:p-7
                shadow-sm hover:shadow-md
                transition-shadow
              "
                        >
                            <div className="flex items-start gap-4">
                                <span
                                    className="
                    inline-flex h-9 w-9 shrink-0 items-center justify-center
                    rounded-full bg-[#0f6f70]/10
                  "
                                >
                                    <Icon className="h-5 w-5 text-[#0f6f70]" strokeWidth={2.4} />
                                </span>

                                <div>
                                    <h3 className="text-[18px] font-semibold text-[#0f6f70]">
                                        {title}
                                    </h3>
                                    <p className="mt-2 text-[14px] leading-6 text-[#1D2939]">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
