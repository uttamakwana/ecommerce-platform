import { Sparkles, Truck, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-brand px-6 py-12 text-white sm:px-10 sm:py-16">
      {/* Decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/4 size-72 rounded-full bg-black/10 blur-3xl"
      />

      <div className="relative max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
          <Sparkles className="size-3.5" />
          New season, fresh deals
        </span>

        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          Everything you love,
          <br />
          delivered with delight.
        </h1>

        <p className="mt-4 max-w-lg text-base text-white/80">
          Browse thousands of products across every category — search, compare,
          save your favorites, and check out in seconds.
        </p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <span className="inline-flex items-center gap-2 text-white/90">
            <Truck className="size-4" /> Free shipping over $100
          </span>
          <span className="inline-flex items-center gap-2 text-white/90">
            <ShieldCheck className="size-4" /> Secure checkout
          </span>
        </div>
      </div>
    </section>
  );
}
