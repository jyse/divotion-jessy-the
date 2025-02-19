"use client";

import { useCallback } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useWishlist, useWishlistItem } from "@/lib/useWishlist";
import { toast } from "react-hot-toast";

interface CardProps {
  id: string;
  title: string;
  image?: string;
}

export function Card({ id, title, image }: CardProps) {
  const toggleItem = useWishlist((state) => state.toggleItem);
  const isFavorited = useWishlistItem(id);
  const fallbackImage = "/images/placeholder.png";

  const handleWishlistToggle = useCallback(() => {
    toggleItem({ id, title, image: image || fallbackImage });

    toast[isFavorited ? "error" : "success"](
      `${isFavorited ? "Removed" : "Added"} "${title}" from wishlist`,
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
  }, [isFavorited, id, title, image, toggleItem]);

  return (
    <div className="group relative transition-all duration-300 transform scale-100 hover:scale-[1.02] hover:shadow-2xl shadow-md rounded-lg bg-white p-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={image || fallbackImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
        />
        <button
          onClick={handleWishlistToggle}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110"
          aria-label={
            isFavorited
              ? `Remove ${title} from wishlist`
              : `Add ${title} to wishlist`
          }
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
            aria-hidden="true"
          />
        </button>
      </div>
      <div aria-live="assertive" className="sr-only">
        {isFavorited
          ? `${title} removed from wishlist`
          : `${title} added to wishlist`}
      </div>
      <div className="mt-3 px-2 pb-2">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      </div>
    </div>
  );
}
