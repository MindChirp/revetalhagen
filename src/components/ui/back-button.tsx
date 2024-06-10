"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <Button
      className="flex gap-2.5 w-fit shadow-md"
      onClick={handleClick}
      variant={"secondary"}
    >
      <ArrowLeftIcon size={16} />
      Tilbake
    </Button>
  );
};

export default BackButton;
