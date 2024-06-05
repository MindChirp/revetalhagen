import { cn } from "@/lib/utils";
import Typography from "./typography";
import { Button } from "./button";

interface HeroProps extends React.SVGProps<SVGSVGElement> {}

const Hero = ({ className, ...props }: HeroProps) => {
  return (
    <div
      className={cn(
        "h-fit w-full lg:bg-hero-wave md:block flex justify-center flex-col",
        className
      )}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "81%",
      }}
    >
      <div className="px-20 py-52 text-primary-foreground md:w-1/2 w-full h-2/3 md:h-fit">
        <Typography variant="h1" className="text-2xl">
          Frivillighetssentral og naturhage
        </Typography>
        <Typography variant="p" className="leading-none font-medium">
          Arbeidsinkludering, frivillighet, språkpraksis og aktiviteter for
          målgrupper i alle aldre og livssituasjoner
        </Typography>
        <Button className="mt-5 md:w-fit w-full" size={"wide"}>
          Bli frivillig
        </Button>
      </div>
      <div className="w-[500px] aspect-square bg-primary rounded-full -translate-x-1/2 hidden md:block" />
    </div>
  );
};

export default Hero;
