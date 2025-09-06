// src/app/layout.js
import "./globals.css";
import { Poppins, Geist_Mono } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  // reuse your existing var so any CSS referencing --font-geist-sans keeps working
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata = {
  title: "4A Tek - Digital Solutions & Technology Services",
  description: "4A Tek is a leading digital solutions provider specializing in web development, mobile applications, AI-powered solutions, and comprehensive technology consulting. We help businesses transform their digital presence with innovative, scalable, and secure solutions across healthcare, retail, manufacturing, and more industries.",
  keywords: "digital solutions, web development, mobile apps, AI solutions, technology consulting, software development, digital transformation, 4A Tek",
  authors: [{ name: "4A Tek" }],
  creator: "4A Tek",
  publisher: "4A Tek",
  robots: "index, follow",
  openGraph: {
    title: "4A Tek - Digital Solutions & Technology Services",
    description: "Transform your business with 4A Tek's innovative digital solutions. Specializing in web development, mobile apps, AI solutions, and technology consulting.",
    url: "https://www.fouratek.com/",
    siteName: "4A Tek",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "4A Tek - Digital Solutions & Technology Services",
    description: "Transform your business with 4A Tek's innovative digital solutions. Specializing in web development, mobile apps, AI solutions, and technology consulting.",
  },
  themeColor: "#0f6f70",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Poppins everywhere; mono variable preserved for code blocks if you use it */}
      <body className={`${poppins.className} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
