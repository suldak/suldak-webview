"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LiquorCategoryContent from "components/liquor/category/LiquorCategoryContent";

function CategoryParamsHandler({
  children,
}: {
  children: (params: URLSearchParams) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  return <>{children(new URLSearchParams(searchParams.toString()))}</>;
}


function LiquorCategoryResultPage() {
  return (
    <Suspense fallback>
      <CategoryParamsHandler>
        {(searchParams) => (
          <LiquorCategoryContent searchParams={searchParams} />
        )}
      </CategoryParamsHandler>
    </Suspense>
  );
}

export default LiquorCategoryResultPage;
