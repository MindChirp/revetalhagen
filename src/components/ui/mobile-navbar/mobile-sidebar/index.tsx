import { MenuIcon } from "lucide-react";
import { Button } from "../../button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../sheet";
import Link from "next/link";
import { routes } from "@/lib/routes";
import Typography from "../../typography";

interface MobileNavbarProps extends React.ComponentProps<typeof Sheet> {}

export default function MobileSidebar({
  children,
  ...props
}: MobileNavbarProps) {
  return (
    <Sheet {...props}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Meny</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-2.5 mt-10">
          <Link href={routes.BOOKING}>
            <Typography variant="h1">Utleie</Typography>
          </Link>
          <Link href={routes.NEWS}>
            <Typography variant="h1">Nyheter</Typography>
          </Link>
          <Link href={routes.ADMIN}>
            <Typography variant="h1">Admin</Typography>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
