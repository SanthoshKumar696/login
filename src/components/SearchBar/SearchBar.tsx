import React from "react";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by email..."
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
