import { useCategories } from "@/features/products/hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import { useProductFilter } from "@/contexts/product/useProductFilters";
import type { IProductCategory } from "@/features/products/types";

export function CategoryDropdown() {
  const { data: categories } = useCategories();
  const { handleChangeSearchParams } = useProductFilter();

  return (
    <Select onValueChange={(value: IProductCategory["slug"]) => {
      handleChangeSearchParams({ category: value === "All" ? undefined : value });
    }}>
      <SelectTrigger className="w-max">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="All">All</SelectItem>
          {categories?.map((category) => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
