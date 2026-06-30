import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    Skeleton,
} from "@/components/ui";

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden rounded-xl px-4">
            <CardHeader className="p-0">
                <Skeleton className="aspect-square w-full rounded-xl" />
            </CardHeader>

            <CardContent className="space-y-4 p-5">
                <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />

                    <Skeleton className="h-6 w-3/4" />

                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <div className="flex justify-between">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <div className="flex gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-6 w-16" />
                </div>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-3 p-5">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
            </CardFooter>
        </Card>
    );
}