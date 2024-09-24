import { cn } from "@/lib/utils";
import Image from "next/image";
import Conditional from "../conditional";
import Typography from "../typography";
import EditControls from "./components/edit-controls";
import { ContentDto } from "@/lib/api";

type AboutCardProps = {
  direction?: "left" | "right";
  pageContent: ContentDto;
  editable: boolean;
  mirrored?: boolean;
  displayEditControls?: boolean;
} & React.HTMLProps<HTMLDivElement>;

const AboutCard = async ({
  className,
  pageContent,
  direction,
  mirrored,
  displayEditControls = false,
  ...props
}: AboutCardProps) => {
  return (
    <div
      className={cn(
        "w-fit flex-shrink-0 flex md:gap-10 gap-5 items-center flex-col md:flex-row",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "md:w-72 md:h-72 w-52 h-52 aspect-square relative items-center",
          mirrored ? "md:order-2" : undefined
        )}
      >
        <Image
          src={
            "https://revetalhagenblob.blob.core.windows.net/images/IMG_0713 (1).jpg"
          }
          alt={"Bilde av " + pageContent.title}
          fill
          objectFit="cover"
          className="rounded-full shadow-lg"
        />
        <Image
          alt="Bølge"
          className="absolute top-10 right-0 h-auto w-1/2"
          src="/wave1.svg"
          width={100}
          height={100}
        />
        <Image
          alt="Bølge"
          className="absolute bottom-10 left-0 h-auto w-1/2"
          src="/wave2.svg"
          width={100}
          height={100}
        />
      </div>
      <div
        className={cn(
          "flex flex-col place-content-center w-fit md:items-start",
          mirrored ? "md:order-1 md:items-end md:text-end" : undefined,
          "items-center"
        )}
      >
        <div
          className={cn(
            "w-fit flex flex-col gap-2.5 md:items-start",
            mirrored ? "md:items-end" : undefined,
            "items-center"
          )}
        >
          <Typography
            variant="h1"
            className={cn(
              "w-fit text-primary-foreground !text-5xl text-center",
              mirrored ? "md:text-end" : "md:text-start"
            )}
          >
            {pageContent.title}
          </Typography>
          <Image
            alt="Bølge"
            className="h-auto w-52"
            src="/wave4.svg"
            width={100}
            height={100}
          />
        </div>
        <Typography
          variant="p"
          className="text-primary-foreground max-w-[700px] w-full"
        >
          {pageContent.content}
        </Typography>
        <Conditional render={displayEditControls}>
          <EditControls aboutContent={pageContent} className="mt-2.5" />
        </Conditional>
      </div>
    </div>
  );
};

export default AboutCard;
