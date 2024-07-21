import { cn } from "@/lib/utils";
import { Card } from "./card";
import { Button, ButtonProps } from "./button";
import {
  BookHeartIcon,
  InfoIcon,
  NewspaperIcon,
  PiggyBank,
} from "lucide-react";
import Typography from "./typography";
import Link from "next/link";

const Buttons: ActionButtonLooks[] = [
  {
    icon: <NewspaperIcon />,
    label: "Nyheter",
    href: "/nyheter",
  },
  {
    icon: <BookHeartIcon />,
    label: "Om oss",
    href: "/om-oss",
  },
  {
    icon: <PiggyBank />,
    label: "Støtt oss",
    href: "/støtt-oss",
  },
];
interface BottomHeaderProps extends React.HTMLProps<HTMLDivElement> {}
export default function BottomHeader({
  className,
  ...props
}: BottomHeaderProps) {
  return (
    <div className={cn("h-fit w-full px-10 fixed pb-3", className)} {...props}>
      <Card className="rounded-full p-2 flex justify-between gap-2 shadow-lg">
        {/*  Mobile bottom bar buttons    */}
        {Buttons.map((button, index) => (
          <ActionButton
            className="w-full flex flex-col gap-1 h-fit"
            key={index}
            {...button}
          />
        ))}
      </Card>
    </div>
  );
}

type ActionButtonLooks = {
  icon: React.ReactNode;
  label: string;
  href: string;
};
interface ActionButtonProps extends ButtonProps, ActionButtonLooks {}

function ActionButton({ href, icon, label, ...props }: ActionButtonProps) {
  return (
    <Link href={href} className="w-full">
      <Button className="w-full flex flex-col h-fit gap-1" {...props}>
        {icon}
        <Typography variant="small" className="font-semibold">
          {label}
        </Typography>
      </Button>
    </Link>
  );
}
