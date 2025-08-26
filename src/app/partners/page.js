// src/app/page.js
import Header from "../components/header";
import Hero from "./components/hero";
import Customer from "../components/happyclients"
import Consulting from "./components/consultingP"
import Technical from "./components/technicalP"
import Contact from "../components/contact"
import Footer from "../components/footer"






export default function Root() {
    return (
        <main className="relative min-h-screen bg-transparent">
            <Header />
            <Hero />
            <Consulting />
            <Technical />
            <Customer />
            <Contact />
            <Footer />


        </main>
    );
}
