export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "../../util/prisma";

// Shared chrome
import Header from "../../components/header";
import Contact from "../../components/contact";
import Trustedby from "../../components/trustedby";
import Testmonials from "../../components/happyclients";
import Footer from "../../components/footer";
import Process from "./components/process";

/* ---------- helpers ---------- */
// Accepts "Heading: description", "Heading — description", or "Heading | description"
function parseQA(str) {
    if (!str || typeof str !== "string") return null;
    const match = str.match(/^(.*?)(?:\s*[:|—-]\s*)(.+)$/); // split on first :, |, —, -
    if (match) return { head: match[1].trim(), desc: match[2].trim() };
    return { head: str.trim(), desc: "" }; // only heading
}

/* ---------- simple hero ---------- */
function Hero({ title, subtitle, bgImage = "/assets/bi-hero.jpg" }) {
    return (
        <section className="relative">
            <div className="relative h-[54vh] min-h-[360px] w-full">
                <Image
                    src={bgImage}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    priority={false}
                />
                <div className="absolute inset-0 bg-[#0f6f70]/70" />
            </div>
            <div className="absolute inset-0">
                <div className="mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
                    <div>
                        <h1 className="text-white font-extrabold leading-[1.05] text-[42px] sm:text-[52px] md:text-[64px]">
                            {title}
                        </h1>
                        {!!subtitle && (
                            <p className="mt-4 max-w-2xl text-white/90 text-[15px] sm:text-[16px] leading-7">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ---------- page ---------- */
export default async function ServiceDetail(props) {
    const { slug } = await props.params;

    const s = await prisma.service.findUnique({
        where: { slug },
        // fields in your current schema
        select: {
            title: true,
            subtitle: true,
            coverImage: true,
            image1: true,
            details: true,
            q1: true, q2: true, q3: true, q4: true, q5: true,
        },
    });

    if (!s) return notFound();

    // Build left list from q1..q5
    const bullets = [s.q1, s.q2, s.q3, s.q4, s.q5]
        .filter(Boolean)
        .map(parseQA)
        .filter(Boolean);

    const rightImage = s.image1 || s.coverImage || null;

    return (
        <>
            <Header />
            <Hero title={s.title} subtitle={s.subtitle} />

            {/* Only the list + image section (like your screenshot) */}
            <main className="py-14 md:py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Left: numbered cards */}
                        <div className="lg:col-span-7 order-2 lg:order-1">
                            <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#0f6f70]">
                                {s.title}
                            </h2>

                            <ol className="mt-4 space-y-4">
                                {bullets.length === 0 && (
                                    <li className="rounded-xl bg-white ring-1 ring-black/5 p-4 shadow-sm">
                                        <p className="text-[14px] text-[#1D2939]">
                                            Add items in the dashboard using <code>q1–q5</code> as
                                            <span className="font-semibold"> “Heading: description”</span>.
                                        </p>
                                    </li>
                                )}

                                {bullets.map((b, i) => (
                                    <li key={i} className="rounded-xl bg-white ring-1 ring-black/5 p-4 shadow-sm">
                                        <p className="font-semibold text-[#0f6f70]">
                                            {i + 1}. {b.head}
                                        </p>
                                        {!!b.desc && (
                                            <p className="mt-1 text-[14px] leading-6 text-[#1D2939]">{b.desc}</p>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Right: image */}
                        <div className="lg:col-span-5 order-1 lg:order-2">
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-black/5 shadow-sm">
                                {rightImage ? (
                                    <Image
                                        src={rightImage}
                                        alt={s.title}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 1024px) 100vw, 560px"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400">
                                        No image
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Process />
            <Trustedby />
            <Testmonials />

            <Contact />
            <Footer />
        </>
    );
}
