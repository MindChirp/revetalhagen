import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./card";

interface PageCardProps extends React.ComponentProps<typeof Card> {}
const PageCard = ({ className, ...props }: PageCardProps) => {
  return (
    <Card
      className={cn("mx-auto min-w-[50vw] max-w-[900px]", className)}
      {...props}
    />
  );
};

export default PageCard;
