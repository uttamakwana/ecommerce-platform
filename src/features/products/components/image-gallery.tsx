import { useState } from "react";
import { cn } from "@/lib";
import { ProductImage } from "./product-image";

interface ImageGalleryProps {
  images: string[];
  fallback: string;
  alt: string;
}

// Reset on product change is handled by the caller via a `key` prop (remount).
export function ImageGallery({ images, fallback, alt }: ImageGalleryProps) {
  const gallery = images.length > 0 ? images : [fallback];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <ProductImage
        src={gallery[active]}
        alt={`${alt} — image ${active + 1} of ${gallery.length}`}
        eager
        wrapperClassName="aspect-square rounded-2xl border"
        className="object-contain p-6"
      />

      {gallery.length > 1 && (
        <div className="scrollbar-none flex gap-3 overflow-x-auto">
          {gallery.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`View image ${index + 1}`}
              aria-current={index === active}
              onClick={() => setActive(index)}
              className={cn(
                "size-20 shrink-0 overflow-hidden rounded-xl border transition-all",
                index === active
                  ? "border-primary ring-2 ring-primary/30"
                  : "opacity-70 hover:opacity-100",
              )}
            >
              <ProductImage
                src={image}
                alt=""
                wrapperClassName="size-full"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
