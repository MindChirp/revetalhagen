"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { IFetch } from "@/lib/IFetch";
import { routes } from "@/lib/routes";
import { DialogProps } from "@radix-ui/react-dialog";
import { EditIcon, Loader2, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AdminButtonsProps {
  articleId?: number;
}
export default function AdminButtons({
  articleId,
  ...props
}: AdminButtonsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const deleteArticle = () => {
    setIsDeleting(true);
    IFetch({
      url: `/api/News/${articleId}`,
      config: {
        method: "DELETE",
        revalidateTags: ["news"],
      },
    }).then(() => {
      setIsDeleting(false);
      toast({
        title: "Artikkel slettet",
        description:
          "Artikkelen ble slettet, og er ikke lenger tilgjengelig for besøkende",
      });
      router.replace(routes.NEWS);
    });
  };

  const editArticle = () => {
    router.push(`${routes.ADMIN}?page=nyheter&articleId=${articleId}`);
  };
  return (
    <div className="flex gap-5 w-full">
      <Button className="gap-2.5 flex-1" onClick={editArticle}>
        <EditIcon size={16} />
        Rediger
      </Button>
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={(state) => setDeleteOpen(state)}
        onDelete={deleteArticle}
      >
        <Button
          variant="destructive"
          className="gap-2.5 flex-1"
          onClick={() => setDeleteOpen(true)}
        >
          {!isDeleting && (
            <>
              <TrashIcon size={16} />
              Slett
            </>
          )}
          {isDeleting && <Loader2 className="animate-spin" />}
        </Button>
      </DeleteDialog>
    </div>
  );
}

interface DeleteDialogProps extends DialogProps {
  children?: React.ReactNode;
  onDelete?: () => void;
}
const DeleteDialog = ({
  children,
  onOpenChange,
  onDelete,
  ...props
}: DeleteDialogProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Er du sikker på at du vil slette denne artikkelen?
          </DialogTitle>
          <DialogDescription>
            Dette kan ikke angres, og artikkelen vil bli slettet permanent
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onOpenChange?.(false)}>Avbryt</Button>
          <Button
            variant="destructive"
            onClick={() => {
              onOpenChange?.(false);
              onDelete?.();
            }}
          >
            Slett
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
