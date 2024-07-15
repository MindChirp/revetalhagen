import type { Metadata } from "next";
import { Work_Sans as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/ui/header/header";
import Footer from "@/components/ui/footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { OpenAPI } from "@/lib/api";
import { getSession } from "@auth0/nextjs-auth0";
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
  const session = await getSession();
  OpenAPI.TOKEN = session?.accessToken;
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL ?? "";
  console.log(process.env.NEXT_PUBLIC_API_URL ?? "your mom");
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            fontSans.className
          )}
        >
          <Header className="fixed" />

          {children}
          <Footer className="mt-32" />
        </body>
      </UserProvider>
    </html>
  );
}
