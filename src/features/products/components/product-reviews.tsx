import { useMemo } from "react";
import { UserRound } from "lucide-react";
import type { IProductReview } from "../types";
import { StarRating } from "./star-rating";

interface ProductReviewsProps {
  reviews: IProductReview[];
  rating: number;
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function ProductReviews({ reviews, rating }: ProductReviewsProps) {
  // Distribution of star ratings (5★ → 1★) for the summary bars.
  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    for (const review of reviews) {
      const bucket = Math.min(5, Math.max(1, Math.round(review.rating)));
      counts[5 - bucket] += 1;
    }
    return counts;
  }, [reviews]);

  const totalReviews = reviews.length;

  return (
    <section aria-labelledby="reviews-heading" className="space-y-6">
      <h2 id="reviews-heading" className="text-2xl font-bold tracking-tight">
        Customer reviews
      </h2>

      <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex flex-col items-center justify-center rounded-2xl border bg-muted/30 px-8 py-6 text-center">
          <span className="text-4xl font-bold">{rating.toFixed(1)}</span>
          <StarRating rating={rating} starClassName="size-4" className="mt-1" />
          <span className="mt-1 text-xs text-muted-foreground">
            {totalReviews} review{totalReviews === 1 ? "" : "s"}
          </span>
        </div>

        <div className="space-y-1.5">
          {distribution.map((count, index) => {
            const stars = 5 - index;
            const pct = totalReviews ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-sm">
                <span className="w-8 shrink-0 text-muted-foreground">
                  {stars}★
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right tabular-nums text-muted-foreground">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {totalReviews > 0 ? (
        <ul className="divide-y">
          {reviews.map((review, index) => (
            <li key={`${review.reviewerEmail}-${index}`} className="py-4">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                  <UserRound className="size-5" />
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{review.reviewerName}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  <StarRating
                    rating={review.rating}
                    starClassName="size-3.5"
                    className="mt-1"
                  />
                  <p className="mt-2 text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">
          No reviews yet for this product.
        </p>
      )}
    </section>
  );
}
