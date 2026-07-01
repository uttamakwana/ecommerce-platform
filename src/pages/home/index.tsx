import { Hero } from "./hero";
import { ProductListing } from "./product-listing";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 px-4 py-6 sm:px-6">
      <Hero />
      <ProductListing />
    </div>
  );
}
