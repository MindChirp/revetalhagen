"use client";
import {
  CreateBookableItemDto,
  DetailedBookableItemCategoryDto,
  DetailedBookableItemDto,
} from "@/lib/api";
import ItemForm, { formSchema } from ".";
import { IFetch } from "@/lib/IFetch";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

interface ItemFormWrapperProps {
  categories: DetailedBookableItemCategoryDto[];
}
export default function ItemFormWrapper({ categories }: ItemFormWrapperProps) {
  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    return IFetch<DetailedBookableItemDto>({
      url: `/api/BookableItem`,
      config: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values as CreateBookableItemDto),
        revalidateTags: ["bookableitems"],
      },
    }).then(() => {
      toast({
        title: "Gjenstanden ble opprettet!",
        description: "Den er nå tilgjengelig for utleie",
      });
    });
  };
  return (
    <ItemForm className="mt-10" categories={categories} onSubmit={onSubmit} />
  );
}
