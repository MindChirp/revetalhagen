import { ClerkProvider, useSession } from "@clerk/nextjs";
import { nbNO } from "@clerk/localizations";
import type { Metadata } from "next";
import { Work_Sans as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer";
import { OpenAPI } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";
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
  // Set the tokens for OpenAPI usage
  const session = await auth();
  const token = await session.getToken();
  OpenAPI.TOKEN = token ?? "";
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

  return (
    <ClerkProvider localization={nbNO}>
      <html lang="en">
        <body>
          <Header className="fixed" />
          {children}
          <Footer className="mt-32" />
        </body>
      </html>
    </ClerkProvider>
  );
}
