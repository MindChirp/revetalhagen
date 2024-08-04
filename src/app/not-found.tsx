import ErrorPage from "@/components/layout/error-page";

export default function Custom404() {
  return <ErrorPage code={404} label="ikke funnet" />;
}
