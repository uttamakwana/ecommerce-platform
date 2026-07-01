import { forwardRef, useId } from "react";
import { Input } from "@/components/ui";
import { cn } from "@/lib";

interface TextFieldProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, containerClassName, className, ...props }, ref) => {
    const id = useId();
    const errorId = `${id}-error`;

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <Input
          id={id}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(error && "border-destructive", className)}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
