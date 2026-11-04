import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { FooterBottom } from "@/components/footer-bottom";
import { FooterTop } from "@/components/footer-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SocialServe | Together for a Better Society",
  description:
    "Join social service events, help people in need, and make a positive impact in your local area.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <footer className="bg-brand-footer">
          <FooterTop />
          <div className="border-t border-white/10 bg-[#082e1b]">
            <FooterBottom />
          </div>
        </footer>
      </body>
    </html>
  );
}
