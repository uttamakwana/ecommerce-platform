import { useCategories } from "@/features/products/hooks";
import { useFilters } from "@/hooks";
import { cn } from "@/lib";
import { CategoryPillsSkeleton } from "./category-pills-skeleton";

export function CategoryPills() {
  const { data: categories, isLoading } = useCategories();
  const { category, setFilters } = useFilters();

  const pill = (active: boolean) =>
    cn(
      "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
      active
        ? "border-transparent bg-primary text-primary-foreground shadow-sm"
        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
    );

  return (
    <div
      className="scrollbar-none flex gap-2 overflow-x-auto pb-1"
      role="tablist"
      aria-label="Product categories"
    >
      <button
        role="tab"
        aria-selected={!category}
        className={pill(!category)}
        onClick={() => setFilters({ category: undefined })}
      >
        All
      </button>

      {isLoading &&
        Array.from({ length: 12 }).map((_, index) => (
          <CategoryPillsSkeleton key={index} />
        ))}

      {categories?.map((cat) => {
        const isActive = category === cat.slug;
        return (
          <button
            key={cat.slug}
            role="tab"
            aria-selected={isActive}
            className={pill(isActive)}
            onClick={() => setFilters({ category: cat.slug })}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
