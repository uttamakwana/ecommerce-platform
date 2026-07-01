import { SearchIcon, X } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDebouncedCallback, useFilters } from "@/hooks";

export function SearchInput() {
  const { search, setFilters } = useFilters();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState(search ?? "");
  const [prevSearch, setPrevSearch] = useState(search ?? "");

  // Adjust-state-during-render: reflect *external* URL changes (e.g. "clear
  // filters") back into the box. Our own writes bump prevSearch first, so they
  // don't trigger a revert here.
  if ((search ?? "") !== prevSearch) {
    setPrevSearch(search ?? "");
    setInputValue(search ?? "");
  }

  const pushSearch = useDebouncedCallback((value: string) => {
    setPrevSearch(value);
    if (pathname !== "/") navigate("/");
    setFilters({ search: value });
  }, 400);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (!isShortcut) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleChange = (value: string) => {
    setInputValue(value);
    pushSearch(value);
  };

  return (
    <InputGroup className="w-full sm:max-w-xl">
      <InputGroupInput
        ref={inputRef}
        value={inputValue}
        placeholder="Search products, brands and more..."
        aria-label="Search products"
        onChange={(e) => handleChange(e.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon className="text-muted-foreground" />
      </InputGroupAddon>
      {inputValue ? (
        <InputGroupAddon align="inline-end">
          <button
            type="button"
            aria-label="Clear search"
            className="rounded-md p-0.5 text-muted-foreground hover:text-foreground"
            onClick={() => {
              handleChange("");
              inputRef.current?.focus();
            }}
          >
            <X className="size-4" />
          </button>
        </InputGroupAddon>
      ) : (
        <InputGroupAddon align="inline-end">
          <kbd className="pointer-events-none hidden select-none rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
            ⌘K
          </kbd>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
