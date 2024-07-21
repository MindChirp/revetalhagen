"use client";
import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
type APIResponse = {
  image: string;
  link: string;
};

export default function Error() {
  const [animalURL, setAnimalURL] = useState<string | null>(null);

  useEffect(() => {
    getRandomFoxUrl()
      .then((res) => res.json())
      .then((data) => {
        setAnimalURL((data as APIResponse).image);
      });
  }, []);

  return (
    <PageWrapper innerClassName="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Noe gikk galt!</CardTitle>
          <CardDescription>
            Vi jobber på spreng for å fikse det!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {animalURL && (
            <Image
              src={animalURL}
              objectFit="cover"
              alt={"Dyr"}
              className="animate-bounce mx-auto fade-in-0 delay-1000 rounded-3xl shadow-lg"
              width={200}
              height={200}
            />
          )}
        </CardContent>
      </Card>
    </PageWrapper>
  );
}

const getRandomFoxUrl = () => {
  return fetch("https://randomfox.ca/floof/?ref=apilist.fun");
};
