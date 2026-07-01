import { Star } from "lucide-react";
import { cn } from "@/lib";

interface StarRatingProps {
  rating: number;
  /** Tailwind size class for each star (e.g. "size-4"). */
  starClassName?: string;
  className?: string;
}

/** Accessible 5-star rating with partial fill on the last star. */
export function StarRating({
  rating,
  starClassName = "size-4",
  className,
}: StarRatingProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const fill = Math.max(0, Math.min(1, rating - index));
        return (
          <span key={index} className="relative">
            <Star className={cn(starClassName, "text-muted-foreground/30")} />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className={cn(starClassName, "fill-amber-400 text-amber-400")} />
            </span>
          </span>
        );
      })}
    </span>
  );
}
