"use client";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/lib/useWishlist";

export function Header() {
  const { totalWishlistItems, toggleWishlistPanel } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16 lg:px-6">
        <div className="flex h-full items-center justify-between">
          <div className="font-geist-sans text-xl font-semibold">
            ArtIstry Collective
          </div>
          <button
            onClick={toggleWishlistPanel}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
            aria-label="Open wishlist panel"
          >
            <span>Favorites</span>
            <div className="relative">
              <Heart className="h-5 w-5" />
              {totalWishlistItems > 0 && (
                <motion.div
                  key={totalWishlistItems}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white"
                  aria-live="polite"
                >
                  <span data-testid="wishlist-counter">
                    {totalWishlistItems}
                  </span>
                </motion.div>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
