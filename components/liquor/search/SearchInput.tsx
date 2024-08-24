"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ClearIcon from "assets/icons/ico-clear-gray.svg";
import SearchIcon from "assets/icons/ico-search-gray.svg";

function SearchInput() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue) {
      router.push(`/liquor/search/result?q=${searchValue}`);
    }
  };

  return (
    <div className="relative w-full pt-1">
      <div className="relative flex w-full items-center">
        <div className="absolute left-4 flex items-center">
          <SearchIcon />
        </div>
        <input
          className="search-input w-full rounded-full border-none bg-suldak-gray-200 py-2 pl-12 outline-none focus:ring-0"
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="원하는 술을 바로 검색해보세요!"
        />
        {searchValue && (
          <div
            className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
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
