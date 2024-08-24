"use client";

import { motion, Segment, useAnimate } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Conditional from "@/components/ui/conditional";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  DetailedBookableItemCategoryDto,
  DetailedBookableItemDto,
  SimpleBookableItemDto,
} from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ArrowRightIcon, PencilIcon, SaveIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import EditDialog from "./edit-dialog";
import { formSchema } from "@/app/admin/components/booking-page/item-form";
import { z } from "zod";
import { time } from "console";
import { useEffect } from "react";

type BookableItemCardProps = {
  type?: "default" | "admin";
  item: SimpleBookableItemDto;
} & (AdminProps | DefaultProps);

type AdminProps = {
  type: "admin";
  categories: DetailedBookableItemCategoryDto[];
};

type DefaultProps = {
  type?: "default";
};

export default function BookableItemCard({
  item,
  type = "default",
  ...props
}: BookableItemCardProps) {
  const { toast } = useToast();
  const [scope, animate] = useAnimate();

  const editItem = (values: z.infer<typeof formSchema>) => {
    return IFetch<DetailedBookableItemDto>({
      url: `/api/BookableItem/${item.id}`,
      config: {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        revalidateTags: ["bookableitems", item.id + ""],
      },
    })
      .catch(() => {
        toast({
          title: "Noe gikk galt",
          description: "Gjenstanden ble ikke oppdatert",
          variant: "destructive",
        });
      })
      .then(async () => {
        toast({
          title: "Gjenstand oppdatert",
          description: "Gjenstanden ble oppdatert",
        });

        const targetScale = 0.8;
        await animate(
          scope.current,
          { scale: [1, targetScale] },
          { duration: 0.2, type: "spring" }
        );
        await animate(
          scope.current,
          { scale: [targetScale, 1] },
          { duration: 0.2, type: "spring" }
        );
      });
  };

  useEffect(() => {
    animate(
      scope.current,
      { scale: [0.5, 1], opacity: [0, 1] },
      { duration: 0.2, type: "spring" }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteItem = async () => {
    animate(
      scope.current,
      { scale: 0, opacity: 0 },
      { duration: 0.5, type: "spring" }
    );

    IFetch<DetailedBookableItemDto>({
      url: `/api/BookableItem/${item.id}`,
      config: {
        method: "DELETE",
        revalidateTags: ["bookableitems", item.id + ""],
        next: {
          tags: ["bookableitems", item.id + ""],
        },
      },
    })
      .then(() => {
        toast({
          title: "Gjenstanden ble slettet",
        });
      })
      .catch(() => {
        toast({
          title: "Noe gikk galt",
          description: "Gjenstanden ble ikke slettet",
          variant: "destructive",
        });
      });
  };

  return (
    <Card
      className="bg-background shadow-sm border-input border flex flex-col"
      ref={scope}
    >
      <CardHeader className="flex-1">
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
        <Badge className="w-fit" variant={"secondary"}>
          {item.category?.title}
        </Badge>
      </CardHeader>
      <CardContent>
        <Conditional render={type === "default"}>
          {" "}
          <Link href={`/utleie/kalender/${item.id}`}>
            <Button className="md:w-fit w-full flex gap-2.5 items-center group">
              Gå til kalender
              <ArrowRightIcon
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </Conditional>
        <Conditional render={type === "admin"}>
          <div className="w-full flex gap-2.5">
            <DeleteDialog onDelete={deleteItem}>
              <Button variant={"destructive"} className="flex gap-2.5 w-fit">
                <TrashIcon size={16} />
              </Button>
            </DeleteDialog>
            <EditDialog
              item={item}
              categories={"categories" in props ? props.categories : []}
              onSubmit={editItem}
            >
              <Button className="w-full flex gap-2.5">
                <PencilIcon size={16} /> Rediger
              </Button>
            </EditDialog>
          </div>
        </Conditional>
      </CardContent>
    </Card>
  );
}

const DeleteDialog = ({
  children,
  onDelete,
}: {
  children: React.ReactNode;
  onDelete: () => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Er du sikker på at du vil slette denne gjenstanden?
          </DialogTitle>
          <DialogDescription>
            Du kan ikke angre denne handlingen.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex md:flex-row flex-col gap-2.5">
          <DialogClose asChild>
            <Button variant={"secondary"}>Avbryt</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="flex gap-2.5"
              onClick={onDelete}
            >
              <TrashIcon size={16} /> Slett
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
