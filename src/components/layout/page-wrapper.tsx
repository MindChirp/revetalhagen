import { cn } from "@/lib/utils";
import Image from "next/image";
import Wave6 from "../ui/icons/Wave6";

interface PageWrapperProps extends React.HTMLAttributes<HTMLElement> {}
const PageWrapper = ({ children, className, ...props }: PageWrapperProps) => {
  return (
    <div
      className={cn(
        "bg-page-background w-full pt-64 min-h-screen flex flex-col",
        className
      )}
      {...props}
    >
      <Wave6 className="block -mb-[1px] text-background w-full" />
      <div className="block md:px-20 px-10 w-full  bg-background h-full flex-1">
        <div className="-mt-40 max-w-[1200px] mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageWrapper;
