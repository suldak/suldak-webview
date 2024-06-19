'use client';
import { useState } from 'react';
import ClearIcon from 'assets/icons/ico-clear-gray.svg';
import Link from 'next/link';
import SearchButton from './SearchButton';

function SearchInput() {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <div className="relative w-full pt-1">
      <SearchButton searchValue = {searchValue}/>
      <input
        className="search-input pl-10 bg-suldak-gray-200 w-full py-2 border-none outline-none focus:ring-0 rounded-full"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
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
