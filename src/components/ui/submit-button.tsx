import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";
import { motion } from "framer-motion";

interface SubmitButtonProps extends ButtonProps {
  submitting?: boolean;
  error?: boolean;
  submitted?: boolean;
}
export default function SubmitButton({
  submitting,
  error,
  submitted,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      className={cn("md:w-fit w-full gap-2.5", className)}
      type={"submit"}
      {...props}
    />
  );
}
