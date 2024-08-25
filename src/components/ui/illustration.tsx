import Image from "next/image";
import React from "react";

interface IllustrationProps {
  src: string;
  background?: boolean;
  size?: "small" | "medium" | "large";
}

type Sizes = "small" | "medium" | "large";
const SizeMap: {
  [T in Sizes]?: number;
} = {
  small: 100,
  medium: 200,
  large: 300,
};

export default function Illustration({
  src,
  background,
  size = "medium",
  ...props
}: IllustrationProps) {
  return (
    <div className={background ? "bg-background p-6 rounded-2xl" : undefined}>
      <Image
        src={`/illustrations/${src}`}
        width={SizeMap[size]}
        height={SizeMap[size]}
        alt="Illustrasjon"
      />
    </div>
  );
}
