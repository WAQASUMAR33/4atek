"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

// lucide-react icons (tree-shake friendly)
import {
    Search,
    SlidersHorizontal,
    Database,
    Presentation,
    ShieldCheck,
    Rocket,
    Code2,
    Settings,
    Cloud,
    Cpu,
    BarChart3,
    Users,
    Palette,
    Headphones,
} from "lucide-react";

/**
 * A single, reusable "Our Process" section that adapts to multiple services.
 *
 * Props:
 * - service?: one of:
 *   'web-app', 'erp-crm', 'bi-dashboard', 'illustration', 'cloud-software',
 *   'ai-big-data', 'digital-marketing', 'it-support'
 * - title?: override section title (defaults to service-specific or "Our Process")
 * - subtitle?: optional small subtitle line
 * - steps?: custom array to override defaults [
 *     { icon: 'Search', title: 'Discovery', desc: '...' },
 *     ...
 *   ]
 * - className?: string for outer wrapper
 */
function ProcessSection({
    service,
    title,
    subtitle,
    steps,
    className,
}) {
    // Central icon library so the steps can use simple icon names
    const ICONS = {
        Search,
        SlidersHorizontal,
        Database,
        Presentation,
        ShieldCheck,
        Rocket,
        Code2,
        Settings,
        Cloud,
        Cpu,
        BarChart3,
        Users,
        Palette,
        Headphones,
    };

    // Default step presets by service (short, reusable copy)
    const PRESETS = {
        "web-app": {
            title: "Web / App Development Process",
            steps: [
                { icon: "Search", title: "Discovery", desc: "Goals, audience, KPIs and success criteria." },
                { icon: "Code2", title: "Architecture", desc: "Tech stack, data flows and component design." },
                { icon: "Settings", title: "Build & Integrate", desc: "Frontend, backend and API integrations." },
                { icon: "ShieldCheck", title: "QA & UAT", desc: "Accessibility, performance and security checks." },
                { icon: "Rocket", title: "Launch & Iterate", desc: "Monitoring, analytics and continuous improvements." },
            ],
        },
        "erp-crm": {
            title: "ERP / CRM Implementation Process",
            steps: [
                { icon: "Search", title: "Requirements", desc: "Stakeholders, workflows and data ownership." },
                { icon: "SlidersHorizontal", title: "Data Prep", desc: "Migration, transformation and quality checks." },
                { icon: "Settings", title: "Customization", desc: "Modules, automations and role permissions." },
                { icon: "ShieldCheck", title: "Validation & UAT", desc: "User testing, gap fixes and acceptance." },
                { icon: "Rocket", title: "Go-Live & Training", desc: "Rollout, enablement and change management." },
            ],
        },
        "bi-dashboard": {
            title: "BI Delivery Process",
            steps: [
                { icon: "Search", title: "Discovery", desc: "Stakeholders, KPIs, audience and access patterns." },
                { icon: "SlidersHorizontal", title: "Data Prep", desc: "Ingestion, transformation and data quality." },
                { icon: "Database", title: "Modeling", desc: "Semantic layer, metric logic and governance." },
                { icon: "Presentation", title: "Visualization", desc: "Layouts, charts and drill paths." },
                { icon: "ShieldCheck", title: "Validation & UAT", desc: "Accuracy, performance and user feedback." },
                { icon: "Rocket", title: "Launch & Iterate", desc: "Rollout, training and continuous improvement." },
            ],
        },
        illustration: {
            title: "Illustration / Animation Process",
            steps: [
                { icon: "Search", title: "Brief & Moodboard", desc: "References, styles and scope alignment." },
                { icon: "Palette", title: "Concepts", desc: "Sketches, color directions and narrative." },
                { icon: "Presentation", title: "Storyboards", desc: "Frames, motion cues and timing." },
                { icon: "Settings", title: "Production", desc: "Illustration, rigging and animation." },
                { icon: "ShieldCheck", title: "Review", desc: "Edits, polish and final approvals." },
                { icon: "Rocket", title: "Delivery", desc: "Exports, handoff and launch support." },
            ],
        },
        "cloud-software": {
            title: "Cloud / Software Development Process",
            steps: [
                { icon: "Search", title: "Discovery", desc: "Use cases, SLOs and compliance needs." },
                { icon: "Cloud", title: "Cloud Architecture", desc: "IaC, environments and scalability." },
                { icon: "Settings", title: "Development", desc: "Microservices, CI/CD and observability." },
                { icon: "ShieldCheck", title: "Security & QA", desc: "Threat modeling, tests and hardening." },
                { icon: "Rocket", title: "Deploy & Operate", desc: "Blue/green, monitoring and runbooks." },
            ],
        },
        "ai-big-data": {
            title: "AI & Big Data Process",
            steps: [
                { icon: "Search", title: "Use-Case & Feasibility", desc: "Success metrics and constraints." },
                { icon: "Database", title: "Data Strategy", desc: "Collection, labeling and governance." },
                { icon: "Cpu", title: "Modeling", desc: "Training, evaluation and alignment." },
                { icon: "BarChart3", title: "MLOps", desc: "Versioning, drift monitoring and retraining." },
                { icon: "Rocket", title: "Integrate", desc: "Apps, agents and business workflows." },
            ],
        },
        "digital-marketing": {
            title: "Digital Marketing Process",
            steps: [
                { icon: "Search", title: "Research", desc: "Market, audience and competitors." },
                { icon: "Settings", title: "Plan & Assets", desc: "Channels, creatives and landing pages." },
                { icon: "BarChart3", title: "Launch & Optimize", desc: "A/B tests, budgets and ROAS." },
                { icon: "Presentation", title: "Report", desc: "Insights, attribution and next steps." },
            ],
        },
        "it-support": {
            title: "IT Support & Consultancy Process",
            steps: [
                { icon: "Search", title: "Assess", desc: "Inventory, risks and priorities." },
                { icon: "ShieldCheck", title: "Stabilize", desc: "Patching, backups and security baselines." },
                { icon: "Settings", title: "Improve", desc: "Automation, SOPs and documentation." },
                { icon: "Headphones", title: "Support", desc: "SLAs, monitoring and escalation paths." },
            ],
        },
    };

    const computed = useMemo(() => {
        const fallback = { title: "Our Process", steps: PRESETS["bi-dashboard"].steps };
        if (!service && !steps) return fallback;
        const preset = service ? PRESETS[service] : null;
        return {
            title: title || preset?.title || fallback.title,
            steps: steps?.length ? steps : preset?.steps || fallback.steps,
        };
    }, [service, steps, title]); // eslint-disable-line react-hooks/exhaustive-deps

    // Animations
    const container = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const item = {
        hidden: { opacity: 0, y: 18, scale: 0.98 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: 0.08 + i * 0.06, duration: 0.45, ease: "easeOut" },
        }),
    };

    return (
        <section
            className={clsx(
                "relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8",
                className
            )}
            aria-label={computed.title}
        >
            {/* Heading */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                variants={container}
                className="mx-auto mb-10 max-w-3xl text-center"
            >
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                    {computed.title}
                </h2>
                {subtitle ? (
                    <p className="mt-3 text-sm text-gray-600 md:text-base">{subtitle}</p>
                ) : null}
            </motion.div>

            {/* Steps grid */}
            <div className="relative">
                {/* subtle connector line (desktop) */}
                <div className="pointer-events-none absolute left-1/2 top-9 hidden h-px w-full -translate-x-1/2 transform bg-gradient-to-r from-transparent via-teal-200 to-transparent md:block" />

                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {computed.steps.map((s, i) => {
                        const Icon = ICONS[s.icon] ?? Search;
                        return (
                            <motion.li
                                key={`${s.title}-${i}`}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={item}
                                className="group relative"
                            >
                                <div className="flex h-full flex-col items-center rounded-2xl border border-teal-100 bg-white/80 p-5 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                    <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-teal-600/10 ring-1 ring-teal-200 group-hover:bg-teal-600/15">
                                        <Icon className="size-5 text-teal-700" aria-hidden />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-900">{s.title}</h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">{s.desc}</p>
                                </div>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}

export default memo(ProcessSection);
