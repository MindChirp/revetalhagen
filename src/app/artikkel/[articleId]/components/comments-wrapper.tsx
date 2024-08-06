import { Card } from "@/components/ui/card";
import Conditional from "@/components/ui/conditional";
import Typography from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface CommentsWrapperProps extends React.HTMLProps<HTMLDivElement> {
  comments: unknown[];
}
export default function CommentsWrapper({
  className,
  comments,
  ...props
}: CommentsWrapperProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {comments.map((comment, index) => (
        <Typography key={index}>Hejhej</Typography>
      ))}
      <Conditional render={!comments.length}>
        <Card className="bg-secondary-background py-10 shadow-none text-center">
          <Typography>Det er ingen kommentarer</Typography>
        </Card>
      </Conditional>
    </div>
  );
}
