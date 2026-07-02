import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib";

interface ProductImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  alt: string;
  /** Classes for the aspect-ratio wrapper (controls the reserved box). */
  wrapperClassName?: string;
  /** Load immediately + high priority (use for above-the-fold hero images). */
  eager?: boolean;
}

/**
 * Optimized image: reserves layout space (no CLS), lazy-loads and async-decodes
 * off-screen images, fades in on load, shows a shimmer placeholder while
 * loading, and degrades to a graceful fallback if the URL fails.
 */
export function ProductImage({
  src,
  alt,
  className,
  wrapperClassName,
  eager = false,
  ...props
}: ProductImageProps) {
  const [state, setState] = useState<{
    src: string;
    status: "loading" | "loaded" | "error";
  }>({ src, status: "loading" });

  // Reset the load state when the source changes (e.g. gallery navigation).
  if (state.src !== src) setState({ src, status: "loading" });

  return (
    <div className={cn("relative overflow-hidden bg-muted/40", wrapperClassName)}>
      {state.status !== "loaded" && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0",
            state.status === "loading" && "animate-pulse bg-muted",
          )}
        />
      )}

      {state.status === "error" ? (
        <div className="absolute inset-0 grid place-items-center text-muted-foreground">
          <ImageOff className="size-8" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          draggable={false}
          onLoad={() => setState({ src, status: "loaded" })}
          onError={() => setState({ src, status: "error" })}
          className={cn(
            "size-full transition-opacity duration-300",
            state.status === "loaded" ? "opacity-100" : "opacity-0",
            className,
          )}
          {...props}
        />
      )}
    </div>
  );
}
