import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import Typography from "../typography";
import { Button } from "../button";

const Support = () => {
  return (
    <div className="p-4 flex w-full flex-col gap-2.5">
      <SupportOption
        className="w-full"
        role="medlem"
        description="Som medlem betaler du en liten slant for å bidra til at Revetalhagen holder seg gående i all overskuelig framtid."
      />
      <SupportOption
        className="w-full"
        role="ambassadør"
        description="Som ambassadør doneres en større mengde penger til Revetalhagen, og dere vil få en plass på bunnen av nettsida. Dette er tiltenkt bedrifter og privatpersoner som ønsker å komme med et større bidrag."
      />
    </div>
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
      className={cn(
        "border-none bg-primary/20 rounded-2xl min-w-80 shadow-none",
        className
      )}
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

export default Support;
