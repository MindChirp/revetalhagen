import BottomHeader from "@/components/ui/bottom-header/bottom-header";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header/header";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { nbNO } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Work_Sans as FontSans } from "next/font/google";
import "./globals.css";
const fontSans = FontSans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revetalhagen",
  description: "Frivilligsentrale og naturhage",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={nbNO}>
      <html lang="en">
        <body>
          <TooltipProvider>
            <Header className="sticky top-5 mt-16" />
            {children}
            <Toaster />
            {/* <BottomHeader className="bottom-0 left-0 z-50 md:hidden" /> */}
            <Footer />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
