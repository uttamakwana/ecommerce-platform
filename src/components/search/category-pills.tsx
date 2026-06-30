import { useCategories } from "@/features/products/hooks";
import { Button } from "../ui";
import { useProductFilter } from "@/contexts/product/useProductFilters";
import { CategoryPillsSkeleton } from "./category-pills-skeleton";

export function CategoryPills() {
  const { data: categories, isLoading } = useCategories();
  const { searchParams, handleChangeSearchParams } = useProductFilter();
  const category = searchParams.get("category") || undefined;

  return (
    <div className="flex overflow-x-auto gap-2 px-4 scrollbar-none py-2">
      <Button
        variant={!category ? "default" : "outline"}
        onClick={() => handleChangeSearchParams({ category: undefined })}
      >
        All
      </Button>

      {isLoading && Array.from({ length: 30 }).map((_, index) => <CategoryPillsSkeleton key={index} />)}

      {categories?.slice().map((cat) => {
        const isActive = category === cat.slug;

        return (
          <Button
            variant={isActive ? "default" : "outline"}
            key={cat.slug}
            onClick={() => {
              handleChangeSearchParams({ category: cat.slug });
            }}
          >
            {cat.name}
          </Button>
        );
      })}
    </div>
  );
}
