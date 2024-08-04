import Conditional from "@/components/ui/conditional";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AbstractedPaginationProps {
  pages?: number;
  currentPage?: number;
  displayNext?: boolean;
  displayPrevious?: boolean;
  paramPrefix?: string;
  maxPagesVisible?: number;
}

export default function AbstractedPagination({
  pages = 3,
  currentPage = 1,
  displayNext = true,
  displayPrevious = true,
  paramPrefix = "page",
  maxPagesVisible = 4,
}: AbstractedPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <Conditional render={displayPrevious && currentPage > 1}>
          <PaginationItem>
            <PaginationPrevious href={`?${paramPrefix}=${currentPage - 1}`} />
          </PaginationItem>
        </Conditional>
        {new Array(pages).fill(null).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={`?${paramPrefix}=${index + 1}`}
              isActive={currentPage == index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <Conditional render={displayNext && currentPage < pages}>
          <PaginationItem>
            <PaginationNext href={`?${paramPrefix}=${currentPage + 1}`} />
          </PaginationItem>
        </Conditional>
      </PaginationContent>
    </Pagination>
  );
}
