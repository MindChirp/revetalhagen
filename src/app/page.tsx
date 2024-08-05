import About from "@/components/ui/about";
import Hero from "@/components/ui/hero/hero";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-[2000px] mx-auto overflow-hidden">
      <div className="bg-white">
        <Hero className="md:-mb-[200px]" displayBg />
        <About className="z-10 relative" />
      </div>
    </main>
  );
}
