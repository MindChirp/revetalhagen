import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "./card";
import React from "react";

interface PageCardProps extends React.ComponentProps<typeof Card> {
  header?: React.ReactNode;
}
const PageCard = ({ header, className, children, ...props }: PageCardProps) => {
  return (
    <Card className={cn("mx-auto min-w-[50vw] w-full", className)} {...props}>
      {<CardHeader>{header}</CardHeader>}
      {children}
    </Card>
  );
};

export default PageCard;
