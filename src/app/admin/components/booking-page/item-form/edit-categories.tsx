"use client";
import { easeInOut, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Typography from "@/components/ui/typography";
import {
  CreateBookableItemCategoryDto,
  DetailedBookableItemCategoryDto,
} from "@/lib/api";
import { CrossIcon, PencilIcon, PlusIcon, X } from "lucide-react";
import { IFetch } from "@/lib/IFetch";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Conditional from "@/components/ui/conditional";
import Banner from "@/components/ui/banner";
import Illustration from "@/components/ui/illustration";
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";

interface EditCategoriesProps {
  categories: DetailedBookableItemCategoryDto[];
}
export default function EditCategories({ categories }: EditCategoriesProps) {
  const { toast } = useToast();
  const deleteCategory = (id: number) => {
    IFetch<DetailedBookableItemCategoryDto>({
      url: `/api/BookableItemCategory/${id}`,
      config: {
        method: "DELETE",
        revalidateTags: ["bookableitemcategories", id + ""],
      },
    }).catch(() => {
      toast({
        title: "Noe gikk galt",
        description: "Kategorien ble ikke slettet",
        variant: "destructive",
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button">
              <PencilIcon size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <Typography>Rediger kategorier</Typography>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger kategorier</DialogTitle>
          <DialogDescription>
            Trykk på en kategori for å fjerne den, eller trykk på + for å legge
            til en ny.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2.5">
          {categories.map((category, index) => (
            <Tooltip key={index}>
              <TooltipTrigger>
                <Badge
                  className="group cursor-pointer text-center w-full"
                  onClick={() => category.id && deleteCategory(category.id)}
                >
                  <motion.div
                    className="flex gap-1 items-center justify-between w-full"
                    initial="hidden"
                    whileHover="visible"
                  >
                    <span className="w-full text-center">{category.title}</span>
                    <motion.div
                      variants={iconVariants}
                      transition={{
                        type: "tween",
                        duration: 0.1,
                        ease: easeInOut,
                      }}
                    >
                      <X size={11} />
                    </motion.div>
                  </motion.div>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Trykk for å slette</TooltipContent>
            </Tooltip>
          ))}
        </div>
        <Conditional render={!Boolean(categories.length)}>
          <Banner>
            <Illustration src="empty-cart.svg" /> Det finnes ingen kategorier
          </Banner>
        </Conditional>
        <CategoryForm />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"default"} type="button">
              Lukk
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CategoryForm() {
  const { toast } = useToast();
  const formSchema = z.object({
    title: z.string().min(1, "Kategorien må ha et navn"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    return IFetch<DetailedBookableItemCategoryDto>({
      url: `/api/BookableItemCategory`,
      config: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values as CreateBookableItemCategoryDto),
        revalidateTags: ["bookableitemcategories"],
      },
    })
      .then(() => {
        form.reset({ title: "" });
      })
      .catch(() => {
        toast({
          title: "Noe gikk galt",
          description: "Kategorien ble ikke opprettet",
          variant: "destructive",
        });
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          return form.handleSubmit(onSubmit);
        }}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <div className="flex gap-2.5 items-center w-full">
                  <Input {...field} className="flex-1" />
                  <Button variant="secondary" type="submit">
                    <Conditional render={!form.formState.isSubmitting}>
                      <PlusIcon size={20} />
                    </Conditional>
                    <Conditional render={form.formState.isSubmitting}>
                      <Loader />
                    </Conditional>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

const iconVariants = {
  hidden: {
    opacity: 0,
    width: 0,
  },
  visible: {
    opacity: 1,
    width: "fit-content",
  },
};
