import dynamic from "next/dynamic";

const LiquorSearchPageClient = dynamic(() => import("./SearchPageClient"), {
  ssr: false,
  loading: () => <div />,
});

export default function LiquorSearchPage() {
  return <LiquorSearchPageClient />;
}
