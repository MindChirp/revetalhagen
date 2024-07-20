import { cn } from "@/lib/utils";
import Loader from "./loader";

export default function SuspenseUI({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full h-fit py-10",
        className
      )}
      {...props}
    >
      <Loader />
    </div>
  );
}
