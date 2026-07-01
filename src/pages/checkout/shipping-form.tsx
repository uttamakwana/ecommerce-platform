import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { TextField } from "./text-field";
import { shippingSchema, type ShippingValues } from "./schema";

interface ShippingFormProps {
  defaultValues?: Partial<ShippingValues>;
  onSubmit: (values: ShippingValues) => void;
}

export function ShippingForm({ defaultValues, onSubmit }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      country: "United States",
      ...defaultValues,
    },
  });

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Full name"
          autoComplete="name"
          placeholder="Jane Doe"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="Phone"
          autoComplete="tel"
          placeholder="+1 555 123 4567"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <TextField
          label="Country"
          autoComplete="country-name"
          error={errors.country?.message}
          {...register("country")}
        />
        <TextField
          label="Street address"
          autoComplete="street-address"
          placeholder="123 Market St"
          containerClassName="sm:col-span-2"
          error={errors.address?.message}
          {...register("address")}
        />
        <TextField
          label="City"
          autoComplete="address-level2"
          error={errors.city?.message}
          {...register("city")}
        />
        <TextField
          label="State / Region"
          autoComplete="address-level1"
          error={errors.state?.message}
          {...register("state")}
        />
        <TextField
          label="Postal code"
          autoComplete="postal-code"
          error={errors.zip?.message}
          {...register("zip")}
        />
      </div>

      <Button type="submit" size="lg" className="self-end">
        Continue to payment
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}
