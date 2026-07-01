import { useLocation } from "react-router";
import { Cart } from "./cart";
import { CategoryDropdown } from "./category-dropdown";
import { SearchInput } from "./search-input";
import { ModeToggle } from "../mode-toggle";

export function SearchProduct() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <div className="flex items-center flex-wrap gap-2">
      {isHomePage && (
        <>
          <CategoryDropdown />
          <SearchInput />
        </>
      )}
      <div className="flex items-center gap-2 mt-4 sm:mt-0 justify-end grow sm:grow-0">
        <ModeToggle />
        <Cart />
      </div>
    </div>
  );
}
