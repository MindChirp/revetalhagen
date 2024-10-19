import { Card } from "@/components/ui/card";
import Conditional from "@/components/ui/conditional";
import Typography from "@/components/ui/typography";
import { CommentDto } from "@/lib/api";
import { cn } from "@/lib/utils";
import Comment from "./comment";

interface CommentsWrapperProps extends React.HTMLProps<HTMLDivElement> {
  comments: CommentDto[];
  articleId: number;
}
export default function CommentsWrapper({
  className,
  comments,
  articleId,
  ...props
}: CommentsWrapperProps) {
  return (
    <div className={cn("px-6 flex gap-2.5 flex-col", className)} {...props}>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
      <Conditional render={!comments.length}>
        <Card className="bg-secondary-background py-10 shadow-none text-center">
          <Typography>Det er ingen kommentarer</Typography>
        </Card>
      </Conditional>
    </div>
  );
}
