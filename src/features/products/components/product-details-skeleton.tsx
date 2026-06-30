import { Skeleton } from "@/components/ui";

export function ProductDetailsSkeleton() {
    return (
        <div className="container py-8">
            <div className="grid gap-10 lg:grid-cols-2">
                <Skeleton className="aspect-square w-full rounded-xl" />

                <div className="space-y-6">
                    <Skeleton className="h-6 w-24" />

                    <Skeleton className="h-10 w-3/4" />

                    <Skeleton className="h-5 w-32" />

                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />

                    <Skeleton className="h-12 w-40" />

                    <Skeleton className="h-8 w-28 rounded-full" />

                    <Skeleton className="h-12 w-44 rounded-md" />
                </div>
            </div>
        </div>
    );
}