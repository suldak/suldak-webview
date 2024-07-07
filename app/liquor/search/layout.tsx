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
      {children}
      {filter}
    </>
  );
}

export default SearchLayout;
