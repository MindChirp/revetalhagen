"use client";

import { Button } from "@/components/ui/button";
import Conditional from "@/components/ui/conditional";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { DetailedNewsDto, SimpleNewsDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { routes } from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EyeIcon,
  Loader2,
  SaveIcon,
  ScanEyeIcon,
  SendHorizonalIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NewsEditor from "./news-editor";
import PreviewModal from "./preview-modal";
import { cn } from "@/lib/utils";

interface NewsFormProps {
  article?: DetailedNewsDto;
  className?: string;
}

export default function NewsForm({ article, className }: NewsFormProps) {
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const state = useMemo<"editing" | "creating">(() => {
    return article ? "editing" : "creating";
  }, [article]);

  const formSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: article?.title ?? "",
      content: article?.content ?? "",
    },
  });

  const { toast } = useToast();
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Send a request to the backend
    return IFetch<SimpleNewsDto>({
      url: `/api/News${state === "editing" ? "/" + article?.id : ""}`,
      config: {
        body: JSON.stringify(values),
        method: state === "creating" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        revalidateTags: ["news"],
        next: {
          tags: ["news"],
        },
      },
    })
      .then((res) => {
        toast({
          title: `Nyhet ${state === "creating" ? "opprettet!" : "oppdatert!"}`,
          description: `Nyheten er nå ${
            state === "creating" ? "opprettet." : "oppdatert."
          }`,
        });
      })
      .catch((error) => {
        toast({
          title: "Noe gikk galt!",
          description: error + "",
          variant: "destructive",
        });
      });
  };

  const goToArticle = () => {
    router.push(`${routes.ARTICLE}/${article?.id}`);
  };

  const fields = form.watch();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-2.5", className)}
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
                <NewsEditor {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <PreviewModal
          open={previewOpen}
          article={{
            ...fields,
            publishedBy: {
              fullName: "Meg selv",
              avatarUri:
                "https://images.squarespace-cdn.com/content/v1/5b9d7475ee17598034564bb6/1593378100071-V2YV3MD2O0H893KU0PR9/image-asset.jpeg",
            },
            lastEdited: new Date().toISOString(),
          }}
          onOpenChange={(state) => setPreviewOpen(state)}
        />
        <div className="flex gap-2.5">
          <Button type="submit" className="md:w-fit w-full flex gap-2.5">
            <Conditional render={!form.formState.isSubmitting}>
              {state === "creating" ? (
                <>
                  <SendHorizonalIcon size={16} />
                  Opprett
                </>
              ) : (
                <>
                  <SaveIcon size={16} />
                  Oppdater
                </>
              )}
            </Conditional>
            <Conditional render={form.formState.isSubmitting}>
              <Loader2 className="animate-spin" />
            </Conditional>
          </Button>

          <Conditional render={!!fields}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setPreviewOpen(true);
              }}
              className="gap-2.5 animate-in slide-in-from-bottom-5 fade-in"
            >
              <ScanEyeIcon size={16} />
              Forhåndsvisning
            </Button>
          </Conditional>
        </div>
      </form>
    </Form>
  );
}
