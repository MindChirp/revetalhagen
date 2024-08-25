import Banner from "@/components/ui/banner";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Illustration from "@/components/ui/illustration";
import { HandCoinsIcon } from "lucide-react";

export default function SponsorPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex gap-2.5 items-center">
          <HandCoinsIcon /> Sponsorer
        </CardTitle>
        <CardDescription>
          Administrer sponsorene som skal vises på nettsiden
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Banner>
          <Illustration src="construction.svg" /> Under konstruksjon
        </Banner>
      </CardContent>
    </>
  );
}
