"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Conditional from "@/components/ui/conditional";
import UserAvatar from "@/components/ui/header/user-avatar";
import Typography from "@/components/ui/typography";
import { CommentDto } from "@/lib/api";
import { isRole } from "@/lib/auth-guard";
import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { ClockIcon } from "lucide-react";
import CommentActions from "./comment-actions";

interface CommentProps {
  comment: CommentDto;
  articleId: number;
}
const Comment = ({ comment, articleId }: CommentProps) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.25 }}
      className="border border-input p-5 rounded-3xl bg-secondary-background flex md:flex-row flex-col items-center gap-5"
    >
      <div className="flex gap-5 justify-between w-full">
        <UserAvatar src={comment.user?.avatarUri ?? ""} />
        <div className="flex flex-col  gap-1 w-full">
          <div className="flex gap-1">
            <Badge className="w-fit font-bold" variant={"default"}>
              @{comment.user?.username}
            </Badge>
            <Badge className="w-fit flex gap-1 items-center">
              <ClockIcon size={12} />
              {format(comment.publishedAt ?? "", "dd-MM-yyyy hh:mm")}
            </Badge>
          </div>
          <Typography className="!mt-0 leading-none">
            {comment.message}
          </Typography>
        </div>
      </div>
      {/* <Conditional
        render={
          comment.user?.username == user?.user?.username || isRole("admin")
        }
      >
        <CommentActions
          commentId={comment.id as number}
          articleId={articleId}
        />
      </Conditional> */}
    </motion.div>
  );
};

export default Comment;
