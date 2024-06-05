import { cn } from "@/lib/utils";
import Image from "next/image";
import Typography from "./typography";

interface AboutCardProps extends React.HTMLProps<HTMLDivElement> {
  direction?: "left" | "right";
  img: string;
  alt: string;
  title: string;
  description: string;
  mirrored?: boolean;
}

const AboutCard = ({
  className,
  direction,
  img,
  alt,
  title,
  description,
  mirrored,
  ...props
}: AboutCardProps) => {
  return (
    <div
      className={cn(
        "w-fit flex md:gap-10 items-center flex-col md:flex-row",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "md:w-96 w-52 aspect-square relative items-center",
          mirrored ? "md:order-2" : undefined
        )}
      >
        <Image
          src={img}
          alt={alt}
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
            className="w-fit text-primary-foreground !text-5xl text-center md:text-start"
          >
            {title}
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
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default AboutCard;
