import { cn } from "@/lib/utils";
import Typography from "./typography";
import { Button } from "./button";
import Image from "next/image";

interface HeroProps extends React.SVGProps<SVGSVGElement> {}

const Hero = ({ className, ...props }: HeroProps) => {
  return (
    <div>
      <div
        className={cn(
          "h-fit w-full lg:bg-hero-wave md:block flex justify-center flex-col z-10 relative",
          className
        )}
        style={{
          backgroundRepeat: "no-repeat",
          backgroundSize: "calc(100% - 17.2rem)",
        }}
      >
        <div className="px-20 py-52 text-primary-foreground md:w-[calc(60%_-_17.2rem)] w-full h-2/3 md:h-fit">
          <Typography variant="h1" className="text-2xl">
            Revetalhagen
          </Typography>
          <Typography variant="h3">Tønsberg NaKuHel</Typography>
          <Typography variant="p" className="leading-none font-medium">
            Arbeidsinkludering, frivillighet, språkpraksis og aktiviteter for
            målgrupper i alle aldre og livssituasjoner
          </Typography>
          <div className="relative w-fit">
            <Button className="mt-5 md:w-fit w-full" size={"wide"}>
              Bli frivillig
            </Button>
            <div className="w-fit flex flex-col mt-2.5 absolute -translate-x-1/2 left-1/2">
              <Image
                src="/squiggly-arrow.svg"
                alt="Krusedullpil"
                objectFit="cover"
                width={200}
                height={200}
                className="w-20 h-20 mx-auto"
              />
              <Typography
                variant="p"
                className="text-nowrap !mt-0 ml-16 font-semibold"
              >
                Det er helt gratis!
              </Typography>
            </div>
          </div>
        </div>
        <div className="w-[500px] aspect-square bg-primary rounded-full -translate-x-1/2 hidden md:block" />
      </div>
      <Image
        src="/banner.jpg"
        alt="Revetalhagen banner"
        objectFit="cover"
        fill
        className="w-full h-full absolute top-0 right-0 z-0"
      />
    </div>
  );
};

export default Hero;
