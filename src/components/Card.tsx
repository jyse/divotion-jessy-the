"use client";

import { useMemo, useCallback } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/lib/useWishlist";
import { toast } from "react-hot-toast";

interface CardProps {
  id: string;
  title: string;
  image?: string;
}

export function Card({ id, title, image }: CardProps) {
  const { wishlistItems, toggleItem } = useWishlist();
  const fallbackImage = "/images/placeholder.png";

  const isInWishlist = useMemo(
    () => wishlistItems.some((item) => item.id === id),
    [wishlistItems, id]
  );

  const handleWishlistToggle = useCallback(() => {
    toggleItem({ id, title, image: image || fallbackImage });

    toast[isInWishlist ? "error" : "success"](
      `${isInWishlist ? "Removed" : "Added"} "${title}" from wishlist`,
      {
        duration: 2500,
        position: "bottom-center",
        style: {
          background: "#222",
          color: "#fff",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "12px 16px",
          whiteSpace: "nowrap",
          maxWidth: "none"
        }
      }
    );
  }, [isInWishlist, id, title, image, toggleItem]);

  return (
    <div className="group relative transition-all duration-300 transform scale-100 hover:scale-[1.02] hover:shadow-2xl shadow-md rounded-lg bg-white p-4">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={image || fallbackImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
        />
        {/* Wishlist Toggle Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110"
          aria-label={
            isInWishlist
              ? `Remove ${title} from wishlist`
              : `Add ${title} to wishlist`
          }
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Hidden screen reader notification */}
      <div aria-live="assertive" className="sr-only">
        {isInWishlist
          ? `${title} removed from wishlist`
          : `${title} added to wishlist`}
      </div>

      {/* Product Title */}
      <div className="mt-3 px-2 pb-2">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
    </div>
  );
}
