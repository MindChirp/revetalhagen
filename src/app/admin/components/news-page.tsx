import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Typography from "@/components/ui/typography";

export default function NewsPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Nyheter</CardTitle>
        <CardDescription>Administrer nyhetsfeeden</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </>
  );
}
