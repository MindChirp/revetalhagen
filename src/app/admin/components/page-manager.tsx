import { AdminSearchParams, Pages } from "../page";
import BookingPage from "./booking-page/booking-page";
import NewsPage from "./news-page";
import SponsorPage from "./sponsor-page";
import UserPage from "./user-page";

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
  sponsorer: SponsorPage,
  brukere: UserPage,
};

export default function PageManager({ searchParams }: PageManagerProps) {
  return (
    <>
      {PageMap[(searchParams?.page as Pages) ?? "nyheter"]?.({
        searchParams,
      })}
    </>
  );
}
