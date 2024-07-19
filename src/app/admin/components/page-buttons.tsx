"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";
import { LightbulbIcon, NewspaperIcon, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const Buttons: {
  label: string;
  icon: React.ReactNode;
}[] = [
  { label: "Nyheter", icon: <NewspaperIcon size={16} /> },
  { label: "Interessegrupper", icon: <LightbulbIcon size={16} /> },
  { label: "Brukere", icon: <Users size={16} /> },
];

interface PageButtonsProps {
  currentPage?: string;
}

export default function PageButtons({ currentPage }: PageButtonsProps) {
  const router = useRouter();
  return (
    <Card className="order-1 md:order-2 h-fit">
      <div className="flex flex-col p-5 md:min-w-72 md:w-fit w-full gap-1">
        {Buttons.map((page, _i) => (
          <Button
            variant={
              page.label.toLowerCase() != currentPage?.toLowerCase()
                ? "ghost"
                : "default"
            }
            key={_i}
            className="justify-start gap-2.5"
            onClick={() =>
              router.replace(`${routes.ADMIN}?page=${page.label.toLowerCase()}`)
            }
          >
            {page.icon}
            {page.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
