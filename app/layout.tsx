import type { Metadata } from "next";
import { Inter, Montserrat, Raleway, Cinzel } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zakarie Hashi",
  description: "Zakarie Hashi's Portfolio: Blogs, Articles and News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${montserrat.variable} ${raleway.variable} ${cinzel.variable} font-sans antialiased`}>
        <Providers>
          <Navbar />
          <main >{children}</main>
          <Footer />
          <Toaster position='bottom-right' richColors />
        </Providers>
      </body>
    </html>
  );
}
