// src/app/contact/page.js
import Header from "../components/header";
import Footer from "../components/footer";
import ContactHero from "./components/hero";
import Form from "./components/form";
// If you already have a contact section component you use on the home page,
// you can include it here as well.
// import Contact from "../components/contact";

export default function ContactPage() {
    return (
        <main className="relative min-h-screen bg-white">
            <Header />
            <ContactHero />
            <Form />

            {/* Optional: your existing contact section / form */}
            {/* <Contact /> */}

            <Footer />
        </main>
    );
}
