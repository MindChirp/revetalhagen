import About from "@/components/ui/about/about";
import Hero from "@/components/ui/hero/hero";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import FrontpageLoader from "./components/frontpage-loader";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-[2000px] mx-auto overflow-hidden">
      <div className="bg-white min-h-screen">
        <Suspense fallback={<FrontpageLoader />}>
          <div className="animate-in fade-in duration-500 delay-100 fill-mode-backwards">
            <Hero displayBg />
            <About className="z-10 relative lg:-mt-36" />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
