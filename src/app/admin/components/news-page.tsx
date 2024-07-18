import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";

export default function NewsPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Nyheter</CardTitle>
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
          <TabsContent value="new-article"></TabsContent>
          <TabsContent value="existing-articles"></TabsContent>
        </Tabs>
      </CardContent>
    </>
  );
}
