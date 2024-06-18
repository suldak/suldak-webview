'use client';
import SearchIcon from 'assets/icons/ico-search-gray.svg';
import ClearIcon from 'assets/icons/ico-clear-gray.svg';
import { useState } from 'react';

function SearchInput() {
  const [searchValue, setSearchValue] = useState('');

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <div className="relative w-full pt-1">
      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2" />
      <input
        className="search-input pl-10 bg-suldak-gray-200 w-full py-2 border-none outline-none focus:ring-0 rounded-full"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="원하는 술을 바로 검색해보세요!"
      />
      {searchValue && (
        <div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={handleClear}
        >
          <ClearIcon />
        </div>
      )}
    </div>
  );
}

export default SearchInput;
