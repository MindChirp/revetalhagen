import PageWrapper from "@/components/layout/page-wrapper";
import { Card } from "@/components/ui/card";
import { requireHeightenedPriveleges } from "@/lib/auth-guard";
import { ParamsProps } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import PageButtons from "./components/page-buttons";
import PageManager from "./components/page-manager";

export type Pages =
  | "nyheter"
  | "interessegrupper"
  | "brukere"
  | "utleie"
  | "sponsorer"
  | "innhold";

export type AdminSearchParams = {
  page?: Pages;
  articleId?: string;
};

export default async function Admin({
  searchParams,
}: ParamsProps<AdminSearchParams>) {
  requireHeightenedPriveleges();
  const { sessionClaims } = await auth();

  return (
    <PageWrapper innerClassName="w-full animate-in fade-in opacity-100 duration-500">
      <div className="flex lg:flex-row flex-col gap-10 w-full">
        <Card className="w-full flex-1 order-2 md:order-1 overflow-hidden">
          <PageManager searchParams={searchParams} />
        </Card>
        <PageButtons
          currentPage={searchParams?.page}
          userPermissions={sessionClaims?.metadata.permissions ?? []}
        />
      </div>
    </PageWrapper>
  );
}
