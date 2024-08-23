import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/components/ui/typography";
import { BedIcon } from "lucide-react";
import ItemsTab from "./items-tab";
import BookingRequests from "./booking-requests";

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
        <Tabs defaultValue="items" key="booking">
          <TabsList defaultValue={"items"}>
            <TabsTrigger value="items">Gjenstander</TabsTrigger>
            <TabsTrigger value="requests">Forespørsler</TabsTrigger>
          </TabsList>
          <TabsContent value="items">
            <ItemsTab />
          </TabsContent>
          <TabsContent value="requests">
            <BookingRequests />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
}
