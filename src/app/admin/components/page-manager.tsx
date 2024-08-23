import { AdminSearchParams, Pages } from "../page";
import BookingPage from "./booking-page";
import NewsPage from "./news-page";

interface PageManagerProps {
  currentPage?: Pages;
  searchParams?: AdminSearchParams;
}

// const PageMap: {
//   [PAGE in Pages]: React.ReactNode;
// }[] = [
//   {
//     brukere: <NewsPage />,
//   },
// ];

const PageMap: {
  [T in Pages]?: React.FC<{ searchParams?: AdminSearchParams }>;
} = {
  nyheter: NewsPage,
  utleie: BookingPage,
  // interessegrupper: undefined,
  // brukere: undefined,
};

export default function PageManager({ searchParams }: PageManagerProps) {
  return (
    <>
      {PageMap[searchParams?.page as Pages]?.({
        searchParams,
      })}
    </>
  );
}
