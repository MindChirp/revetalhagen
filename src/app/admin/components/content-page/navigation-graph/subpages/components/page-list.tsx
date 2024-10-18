"use client";

import Banner from "@/components/ui/banner";
import Illustration from "@/components/ui/illustration";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { IFetch, RequestResponse } from "@/lib/IFetch";
import { HashLoader } from "react-spinners";
import useSWR from "swr";

const pageFetcher = ({ parentId }: CurrentPage) =>
  IFetch<CurrentPage[]>({
    url: `/api/pages/${parentId}`,
    config: {
      method: "GET",
    },
  }).then((res) => {
    if (Array.isArray(res)) return res;

    throw res;
  });

type CurrentPage = {
  parentId: string;
};

interface PageListProps {
  parentId: string;
}

export default function PageList({ parentId }: PageListProps) {
  const { data, isLoading, error } = useSWR<
    CurrentPage[],
    RequestResponse,
    CurrentPage
  >(
    {
      parentId,
    },
    pageFetcher
  );
  return (
    <>
      <div className="w-full">
        {isLoading && (
          <div className="flex flex-col gap-2.5">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
          </div>
        )}
        {error && !isLoading && (
          <Banner className="w-full">
            <Illustration size="small" src="technical-error.svg" />
            <Typography>Kunne ikke laste inn undersidene</Typography>
          </Banner>
        )}
      </div>
      <div className="flex flex-col">
        {data?.map((page) => (
          <div key={page.parentId} className="flex flex-col">
            <h1>{page.parentId}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
