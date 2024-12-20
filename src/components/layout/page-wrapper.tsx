import { cn } from "@/lib/utils";
import Wave6 from "../ui/icons/Wave6";
import BackButton from "../ui/back-button";
import { ClassNameValue } from "tailwind-merge";

interface PageWrapperProps extends React.HTMLAttributes<HTMLElement> {
  innerClassName?: ClassNameValue;
  backgroundImage?: string;
}

const PageWrapper = ({
  children,
  innerClassName,
  className,
  backgroundImage,
  ...props
}: PageWrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto bg-page-background bg-cover w-full max-w-[2000px] pt-72 -mt-36 min-h-screen flex flex-col",
        className
      )}
      style={{
        backgroundPositionY: "0",
        backgroundImage: backgroundImage,
      }}
      {...props}
    >
      <Wave6 className="block -mb-[1px] text-background w-full" />
      <div className="block md:px-20 px-2.5 w-full bg-background h-full max-w-full flex-1">
        <div
          className={cn(
            "-mt-40 md:max-w-[1200px] mx-auto w-full max-w-full flex flex-col gap-5 relative",
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
