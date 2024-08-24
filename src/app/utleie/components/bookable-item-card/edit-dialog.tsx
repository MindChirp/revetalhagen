"use client";
import ItemForm, {
  formSchema,
} from "@/app/admin/components/booking-page/item-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  DetailedBookableItemCategoryDto,
  DetailedBookableItemDto,
} from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { SaveIcon } from "lucide-react";
import { z } from "zod";

const EditDialog = ({
  children,
  item,
  categories,
  onSubmit,
}: {
  children: React.ReactNode;
  item: DetailedBookableItemDto;
  categories: DetailedBookableItemCategoryDto[];
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) => {
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger gjenstand</DialogTitle>
          <DialogDescription>
            Du kan redigere gjenstanden her.
          </DialogDescription>
        </DialogHeader>
        <ItemForm
          onSubmit={onSubmit}
          categories={categories}
          defaultValues={{
            name: item.name ?? "",
            categoryId: item.category?.id ?? 0,
            description: item.description ?? "",
          }}
        >
          <DialogFooter className="flex md:flex-row flex-col gap-2.5 pt-6">
            <DialogClose asChild>
              <Button variant={"secondary"}>Avbryt</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="flex gap-2.5" type="submit">
                <SaveIcon size={16} /> Lagre
              </Button>
            </DialogClose>
          </DialogFooter>
        </ItemForm>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
