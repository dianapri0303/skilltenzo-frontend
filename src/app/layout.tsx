import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-family" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--second-family",
});

export const metadata: Metadata = {
  title: "Skilltenzo",
  description: "Skills you actually need. From people who actually do.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
