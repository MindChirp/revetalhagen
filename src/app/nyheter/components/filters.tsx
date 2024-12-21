"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { routes } from "@/lib/routes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { atom, useAtom } from "jotai";

export const newsFilterAtom = atom<string>("");

export default function Filters({
  enableCreateArticle,
}: {
  enableCreateArticle?: boolean;
}) {
  const [query, setQuery] = useAtom(newsFilterAtom);

  return (
    <Card className="shadow-md lg:w-fit w-full h-fit lg:order-2 order-1 top-28 sticky hidden md:block">
      <CardHeader>
        <CardTitle className="text-primary-foreground">Filtre</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Input
          placeholder="Søk..."
          defaultValue={""}
          className="lg:w-72 w-full "
          onChange={(e) => setQuery(e.target.value)}
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
