import Header from "./components/header";
import Hero from "./home/components/hero";
import SatisfactionSection from "./home/components/section-satisfaction";
import Services from "./components/Service";
import Unlock from "./home/components/unlock";
import TrustedBy from "./components/trustedby";
import Values from "./home/components/values";
import HappyClients from "./components/happyclients";
import Accelerate from "./home/components/Accelerate";
import Cost from "./home/components/costhero";
import WhyChoose from "./home/components/whychoose";
import Industries from "./home/components/industries";
import Contact from "./components/contact";
import Scale from "./components/scale";
import Footer from "./components/footer";
import QuotePopup from "./components/quote-popup";

export default function HomePage() {
    return (
        <main className="relative min-h-screen bg-transparent">
            <Header />
            <Hero />
            <SatisfactionSection />
            <Services />
            <Unlock />
            <Scale />
            <TrustedBy />
            <Values />
            <HappyClients />
            <Accelerate />
            <Cost />
            <WhyChoose />
            <Industries />
            <Contact />
            <Footer />

            <QuotePopup />
        </main>
    );
}
