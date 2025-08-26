// src/app/page.js
import Header from "../components/header";
import Hero from "./components/hero";
import Whyus from "./components/whyus";
import Values from "./components/values";
import Scale from "../components/scale";
import TuustedBy from "../components/trustedby"
import Customer from "../components/happyclients"
import Contact from "../components/contact"
import Footer from "../components/footer"






export default function Root() {
    return (
        <main className="relative min-h-screen bg-transparent">
            <Header />
            <Hero />
            <Whyus />
            <Scale />
            <Values />
            <TuustedBy />
            <Customer />
            <Contact />
            <Footer />


        </main>
    );
}
