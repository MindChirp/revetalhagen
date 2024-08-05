"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HelpCircleIcon, SendHorizonalIcon } from "lucide-react";
import { z } from "zod";
import SubmitButton from "@/components/ui/submit-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  name: z.string().min(1),
  phoneNumber: z.string().min(8).max(12),
});
const InterestForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Send a request to the backend
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Navn</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobilnummer</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="w-full flex gap-2.5">
          <SubmitButton
            className="md:w-fit w-full"
            submitting={form.formState.isLoading}
            submitted={form.formState.isSubmitSuccessful}
          >
            <SendHorizonalIcon size={16} />
            Meld interesse!
          </SubmitButton>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircleIcon className="text-primary-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              Dersom vi tar kontakt med deg, blir terskelen for å melde
              interesse lavere. Vi gleder oss til å høre fra deg!
            </TooltipContent>
          </Tooltip>
        </div>
      </form>
    </Form>
  );
};

export default InterestForm;
