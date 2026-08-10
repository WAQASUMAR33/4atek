import Header from "./components/header";
import Hero from "./home/components/hero";
import Satification from "./home/components/section-satisfaction";
import Services from "./components/Service";
import Unlock from "./home/components/unlock";
import TuustedBy from "./components/trustedby";
import Values from "./home/components/values";
import Customer from "./components/happyclients";
import Accelerate from "./home/components/Accelerate";
import Cost from "./home/components/costhero";
import WhyChoose from "./home/components/whychoose";
import Industries from "./home/components/industries";
import Contact from "./components/contact";
import Scale from "./components/scale";
import Footer from "./components/footer";
import QuotePopup from "./components/quote-popup";

export default function Root() {
    return (
        <main className="relative min-h-screen bg-transparent">
            <Header />
            <Hero />
            <Satification />
            <Services />
            <Unlock />
            <Scale />
            <TuustedBy />
            <Values />
            <Customer />
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
