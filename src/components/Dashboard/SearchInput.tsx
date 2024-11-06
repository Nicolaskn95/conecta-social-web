"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";

function SearchInput() {
  return (
    <div className="flex items-center p-2 w-72 max-w-md">
      <MagnifyingGlass size={24} className="primary-color mr-2" />
      <input
        type="text"
        placeholder="Pesquisar por eventos"
        className="search-input outline-none w-full"
      />
    </div>
  );
}

export default SearchInput;
