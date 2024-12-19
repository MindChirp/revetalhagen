import { auth, currentUser } from "@clerk/nextjs/server";
import Typography from "../typography";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroProps extends React.HTMLProps<HTMLDivElement> {
  displayBg?: boolean;
}

const Hero = ({ displayBg, className, ...props }: HeroProps) => {
  // const userData = await currentUser();
  // const permissions = auth().sessionClaims?.metadata.permissions;
  // const isAdmin = (permissions?.length ?? 0) > 0;

  return (
    <div {...props} className={cn("md:p-10 p-5 h-[95vh] w-full", className)}>
      <div className="w-full h-full ">
        <div className="w-full h-full rounded-2xl md:pl-16 md:pr-0 px-5 flex gap-10 items-end overflow-hidden relative bg-gradient-to-tr from-primary to-primary/30">
          <div className="flex flex-col gap-2.5 max-w-xl h-full align-middle justify-center z-10">
            <Typography variant="h1" className="md:text-start text-center">
              Revetalhagen Tønsberg NaKuHel
            </Typography>
            <Typography variant="h3" className="md:text-start text-center">
              Arbeidsinkludering, frivillighet, språkpraksis og aktiviteter for
              målgrupper i alle aldre og livssituasjoner
            </Typography>
          </div>
          <Image
            src="/illustrations/strå.svg"
            alt="hello"
            width={500}
            height={500}
            className="w-[calc(100%_+_3rem)] block absolute -right-5 md:-bottom-36 -bottom-10 max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
