import About from "@/components/ui/about/about";
import Hero from "@/components/ui/hero/hero";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import FrontpageLoader from "./components/frontpage-loader";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-[2000px] mx-auto overflow-hidden -mt-36">
      <div className="bg-white min-h-screen">
        <Suspense fallback={<FrontpageLoader />}>
          <Hero className="" />
          <About className="z-10 relative" />
        </Suspense>
      </div>
    </main>
  );
}
