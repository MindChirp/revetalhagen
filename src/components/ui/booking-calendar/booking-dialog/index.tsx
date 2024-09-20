"use client";

import { DialogProps } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../dialog";
import BookingForm from "./booking-form";
import { DetailedBookableItemDto } from "@/lib/api";

interface BookingDialogProps extends DialogProps {
  item: DetailedBookableItemDto;
  startTime: Date;
  endTime: Date;
}
export default function BookingDialog({
  children,
  startTime,
  endTime,
  item,
  ...props
}: BookingDialogProps) {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reserver tidsrom</DialogTitle>
          <DialogDescription>
            Her kan du finjustere reservasjonsforespørselen din
          </DialogDescription>
        </DialogHeader>

        <BookingForm item={item} fromDate={startTime} toDate={endTime} />
      </DialogContent>
    </Dialog>
  );
}
