import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import type { IProduct } from "../types";
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./product-card-skeleton";

/** Tailwind grid breakpoints, mirrored so virtual rows match the CSS grid. */
function columnsForWidth(width: number): number {
  if (width >= 1536) return 5;
  if (width >= 1280) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
}

interface VirtualizedProductGridProps {
  products: IProduct[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

/**
 * Windowed product grid: only the rows near the viewport are mounted, so the
 * DOM stays small even after scrolling through thousands of products. The
 * virtualizer's own range also drives infinite loading (no separate observer).
 */
export function VirtualizedProductGrid({
  products,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: VirtualizedProductGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(4);
  const [scrollMargin, setScrollMargin] = useState(0);

  // Track container width → column count, and the grid's document offset.
  useLayoutEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const measure = () => {
      setColumns(columnsForWidth(el.clientWidth));
      setScrollMargin(el.getBoundingClientRect().top + window.scrollY);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const rowCount = Math.ceil(products.length / columns);

  const virtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => 420,
    overscan: 4,
    scrollMargin,
    // Re-key measurements when the column count changes the layout.
    getItemKey: (index) => `${columns}-${index}`,
  });

  const virtualRows = virtualizer.getVirtualItems();

  // Load the next page as the user nears the end of the rendered rows.
  const lastRowIndex = virtualRows.at(-1)?.index ?? 0;
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && lastRowIndex >= rowCount - 2) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    lastRowIndex,
    rowCount,
    fetchNextPage,
  ]);

  const measureRow = useCallback(
    (node: HTMLDivElement | null) => virtualizer.measureElement(node),
    [virtualizer],
  );

  return (
    <div ref={parentRef} className="relative w-full">
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualRows.map((virtualRow) => {
          const start = virtualRow.index * columns;
          const rowProducts = products.slice(start, start + columns);

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={measureRow}
              className="absolute left-0 top-0 w-full"
              style={{
                transform: `translateY(${virtualRow.start - virtualizer.options.scrollMargin}px)`,
              }}
            >
              <div
                className="grid gap-5 pb-5"
                style={{
                  gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                }}
              >
                {rowProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isFetchingNextPage && (
        <div
          className="grid gap-5"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
