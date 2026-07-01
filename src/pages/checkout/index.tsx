import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useCart, useOrders } from "@/contexts";
import type { IOrder } from "@/features/products/types";
import { getDiscountedPrice } from "@/features/products/utils";
import { OrderSummary } from "@/pages/cart/order-summary";
import { CheckoutSteps } from "./checkout-steps";
import type { CheckoutStep } from "./steps";
import { ShippingForm } from "./shipping-form";
import { PaymentForm } from "./payment-form";
import { ReviewStep } from "./review-step";
import type { PaymentValues, ShippingValues } from "./schema";

/** Human-readable order id, e.g. ORD-7F3A9C2B. */
function generateOrderId(): string {
  const random =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 8)
      : Math.random().toString(16).slice(2, 10);
  return `ORD-${random.toUpperCase()}`;
}

const STEP_TITLES: Record<CheckoutStep, string> = {
  shipping: "Shipping details",
  payment: "Payment details",
  review: "Review your order",
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, summary, clear } = useCart();
  const { placeOrder } = useOrders();

  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [shipping, setShipping] = useState<ShippingValues>();
  const [payment, setPayment] = useState<PaymentValues>();
  const [isPlacing, setIsPlacing] = useState(false);
  const hasPlaced = useRef(false);

  // Guard: no items means there's nothing to check out (unless we just placed).
  useEffect(() => {
    if (items.length === 0 && !hasPlaced.current) {
      navigate("/cart", { replace: true });
    }
  }, [items.length, navigate]);

  const handlePlaceOrder = async () => {
    if (!shipping || !payment) return;
    setIsPlacing(true);

    // Simulate a network round-trip to a payment/orders backend.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const order: IOrder = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        price: getDiscountedPrice(item),
        quantity: item.quantity,
      })),
      shipping,
      paymentLast4: payment.cardNumber.replace(/\D/g, "").slice(-4),
      totals: {
        subtotal: summary.subtotal,
        discount: summary.discount,
        shipping: summary.shipping,
        tax: summary.tax,
        total: summary.total,
      },
    };

    hasPlaced.current = true;
    placeOrder(order);
    clear();
    navigate(`/order/${order.id}`, { replace: true });
  };

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
      <CheckoutSteps current={step} />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>{STEP_TITLES[step]}</CardTitle>
          </CardHeader>
          <CardContent>
            {step === "shipping" && (
              <ShippingForm
                defaultValues={shipping}
                onSubmit={(values) => {
                  setShipping(values);
                  setStep("payment");
                }}
              />
            )}
            {step === "payment" && (
              <PaymentForm
                defaultValues={payment}
                onBack={() => setStep("shipping")}
                onSubmit={(values) => {
                  setPayment(values);
                  setStep("review");
                }}
              />
            )}
            {step === "review" && shipping && payment && (
              <ReviewStep
                shipping={shipping}
                cardLast4={payment.cardNumber.replace(/\D/g, "").slice(-4)}
                items={items}
                isPlacing={isPlacing}
                onBack={() => setStep("payment")}
                onPlaceOrder={handlePlaceOrder}
              />
            )}
          </CardContent>
        </Card>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary summary={summary} />
        </div>
      </div>
    </div>
  );
}
