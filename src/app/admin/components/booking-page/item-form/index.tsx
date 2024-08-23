"use client";
import { Button } from "@/components/ui/button";
import Conditional from "@/components/ui/conditional";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import {
  CreateBookableItemDto,
  DetailedBookableItemCategoryDto,
  DetailedBookableItemDto,
} from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EditCategories from "./edit-categories";

interface ItemFormProps {
  className?: string;
  categories: DetailedBookableItemCategoryDto[];
}
export default function ItemForm({ className, categories }: ItemFormProps) {
  const { toast } = useToast();
  const formSchema = z.object({
    name: z
      .string()
      .min(1, "Gjenstanden må ha et navn")
      .max(100, "Navnet kan ikke være på mer enn 100 tegn"),
    description: z.string().min(1, "Gjenstanden må ha en beskrivelse"),
    categoryId: z.number().int("Gjenstanden må ha en kategori"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
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
    })
      .then(() => {
        toast({
          title: "Gjenstanden ble opprettet",
          description: "Gjenstanden ble opprettet og lagt til i listen",
        });

        form.reset({
          name: "",
          description: "",
          categoryId: categories[0]?.id,
        });
      })
      .catch(() => {
        toast({
          title: "Noe gikk galt",
          description: "Gjenstanden ble ikke opprettet",
          variant: "destructive",
        });
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-2.5", className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beskrivelse</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategori</FormLabel>
              <FormControl>
                <div className="flex gap-2.5 items-center">
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value + ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori..." />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item, index) => (
                        <SelectItem value={item.id + ""} key={index}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <EditCategories categories={categories} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex gap-2.5 items-center md:w-fit w-full"
          disabled={form.formState.isSubmitting}
        >
          <Conditional render={form.formState.isSubmitting}>
            <Loader />
            Oppretter
          </Conditional>
          <Conditional render={!form.formState.isSubmitting}>
            <PlusIcon size={16} /> Opprett
          </Conditional>
        </Button>
      </form>
    </Form>
  );
}
