import { useLocation } from "react-router";
import { Cart } from "./cart";
import { CategoryDropdown } from "./category-dropdown";
import { SearchInput } from "./search-input";

export function SearchProduct() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <div className="flex items-center gap-2">
      {isHomePage && <><CategoryDropdown />
        <SearchInput /></>}
      <Cart />
    </div>
  );
}
