import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavigationGraph from "./navigation-graph";
import ContentViewport from "./content-viewport";

export default function ContentPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Innhold</CardTitle>
        <CardDescription>Administrer innhold på nettsiden</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[1fr_3fr] gap-2.5">
          <NavigationGraph />
          <ContentViewport />
        </div>
      </CardContent>
    </>
  );
}
