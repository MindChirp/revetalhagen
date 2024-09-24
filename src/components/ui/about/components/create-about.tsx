"use client";

import { PlusIcon } from "lucide-react";
import { Card } from "../../card";
import { Button } from "../../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../dialog";

export default function CreateAbout() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2.5 items-center">
          <PlusIcon size={16} /> Legg til avsnitt
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Legg til avsnitt</DialogTitle>
          <DialogDescription>
            Legg til et nytt avsnitt i området
          </DialogDescription>
        </DialogHeader>
        assdadada Dette skal være en form wowowoowwo
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Avbryt</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>Lagre</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
