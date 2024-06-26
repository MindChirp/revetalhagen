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
        className={cn("relative shadow-sm w-full h-52 rounded-3xl", className)}
        {...props}
      >
        <Image
          src={src}
          objectFit="cover"
          alt={alt}
          className="rounded-3xl"
          fill
        />
      </div>
      {displayAlt && <Typography variant="muted">{alt}</Typography>}
    </div>
  );
};

export default ArticleImage;
