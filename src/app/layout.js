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
  title: "4A Tek",
  description: "4A Tek",
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
