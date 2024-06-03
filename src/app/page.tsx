import Hero from "@/components/ui/hero";
import Header from "@/components/ui/header";
import Image from "next/image";
import About from "@/components/ui/about";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="bg-page-background">
        <Hero className="-mb-[200px]" />
        <About className="z-10 relative" />
      </div>
    </main>
  );
}
