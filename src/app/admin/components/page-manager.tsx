import { Pages } from "../page";
import NewsPage from "./news-page";

interface PageManagerProps {
  currentPage?: Pages;
}

// const PageMap: {
//   [PAGE in Pages]: React.ReactNode;
// }[] = [
//   {
//     brukere: <NewsPage />,
//   },
// ];

const PageMap: Record<Pages, React.ReactNode> = {
  nyheter: <NewsPage />,
  interessegrupper: <></>,
  brukere: <></>,
};

export default function PageManager({ currentPage }: PageManagerProps) {
  return <>{PageMap[currentPage as Pages]}</>;
}
