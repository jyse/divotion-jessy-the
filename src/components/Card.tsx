"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/store/useWishlist";

interface CardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  dimensions: string;
}

export function Card(props: CardProps) {
  const { items, toggleItem } = useWishlist();
  const isInWishlist = items.some((item) => item.id === props.id);

  return (
    <div className="group relative">
      <div className="absolute inset-0 rounded-xl bg-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100" />
      <div className="relative bg-gray-50 p-4">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={props.image}
            alt={props.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center"
          />
          <button
            onClick={() => toggleItem(props)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110"
          >
            <Heart
              className={`h-5 w-5 ${
                isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>
        <div className="mt-3 space-y-1 px-2 pb-2">
          <h3 className="text-sm font-medium text-gray-900">{props.title}</h3>
          <div className="flex items-center justify-between">
            {/* <p className="text-lg font-medium text-gray-900"> */}
            {/* €{props.price.toFixed(2)} */}
            {/* </p> */}
            {/* <p className="text-sm text-gray-500">{props.dimensions}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
