import { Link, useLocation } from "react-router";
import { Scale, X } from "lucide-react";
import { Button } from "@/components/ui";
import { ProductImage } from "./product-image";
import { useCompare } from "@/contexts";
import { MAX_COMPARE } from "@/contexts/compare/compare-context";

/** Floating tray summarizing products queued for comparison. */
export function CompareBar() {
  const { items, count, remove, clear } = useCompare();
  const { pathname } = useLocation();

  // Hide on the compare page itself; nothing to summarize when empty.
  if (count === 0 || pathname === "/compare") return null;

  return (
    <div className="pointer-events-none sticky bottom-0 z-40 flex justify-center p-4">
      <div className="pointer-events-auto flex w-full max-w-2xl items-center gap-3 rounded-2xl border bg-card/95 p-3 shadow-xl backdrop-blur">
        <div className="flex items-center gap-2 pl-1 text-sm font-medium">
          <Scale className="size-4 text-primary" />
          <span className="hidden sm:inline">Compare</span>
          <span className="text-muted-foreground">
            {count}/{MAX_COMPARE}
          </span>
        </div>

        <div className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-none">
          {items.map((item) => (
            <div key={item.id} className="relative shrink-0 overflow-hidden rounded-tr-sm">
              <ProductImage
                src={item.thumbnail}
                alt={item.title}
                wrapperClassName="size-11 rounded-lg border"
                className="object-cover"
              />
              <button
                type="button"
                aria-label={`Remove ${item.title} from compare`}
                onClick={() => remove(item.id)}
                className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-red-400 text-white cursor-pointer"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear
          </Button>
          {count < 2 ? (
            <Button size="sm" disabled>
              Compare
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link to="/compare">Compare</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
