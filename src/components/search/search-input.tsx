import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/hooks";
import { useProductFilter } from "@/contexts/product/useProductFilters";

export function SearchInput() {
  const { handleChangeSearchParams } = useProductFilter();

  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebouncedValue(inputValue);

  useEffect(() => {
    handleChangeSearchParams({ search: debouncedInputValue });
  }, [handleChangeSearchParams, debouncedInputValue]);

  return (
    <InputGroup className="grow sm:grow-0 w-full sm:w-auto sm:max-w-xl">
      <InputGroupInput
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
