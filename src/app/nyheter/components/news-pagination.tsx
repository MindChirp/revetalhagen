"use client";

import Conditional from "@/components/ui/conditional";
import NewsCard from "@/components/ui/news-card";
import { SimpleNewsDto } from "@/lib/api";
import { IFetch } from "@/lib/IFetch";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import AbstractedPagination from "./abstracted-pagination";
import { atom, useAtomValue } from "jotai";
import { newsFilterAtom } from "./filters";
import useDebounce from "@/hooks/debounce";
import Banner from "@/components/ui/banner";
import Illustration from "@/components/ui/illustration";
import Loader from "@/components/ui/loader";

interface NewsPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData: SimpleNewsDto[];
  canEdit?: boolean;
}
export default function NewsPagination({
  initialData,
  className,
  canEdit = false,
  ...props
}: NewsPaginationProps) {
  const [page, setPage] = useState(0);
  const filter = useAtomValue(newsFilterAtom);
  const debounce = useDebounce(filter, 500);

  const { data, error, isLoading } = useSWR<SimpleNewsDto[]>(
    ["/api/News", debounce, page],
    () =>
      IFetch<SimpleNewsDto[]>({
        url: `/api/News`,
        config: {
          queryParams: {
            Title: debounce,
            // PageNumber: page,
          },
          method: "GET",
        },
      }).then((res) => {
        if (Array.isArray(res)) return res;
        throw res;
      }),
    {
      fallbackData: initialData,
      keepPreviousData: true,
    }
  );

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 2xl:grid-cols-2 gap-5 w-full",
          className
        )}
        {...props}
      >
        <Conditional render={isLoading}>
          <Loader className="w-full" />
        </Conditional>
        {(data ?? []).map((item) => (
          <NewsCard
            key={item.id}
            title={item.title ?? ""}
            description={item.shortContent ?? ""}
            author={item.publishedBy?.fullName ?? ""}
            authorImage={item.publishedBy?.avatarUri ?? ""}
            date={item.lastEdited ?? ""}
            articleId={item.id?.toString()}
            canEdit={canEdit}
          />
        ))}
        <Conditional render={(!data || !data.length) && !isLoading}>
          <Banner className="w-full">
            <Illustration src="empty-cart.svg" />
            Ingen artikler funnet
          </Banner>
        </Conditional>
      </div>
      {/* <Conditional render={!error}>
        <AbstractedPagination maxPagesVisible={10} currentPage={0} />
      </Conditional> */}
    </>
  );
}
