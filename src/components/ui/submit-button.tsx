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
    <div className="flex gap-5">
      <Button
        className={cn("md:w-fit w-full gap-2.5", className)}
        type={"submit"}
        {...props}
      />
      <motion.div>
        {submitting && <span>Laster...</span>}
        {error && <span>Noe gikk galt</span>}
        {submitted && <span>Sendt!</span>}
      </motion.div>
    </div>
  );
}
