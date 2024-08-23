import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SimpleBookableItemDto } from "@/lib/api";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

interface BookableItemCardProps {
  item: SimpleBookableItemDto;
}
export default function BookableItemCard({ item }: BookableItemCardProps) {
  return (
    <Card className="bg-background shadow-sm border-input border">
      <CardHeader>
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
        <Badge className="w-fit" variant={"secondary"}>
          {item.category?.title}
        </Badge>
      </CardHeader>
      <CardContent>
        <Link href={`/utleie/kalender/${item.id}`}>
          <Button className="md:w-fit w-full flex gap-2.5 items-center group">
            Gå til kalender
            <ArrowRightIcon
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
