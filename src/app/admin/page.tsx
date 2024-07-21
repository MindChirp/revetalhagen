import PageWrapper from "@/components/layout/page-wrapper";
import { Card } from "@/components/ui/card";
import { ParamsProps } from "@/lib/utils";
import PageButtons from "./components/page-buttons";
import PageManager from "./components/page-manager";
import { routes } from "@/lib/routes";
import { redirect, RedirectType } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { requireRole } from "@/lib/auth-guard";

export type Pages = "nyheter" | "interessegrupper" | "brukere";

export default function Admin({ searchParams }: ParamsProps<{ page?: Pages }>) {
  requireRole("admin"); // Subject to change, as we are implementing a different role system in the end

  if (!searchParams?.page) {
    redirect(`${routes.ADMIN}?page=nyheter`);
  }

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
