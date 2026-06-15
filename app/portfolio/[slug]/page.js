// src/app/portfolio/[slug]/page.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import sanitizeHtml from "sanitize-html";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "../../util/prisma";

import Header from "../../components/header";
import Hero from "./components/hero";
import Contact from "../../components/contact";
import Footer from "../../components/footer";

export default async function PortfolioDetail(props) {
    // In App Router RSC, params is a promise
    const { slug } = await props.params;

    const item = await prisma.portfolio.findUnique({ where: { slug } });
    if (!item || item.status !== "PUBLISHED") return notFound();

    const clean = sanitizeHtml(item.contentHtml ?? "", {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([
            "img",
            "figure",
            "figcaption",
            "h1",
            "h2",
            "h3",
            "iframe",
        ]),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            img: ["src", "alt", "title", "width", "height", "class"],
            a: ["href", "name", "target", "rel"],
            iframe: ["src", "width", "height", "allow", "allowfullscreen", "frameborder"],
        },
        transformTags: {
            a: (_t, attrs) => ({
                tagName: "a",
                attribs: { ...attrs, rel: "noopener noreferrer", target: "_blank" },
            }),
        },
    });

    return (
        <>
            <Header />

            <Hero
                title="Portfolio"
                subtitle="A selection of products, apps, and digital experiences."
                bgImage="/assets/portfolio-hero.jpg"
                overlayClass="bg-teal-600/50"
                align="left"
            />

            {/* Shell width matches the rest of the site */}
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Title + cover */}
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#0f6f70]">
                        {item.title}
                    </h1>

                    {item.image && (
                        <div className="relative mt-6 w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
                            {/* big cinematic cover */}
                            <div className="relative aspect-[16/7] sm:aspect-[21/9]">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    sizes="(min-width: 1280px) 1200px, (min-width: 1024px) 960px, 100vw"
                                    priority={false}
                                />
                            </div>
                        </div>
                    )}
                </header>

                {/* Body — full container width, professional typography */}
                <article
                    className="prose lg:prose-lg prose-neutral max-w-none"
                    dangerouslySetInnerHTML={{ __html: clean }}
                />
            </main>

            <Contact />
            <Footer />
        </>
    );
}
