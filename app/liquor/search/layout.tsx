"use client";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

interface SearchParamsWrapperProps {
  children: ({ isFilterOpen }: { isFilterOpen: boolean }) => React.ReactNode;
}

function SearchParamsWrapper({ children }: SearchParamsWrapperProps) {
  const searchParams = useSearchParams();
  const isFilterOpen = searchParams.get("filter") === "open";

  return children({ isFilterOpen });
}

interface LayoutProps {
  children: React.ReactNode;
  filter: React.ReactNode;
}

export default function Layout({ children, filter }: LayoutProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper>
        {({ isFilterOpen }: { isFilterOpen: boolean }) => (
          <>
            {children}
            {isFilterOpen && filter}
          </>
        )}
      </SearchParamsWrapper>
    </Suspense>
  );
}
