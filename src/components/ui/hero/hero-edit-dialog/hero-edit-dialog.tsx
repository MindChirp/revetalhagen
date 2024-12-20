"use client";

import { useMutatePageContent, usePageContent } from "@/hooks/content";
import { DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../dialog";
import Typography from "../../typography";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../input";
import { Button } from "../../button";
import { SaveIcon } from "lucide-react";
import { useToast } from "../../use-toast";
import { ContentDto } from "@/lib/api";
import Conditional from "../../conditional";
import Loader from "../../loader";

interface HeroEditDialogProps extends DialogProps {
  initialContent?: ContentDto;
}

export default function HeroEditDialog({
  initialContent,
  children,
}: HeroEditDialogProps) {
  const { trigger: update, isMutating } = useMutatePageContent("hero");
  const { toast } = useToast();

  const formSchema = z.object({
    title: z.string().min(5),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialContent?.content ?? "",
      title: initialContent?.title ?? "",
    },
  });

  const submitHandler = (content: z.infer<typeof formSchema>) => {
    update({
      data: {
        content: content.description,
        title: content.title,
        slug: "hero",
      },
      id: initialContent?.id,
    }).then((res) => {
      console.log(res);
      toast({
        title: "Hoveddel oppdatert",
        description: "Hoveddelen ble oppdatert",
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rediger hoveddel</DialogTitle>
          <DialogDescription>
            Velg hva hoveddelen skal inneholde
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitHandler)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tittel</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="destructive" type="button">
                  Avbryt
                </Button>
              </DialogClose>
              <Button type="submit" className="gap-2.5 items-center">
                <Conditional render={!isMutating}>
                  <SaveIcon size={16} />
                  Lagre
                </Conditional>
                <Conditional render={isMutating}>
                  <Loader />
                </Conditional>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
