import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui";
import { useEffect, useRef, useState } from "react";
import { useDebouncedValue } from "@/hooks";
import { useProductFilter } from "@/contexts/product/useProductFilters";

export function SearchInput() {
  const { handleChangeSearchParams } = useProductFilter();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebouncedValue(inputValue);

  useEffect(() => {
    handleChangeSearchParams({ search: debouncedInputValue });
  }, [handleChangeSearchParams, debouncedInputValue]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (!isShortcut) return;

      event.preventDefault();
      inputRef.current?.focus();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <InputGroup className="grow sm:grow-0 w-full sm:w-auto sm:max-w-xl">
      <InputGroupInput
        ref={inputRef}
        value={inputValue}
        placeholder="Search a product..."
        onChange={(e) => setInputValue(e.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <kbd>⌘K</kbd>
      </InputGroupAddon>
    </InputGroup>
  );
}
