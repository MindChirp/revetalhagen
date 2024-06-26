import { cn } from "@/lib/utils";
import Typography from "./typography";
import { Button } from "./button";
import Image from "next/image";
import Link from "next/link";

interface HeroProps extends React.SVGProps<SVGSVGElement> {
  displayBg?: boolean;
}

const Hero = ({ displayBg, className, ...props }: HeroProps) => {
  return (
    <div
      className={cn(
        "z-10 h-fit w-full relative md:block flex justify-center flex-col",
        className
      )}
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
          <Link href={"/frivillig"}>
            <Button className="mt-5 md:w-fit w-full" size={"wide"}>
              Bli frivillig
            </Button>
          </Link>
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
      {displayBg && (
        <div
          className="md:block hidden w-full h-full top-0 right-0 absolute bg-no-repeat bg-cover bg-center md:bg-left -z-10"
          style={{
            backgroundImage: 'url("revetalhagen logo.png")',
          }}
        />
      )}
      <Image
        src={"/hero-wave.svg"}
        alt="bølge"
        width={100}
        height={100}
        className="md:block hidden bg-no-repeat absolute left-0 top-0 -z-10 w-[calc(100%_-_17.2rem)]"
      />
    </div>
  );
};

export default Hero;
