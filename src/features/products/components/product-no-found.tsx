import { Button } from "@/components/ui";
import { PackageSearch } from "lucide-react";
import { useNavigate } from "react-router";

type TProductNotFoundProps = {
    title?: string;
    description?: string;
    actionLabel?: string;
}

export function ProductNotFound({
    title = "No products found",
    description = "We couldn't find any products matching your current search or filters.",
    actionLabel,
}: TProductNotFoundProps) {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
                <PackageSearch className="size-10 text-muted-foreground" />
            </div>

            <h2 className="text-xl font-semibold">{title}</h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {description}
            </p>

            {actionLabel && <Button className="mt-6" onClick={() => navigate(`/`)}>
                {actionLabel}
            </Button>}
        </div>
    );
}