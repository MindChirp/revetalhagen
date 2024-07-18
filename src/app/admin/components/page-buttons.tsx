"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";
import { useRouter } from "next/navigation";

const Buttons = ["Nyheter", "Interessegrupper", "Brukere"];

interface PageButtonsProps {
  currentPage?: string;
}

export default function PageButtons({ currentPage }: PageButtonsProps) {
  const router = useRouter();
  return (
    <Card className="order-1 md:order-2 h-fit">
      <div className="flex flex-col p-5 min-w-52 md:w-fit w-full">
        {Buttons.map((page, _i) => (
          <Button
            variant={
              page.toLowerCase() != currentPage?.toLowerCase()
                ? "ghost"
                : "default"
            }
            key={_i}
            className="justify-start"
            onClick={() =>
              router.replace(`${routes.ADMIN}?page=${page.toLowerCase()}`)
            }
          >
            {page}
          </Button>
        ))}
      </div>
    </Card>
  );
}
