import { LoaderCircle } from "lucide-react";

export function PageLoader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="rounded-full border bg-background p-5 shadow-sm">
        <LoaderCircle className="size-10 animate-spin text-primary" />
      </div>

      <div className="space-y-1 text-center">
        <h2 className="text-lg font-semibold">Loading...</h2>

        <p className="text-sm text-muted-foreground">
          Preparing your shopping experience.
        </p>
      </div>
    </div>
  );
}
