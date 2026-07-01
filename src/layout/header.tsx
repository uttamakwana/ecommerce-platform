import { Link } from "react-router";
import { ShoppingBag } from "lucide-react";
import { SearchInput } from "@/components/search/search-input";
import { ModeToggle } from "@/components/mode-toggle";
import { CartButton } from "@/components/search/cart";
import { WishlistButton } from "@/components/search/wishlist-button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold"
          aria-label="Aurora home"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-sm">
            <ShoppingBag className="size-5" />
          </span>
          <span className="text-lg tracking-tight">
            Aurora<span className="text-muted-foreground font-normal">Shop</span>
          </span>
        </Link>

        <div className="order-last w-full sm:order-0 sm:w-auto sm:flex-1 sm:px-4">
          <SearchInput />
        </div>

        <nav className="ml-auto flex items-center gap-1.5 sm:ml-0">
          <WishlistButton />
          <CartButton />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
