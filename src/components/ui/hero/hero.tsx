import { cn } from "@/lib/utils";
import Typography from "../typography";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";
import HeroBackground from "./hero-background";
import { Card, CardContent, CardHeader } from "../card";

interface HeroProps extends React.SVGProps<SVGSVGElement> {
  displayBg?: boolean;
}

const Hero = ({ displayBg, className, ...props }: HeroProps) => {
  return (
    <div
      className={cn(
        "bg-primary z-10 h-fit w-full relative md:block flex justify-center flex-col",
        className
      )}
    >
      <HeroBackground>
        <div className="md:px-20 px-10 py-52 text-primary-foreground w-full h-2/3 md:h-fit">
          <Card className="w-full md:shadow-none shadow-md bg-background">
            <CardContent className="pt-6 md:p-0">
              <Typography variant="h1" className="text-2xl">
                Revetalhagen
              </Typography>
              <Typography variant="h3">Tønsberg NaKuHel</Typography>
              <Typography
                variant="p"
                className="leading-none font-medium max-w-full"
              >
                Arbeidsinkludering, frivillighet, språkpraksis og aktiviteter
                for målgrupper i alle aldre og livssituasjoner
              </Typography>
              <div className="relative w-fit">
                <Link href={"/frivillig"}>
                  <Button className="mt-5 md:w-fit w-full" size={"wide"}>
                    Bli frivillig
                  </Button>
                </Link>
                <div className="hidden w-fit md:flex flex-col mt-2.5 absolute -translate-x-1/2 left-1/2">
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
                    className="md:text-black text-nowrap !mt-0 ml-16 font-semibold"
                  >
                    Det er helt gratis!
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </HeroBackground>
      {displayBg && (
        <div
          className="block w-full h-full top-0 right-0 absolute bg-no-repeat bg-cover bg-center md:bg-left -z-10"
          style={{
            backgroundImage: 'url("bakgrunn3.jpg")',
          }}
        />
      )}
    </div>
  );
};

export default Hero;
