import { cn } from "@/lib/utils";
import Typography from "./typography";

interface FooterProps extends React.HTMLProps<HTMLDivElement> {}

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn("w-full", className)}>
      <div
        style={{
          backgroundImage: "url('/wave5.svg')",
        }}
        className="bg-cover w-full h-5"
      />
      <div
        className={cn(
          "w-full py-20 bg-secondary-background flex gap-5 flex-col items-center"
        )}
      >
        <div className="flex gap-5">
          <Sponsor>Samarbeidspartner A</Sponsor>
          <Sponsor>Samarbeidspartner B</Sponsor>
        </div>
        <Typography variant="large">Samarbeidspartnere</Typography>
      </div>
    </footer>
  );
};

const Sponsor = ({ ...props }: React.HTMLProps<HTMLParagraphElement>) => {
  return (
    <p
      className="w-40 aspect-square bg-page-background rounded-lg flex place-content-center items-center text-center p-3"
      {...props}
    />
  );
};

export default Footer;
