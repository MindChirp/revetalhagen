import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "../ui/card";
import Typography, { TypographyProps } from "../ui/typography";
import PageWrapper from "./page-wrapper";

interface ErrorProps {
  code: number;
  label: string;
}

export default function ErrorPage({ code, label }: ErrorProps) {
  return (
    <PageWrapper innerClassName="w-full">
      <Card className="w-full animate-in slide-in-from-bottom-10 fade-in duration-200">
        <CardHeader className="text-center overflow-hidden">
          <ImageText variant="h1" className="lg:text-[20rem] text-9xl">
            {code ?? 500}
          </ImageText>
          <Typography
            variant="h1"
            className="animate-in slide-in-from-bottom delay-200 fade-in fill-mode-backwards"
          >
            {label ?? "ikke funnet"}
          </Typography>
        </CardHeader>
        <CardContent /> {/* <= Used for padding */}
      </Card>
    </PageWrapper>
  );
}

interface ImageTextProps extends TypographyProps {
  imageUrl?: string;
}
export function ImageText({ className, imageUrl, ...props }: ImageTextProps) {
  return (
    <Typography
      {...props}
      className={cn("bg-primary", className)}
      style={{
        backgroundImage: `url("https://outdoornebraska.gov/wp-content/uploads/2023/05/swift-fox-foreground.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        WebkitBackgroundClip: "text",
        backgroundPosition: "center",
        WebkitTextFillColor: "transparent",
      }}
    />
  );
}
