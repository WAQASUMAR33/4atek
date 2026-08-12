import Header from "../components/header";
import Hero from "./components/hero";
import HappyClients from "../components/happyclients";
import Consulting from "./components/consultingP";
import Technical from "./components/technicalP";
import Contact from "../components/contact";
import Footer from "../components/footer";

export default function PartnersPage() {
    return (
        <main className="relative min-h-screen bg-transparent">
            <Header />
            <Hero />
            <Consulting />
            <Technical />
            <HappyClients />
            <Contact />
            <Footer />
        </main>
    );
}
