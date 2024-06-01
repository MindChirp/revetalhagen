import { cn } from "@/lib/utils";
import Typography from "./typography";
import { Button } from "./button";

interface HeroProps extends React.SVGProps<SVGSVGElement> {}

const Hero = ({ className, ...props }: HeroProps) => {
  return (
    <div
      className="h-fit w-full lg:bg-hero-wave"
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "81%",
      }}
    >
      <div className="px-20 py-52 text-primary-foreground w-1/2">
        <Typography variant="h1">Frivillighetssentral og naturhage</Typography>
        <Typography variant="p" className="leading-none font-medium">
          Arbeidsinkludering, frivillighet, språkpraksis og aktiviteter for
          målgrupper i alle aldre og livssituasjoner
        </Typography>
        <Button className="mt-5" size={"wide"}>
          Bli frivillig
        </Button>
      </div>
      <div className="w-[500px] aspect-square bg-primary rounded-full -translate-x-1/2" />
    </div>
  );
};

export default Hero;
