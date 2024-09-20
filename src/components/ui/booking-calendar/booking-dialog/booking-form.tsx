"use client";

import { DetailedBookableItemDto } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { toDate } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../../form";
import { cn } from "@/lib/utils";
import { Input } from "../../input";
import { DateTimePicker } from "../../date-time-picker";
import { Button } from "../../button";
import { SendHorizonalIcon, SendIcon } from "lucide-react";

interface BookingFormProps {
  item: DetailedBookableItemDto;
  fromDate: Date;
  toDate: Date;
  className?: string;
}
export default function BookingForm({
  item,
  className,
  fromDate,
  toDate,
}: BookingFormProps) {
  const formSchema = z.object({
    item: z.number(),
    fromDate: z.date(),
    toDate: z.date(),
    description: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: item.id,
      fromDate,
      toDate,
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-2.5", className)}
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Søknadstekst</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Jeg ønsker å reservere fordi..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0.5 w-full">
                <FormLabel>Fra dato</FormLabel>
                <FormControl>
                  <DateTimePicker {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-0.5 w-full">
                <FormLabel>Til dato</FormLabel>
                <FormControl>
                  <DateTimePicker {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end pt-3">
          <Button type="submit" className="flex gap-2.5 w-fit ml-auto">
            <SendHorizonalIcon size={16} />
            Send søknad
          </Button>
        </div>
      </form>
    </Form>
  );
}
