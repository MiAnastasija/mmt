interface SearchInputProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }
  
  const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, setSearchQuery }) => {
    return (
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    );
  };
  
  export default SearchInput;
  