import { Badge, Button } from "@/components/ui";
import { ProductBreadcrumb, ProductDetailsSkeleton } from "@/features/products/components";
import { ProductNotFound } from "@/features/products/components/product-no-found";
import { useGetProduct } from "@/features/products/hooks";
import { ShoppingCart, Star } from "lucide-react";
import { useParams } from "react-router";


export function Product() {
  const { id } = useParams<{ id: string; }>();
  const productId = Number(id);

  const isValidId = Number.isInteger(productId) && productId > 0;

  const { data: product, isLoading } = useGetProduct(productId, { enabled: isValidId });

  if (isLoading) {
    return <ProductDetailsSkeleton />
  }

  if (!product) {
    return <div className="p-4 pt-0">
      <ProductNotFound />
    </div>
  }

  const discountedPrice =
    product.price -
    (product.price * product.discountPercentage) / 100;

  return (
    <div className="p-4 pt-0 flex flex-col gap-4">
      <ProductBreadcrumb title={product.category} />

      <div className="grid gap-10 lg:grid-cols-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="aspect-square w-full rounded-xl border object-cover"
        />

        <div className="space-y-6">
          <Badge>{product.category}</Badge>

          <div>
            <p className="text-muted-foreground">
              {product.brand}
            </p>

            <h1 className="text-4xl font-bold">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Star className="size-5 fill-yellow-400 text-yellow-400" />

            <span>{product.rating.toFixed(1)}</span>

            <span className="text-muted-foreground">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <p className="text-muted-foreground leading-7">
            {product.description}
          </p>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-bold">
              ${discountedPrice.toFixed(2)}
            </span>

            <span className="text-xl line-through text-muted-foreground">
              ${product.price}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <Badge variant={"outline"}>
              {product.stock} in stock
            </Badge>

            <Button size="lg">
              <ShoppingCart className="mr-2 size-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}