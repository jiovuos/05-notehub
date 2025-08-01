import css from './SearchBox.module.css';

export interface SearchBoxProps {
  onSearch: (query: string) => void;
}

function SearchBox({ onSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={e => onSearch(e.target.value)}
    />
  );
}

export default SearchBox;
