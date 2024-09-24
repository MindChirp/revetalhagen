"use client";

import { cn } from "@/lib/utils";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../../button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../tooltip";
import AboutDialog from "../../about/components/about-dialog";
import { ContentDto } from "@/lib/api";

interface EditControlsProps extends React.HTMLProps<HTMLDivElement> {
  aboutContent: ContentDto;
}
export default function EditControls({
  aboutContent,
  className,
  ...props
}: EditControlsProps) {
  return (
    <div className={cn("flex gap-2.5 w-fit", className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <AboutDialog
            initialValues={aboutContent}
            title="Rediger avsnitt"
            description="Rediger dette avsnittet"
          >
            <Button className="w-full">
              <PencilIcon size={16} />
            </Button>
          </AboutDialog>
        </TooltipTrigger>
        <TooltipContent>Rediger</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="w-full gap-2.5 items-center"
            variant={"destructive"}
          >
            <TrashIcon size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Slett</TooltipContent>
      </Tooltip>
    </div>
  );
}
