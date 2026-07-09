import { Search } from "lucide-react";
import { type KeyboardEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section aria-label="Search news" className="border-b bg-muted/20">
      <form
        className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center md:px-6"
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
      >
        <Input
          type="search"
          placeholder="Search news..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search news"
          className="h-10 flex-1"
        />
        <Button type="submit" className="h-10 shrink-0 sm:min-w-28">
          <Search aria-hidden="true" />
          Search
        </Button>
      </form>
    </section>
  );
}
