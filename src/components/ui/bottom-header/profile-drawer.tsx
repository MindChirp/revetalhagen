import { User } from "@clerk/nextjs/server";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import { Button } from "../button";
import { SignOutButton } from "@clerk/nextjs";

export default function ProfileDrawer({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: User;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="capitalize">
            Hei, {user?.firstName}!
          </DrawerTitle>
          <DrawerDescription>Hva vil du gjøre?</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <SignOutButton>
            <Button variant={"destructive"}>Logg ut</Button>
          </SignOutButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
