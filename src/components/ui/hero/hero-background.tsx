import BackgroundSvg from "./background-svg";

interface HeroBackgroundProps extends React.HTMLProps<HTMLDivElement> {}

export default function HeroBackground({
  children,
  ...props
}: HeroBackgroundProps) {
  return (
    <div {...props}>
      <div className="relative z-20 w-full lg:w-[calc(70%_-_16rem)]">
        {children}
      </div>
      <div className="z-30 relative w-[500px] aspect-square bg-primary rounded-full -translate-x-1/2 hidden lg:block" />
      <BackgroundSvg className="lg:block hidden top-0 left-0 absolute w-[calc(100%_-_16rem)]" />
    </div>
  );
}
