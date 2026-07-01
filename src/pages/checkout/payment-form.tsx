import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui";
import { TextField } from "./text-field";
import { paymentSchema, type PaymentValues } from "./schema";

interface PaymentFormProps {
  defaultValues?: Partial<PaymentValues>;
  onBack: () => void;
  onSubmit: (values: PaymentValues) => void;
}

/** Groups digits into blocks of 4 for readable card entry. */
function formatCardNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

/** Formats free typing into MM/YY. */
function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function PaymentForm({
  defaultValues,
  onBack,
  onSubmit,
}: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  const cardNumberField = register("cardNumber");
  const expiryField = register("expiry");

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
        <Lock className="size-3.5" />
        This is a demo. Do not enter real card details — try 4242 4242 4242 4242.
      </div>

      <TextField
        label="Name on card"
        autoComplete="cc-name"
        placeholder="Jane Doe"
        error={errors.cardName?.message}
        {...register("cardName")}
      />

      <TextField
        label="Card number"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="4242 4242 4242 4242"
        error={errors.cardNumber?.message}
        {...cardNumberField}
        onChange={(e) => {
          e.target.value = formatCardNumber(e.target.value);
          cardNumberField.onChange(e);
        }}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Expiry (MM/YY)"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="08/28"
          error={errors.expiry?.message}
          {...expiryField}
          onChange={(e) => {
            e.target.value = formatExpiry(e.target.value);
            expiryField.onChange(e);
          }}
        />
        <TextField
          label="CVV"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          maxLength={4}
          error={errors.cvv?.message}
          {...register("cvv", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            },
          })}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button type="button" variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button type="submit" size="lg">
          Review order
        </Button>
      </div>
    </form>
  );
}
