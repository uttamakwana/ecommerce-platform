import { Heart } from "lucide-react";
import { Link } from "react-router";
import { Badge, Button } from "../ui";
import { useWishlist } from "@/contexts";

export function WishlistButton() {
  const { count } = useWishlist();
  const hasItems = count > 0;

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={`Wishlist, ${count} item${count === 1 ? "" : "s"}`}
    >
      <Link to="/wishlist">
        <Heart className="size-5" />
        {hasItems && (
          <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full p-0 text-[11px] tabular-nums">
            {count > 99 ? "99+" : count}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
