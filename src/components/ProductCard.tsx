"use client";
import { useWishlistStore } from "@/app/store/wishlist";
import Image from "next/image";

export default function ProductCard({ product }) {
  const { addToWishlist } = useWishlistStore();

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition">
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="mx-auto rounded-md"
      />
      <h3 className="text-lg font-bold mt-2">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addToWishlist(product)}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add to Wishlist
      </button>
    </div>
  );
}
