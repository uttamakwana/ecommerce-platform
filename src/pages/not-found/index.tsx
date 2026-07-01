import { Button } from "@/components/ui";
import { Home, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router";

export default function NoPageFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
          <TriangleAlert className="size-10 text-muted-foreground" />
        </div>

        <p className="text-7xl font-extrabold tracking-tight text-primary">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          Page not found
        </h1>

        <p className="mt-3 text-muted-foreground">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={() => navigate("/")}>
            <Home className="mr-2 size-4" />
            Go Home
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}