"use client";
import { auth, currentUser } from "@clerk/nextjs/server";
import Typography from "../typography";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface HeroProps extends React.SVGProps<SVGSVGElement> {
  displayBg?: boolean;
}

const Hero = ({ displayBg, className, ...props }: HeroProps) => {
  // const userData = await currentUser();
  // const permissions = auth().sessionClaims?.metadata.permissions;
  // const isAdmin = (permissions?.length ?? 0) > 0;

  return (
    <div className="p-10 h-screen w-full">
      <div className="w-full h-full ">
        <div className="w-full h-full rounded-2xl pl-16 flex gap-10 items-end overflow-hidden relative bg-gradient-to-tr from-primary to-primary/30">
          <div className="flex flex-col gap-2.5 max-w-xl h-full align-middle justify-center z-10">
            <Typography variant="h1" className="">
              Et sted der folk kan goone
            </Typography>
            <Typography variant="h3">
              Revetalhagen har massevis av muligheter, og mange doer
            </Typography>
          </div>
          <Image
            src="/illustrations/strå.svg"
            alt="hello"
            width={500}
            height={500}
            className="w-[calc(100%_+_3rem)] block absolute -right-5 -bottom-36 max-w-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
