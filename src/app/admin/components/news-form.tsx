"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CreateNewsDto, NewsService, OpenAPI, SimpleNewsDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import NewsEditor from "./news-editor";

export default function NewsForm() {
  const formSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Send a request to the backend
    console.log(JSON.stringify(values));
    IFetch<SimpleNewsDto>({
      url: "/api/News",
      config: {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    })
      .then((res) => {
        toast({
          title: "Nyhet opprettet!",
          description: "Nyheten er nå opprettet.",
        });
      })
      .catch((error) => {
        toast({
          title: "Noe gikk galt!",
          description: error + "",
          variant: "destructive",
        });
      });
    // NewsService.postApiNews(values as CreateNewsDto)
    //   .then(() => {
    //     console.log("News created!");
    //   })
    //   .catch((error) => {
    //     toast({
    //       title: "Noe gikk galt!",
    //       description: error + "",
    //       variant: "destructive",
    //     });
    //   });
  };

  const formData = form.watch("content");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" className="flex gap-2.5">
          <SendHorizonalIcon size={16} />
          Send inn
        </Button>
      </form>
    </Form>
  );
}
