import PageWrapper from "@/components/layout/page-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { ParamsProps } from "@/lib/utils";
import Link from "next/link";
import PageButtons from "./components/page-buttons";
import PageManager from "./components/page-manager";

export type Pages = "nyheter" | "interessegrupper" | "brukere";

export default function Admin({ searchParams }: ParamsProps<{ page?: Pages }>) {
  return (
    <PageWrapper innerClassName="w-full">
      <div className="flex lg:flex-row flex-col gap-10 w-full">
        <Card className="w-full flex-1 order-2 md:order-1">
          <PageManager currentPage={searchParams?.page} />
        </Card>
        <PageButtons currentPage={searchParams?.page} />
      </div>
    </PageWrapper>
  );
}
