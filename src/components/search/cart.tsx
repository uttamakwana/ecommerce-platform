import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { Badge, Button } from "../ui";
import { useCart } from "@/contexts";

export function CartButton() {
  const { totalItems } = useCart();
  const hasItems = totalItems > 0;

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
    >
      <Link to="/cart">
        <ShoppingCart className="size-5" />
        {hasItems && (
          <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full p-0 text-[11px] tabular-nums">
            {totalItems > 99 ? "99+" : totalItems}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
