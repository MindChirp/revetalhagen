import { cn, hasPermissions, PERMISSIONS } from "@/lib/utils";
import Typography from "../typography";
import { Button } from "../button";
import Image from "next/image";
import Link from "next/link";
import HeroBackground from "./hero-background";
import { Card, CardContent, CardHeader } from "../card";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Conditional from "../conditional";

interface HeroProps extends React.SVGProps<SVGSVGElement> {
  displayBg?: boolean;
}

const Hero = async ({ displayBg, className, ...props }: HeroProps) => {
  const userData = await currentUser();
  const permissions = auth().sessionClaims?.metadata.permissions;
  const isAdmin = (permissions?.length ?? 0) > 0;

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
                      width={200}
                      height={200}
                      className="w-20 h-20 mx-auto object-cover"
                    />
                    <Typography
                      variant="p"
                      className="md:text-black text-nowrap !mt-0 ml-16 font-semibold"
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

                <div className="flex gap-2.5 mt-5">
                  <Conditional render={isAdmin}>
                    <Button>Admin</Button>
                  </Conditional>
                  <Button>Nyheter</Button>
                  <Button>Utleie</Button>
                </div>
              </SignedIn>
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
