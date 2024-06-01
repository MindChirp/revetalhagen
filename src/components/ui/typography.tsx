import { cn } from "@/lib/utils";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "large" | "small" | "muted";
}

const Typography = ({ variant, className, ...props }: TypographyProps) => {
  switch (variant) {
    case "h1":
      return (
        <h1
          className={cn(
            "scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl",
            className
          )}
          {...props}
        />
      );
    case "p":
      return (
        <p
          className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
          {...props}
        />
      );
    case "h2":
      return (
        <h2
          className={cn(
            "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
            className
          )}
          {...props}
        />
      );
    case "h3":
      return (
        <h3
          className={cn(
            "scroll-m-20 text-2xl font-semibold tracking-tight",
            className
          )}
          {...props}
        />
      );
    case "h4":
      return (
        <h4
          className={cn(
            "scroll-m-20 text-xl font-semibold tracking-tight",
            className
          )}
          {...props}
        />
      );
    case "large":
      return (
        <div className={cn("text-lg font-semibold", className)} {...props} />
      );
    case "small":
      return (
        <div
          className={cn("text-sm font-medium leading-none", className)}
          {...props}
        />
      );
    case "muted":
      return (
        <div
          className={cn("text-sm text-muted-foreground", className)}
          {...props}
        />
      );
  }
};

export default Typography;
