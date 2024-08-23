import Banner from "@/components/ui/banner";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Illustration from "@/components/ui/illustration";
import { UserIcon } from "lucide-react";

export default function UserPage() {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex gap-2.5">
          <UserIcon />
          Brukere
        </CardTitle>
        <CardDescription>
          Administrer brukere og deres rettigheter
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
