import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-family" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--second-family",
});

export const metadata = {
  title: "Skilltenzo",
  description: "Skills you actually need. From people who actually do.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
