"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Tab({ href, label }) {
    const pathname = usePathname();
    const active = pathname?.startsWith(href);

    return (
        <Link
            href={href}
            className={[
                "relative -mb-px inline-flex items-center gap-2 border-b border-transparent px-3.5 py-2 text-sm transition",
                active ? "text-white font-medium" : "text-white/60 hover:text-white"
            ].join(" ")}
        >
            {label}
            {active && (
                <span className="absolute inset-x-2 -bottom-0.5 h-[3px] rounded-full bg-gradient-to-r from-[#b9feff] via-[#158578] to-[#5eead4]" />
            )}
        </Link>
    );
}

export default function DashboardNav() {
    return (
        <nav className="flex items-center gap-2">
            <Tab href="/dashboard/portfolio" label="Portfolio" />
            <Tab href="/dashboard/services" label="Services" />
        </nav>
    );
}
