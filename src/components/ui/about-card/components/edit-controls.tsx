"use client";

import { cn } from "@/lib/utils";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../../button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../tooltip";
import AboutDialog from "../../about/components/about-dialog";
import { ContentDto } from "@/lib/api";
import useSWRMutation from "swr/mutation";
import { IFetch } from "@/lib/IFetch";
import Conditional from "../../conditional";
import Loader from "../../loader";
import { useToast } from "../../use-toast";

interface EditControlsProps extends React.HTMLProps<HTMLDivElement> {
  aboutContent: ContentDto;
}
export default function EditControls({
  aboutContent,
  className,
  ...props
}: EditControlsProps) {
  const { toast } = useToast();

  const { trigger: deleteAbout, isMutating } = useSWRMutation(
    "frontpage/about",
    () =>
      IFetch<ContentDto>({
        url: `/api/Content/${aboutContent.id}`,
        config: {
          method: "DELETE",
          revalidateTags: ["frontpage-about"],
        },
      })
  );

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
            onClick={() =>
              deleteAbout()
                .then(() => {
                  toast({
                    title: "Vellykket!",
                    description: "Innholdet ble slettet",
                  });
                })
                .catch((err) =>
                  toast({
                    title: "Noe gikk galt",
                    description:
                      "Innholdet kunne ikke bli slettet. Prøv igjen senere, eller ta kontakt med en klok utvikler 🤓",
                    variant: "destructive",
                  })
                )
            }
          >
            <Conditional render={!isMutating}>
              <TrashIcon size={16} />
            </Conditional>
            <Conditional render={isMutating}>
              <Loader />
            </Conditional>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Slett</TooltipContent>
      </Tooltip>
    </div>
  );
}
