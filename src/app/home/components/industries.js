"use client";

import { motion } from "framer-motion";
import { 
    Heart, 
    ShoppingCart, 
    Building, 
    Cog, 
    Shield, 
    Scale 
} from "lucide-react";

const industries = [
    {
        title: "Healthcare & Pharma",
        description: "Enable smarter clinical decisions and better patient care with secure patient portals, and pharmacy automation",
        Icon: Heart,
    },
    {
        title: "Retail & eCommerce",
        description: "Enabling personalized shopping, smart inventory, and seamless supply chain integrations",
        Icon: ShoppingCart,
    },
    {
        title: "Real Estate & Facility Management",
        description: "Revolutionizing property operations with smart access, tenant systems, and predictive maintenance",
        Icon: Building,
    },
    {
        title: "Manufacturing & Industrial Automation",
        description: "Optimizing operations, predict maintenance needs, and enhance productivity across the factory floor",
        Icon: Cog,
    },
    {
        title: "Public Sector & Governance",
        description: "We partner with public institutions and non-profits to build digital portals, automate citizen services, and drive data-backed policy decisions",
        Icon: Shield,
    },
    {
        title: "Legal & Compliance",
        description: "Enhancing research, case management, and regulatory compliance through intelligent automation",
        Icon: Scale,
    },
];

// Animations
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 1.3, ease: "easeOut", delay: 0.1 } },
};

const gridStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardAnim = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    show: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        transition: { duration: 0.8, ease: "easeOut" } 
    },
};

export default function IndustriesSection() {
    return (
        <section className="w-full py-20 md:py-24 bg-[#F7FAFA]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                    {/* Left: Heading + copy */}
                    <motion.div
                        variants={fadeInLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="lg:col-span-5"
                    >
                        {/* Tagline */}
                        <div className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-[#1D2939] shadow-sm ring-1 ring-black/5 mb-6">
                            <span className="h-2 w-2 rounded-full bg-[#19d3c5] mr-2"></span>
                            Driving Innovation Across Diverse Sectors
                            <span className="h-2 w-2 rounded-full bg-[#19d3c5] ml-2"></span>
                        </div>

                        <h2 className="text-[#0f6f70] font-extrabold tracking-tight text-[24px] sm:text-[38px] md:text-[44px] leading-[1.04]">
                            Industries We Serve
                        </h2>

                        <p className="mt-6 max-w-2xl text-[15px] sm:text-[16px] leading-7 text-[#1D2939]">
                            At 4A Tek, we specialize in delivering AI-powered, data-driven digital solutions 
                            tailored to the unique challenges and workflows of each industry. Whether you're 
                            transforming legacy systems or building next-gen platforms from scratch, our 
                            cross-domain expertise ensures scalable and secure innovation at every step.
                        </p>

                        <div className="mt-6 space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="mt-2 h-2 w-2 rounded-full bg-[#19d3c5] flex-shrink-0"></span>
                                <p className="text-[14px] leading-6 text-[#1D2939]">
                                    We work with you to clarify goals, enhance ideas, and develop smart solutions
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="mt-2 h-2 w-2 rounded-full bg-[#19d3c5] flex-shrink-0"></span>
                                <p className="text-[14px] leading-6 text-[#1D2939]">
                                    End-to-end digital solutions for every stage of your business journey
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Industry cards grid */}
                    <motion.div
                        variants={gridStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="lg:col-span-7"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {industries.map((industry) => (
                                <motion.div
                                    key={industry.title}
                                    variants={cardAnim}
                                    className="
                                        rounded-2xl border border-black/10 bg-white
                                        p-6 shadow-sm hover:shadow-md
                                        transition-shadow duration-300
                                    "
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="
                                            inline-flex h-10 w-10 shrink-0 items-center justify-center
                                            rounded-full bg-[#0f6f70]/10
                                        ">
                                            <industry.Icon className="h-5 w-5 text-[#0f6f70]" strokeWidth={2.4} />
                                        </span>

                                        <div>
                                            <h3 className="text-[16px] font-semibold text-[#0f6f70] mb-2">
                                                {industry.title}
                                            </h3>
                                            <p className="text-[13px] leading-6 text-[#1D2939]">
                                                {industry.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
