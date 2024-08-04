"use client";
import { newtonsCradle } from "ldrs";

interface LoaderProps {
  color?: string;
}
export default function Loader({ color }: LoaderProps) {
  newtonsCradle.register();
  return <l-ring color={color ?? "hsl(149 41% 21%)"}></l-ring>;
}
