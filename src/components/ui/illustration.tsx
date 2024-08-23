import Image from "next/image";
import React from "react";

interface IllustrationProps {
  src: string;
}

export default function Illustration({ src, ...props }: IllustrationProps) {
  return (
    <Image
      src={`/illustrations/${src}`}
      width={100}
      height={100}
      alt="Illustrasjon"
    />
  );
}
