import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedIcon } from "lucide-react";
import ItemsTab from "./items-tab";
import BookingRequests from "./booking-requests";
import { Suspense } from "react";
import Typography from "@/components/ui/typography";

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
        <Tabs defaultValue="requests" key="booking">
          <TabsList defaultValue={"items"}>
            <TabsTrigger value="items">Gjenstander</TabsTrigger>
            <TabsTrigger value="requests">Forespørsler</TabsTrigger>
          </TabsList>
          <TabsContent value="items">
            <Suspense fallback={<Typography variant="h1">Laster</Typography>}>
              <ItemsTab />
            </Suspense>
          </TabsContent>
          <TabsContent value="requests">
            <BookingRequests />
          </TabsContent>
        </Tabs>
      </CardContent>
    </div>
  );
}
