import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui";
import { Package, Truck } from "lucide-react";
import { CheckSVG } from "./check-svg";

type CheckoutSuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CheckoutModal({
  open,
  onOpenChange,
}: CheckoutSuccessDialogProps) {
  const orderId = `ORD-${Math.floor(new Date().getTime() * 900000 + 100000)}`;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-lg">
        <div className="flex items-center justify-center">
          <div className="mb-4 rounded-full bg-green-100 p-4 dark:bg-green-950">
            <CheckSVG />
          </div>
        </div>
        <AlertDialogHeader className="items-center text-center">
          <AlertDialogTitle className="text-2xl">
            Order Placed Successfully 🎉
          </AlertDialogTitle>

          <AlertDialogDescription className="space-y-4 pt-2">
            <p>Thank you for your purchase! Your order has been confirmed.</p>

            <div className="rounded-lg border bg-muted/50 p-4 text-left">
              <div className="flex items-center gap-3">
                <Package className="size-5 text-primary" />

                <div>
                  <p className="font-medium">Order ID</p>
                  <p className="text-sm text-muted-foreground">{orderId}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Truck className="size-5 text-primary" />

                <div>
                  <p className="font-medium">Estimated Delivery</p>

                  <p className="text-sm text-muted-foreground">
                    Within 3–5 business days
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              This is a demo checkout experience. No real order has been placed.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction className="w-full">
            Continue Shopping
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
