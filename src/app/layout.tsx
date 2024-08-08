import { ClerkProvider } from "@clerk/nextjs";
import { nbNO } from "@clerk/localizations";
import type { Metadata } from "next";
import { Work_Sans as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer";
import { OpenAPI } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";
import { Toaster } from "@/components/ui/toaster";
import BottomHeader from "@/components/ui/bottom-header/bottom-header";
import { TooltipProvider } from "@/components/ui/tooltip";
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
            <Header className="fixed max-w-[2000px] left-1/2 -translate-x-1/2" />
            {children}
            <Toaster />
            {/* <BottomHeader className="bottom-0 left-0 z-50 md:hidden" /> */}
            <Footer className="" />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
