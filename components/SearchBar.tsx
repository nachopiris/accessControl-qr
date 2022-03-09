import { SearchIcon } from "@heroicons/react/solid";

interface Props {
  searchInput: string;
  setSearchInput: Function;
}

export default function SearchBar({ searchInput, setSearchInput }: Props) {
  return (
    <div className="flex rounded-full border-grey-light border mb-3">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full rounded ml-4 focus:outline-none"
        placeholder="Nombre"
      />
      <span className="w-auto flex justify-end items-center p-2">
        <SearchIcon className="h-5 w-5 text-gray-500" />
      </span>
    </div>
  );
}
