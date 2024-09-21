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
import { useEffect, useState } from "react";

interface BookingDialogProps extends DialogProps {
  item: DetailedBookableItemDto;
  startTime: Date;
  endTime: Date;
}
export default function BookingDialog({
  children,
  onOpenChange,
  open,
  startTime,
  endTime,
  item,
  ...props
}: BookingDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    if (open == undefined) return;
    setDialogOpen(open);
  }, [open]);

  return (
    <Dialog open={dialogOpen} {...props} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild onClick={() => setDialogOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reserver tidsrom</DialogTitle>
          <DialogDescription>
            Her kan du finjustere reservasjonsforespørselen din
          </DialogDescription>
        </DialogHeader>

        <BookingForm
          item={item}
          fromDate={startTime}
          toDate={endTime}
          onSubmitted={() => {
            setDialogOpen(false);
            onOpenChange?.(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
