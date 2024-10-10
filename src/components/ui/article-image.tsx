import Image from "next/image";
import Typography from "./typography";
import { cn } from "@/lib/utils";

interface ArticleImageProps extends React.HTMLProps<HTMLDivElement> {
  src: string;
  alt: string;
  displayAlt?: boolean;
}
const ArticleImage = ({
  src,
  alt,
  displayAlt,
  className,
  ...props
}: ArticleImageProps) => {
  return (
    <div className="flex flex-col my-6 w-full gap-1">
      <div
        className={cn(
          "relative shadow-md w-full h-52 rounded-3xl z-20",
          className
        )}
        {...props}
      >
        <Image src={src} alt={alt} className="rounded-3xl object-cover" fill />
      </div>
      <div className="relative w-full">
        <Image
          src="/wave7.svg"
          alt="Bølge"
          width={100}
          height={100}
          className="w-full h-50 absolute top-1/2 -translate-y-1/2 left-0 z-0 md:block hidden"
        />
        {displayAlt && (
          <Typography
            className="bg-card relative md:ml-0 mx-auto z-10 w-fit pr-2.5"
            variant="muted"
          >
            {alt}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default ArticleImage;
