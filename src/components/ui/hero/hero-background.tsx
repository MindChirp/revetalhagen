import BackgroundSvg from "./background-svg";

interface HeroBackgroundProps extends React.HTMLProps<HTMLDivElement> {}

export default function HeroBackground({
  children,
  ...props
}: HeroBackgroundProps) {
  return (
    <div {...props}>
      <div className="relative z-20">{children}</div>
      <div className="z-20 relative w-[500px] aspect-square bg-primary rounded-full -translate-x-1/2 hidden md:block" />
      <BackgroundSvg className="top-0 left-0 z-10 absolute w-[calc(100%_-_17.2rem)]" />
    </div>
  );
}
