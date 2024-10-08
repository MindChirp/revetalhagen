"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Filters({
  enableCreateArticle,
}: {
  enableCreateArticle?: boolean;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("query"));

  useEffect(() => {
    setValue(params.get("query") ?? "");
  }, [params]);
  return (
    <Card className="shadow-md lg:w-fit w-full h-fit lg:order-2 order-1 sticky top-28">
      <CardHeader>
        <CardTitle className="text-primary-foreground">Filtre</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Input
          placeholder="Søk..."
          defaultValue={value ?? ""}
          className="lg:w-72 w-full "
          onChange={(e) =>
            router.replace(`${routes.NEWS}?query=${e.target.value}`)
          }
        />
        {enableCreateArticle && (
          <Link href={routes.ADMIN + "?page=nyheter"}>
            <Button className="flex gap-2.5 w-full">
              <PlusIcon size={16} />
              Ny artikkel
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
