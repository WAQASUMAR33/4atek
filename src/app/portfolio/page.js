// src/app/portfolio/page.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Header from "../components/header";
import Hero from "./components/hero";
import Contact from "../components/contact";
import Footer from "../components/footer";
import { prisma } from "../util/prisma";
import CardGrid from "./components/case";

export default async function PortfolioPage() {
    // Pull only published items; tweak order as you like
    const items = await prisma.portfolio.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { updatedAt: "desc" },
        select: {
            id: true,
            slug: true,
            title: true,
            image: true,
            shortDes: true,
        },
        take: 50,
    });

    return (
        <>
            <Header />

            <Hero
                title="Portfolio"
                subtitle="A selection of products, apps, and digital experiences we’ve crafted."
                bgImage="/assets/portfolio-hero.jpg"
                overlayClass="bg-teal-600/50"
                align="left"
            />

            {/* Cards section */}
            <main className="w-full py-16 md:py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center font-extrabold tracking-tight text-[#0f6f70] text-3xl sm:text-4xl">
                        Selected Work
                    </h2>

                    <CardGrid items={items} />
                </div>
            </main>

            <Contact />
            <Footer />
        </>
    );
}
