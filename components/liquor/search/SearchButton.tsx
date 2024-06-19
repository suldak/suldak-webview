import Link from 'next/link';
import SearchIcon from 'assets/icons/ico-search-gray.svg';
function SearchButton({ searchValue }: any) {
  return (
    <>
      {searchValue ? (
        <Link
          href={{
            pathname: '/liquor/search/result',
            query: { q: searchValue },
          }}
        >
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer" />
        </Link>
      ) : (
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer" />
      )}
    </>
  );
}
export default SearchButton;
