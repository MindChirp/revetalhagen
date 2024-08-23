import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { BedIcon } from "lucide-react";

export default function BookingPage() {
  return (
    <div className="w-full h-full animate-in slide-in-from-bottom-10 duration-200">
      <CardHeader>
        <CardTitle className="flex gap-2.5 items-center">
          <BedIcon /> Utleie
        </CardTitle>
        <CardDescription>
          Administrer utleibare gjenstander og rom
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs>
          <TabsList defaultValue={"items"}>
            <TabsTrigger value="items">Gjenstander</TabsTrigger>
            <TabsTrigger value="requests">Forespørsler</TabsTrigger>
          </TabsList>
          <TabsContent value="items">
            <Typography variant="h1">Gjenstander</Typography>
          </TabsContent>
          <TabsContent value="requests">
            <Typography variant="h1">Forespørsler</Typography>
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
}
