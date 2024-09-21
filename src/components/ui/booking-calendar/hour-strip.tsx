import { cn } from "@/lib/utils";
import { Badge } from "../badge";
import { Separator } from "../separator";
import { Button, ButtonProps } from "../button";
import BookingDialog from "./booking-dialog";
import { DetailedBookableItemDto } from "@/lib/api";

interface HourStripProps extends ButtonProps {
  hour: number;
  date: Date;
  item: DetailedBookableItemDto;
}

export default function HourStrip({
  className,
  date,
  hour,
  item,
  disabled,
  ...props
}: HourStripProps) {
  return (
    <BookingDialog
      item={item}
      startTime={new Date(new Date(date.getTime()).setHours(hour, 0, 0, 0))}
      endTime={new Date(new Date(date.getTime()).setHours(hour + 1, 0, 0, 0))}
    >
      <Button
        disabled={disabled}
        variant={"ghost"}
        className={cn(
          "w-full h-12 flex gap-2.5 justify-start items-center relative hover:bg-accent cursor-pointer rounded-lg px-3",
          className
        )}
        {...props}
      >
        <Badge variant={"secondary"}>{hour}:00</Badge>
        <Separator orientation="horizontal" className="w-full shrink" />
      </Button>
    </BookingDialog>
  );
}
