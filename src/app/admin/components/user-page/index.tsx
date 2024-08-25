import Banner from "@/components/ui/banner";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Illustration from "@/components/ui/illustration";
import { UserIcon } from "lucide-react";
import UserList from "./user-list";
import { Suspense } from "react";
import Typography from "@/components/ui/typography";

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
        <Suspense fallback={<Typography variant="h1">Laster</Typography>}>
          <UserList />
        </Suspense>
      </CardContent>
    </>
  );
}
