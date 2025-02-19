"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/store/useWishlist";
import { toast } from "react-hot-toast";

interface CardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  dimensions: string;
}

export function Card(props: CardProps) {
  const { wishlistItems, toggleItem } = useWishlist();
  const isInWishlist = wishlistItems.some((item) => item.id === props.id);

  const handleWishlistToggle = () => {
    toggleItem(props);

    const toastStyle = {
      background: "#222",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "8px",
      padding: "12px 16px",
      whiteSpace: "nowrap",
      maxWidth: "none"
    };

    toast[isInWishlist ? "error" : "success"](
      `${isInWishlist ? "Removed" : "Added"} "${props.title}" from wishlist`,
      { duration: 2500, position: "bottom-center", style: toastStyle }
    );
  };

  return (
    <div className="group relative transition-all duration-300 transform scale-100 hover:scale-[1.02] hover:shadow-2xl shadow-md rounded-lg bg-white p-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={props.image}
          alt={props.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
        />
        <button
          onClick={handleWishlistToggle}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110"
          aria-label={
            isInWishlist
              ? `Remove ${props.title} from wishlist`
              : `Add ${props.title} to wishlist`
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
      <div aria-live="assertive" className="sr-only">
        {isInWishlist
          ? `${props.title} removed from wishlist`
          : `${props.title} added to wishlist`}
      </div>
      <div className="mt-3 px-2 pb-2">
        <h3 className="text-sm font-medium text-gray-900">{props.title}</h3>
      </div>
    </div>
  );
}
