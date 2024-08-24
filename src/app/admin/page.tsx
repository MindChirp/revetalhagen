import PageWrapper from "@/components/layout/page-wrapper";
import { Card } from "@/components/ui/card";
import { ParamsProps } from "@/lib/utils";
import PageButtons from "./components/page-buttons";
import PageManager from "./components/page-manager";
import { routes } from "@/lib/routes";
import { redirect, RedirectType } from "next/navigation";
import { requireRole } from "@/lib/auth-guard";
import AdminSkeleton from "./components/admin-skeleton";
import Conditional from "@/components/ui/conditional";
import Typography from "@/components/ui/typography";

export type Pages =
  | "nyheter"
  | "interessegrupper"
  | "brukere"
  | "utleie"
  | "sponsorer";

export type AdminSearchParams = {
  page?: Pages;
  articleId?: string;
};

export default function Admin({
  searchParams,
}: ParamsProps<AdminSearchParams>) {
  requireRole("admin"); // Subject to change, as we are implementing a different role system in the end

  return (
    <PageWrapper innerClassName="w-full animate-in fade-in opacity-100 duration-500">
      <div className="flex lg:flex-row flex-col gap-10 w-full">
        <Card className="w-full flex-1 order-2 md:order-1 overflow-hidden">
          <PageManager searchParams={searchParams} />
        </Card>
        <PageButtons currentPage={searchParams?.page} />
      </div>
    </PageWrapper>
  );
}
