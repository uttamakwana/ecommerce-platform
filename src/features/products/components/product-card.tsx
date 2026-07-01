import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui";
import type { IProduct } from "../types";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { useProductFilter } from "@/contexts/product/useProductFilters";
import { getDiscountedPrice } from "../utils";

interface IProductCardProps {
  product: IProduct;
  onAddToCart?: (product: IProduct) => void;
}

export function ProductCard({
  product
}: IProductCardProps) {
  const { cartItems, handleAddToCart, handleRemoveFromCart } = useProductFilter();
  const navigate = useNavigate();
  const discountedPrice = getDiscountedPrice(product);
  const hasInCart = cartItems.findIndex((item) => item.id === product.id) !== -1;

  return (
    <Card className="group overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-xl">
      <CardHeader className="relative p-0">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-101 cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`)}
        />

        <Badge className="absolute left-3 top-3 capitalize">
          {product.category}
        </Badge>

        <Badge variant="destructive" className="absolute right-3 top-3">
          {product.discountPercentage.toFixed(0)}% OFF
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{product.brand}</p>

          <h3 className="line-clamp-1 text-lg font-semibold">
            {product.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-yellow-400 text-yellow-400" />

            <span className="text-sm font-medium">
              {product.rating.toFixed(1)}
            </span>

            <span className="text-sm text-muted-foreground">
              ({product.reviews.length})
            </span>
          </div>

          <Badge variant={product.stock > 10 ? "default" : "secondary"}>
            {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
          </Badge>
        </div>

        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold">
            ${discountedPrice.toFixed(2)}
          </span>

          <span className="text-sm text-muted-foreground line-through">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3 p-5 pt-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          <Eye className="size-4" />
          Details
        </Button>

        {hasInCart ? (
          <Button variant={"destructive"} className="w-full" onClick={() => handleRemoveFromCart(product.id)}>
            <ShoppingCart className="size-4" />
            Remove
          </Button>
        ) : (
          <Button className="w-full" onClick={() => handleAddToCart({ ...product, quantity: 1 })}>
            <ShoppingCart className="size-4" />
            Add
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
