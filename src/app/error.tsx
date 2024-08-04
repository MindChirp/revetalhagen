"use client";
import ErrorPage from "@/components/layout/error-page";
import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Typography, { TypographyProps } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
type APIResponse = {
  image: string;
  link: string;
};

export default function Error({ statusCode }: { statusCode: number }) {
  return <ErrorPage code={statusCode} label="en feil oppstod" />;
}
