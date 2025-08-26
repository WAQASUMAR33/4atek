"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
    const [openMobile, setOpenMobile] = useState(false);
    const [openServices, setOpenServices] = useState(false);
    const [services, setServices] = useState([]);          // <- dynamic service pages
    const [loadingSvcs, setLoadingSvcs] = useState(true);  // <- tiny guard for UX
    const servicesRef = useRef(null);
    const closeSrvTimer = useRef(null);
    const pathname = usePathname();

    // Fetch services once
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const res = await fetch("/api/services?take=100", { cache: "no-store" });
                const json = await res.json();
                const rows = Array.isArray(json?.items) ? json.items : Array.isArray(json) ? json : [];
                if (!alive) return;
                setServices(
                    rows
                        .filter(s => s?.slug && s?.title)
                        .map(s => ({ label: s.title, href: `/services/${s.slug}` }))
                );
            } catch (e) {
                console.error("Load services failed:", e);
            } finally {
                if (alive) setLoadingSvcs(false);
            }
        })();
        return () => { alive = false; };
    }, []);

    // Helper: active route
    const isActive = useMemo(() => {
        return (href) => {
            if (href === "/") return pathname === "/";
            return pathname?.startsWith(href);
        };
    }, [pathname]);

    // ==== Hover open/close with delay to prevent flicker ====
    const openSrvNow = () => {
        if (closeSrvTimer.current) clearTimeout(closeSrvTimer.current);
        setOpenServices(true);
    };
    const closeSrvDelayed = () => {
        if (closeSrvTimer.current) clearTimeout(closeSrvTimer.current);
        closeSrvTimer.current = setTimeout(() => setOpenServices(false), 160);
    };

    // Close if you click outside
    useEffect(() => {
        function onDocClick(e) {
            if (
                openServices &&
                servicesRef.current &&
                !servicesRef.current.contains(e.target)
            ) {
                setOpenServices(false);
            }
        }
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [openServices]);

    // ✅ Inserted Partners between Portfolio and Contact Us
    const navItems = [
        { label: "HOME", href: "/home" },
        { label: "ABOUT US", href: "/aboutus" },
        { label: "PORTFOLIO", href: "/portfolio" },
        { label: "PARTNERS", href: "/partners" }, // <-- NEW
        { label: "CONTACT US", href: "/contact" },
    ];

    return (
        // Overlay header (NOT sticky)
        <header className="absolute inset-x-0 top-0 z-40 text-white/95">
            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
                <div className="flex h-[68px] items-center justify-between">
                    {/* Logo */}
                    <Link href="/home" className="flex items-center" aria-label="A4Tech — Home">
                        <div className="relative h-9 w-[170px] md:w-[190px]">
                            <Image
                                src="/assets/logo.png"
                                alt="4A Tek"
                                fill
                                sizes="(max-width: 768px) 170px, 190px"
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-6 lg:flex">
                        {navItems.slice(0, 2).map((item) => (
                            <NavLink key={item.label} href={item.href} active={isActive(item.href)}>
                                {item.label}
                            </NavLink>
                        ))}

                        {/* SERVICES: hover opens dropdown; click navigates to /services */}
                        <div
                            className="relative"
                            ref={servicesRef}
                            onMouseEnter={openSrvNow}
                            onMouseLeave={closeSrvDelayed}
                        >
                            <Link
                                href="/services"
                                className={`group inline-flex items-center gap-1.5 text-[14px] font-semibold uppercase tracking-wide transition-opacity hover:opacity-100 ${isActive("/services") ? "text-white" : "text-white/90"}`}
                            >
                                SERVICES
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${openServices ? "rotate-180" : ""}`}
                                />
                            </Link>

                            <Dropdown
                                open={openServices}
                                items={services}
                                loading={loadingSvcs}
                                hoverProps={{
                                    onMouseEnter: openSrvNow,
                                    onMouseLeave: closeSrvDelayed,
                                }}
                            />
                        </div>

                        {navItems.slice(2).map((item) => (
                            <NavLink key={item.label} href={item.href} active={isActive(item.href)}>
                                {item.label}
                            </NavLink>
                        ))}

                        {/* CTA → contact page */}
                        <Link
                            href="/contact"
                            className="ml-2 inline-flex items-center rounded-full bg-[#19d3c5] px-4 py-2 text-[13px] font-semibold text-[#063c3c] shadow hover:brightness-105 active:brightness-95"
                        >
                            Get a Quote
                        </Link>
                    </nav>

                    {/* Mobile burger */}
                    <button
                        className="inline-flex items-center gap-2 rounded-md p-2 lg:hidden"
                        aria-label="Open menu"
                        onClick={() => setOpenMobile(true)}
                    >
                        <Menu className="h-7 w-7" />
                    </button>
                </div>
            </div>

            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${openMobile ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setOpenMobile(false)}
            />

            {/* Mobile drawer */}
            <aside
                className={`fixed right-0 top-0 z-[60] h-full w-[86%] max-w-sm bg-[#092f36]/95 text-white shadow-2xl ring-1 ring-white/10 transition-transform duration-300 lg:hidden ${openMobile ? "translate-x-0" : "translate-x-full"}`}
                aria-hidden={!openMobile}
            >
                <div className="flex items-center justify-between px-6 py-5">
                    <div className="relative h-8 w-[160px]">
                        <Image src="/assets/logo.png" alt="4A tek" fill sizes="160px" className="object-contain" />
                    </div>
                    <button className="rounded-md p-2" onClick={() => setOpenMobile(false)} aria-label="Close">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="h-px w-full bg-white/10" />

                <div className="flex flex-col gap-1 px-4 py-4">
                    {navItems.map((item) => (
                        <MobileLink
                            key={item.label}
                            href={item.href}
                            active={isActive(item.href)}
                            onClick={() => setOpenMobile(false)}
                        >
                            {item.label}
                        </MobileLink>
                    ))}

                    {/* Services in mobile */}
                    <MobileLink href="/services" active={isActive("/services")} onClick={() => setOpenMobile(false)}>
                        SERVICES
                    </MobileLink>
                    <MobileDisclosure
                        title="Service Pages"
                        items={services}
                        loading={loadingSvcs}
                        onDone={() => setOpenMobile(false)}
                    />

                    {/* CTA → contact page */}
                    <Link
                        href="/contact"
                        className="mt-3 inline-flex h-11 items-center justify-center rounded-md bg-[#19d3c5] px-5 text-[14px] font-semibold text-[#063c3c]"
                        onClick={() => setOpenMobile(false)}
                    >
                        Get a Quote
                    </Link>
                </div>
            </aside>
        </header>
    );
}

function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`relative text-[14px] font-semibold uppercase tracking-wide transition-opacity hover:opacity-100 ${active ? "text-white" : "text-white/90"}`}
        >
            <span className="px-1.5 py-2">{children}</span>
            <span
                className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] bg-white/90 transition-all duration-200 ${active ? "w-full" : "w-0 group-hover:w-full"}`}
            />
        </Link>
    );
}

function Dropdown({ open, items, loading, hoverProps = {} }) {
    return (
        <div
            className={`absolute right-0 mt-2 w-72 overflow-hidden rounded-md border border-white/10 bg-[#0c3b44]/95 shadow-xl ring-1 ring-white/10 transition-all ${open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"}`}
            role="menu"
            aria-hidden={!open}
            {...hoverProps}
        >
            <ul className="py-2">
                {loading && (
                    <li className="px-4 py-2.5 text-[13px] text-white/70">Loading…</li>
                )}
                {!loading && items.length === 0 && (
                    <li className="px-4 py-2.5 text-[13px] text-white/70">No services yet</li>
                )}
                {!loading &&
                    items.map((it) => (
                        <li key={it.href}>
                            <Link
                                href={it.href}
                                className="block px-4 py-2.5 text-[13px] font-medium tracking-wide text-white/90 hover:bg-white/5 hover:text-white"
                                role="menuitem"
                            >
                                {it.label}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

function MobileLink({ href, active, children, onClick }) {
    return (
        <Link
            href={href}
            className={`rounded-md px-3 py-3 text-[15px] font-semibold uppercase tracking-wide hover:bg-white/5 ${active ? "text-white" : "text-white/90"}`}
            onClick={onClick}
        >
            {children}
        </Link>
    );
}

function MobileDisclosure({ title, items, loading, onDone }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="rounded-md">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-[15px] font-semibold uppercase tracking-wide hover:bg-white/5"
                aria-expanded={open}
            >
                {title}
                <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            <div
                className={`grid overflow-hidden transition-[grid-template-rows] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
                <ul className="min-h-0 overflow-hidden pl-3">
                    {loading && (
                        <li className="px-3 py-2.5 text-[14px] text-white/70">Loading…</li>
                    )}
                    {!loading && items.length === 0 && (
                        <li className="px-3 py-2.5 text-[14px] text-white/70">No services yet</li>
                    )}
                    {!loading &&
                        items.map((it) => (
                            <li key={it.href}>
                                <Link
                                    href={it.href}
                                    className="block rounded-md px-3 py-2.5 text-[14px] text-white/90 hover:bg-white/5"
                                    onClick={onDone}
                                >
                                    {it.label}
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}
