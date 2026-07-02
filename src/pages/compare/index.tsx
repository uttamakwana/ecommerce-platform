import { Link } from "react-router";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui";
import { ProductNotFound } from "@/features/products/components/product-no-found";
import { StarRating } from "@/features/products/components/star-rating";
import { ProductImage } from "@/features/products/components";
import { useCart, useCompare } from "@/contexts";
import { getDiscountedPrice } from "@/features/products/utils";
import type { IProduct } from "@/features/products/types";
import { cn } from "@/lib";

/** Rows of the comparison table; each derives a cell value from a product. */
const ATTRIBUTES: {
  label: string;
  render: (product: IProduct) => React.ReactNode;
}[] = [
  {
    label: "Price",
    render: (p) => (
      <span className="font-semibold">${getDiscountedPrice(p).toFixed(2)}</span>
    ),
  },
  {
    label: "Rating",
    render: (p) => (
      <span className="flex items-center gap-1">
        <StarRating rating={p.rating} starClassName="size-3.5" />
        <span className="text-xs text-muted-foreground">
          {p.rating.toFixed(1)}
        </span>
      </span>
    ),
  },
  { label: "Brand", render: (p) => p.brand ?? "—" },
  {
    label: "Category",
    render: (p) => <span className="capitalize">{p.category}</span>,
  },
  { label: "Discount", render: (p) => `${p.discountPercentage.toFixed(0)}%` },
  {
    label: "Stock",
    render: (p) => (p.stock > 0 ? `${p.stock} in stock` : "Out of stock"),
  },
  { label: "Warranty", render: (p) => p.warrantyInformation },
  { label: "Return policy", render: (p) => p.returnPolicy },
  { label: "Shipping", render: (p) => p.shippingInformation },
];

export default function Compare() {
  const { items, remove, clear } = useCompare();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="px-4 py-6 sm:px-6">
        <ProductNotFound
          title="Nothing to compare yet"
          description="Add products to compare using the scale icon on any product."
          actionLabel="Browse products"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Compare products</h1>
          <p className="text-sm text-muted-foreground">
            {items.length} product{items.length === 1 ? "" : "s"} side by side
          </p>
        </div>
        <Button variant="outline" onClick={clear}>
          <Trash2 className="size-4" />
          Clear all
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-160 border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-32 border-b bg-muted/40 p-4 text-left align-bottom" />
              {items.map((product) => (
                <th
                  key={product.id}
                  className="border-b border-l bg-muted/40 p-4 text-left align-top"
                >
                  <div className="relative flex flex-col gap-2">
                    <button
                      type="button"
                      aria-label={`Remove ${product.title}`}
                      onClick={() => remove(product.id)}
                      className="absolute right-0 top-0 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                    </button>
                    <Link to={`/products/${product.id}`}>
                      <ProductImage
                        src={product.thumbnail}
                        alt={product.title}
                        wrapperClassName="size-24 rounded-xl border"
                        className="object-cover"
                      />
                    </Link>
                    <Link
                      to={`/products/${product.id}`}
                      className="line-clamp-2 pr-5 font-semibold hover:text-primary"
                    >
                      {product.title}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ATTRIBUTES.map((attr, rowIndex) => (
              <tr
                key={attr.label}
                className={cn(rowIndex % 2 === 1 && "bg-muted/20")}
              >
                <td className="border-b p-4 font-medium text-muted-foreground">
                  {attr.label}
                </td>
                {items.map((product) => (
                  <td key={product.id} className="border-b border-l p-4">
                    {attr.render(product)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="p-4" />
              {items.map((product) => (
                <td key={product.id} className="border-l p-4">
                  <Button
                    size="sm"
                    className="w-full"
                    disabled={product.stock <= 0}
                    onClick={() => addItem(product)}
                  >
                    <ShoppingCart className="size-4" />
                    Add
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
