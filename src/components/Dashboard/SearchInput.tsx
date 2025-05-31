'use client';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

interface SearchInputProps {
   onSearch?: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
   return (
      <div className="flex items-center p-2 w-72 max-w-md">
         <MagnifyingGlassIcon size={24} className="primary-color mr-2" />
         <input
            type="text"
            placeholder="Pesquisar por eventos"
            className="search-input outline-none w-full"
            onChange={(e) => onSearch?.(e.target.value)}
         />
      </div>
   );
}
