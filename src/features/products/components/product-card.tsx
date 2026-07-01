import { memo } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, Scale, ShoppingCart, Star, Zap } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib";
import { useCart, useCompare, useWishlist } from "@/contexts";
import type { IProduct } from "../types";
import { getDiscountedPrice } from "../utils";
import { CartItemQuantity } from "@/pages/cart/cart-item-quantity";

interface IProductCardProps {
  product: IProduct;
}

function ProductCardComponent({ product }: IProductCardProps) {
  const navigate = useNavigate();
  const { isInCart, getItem, addItem, setQuantity } = useCart();
  const wishlist = useWishlist();
  const compare = useCompare();

  const discountedPrice = getDiscountedPrice(product);
  const hasDiscount = product.discountPercentage >= 1;
  const inCart = isInCart(product.id);
  const cartItem = getItem(product.id);
  const outOfStock = product.stock <= 0;
  const isWishlisted = wishlist.has(product.id);
  const isComparing = compare.has(product.id);

  // Add to the cart (if not already there) and jump straight to checkout.
  const handleBuyNow = () => {
    if (!inCart) addItem(product);
    navigate("/checkout");
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative overflow-hidden bg-muted/40">
        <Link
          to={`/products/${product.id}`}
          aria-label={`View ${product.title}`}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            {hasDiscount && (
              <Badge className="pointer-events-auto border-transparent bg-gradient-brand text-white shadow-sm">
                -{product.discountPercentage.toFixed(0)}%
              </Badge>
            )}
            {outOfStock && (
              <Badge variant="secondary" className="pointer-events-auto">
                Sold out
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
              aria-pressed={isWishlisted}
              onClick={() => wishlist.toggle(product)}
              className="pointer-events-auto grid size-9 place-items-center rounded-full border bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-rose-500"
            >
              <Heart
                className={cn(
                  "size-4.5 transition-colors",
                  isWishlisted && "fill-rose-500 text-rose-500",
                )}
              />
            </button>
            <button
              type="button"
              aria-label={isComparing ? "Remove from compare" : "Add to compare"}
              aria-pressed={isComparing}
              onClick={() => compare.toggle(product)}
              className={cn(
                "pointer-events-auto grid size-9 place-items-center rounded-full border bg-background/80 text-muted-foreground backdrop-blur transition-colors hover:text-primary",
                isComparing && "border-primary/40 text-primary",
              )}
            >
              <Scale className="size-4.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.brand ?? product.category}
          </span>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)}
          </span>
        </div>

        <Link to={`/products/${product.id}`} className="min-h-10">
          <h3 className="line-clamp-2 font-semibold leading-tight transition-colors group-hover:text-primary">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight">
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <span
            className={cn(
              "text-xs font-medium",
              product.stock > 10
                ? "text-success"
                : outOfStock
                  ? "text-destructive"
                  : "text-warning",
            )}
          >
            {outOfStock
              ? "Out of stock"
              : product.stock > 10
                ? "In stock"
                : `Only ${product.stock} left`}
          </span>
        </div>

        {inCart && cartItem ? (
          <div className="flex items-center gap-2">
            <CartItemQuantity
              quantity={cartItem.quantity}
              max={product.stock}
              onIncrease={() =>
                setQuantity(product.id, cartItem.quantity + 1)
              }
              onDecrease={() =>
                setQuantity(product.id, cartItem.quantity - 1)
              }
            />
            <Button className="flex-1" onClick={handleBuyNow}>
              <Zap className="size-4" />
              Buy now
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              className="flex-1"
              disabled={outOfStock}
              onClick={handleBuyNow}
            >
              <Zap className="size-4" />
              Buy now
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label={`Add ${product.title} to cart`}
              disabled={outOfStock}
              onClick={() => addItem(product)}
            >
              <ShoppingCart className="size-4" />
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);
