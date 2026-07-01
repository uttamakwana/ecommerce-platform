import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { ProductCard } from "@/features/products/components";
import { ProductNotFound } from "@/features/products/components/product-no-found";
import { useWishlist } from "@/contexts";

export default function Wishlist() {
  const { items, count, clear } = useWishlist();

  if (count === 0) {
    return (
      <div className="px-4 py-6 sm:px-6">
        <ProductNotFound
          title="Your wishlist is empty"
          description="Tap the heart on any product to save it here for later."
          actionLabel="Discover products"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Heart className="size-6 fill-rose-500 text-rose-500" />
            Wishlist
          </h1>
          <p className="text-sm text-muted-foreground">
            {count} saved item{count === 1 ? "" : "s"}
          </p>
        </div>
        <Button variant="outline" onClick={clear}>
          <Trash2 className="size-4" />
          Clear all
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
