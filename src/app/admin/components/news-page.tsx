import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewsForm from "./news-form";
import { ParamsProps, PathParams } from "@/lib/utils";
import { IFetch } from "@/lib/IFetch";
import { DetailedNewsDto } from "@/lib/api";
import { AdminSearchParams, Pages } from "../page";
import { NewspaperIcon } from "lucide-react";
import ExistingNews from "./existing-news";

interface NewsPageProps {
  searchParams?: AdminSearchParams;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  let article: DetailedNewsDto | undefined;
  if (searchParams?.articleId) {
    article = await IFetch<DetailedNewsDto>({
      url: `/api/News/${searchParams?.articleId}`,
      config: {
        next: {
          tags: ["news"],
        },
      },
    });
  }

  return (
    <div className="w-full h-full animate-in slide-in-from-bottom-10 duration-200">
      <CardHeader>
        <CardTitle className="flex gap-2.5">
          <NewspaperIcon /> Nyheter
        </CardTitle>
        <CardDescription>Administrer nyhetsfeeden</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="new-article">
          <TabsList>
            <TabsTrigger value="new-article">Ny artikkel</TabsTrigger>
            <TabsTrigger value="existing-articles">
              Eksisterende artikler
            </TabsTrigger>
          </TabsList>
          <TabsContent value="new-article">
            <NewsForm article={article} className="mt-5" />
          </TabsContent>
          <TabsContent value="existing-articles">
            <ExistingNews />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
}
