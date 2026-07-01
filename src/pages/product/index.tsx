import { useNavigate, useParams } from "react-router";
import {
  Heart,
  Package,
  RotateCcw,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  Truck,
  Zap,
} from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { ErrorState } from "@/components/error-state";
import { ProductBreadcrumb } from "@/features/products/components";
import { ProductDetailsSkeleton } from "@/features/products/components";
import { ProductNotFound } from "@/features/products/components/product-no-found";
import { ImageGallery } from "@/features/products/components/image-gallery";
import { ProductReviews } from "@/features/products/components/product-reviews";
import { StarRating } from "@/features/products/components/star-rating";
import { CartItemQuantity } from "@/pages/cart/cart-item-quantity";
import { useGetProduct } from "@/features/products/hooks";
import { useCart, useCompare, useWishlist } from "@/contexts";
import { getDiscountedPrice } from "@/features/products/utils";
import { cn } from "@/lib";

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const isValidId = Number.isInteger(productId) && productId > 0;

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProduct(productId, { enabled: isValidId });

  const { getItem, isInCart, addItem, setQuantity, removeItem } = useCart();
  const wishlist = useWishlist();
  const compare = useCompare();
  const navigate = useNavigate();

  if (isLoading) return <ProductDetailsSkeleton />;

  if (isError) {
    return (
      <div className="p-4 sm:p-6">
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-4 sm:p-6">
        <ProductNotFound
          title="Product not found"
          description="This product may have been removed or the link is incorrect."
          actionLabel="Back to products"
        />
      </div>
    );
  }

  const discountedPrice = getDiscountedPrice(product);
  const hasDiscount = product.discountPercentage >= 1;
  const cartItem = getItem(product.id);
  const inCart = isInCart(product.id);
  const outOfStock = product.stock <= 0;
  const isWishlisted = wishlist.has(product.id);
  const isComparing = compare.has(product.id);

  // Add to the cart (if needed) and jump straight to checkout.
  const handleBuyNow = () => {
    if (!inCart) addItem(product);
    navigate("/checkout");
  };

  const highlights = [
    { icon: Truck, label: product.shippingInformation },
    { icon: ShieldCheck, label: product.warrantyInformation },
    { icon: RotateCcw, label: product.returnPolicy },
    {
      icon: Package,
      label: `Min. order: ${product.minimumOrderQuantity} unit${product.minimumOrderQuantity === 1 ? "" : "s"}`,
    },
  ];

  return (
    <div className="flex flex-col gap-10 px-4 py-6 sm:px-6">
      <ProductBreadcrumb title={product.title} category={product.category} />

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <ImageGallery
          key={product.id}
          images={product.images}
          fallback={product.thumbnail}
          alt={product.title}
        />

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {product.category}
            </Badge>
            {hasDiscount && (
              <Badge className="border-transparent bg-gradient-brand text-white">
                Save {product.discountPercentage.toFixed(0)}%
              </Badge>
            )}
          </div>

          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              {product.brand ?? "Generic"}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} starClassName="size-4.5" />
            <span className="text-sm font-medium">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold tracking-tight">
              ${discountedPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="pb-1 text-xl text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="leading-7 text-muted-foreground">
            {product.description}
          </p>

          <div className="flex items-center gap-2 text-sm">
            <span
              className={cn(
                "inline-block size-2 rounded-full",
                outOfStock ? "bg-destructive" : "bg-success",
              )}
            />
            <span className="font-medium">
              {outOfStock
                ? "Out of stock"
                : `${product.stock} in stock — ${product.availabilityStatus}`}
            </span>
          </div>

          <Button
            size="lg"
            className="w-full"
            disabled={outOfStock}
            onClick={handleBuyNow}
          >
            <Zap className="size-5" />
            Buy now
          </Button>

          <div className="flex flex-wrap items-center gap-3">
            {inCart && cartItem ? (
              <>
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
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={() => removeItem(product.id)}
                >
                  <Trash2 className="size-5" />
                  Remove
                </Button>
              </>
            ) : (
              <Button
                size="lg"
                className="flex-1 sm:flex-none"
                disabled={outOfStock}
                onClick={() => addItem(product)}
              >
                <ShoppingCart className="size-5" />
                Add to cart
              </Button>
            )}

            <Button
              size="lg"
              variant="outline"
              aria-pressed={isWishlisted}
              onClick={() => wishlist.toggle(product)}
            >
              <Heart
                className={cn(
                  "size-5",
                  isWishlisted && "fill-rose-500 text-rose-500",
                )}
              />
              <span className="hidden sm:inline">
                {isWishlisted ? "Saved" : "Save"}
              </span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              aria-pressed={isComparing}
              onClick={() => compare.toggle(product)}
            >
              <Scale
                className={cn("size-5", isComparing && "text-primary")}
              />
              <span className="hidden sm:inline">Compare</span>
            </Button>
          </div>

          <ul className="mt-2 grid gap-3 rounded-2xl border bg-muted/30 p-4 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                <Icon className="size-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{label}</span>
              </li>
            ))}
          </ul>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t pt-10">
        <ProductReviews reviews={product.reviews} rating={product.rating} />
      </div>
    </div>
  );
}
