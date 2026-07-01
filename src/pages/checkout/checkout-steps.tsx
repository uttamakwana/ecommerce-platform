import { Check } from "lucide-react";
import { cn } from "@/lib";
import { CHECKOUT_STEPS, STEP_LABELS, type CheckoutStep } from "./steps";

export function CheckoutSteps({ current }: { current: CheckoutStep }) {
  const currentIndex = CHECKOUT_STEPS.indexOf(current);

  return (
    <ol className="flex items-center gap-2">
      {CHECKOUT_STEPS.map((step, index) => {
        const isDone = index < currentIndex;
        const isActive = index === currentIndex;
        return (
          <li key={step} className="flex flex-1 items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors",
                  isActive && "border-primary bg-primary text-primary-foreground",
                  isDone && "border-success bg-success text-success-foreground",
                  !isActive && !isDone && "text-muted-foreground",
                )}
              >
                {isDone ? <Check className="size-4" /> : index + 1}
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {STEP_LABELS[step]}
              </span>
            </div>
            {index < CHECKOUT_STEPS.length - 1 && (
              <span
                className={cn(
                  "h-px flex-1",
                  index < currentIndex ? "bg-success" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
