import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IFetch } from "@/lib/IFetch";
import { DetailedNewsDto } from "@/lib/api";
import { NewspaperIcon } from "lucide-react";
import { AdminSearchParams } from "../page";
import ExistingNews from "./existing-news";
import NewsForm from "./news-form";

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
    }).then((res) => {
      // Check if result is of type DetailedNewsDto
      if (
        "id" in res &&
        "title" in res &&
        "content" in res &&
        "publishedBy" in res
      ) {
        return res as DetailedNewsDto;
      } else {
        throw res;
      }
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
        <Tabs defaultValue="new-article" key="news">
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
