import { cn } from "@/lib/utils";
import Typography from "./typography";
import { Button } from "./button";
import Image from "next/image";

interface HeroProps extends React.SVGProps<SVGSVGElement> {}

const Hero = ({ className, ...props }: HeroProps) => {
  return (
    <div
      className={cn(
        "h-fit w-full lg:bg-hero-wave md:block flex justify-center flex-col",
        className
      )}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "calc(100% - 17.2rem)",
      }}
    >
      <div className="px-20 py-52 text-primary-foreground md:w-[calc(60%_-_17.2rem)] w-full h-2/3 md:h-fit">
        <Typography variant="h1" className="text-2xl">
          Frivillighetssentral og naturhage
        </Typography>
        <Typography variant="p" className="leading-none font-medium">
          Arbeidsinkludering, frivillighet, språkpraksis og aktiviteter for
          målgrupper i alle aldre og livssituasjoner
        </Typography>
        <Button className="mt-5 md:w-fit w-full" size={"wide"}>
          Bli frivillig
        </Button>
        <div className="flex flex-col ml-10 mt-2.5">
          <Image
            src="/squiggly-arrow.svg"
            alt="Krusedullpil"
            objectFit="cover"
            width={200}
            height={200}
            className="w-20 h-20"
          />
          <Typography variant="p" className="!mt-0 font-semibold">
            Det er helt gratis!
          </Typography>
        </div>
      </div>
      <div className="w-[500px] aspect-square bg-primary rounded-full -translate-x-1/2 hidden md:block" />
    </div>
  );
};

export default Hero;
