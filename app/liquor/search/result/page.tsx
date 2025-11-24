import dynamic from "next/dynamic";

const LiquorSearchResultPageClient = dynamic(
  () => import("./SearchResultPageClient"),
  { ssr: false, loading: () => <div /> },
);

export default function LiquorSearchResultPage() {
  return <LiquorSearchResultPageClient />;
}
