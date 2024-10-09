import About from "@/components/ui/about/about";
import Hero from "@/components/ui/hero/hero";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-[2000px] mx-auto overflow-hidden">
      <div className="bg-white">
        <Hero className="md:-mb-[200px]" displayBg />
        <Suspense fallback={<Skeleton className="w-full h-40" />}>
          <About className="z-10 relative" />
        </Suspense>
      </div>
    </main>
  );
}
