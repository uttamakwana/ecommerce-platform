import { Skeleton } from "@/components/ui";

export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-8" />
        </div>
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
        <div className="mt-auto flex justify-between pt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-14" />
        </div>
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
