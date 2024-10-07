"use client";

import { IFetch, RequestResponse } from "@/lib/IFetch";
import { ContentDto, CreateContentDto } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogProps } from "@radix-ui/react-dialog";
import { SaveIcon } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { Button } from "../../button";
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
import { Form, FormControl, FormField, FormItem, FormLabel } from "../../form";
import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { useToast } from "../../use-toast";

interface AboutDialogProps extends DialogProps {
  title: string;
  description: string;
  initialValues?: ContentDto;
}
export default function AboutDialog({
  title,
  description,
  initialValues,
  children,
  ...props
}: AboutDialogProps) {
  const { toast } = useToast();
  const { trigger: create } = useSWRMutation(
    "/frontpage/about",
    (tag, { arg }: { arg: CreateContentDto }) =>
      IFetch<ContentDto>({
        url: `/api/Content`,
        config: {
          revalidateTags: [tag],
          method: "POST",
          body: (() => {
            const formData = new FormData();
            console.log(arg);
            Object.entries(arg).forEach(([key, value]) => {
              const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
              if (value instanceof File) {
                formData.append(capitalizedKey, value);
              } else {
                formData.append(capitalizedKey, value?.toString() ?? "");
              }
            });
            return formData;
          })(),
          next: {
            tags: [tag],
          },
        },
      })
  );

  const { trigger: update, error } = useSWRMutation(
    "/frontpage/about",
    (
      tag,
      {
        arg,
      }: {
        arg: {
          data: CreateContentDto;
          id: number;
        };
      }
    ) =>
      IFetch<ContentDto>({
        url: `/api/Content/${arg.id}`,
        config: {
          revalidateTags: [tag],
          method: "PUT",
          body: (() => {
            const formData = new FormData();
            Object.entries(arg.data).forEach(([key, value]) => {
              if (value instanceof File) {
                formData.append(key, value);
              } else {
                formData.append(key, value?.toString() ?? "");
              }
            });
            return formData;
          })(),
          next: {
            tags: [tag],
          },
        },
      }).then((data) => {
        const isError = (
          data: ContentDto | RequestResponse
        ): data is RequestResponse => {
          return "status" in data;
        };

        if (isError(data)) {
          throw data;
        }
      })
  );

  const mode = useMemo<"editing" | "creating">(() => {
    return initialValues ? "editing" : "creating";
  }, [initialValues]);

  const formSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    slug: z.string().min(1),
    image: z.instanceof(File).refine((file) => file.size < 50000000, {
      message: "Bildefila kan ikke være større enn 50MB",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: initialValues?.content ?? "",
      slug: "frontpage-about",
      title: initialValues?.title ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (mode == "editing") {
      if (!initialValues?.id) return;
      update({ data: values, id: initialValues?.id })
        .then(() => {
          toast({
            title: "Innhold oppdatert!",
            description: "Innholdet er nå oppdatert på forsiden",
          });
        })
        .catch(() => {
          toast({
            title: "Noe gikk galt",
            description:
              "Innholdet kunne ikke oppdateres. Vennligst prøv igjen senere",
            variant: "destructive",
          });
        });
      return;
    }

    create(values)
      .then(() => {
        toast({
          title: "Innhold lagt til!",
          description:
            "Innholdet er lagt til på forsiden, og er nå synlig for alle",
        });
      })
      .catch(() => {
        toast({
          title: "Noe gikk galt",
          description:
            "Innholdet kunne ikke legges til. Vennligst prøv igjen senere",
          variant: "destructive",
        });
      });
  };
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>
          {JSON.stringify(error)}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2.5"
            >
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
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Innhold</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Bilde</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...fieldProps}
                        onChange={(e) =>
                          onChange(e.target.files && e.target.files[0])
                        }
                        accept="image/*"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <DialogClose asChild>
                  <Button variant="destructive" type="button">
                    Avbryt
                  </Button>
                </DialogClose>

                <Button className="items-center gap-2.5" type="submit">
                  <SaveIcon size={16} />
                  Lagre
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
