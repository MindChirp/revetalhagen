"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";
import {
  BedIcon,
  HandCoinsIcon,
  LightbulbIcon,
  NewspaperIcon,
  TextIcon,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Buttons: {
  label: string;
  icon: React.ReactNode;
  props?: ButtonProps;
}[] = [
  { label: "Nyheter", icon: <NewspaperIcon size={16} /> },
  { label: "Brukere", icon: <Users size={16} /> },
  { label: "Sponsorer", icon: <HandCoinsIcon size={16} /> },
  { label: "Utleie", icon: <BedIcon size={16} /> },
  {
    label: "Interessegrupper",
    icon: <LightbulbIcon size={16} />,
    props: { disabled: true },
  },
  { label: "Innhold", icon: <TextIcon size={16} />, props: { disabled: true } },
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
            {...page.props}
          >
            {page.icon}
            {page.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
