"use client";
import { newtonsCradle } from "ldrs";
export default function Loader() {
  newtonsCradle.register();
  return <l-newtons-cradle color={"hsl(149 41% 21%)"}></l-newtons-cradle>;
}
