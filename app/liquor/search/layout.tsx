import { FilterProvider } from 'app/context/FilterContext';
import { ReactNode } from 'react';
function SearchLayout({
  children,
  filter,
}: {
  children: ReactNode;
  filter: ReactNode;
}) {
  return (
    <>
      <FilterProvider>
        {children}
        {filter}
      </FilterProvider>
    </>
  );
}

export default SearchLayout;
