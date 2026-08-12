import Header from "../components/header";
import Hero from "./components/hero";
import Whyus from "./components/whyus";
import Values from "./components/values";
import Scale from "../components/scale";
import TrustedBy from "../components/trustedby";
import HappyClients from "../components/happyclients";
import Contact from "../components/contact";
import Footer from "../components/footer";

export default function AboutUsPage() {
    return (
        <main className="relative min-h-screen bg-transparent">
            <Header />
            <Hero />
            <Whyus />
            <Scale />
            <Values />
            <TrustedBy />
            <HappyClients />
            <Contact />
            <Footer />
        </main>
    );
}
