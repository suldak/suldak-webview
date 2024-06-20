'use client';
import { useState } from 'react';
import ClearIcon from 'assets/icons/ico-clear-gray.svg';
import SearchIcon from 'assets/icons/ico-search-gray.svg';

function SearchInput() {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue) {
      window.location.href = `/liquor/search/result?q=${searchValue}`;
    }
  };

  return (
    <div className="relative w-full pt-1">
      <div className="relative flex items-center w-full">
        <div className="absolute left-4 flex items-center">
          <SearchIcon />
        </div>
        <input
          className="search-input pl-12 bg-suldak-gray-200 w-full py-2 border-none outline-none focus:ring-0 rounded-full"
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
    </div>
  );
}

export default SearchInput;
