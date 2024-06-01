import BlobBackground from "@/components/ui/blob-background";
import Header from "@/components/ui/header";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <div className="bg-page-background">
        <BlobBackground />
      </div>
    </main>
  );
}
