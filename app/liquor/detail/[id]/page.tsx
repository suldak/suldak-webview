import LiquorDetail from "components/liquor/detail/LiquorDetail";
import { fetchLiquorDetail } from "apis/liquor/useGetLiquorDetail";
import { notFound } from "next/navigation";

export const revalidate = 3600; // 1시간마다 재검증

interface Props {
  params: {
    id: string;
  };
}

export default async function LiquorDetailPage({ params }: Props) {
  console.log("[Page] 🎯 Rendering detail page for ID:", params.id);

  if (!params.id || isNaN(parseInt(params.id))) {
    console.error("[Page] ❌ Invalid ID parameter:", params.id);
    notFound();
  }

  try {
    const response = await fetchLiquorDetail(parseInt(params.id));
    console.log("[Page] ✅ Page rendered successfully");

    if (!response || !response.data) {
      console.error("[Page] ❌ No data in response for ID:", params.id);
      notFound();
    }

    return (
      <div>
        <LiquorDetail liquorData={response.data} />
      </div>
    );
  } catch (error) {
    console.error("[Page] 🚨 Error in page render:", error);
    throw error;
  }
}
