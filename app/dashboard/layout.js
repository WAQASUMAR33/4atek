// src/app/dashboard/layout.js
export const dynamic = "force-dynamic";

import Image from "next/image";
import DashboardNav from "./parts/DashboardNav";
import SignOutButton from "./parts/SignOutButton";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F7FAFA] text-[#0b2d2e]">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-black/5 bg-[#064e4f]/85 text-white backdrop-blur">
                <div className="mx-auto max-w-6xl px-5">
                    <div className="flex h-14 items-center justify-between">
                        {/* Left: logo + title */}
                        <div className="flex items-center gap-3">
                            {/* Swap src with your white logo path */}
                            <div className="relative h-8 w-[150px]">
                                <Image
                                    src="/assets/logo.png"   // <- use your white logo path
                                    alt="4A tek"
                                    fill
                                    className="object-contain"
                                    sizes="150px"
                                    priority
                                />
                            </div>
                            <span className="hidden sm:block text-base font-semibold tracking-tight">
                                Admin Dashboard
                            </span>
                        </div>

                        {/* Right: user + Sign out */}
                        <div className="flex items-center gap-3 text-sm">
                            <span className="hidden sm:block text-white/85">contact@fouratek.com</span>
                            <SignOutButton />
                        </div>
                    </div>

                    {/* Tabs */}
                    <DashboardNav />
                </div>
            </header>

            {/* Page content */}
            <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
        </div>
    );
}
