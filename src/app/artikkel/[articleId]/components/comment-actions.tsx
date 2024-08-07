"use client";
import { Button } from "@/components/ui/button";
import Conditional from "@/components/ui/conditional";
import Loader from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { IFetch } from "@/lib/IFetch";
import { TrashIcon } from "lucide-react";
import { useState } from "react";

interface CommentActionsProps {
  commentId: number;
  articleId: number;
}

export default function CommentActions({
  commentId,
  articleId,
}: CommentActionsProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);

    return IFetch({
      url: `/api/Comment/${commentId}`,
      config: {
        method: "DELETE",
        revalidateTags: ["comments", articleId.toString?.()],
        next: {
          tags: ["comments", articleId.toString?.()],
        },
      },
    })
      .then((res) => {
        toast({
          title: "Kommentar slettet",
          description: "Kommentaren ble slettet",
        });
      })
      .catch((err) =>
        toast({
          title: "Noe gikk galt",
          description: "Kunne ikke slette kommentaren",
          variant: "destructive",
        })
      );
  };
  return (
    <div className="md:w-fit w-full flex gap-2.5">
      <Button
        onClick={onDelete}
        variant={"destructive"}
        className="md:w-fit w-full"
      >
        <Conditional render={!loading}>
          <TrashIcon size={16} />
        </Conditional>
        <Conditional render={loading}>
          <Loader />
        </Conditional>
      </Button>
    </div>
  );
}
