import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearchChange: (value: string) => void;
}

export default function SearchBox({ onSearchChange }: SearchBoxProps) {
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <input
      onChange={handleChangeSearch}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
}
