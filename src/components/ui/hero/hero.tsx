import { IFetch } from "@/lib/IFetch";
import { ContentDto } from "@/lib/api";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { PencilIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../button";
import Conditional from "../conditional";
import Typography from "../typography";
import HeroEditDialog from "./hero-edit-dialog/hero-edit-dialog";

interface HeroProps extends React.HTMLProps<HTMLDivElement> {
  displayBg?: boolean;
}

const Hero = async ({ displayBg, className, ...props }: HeroProps) => {
  const permissions = auth().sessionClaims?.metadata.permissions;
  const isAdmin = (permissions?.length ?? 0) > 0;
  const content = await IFetch<ContentDto[]>({
    url: `/api/Content/${encodeURIComponent("hero")}`,
    config: {
      method: "GET",
      next: {
        tags: ["hero"],
      },
    },
  })
    .then((res) => {
      if (Array.isArray(res)) return res;

      // If the response is not of type array, we have an error
      return [];
    })
    .catch((err) => {
      console.error(err);
      return [];
    });

  const filtered = content?.[0];

  return (
    <div
      {...props}
      className={cn(
        "p-10 md:px-10 px-5 md:h-[95vh] h-[90vh] w-full",
        className
      )}
    >
      <div className="w-full h-full ">
        <div className="w-full h-full rounded-2xl md:pl-16 md:pr-0 px-5 flex gap-10 items-end overflow-hidden relative bg-gradient-to-tr md:justify-start justify-center from-primary to-primary/30">
          <div className="flex flex-col gap-2.5 max-w-xl h-full align-middle justify-center z-10">
            <Typography
              variant="h1"
              className="md:text-start text-center w-full"
            >
              {filtered?.title ?? "Velkommen"}
            </Typography>
            <Typography variant="h3" className="md:text-start text-center">
              {filtered?.content ?? ""}
            </Typography>
            <Conditional render={isAdmin}>
              <HeroEditDialog initialContent={filtered}>
                <Button className="md:w-fit w-full items-center gap-2.5">
                  <PencilIcon size={16} /> Rediger
                </Button>
              </HeroEditDialog>
            </Conditional>
          </div>
          <Image
            src="/illustrations/strå.svg"
            alt="hello"
            width={500}
            height={500}
            className="w-[calc(100%_+_3rem)] block absolute -right-5 md:-bottom-36 -bottom-10 max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
