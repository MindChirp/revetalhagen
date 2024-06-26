import Link from "next/link";
import { Button } from "../button";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <div className="min-w-80 p-4 flex w-full flex-col">
      <MenuLink href="/om-oss/hvem-er-vi">Hvem vi er</MenuLink>
      <MenuLink href="/om-oss/hagen-vaar">Hagen vår</MenuLink>
      <MenuLink href="/om-oss/om-nakuhel">Om NaKuHel</MenuLink>
      <MenuLink href="/om-oss/styret">Styret</MenuLink>
    </div>
  );
};

interface MenuLinkProps extends React.ComponentProps<typeof Link> {}

const MenuLink = ({ className, ...props }: MenuLinkProps) => {
  return (
    <Link
      className={cn(
        "py-2 px-4 transition-colors hover:bg-accent bg-popover rounded-full",
        className
      )}
      {...props}
    />
  );
};

export default About;
