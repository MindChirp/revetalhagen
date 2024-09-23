"use client";

import {
  CreateBookingDto,
  DetailedBookableItemDto,
  DetailedBookingDto,
} from "@/lib/api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendHorizonalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../button";
import Conditional from "../../conditional";
import { DateTimePicker } from "../../date-time-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
import { Input } from "../../input";
import { useState } from "react";
import Loader from "../../loader";
import useSWRMutation from "swr/mutation";
import { IFetch } from "@/lib/IFetch";
import { useToast } from "../../use-toast";
import { useSWRConfig } from "swr";
import { getItemBookingsTag } from "../day-view";

interface BookingFormProps {
  item: DetailedBookableItemDto;
  fromDate: Date;
  toDate: Date;
  onSubmitted?: () => void;
  className?: string;
}
export default function BookingForm({
  item,
  className,
  fromDate,
  onSubmitted,
  toDate,
}: BookingFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const { mutate } = useSWRConfig();
  const { toast } = useToast();
  const { trigger } = useSWRMutation(
    `/api/Booking/${item.id}`,
    (url: string, { arg }: { arg: CreateBookingDto }) =>
      IFetch<DetailedBookingDto>({
        url: `/api/Booking/${item.id}`,
        config: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(arg),
          next: {
            tags: ["booking", item.id?.toString() ?? ""],
          },
        },
      })
  );

  const formSchema = z
    .object({
      fromDate: z.date(),
      toDate: z.date(),
      applicationText: z.string().min(1),
    })
    .refine(
      (data) => {
        return data.fromDate.getTime() < data.toDate.getTime();
      },
      {
        path: ["fromDate"],
        message: "Fra dato må være før til dato",
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromDate,
      toDate,
      applicationText: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    const translated: CreateBookingDto = {
      applicationText: values.applicationText,
      fromDate: values.fromDate.toUTCString(),
      toDate: values.toDate.toUTCString(),
    };

    trigger(translated)
      .then(() => {
        toast({
          title: "Søknad sendt",
          description:
            "Søknaden er sendt til godkjenning, og du vil få et svar så snart som mulig!",
        });
        // Refetch all bookings
        mutate(getItemBookingsTag(item.id!, fromDate));
        onSubmitted?.();
      })
      .catch((err) => {
        toast({
          title: "Noe gikk galt",
          description: JSON.stringify(err),
          variant: "destructive",
        });
      })
      .finally(() => {
        setSubmitting(false);
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
          name="applicationText"
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
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-0.5 w-full">
                <FormLabel>Fra dato</FormLabel>
                <FormControl>
                  <DateTimePicker {...field} />
                </FormControl>
                <FormMessage title={fieldState.error?.message} />
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
            <Conditional render={!submitting}>
              <SendHorizonalIcon size={16} />
              Send søknad
            </Conditional>
            <Conditional render={submitting}>
              <Loader />
            </Conditional>
          </Button>
        </div>
      </form>
    </Form>
  );
}
