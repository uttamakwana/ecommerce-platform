import { SearchProduct } from "@/components";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

export function Header() {
  return (
    <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-200">
      <Link to="/">
        <h1 className="font-bold text-xl flex items-center gap-2">
          <ShoppingCart />
          E-Commerce Platform
        </h1>
      </Link>
      <SearchProduct />
    </div>
  );
}
