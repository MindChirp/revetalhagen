import Hero from "@/components/ui/hero";
import Header from "@/components/ui/header/header";
import Image from "next/image";
import About from "@/components/ui/about";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="bg-white">
        <Hero className="md:-mb-[200px]" displayBg />
        <About className="z-10 relative" />
      </div>
    </main>
  );
}
