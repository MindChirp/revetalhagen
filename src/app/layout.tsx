import type { Metadata } from "next";
import { Work_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/ui/header";
import { useEffect, useState } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revetalhagen",
  description: "Frivilligsentrale og naturhage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontSans.className
        )}
      >
        <Header className="fixed" />

        {children}
      </body>
    </html>
  );
}
