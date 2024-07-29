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
import { SendHorizonalIcon } from "lucide-react";
import { z } from "zod";
import SubmitButton from "@/components/ui/submit-button";

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
        <SubmitButton
          submitting={form.formState.isLoading}
          submitted={form.formState.isSubmitSuccessful}
        >
          <SendHorizonalIcon size={16} />
          Meld interesse!
        </SubmitButton>
      </form>
    </Form>
  );
};

export default InterestForm;
