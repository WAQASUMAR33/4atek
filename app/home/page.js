// src/app/page.js
import Header from "../components/header";
import Hero from "./components/hero";
import Satification from "./components/section-satisfaction"
import Services from "../components/Service"
import Unlock from "./components/unlock"
import TuustedBy from "../components/trustedby"
import Values from "./components/values"
import Customer from "../components/happyclients"
import Accelerate from "./components/Accelerate"
import Cost from "./components/costhero"
import WhyChoose from "./components/whychoose"
import Industries from "./components/industries"
import Contact from "../components/contact"
import Scale from "../components/scale"
import Footer from "../components/footer"

import QuotePopup from "../components/quote-popup";




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
