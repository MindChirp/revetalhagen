import { cn } from "@/lib/utils";
import Image from "next/image";
import Wave6 from "../ui/icons/Wave6";
import BackButton from "../ui/back-button";
import { ClassNameValue } from "tailwind-merge";

interface PageWrapperProps extends React.HTMLAttributes<HTMLElement> {
  innerClassName?: ClassNameValue;
}

const PageWrapper = ({
  children,
  innerClassName,
  className,
  ...props
}: PageWrapperProps) => {
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
        <div
          className={cn(
            "-mt-40 max-w-[1200px] w-fit mx-auto flex flex-col gap-5 relative",
            innerClassName
          )}
        >
          <BackButton className="absolute -top-5 -translate-y-full" />
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageWrapper;
