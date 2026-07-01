import { AlertTriangle } from "lucide-react";
import { Button } from "./ui";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this content. Please check your connection and try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-4">
        <AlertTriangle className="size-9 text-destructive" />
      </div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {onRetry && (
        <Button className="mt-6" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
