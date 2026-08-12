import Header from "../components/header";
import Hero from "./components/hero";
import TrustedBy from "../components/trustedby";
import Services from "../components/Service";
import HappyClients from "../components/happyclients";
import Contact from "../components/contact";
import Footer from "../components/footer";

export default function ServicesPage() {
    return (
        <main className="relative min-h-screen bg-transparent">
            <Header />
            <Hero />
            <Services />
            <TrustedBy />
            <HappyClients />
            <Contact />
            <Footer />
        </main>
    );
}
