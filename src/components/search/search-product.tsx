import { Cart } from "./cart";
import { CategoryDropdown } from "./category-dropdown";
import { SearchInput } from "./search-input";

export function SearchProduct() {
  return (
    <div className="flex items-center gap-2">
      <CategoryDropdown />
      <SearchInput />
      <Cart />
    </div>
  );
}
