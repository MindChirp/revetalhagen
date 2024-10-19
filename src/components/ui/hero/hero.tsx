import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { BedIcon, NewspaperIcon, WrenchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import { Card, CardContent } from "../card";
import Conditional from "../conditional";
import Typography from "../typography";
import HeroBackground from "./hero-background";
import { isAdmin } from "@/lib/utils/admin";

interface HeroProps extends React.SVGProps<SVGSVGElement> {
  displayBg?: boolean;
}

const Hero = async ({ displayBg, className, ...props }: HeroProps) => {
  const userData = await currentUser();
  const admin = isAdmin();

  return (
    <div
      className={cn(
        "bg-primary h-[calc(100vh_-_5rem)] w-full relative lg:block flex justify-center flex-col",
        className
      )}
    >
      <HeroBackground className="z-10 relative h-full aspect-[1.5]">
        <div className="lg:px-20 py-52 px-5 text-primary-foreground w-full h-3/4 lg:h-fit">
          <Card className="w-full shadow-none bg-transparent">
            <CardContent className="pt-6 lg:p-0">
              <SignedOut>
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
                <div className="relative lg:w-fit w-full">
                  <Link href={"/frivillig"} className="lg:w-fit w-full">
                    <Button className="mt-5 lg:w-fit w-full" size={"wide"}>
                      Bli frivillig
                    </Button>
                  </Link>
                  <div className="hidden w-fit lg:flex flex-col mt-2.5 absolute -translate-x-1/2 left-1/2">
                    <Image
                      src="/squiggly-arrow.svg"
                      alt="Krusedullpil"
                      width={200}
                      height={200}
                      className="w-20 mx-auto object-cover"
                    />
                    <Typography
                      variant="p"
                      className="lg:text-black text-nowrap !mt-0 ml-16 font-semibold"
                    >
                      Det er helt gratis!
                    </Typography>
                  </div>
                </div>
              </SignedOut>

              <SignedIn>
                <Typography variant="h1" className="text-2xl capitalize">
                  Hei, {userData?.firstName}!
                </Typography>
                <Typography
                  variant="p"
                  className="leading-none font-medium max-w-full"
                >
                  Bruk knappene under for å navigere til de mest nyttige sidene
                </Typography>

                <div className="grid gap-2.5 mt-5 grid-cols-2 lg:grid-cols-3">
                  <Conditional render={admin}>
                    <Link href={routes.ADMIN} className="w-full">
                      <Button className="gap-2.5 items-center w-full">
                        <WrenchIcon size={16} />
                        Admin
                      </Button>
                    </Link>
                  </Conditional>
                  <Link href={routes.NEWS} className="w-full">
                    <Button className="gap-2.5 items-center w-full">
                      <NewspaperIcon size={16} />
                      Nyheter
                    </Button>
                  </Link>
                  <Link href={routes.BOOKING} className="w-full">
                    <Button className="gap-2.5 items-center w-full">
                      <BedIcon size={16} />
                      Utleie
                    </Button>
                  </Link>
                </div>
              </SignedIn>
            </CardContent>
          </Card>
        </div>
      </HeroBackground>
      {displayBg && (
        <>
          <Image
            className="object-cover absolute w-full h-full top-0 z-0"
            src="/hero-image.jpg"
            alt="Blomstereng"
            width={2000}
            height={1500}
            priority
          />
          <div className="bg-gradient-to-b from-background to-background/50 absolute top-0 h-full left-0 w-full lg:hidden" />

          {/* Set bottom to -2px because of small space between about section and bottom of hero */}
          <div className="bg-gradient-to-t from-background to-transparent absolute -bottom-[2px] h-1/2 left-0 w-full lg:hidden" />
          <div className="z-40 w-[400px] aspect-square bg-primary rounded-full right-0 translate-x-1/2 hidden lg:block absolute bottom-0 translate-y-1/4" />
        </>
        // <div
        //   className="block w-full h-full top-0 right-0 absolute bg-no-repeat bg-cover bg-center lg:bg-left -z-10"
        //   style={{
        //     backgroundImage: 'url("bakgrunn3.jpg")',
        //   }}
        // />
      )}
    </div>
  );
};

export default Hero;
