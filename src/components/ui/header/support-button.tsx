import { cn } from "@/lib/utils";
import { Button } from "../button";
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

const SupportButton = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList className="rounded-3xl">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="rounded-full bg-primary text-primary-foreground">
              Støtt oss
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-80">
              <div className="p-4 flex w-full flex-col gap-2.5">
                <SupportOption
                  className="w-full"
                  role="medlem"
                  description="Som medlem betaler du en liten mengde penger for å bidra til at Revetalhagen holder seg gående i all forskuelig framtid."
                />
                <SupportOption
                  className="w-full"
                  role="ambassadør"
                  description="Som ambassadør doneres en større mengde penger til Revetalhagen, og dere vil få en plass på bunnen av nettsida."
                />
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

interface SupportOptionProps extends React.HTMLProps<HTMLDivElement> {
  role?: string;
  description?: string;
}
const SupportOption = ({
  className,
  role,
  description,
  ...props
}: SupportOptionProps) => {
  return (
    <Card
      className={cn("border-none bg-primary/20 rounded-lg min-w-52", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-primary-foreground">Bli {role}</CardTitle>
        <CardDescription>
          <Typography variant="small">{description}</Typography>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button>Bli {role}!</Button>
      </CardContent>
    </Card>
  );
};

export default SupportButton;
