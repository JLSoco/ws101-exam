interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value)
        }
        placeholder="Search Pokémon..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;