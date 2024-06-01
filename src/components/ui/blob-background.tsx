import { cn } from "@/lib/utils";
import Typography from "./typography";
import { Button } from "./button";

interface BlobBackgroundProps extends React.SVGProps<SVGSVGElement> {}

const BlobBackground = ({ className, ...props }: BlobBackgroundProps) => {
  return (
    <div className="h-fit">
      <div className="absolute px-20 py-52 text-primary-foreground w-1/2">
        <Typography variant="h1">Frivillighetssentral og naturhage</Typography>
        <Typography variant="p" className="leading-none font-medium">
          Arbeidsinkludering, frivillighet, språkpraksis og aktiviteter for
          målgrupper i alle aldre og livssituasjoner
        </Typography>
        <Button className="mt-5" size={"wide"}>
          Bli frivillig
        </Button>
      </div>
      <svg
        width="1144"
        height="972"
        viewBox="0 0 1144 972"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(className)}
        {...props}
      >
        <path
          d="M932.645 191.688C1054.48 182.733 1124.45 117.849 1142.56 -2.96177L1.23913 -2.96179L1.23911 970.285L92.9783 970.285C214.811 961.33 284.783 896.446 302.895 775.635C321.007 654.824 390.979 589.941 512.812 580.986C634.644 572.031 704.616 507.148 722.728 386.337C740.84 265.526 810.812 200.643 932.645 191.688Z"
          fill="#FDFDFD"
          stroke="#FDFDFD"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default BlobBackground;
