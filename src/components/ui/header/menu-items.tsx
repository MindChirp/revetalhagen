import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../navigation-menu";
import Typography from "../typography";
import { Button } from "../button";

type MenuItem = {
  label: string;
  variant: "primary" | "ghost";
  content: React.ReactNode;
};

export interface MenuItemsProps
  extends React.ComponentProps<typeof NavigationMenu> {
  items: MenuItem[];
}

const MenuItems = ({ items, ...props }: MenuItemsProps) => {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="rounded-3xl">
        {items.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger
              className={cn(
                "rounded-full text-primary-foreground",
                item.variant === "primary" ? "bg-primary" : "bg-popover"
              )}
            >
              {item.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>{item.content}</NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MenuItems;
