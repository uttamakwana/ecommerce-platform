import { CategoryDropdown } from "./category-dropdown";
import { SearchInput } from "./search-input";

export function SearchProduct() {
  return (
    <div className="flex items-center gap-2">
      <CategoryDropdown />
      <SearchInput />
    </div>
  );
}
