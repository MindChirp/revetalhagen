"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button, ButtonProps } from "./button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BackButtonProps extends ButtonProps {}

const BackButton = ({ className, ...props }: BackButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button
      className={cn("hidden md:flex gap-2.5 w-fit shadow-md", className)}
      onClick={handleClick}
      variant={"ghost"}
      {...props}
    >
      <ArrowLeftIcon size={16} />
      Tilbake
    </Button>
  );
};

export default BackButton;
