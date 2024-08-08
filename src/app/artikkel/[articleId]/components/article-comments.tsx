"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import Conditional from "@/components/ui/conditional";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import Typography from "@/components/ui/typography";
import { useToast } from "@/components/ui/use-toast";
import { IFetch } from "@/lib/IFetch";
import { CreateCommentDto } from "@/lib/api";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Schema, z } from "zod";

interface ArticleCommentsProps {
  articleId: string;
}

const formSchema: Schema<CreateCommentDto> = z.object({
  message: z
    .string()
    .min(1, "Kommentaren må ha minst ett tegn")
    .max(255, "Kommentaren kan ikke ha mer enn 255 tegn"),
});

export default function ArticleComments({ articleId }: ArticleCommentsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const submitComment = async (data: CreateCommentDto) => {
    return IFetch({
      url: `/api/Comment/articles/${articleId}`,
      config: {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        revalidateTags: ["comments", articleId],
        next: {
          tags: ["comments", articleId],
        },
      },
    })
      .then(() => {
        form.reset();
      })
      .catch((err) => {
        toast({
          title: "Noe gikk galt",
          description: "Kunne ikke publisere kommentar",
          variant: "destructive",
        });
      });
  };
  return (
    <CardContent className="w-full">
      <SignedIn>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitComment)}
            className="justify-center flex gap-5 space-y-8"
          >
            <FormField
              control={form.control}
              name="message"
              render={({ field, fieldState }) => (
                <FormItem className="flex justify-center md:flex-row flex-col w-full items-center">
                  <div
                    className={`flex-1 ${
                      form.formState.isValid ? "md:pr-5" : "md:pr-0"
                    } w-full transition-[padding_ease-in-out] duration-500 space-y-1`}
                  >
                    <FormLabel>Kommentar</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Skriv kommentar..."
                        {...field}
                        className="w-full flex-1"
                      />
                    </FormControl>
                    <div className="flex items-center">
                      <Conditional render={!fieldState.invalid}>
                        <FormDescription className="md:block hidden">
                          Kommentarer er offentlige, så vær snille mot
                          hverandre!
                        </FormDescription>
                      </Conditional>
                      <FormMessage />
                      <Typography
                        variant="small"
                        className="flex-1 text-end mr-1"
                      >
                        {field.value?.length ?? 0} / 255
                      </Typography>
                    </div>
                  </div>
                  <div className="md:w-fit w-full">
                    <motion.div
                      className="mx-auto"
                      initial={{
                        width: 0,
                        opacity: 0,
                        overflow: "hidden",
                      }}
                      animate={{
                        width: form.formState.isValid ? "auto" : 0,
                        x: form.formState.isValid ? 0 : 0,
                        opacity: form.formState.isValid ? 1 : 0,
                        overflow: form.formState.isValid ? "visible" : "hidden",
                      }}
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                      }}
                    >
                      <Button
                        type="submit"
                        className={cn(`flex w-full gap-2.5`)}
                      >
                        <Conditional render={!form.formState.isSubmitting}>
                          <SendIcon size={16} /> Publiser
                        </Conditional>
                        <Conditional render={form.formState.isSubmitting}>
                          <Loader />
                        </Conditional>
                      </Button>
                    </motion.div>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </SignedIn>
      <SignedOut>
        <Typography variant="h3">Logg inn for å kommentere</Typography>
      </SignedOut>
      {/* <CommentsWrapper className="mt-5" comments={comments} /> */}
    </CardContent>
  );
}
