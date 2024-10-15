"use client";

import Typography from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
const strings = [
  "Laster siden",
  "Snart framme..",
  "Vent litt..",
  "Gjør noen siste finjusteringer",
  "Henter data..",
  "Venter på server..",
  "Ferdig om litt..",
  "Visste du at nebulaer er stjernedannende skyer av gass og støv?",
  "Visste du at en dag på Venus er lengre enn et år på Venus?",
  "Visste du at Saturn er planeten i solsystemet med lavest tetthet?",
];
export default function FrontpageLoader() {
  const [string, setString] = useState("");

  useEffect(() => {
    setString(strings[Math.floor(Math.random() * strings.length)]);
  }, []);

  return (
    <div className="md:w-3/4 mx-auto text-center h-0 min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2.5 items-center justify-center w-fit h-fit">
        <HashLoader color={"#bbf7d0"} />
        <Typography className="text-secondary-background-foreground font-bold">
          {string}
        </Typography>
      </div>
    </div>
  );
}
