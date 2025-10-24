import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = 'Buscar...',
  value = '',
  onChange,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2  bg-neutral-900 rounded-lg focus:outline-none  "
        aria-label="Campo de búsqueda"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
};

export default SearchInput;
