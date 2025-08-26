// src/app/page.js
import Header from "../components/header";
import Hero from "./components/hero";
import TuustedBy from "../components/trustedby"
import Services from "../components/Service"
import Customer from "../components/happyclients"
import Contact from "../components/contact"
import Footer from "../components/footer"






export default function Root() {
    return (
        <main className="relative min-h-screen bg-transparent">
            <Header />
            <Hero />
            <Services />
            <TuustedBy />
            <Customer />
            <Contact />
            <Footer />


        </main>
    );
}
