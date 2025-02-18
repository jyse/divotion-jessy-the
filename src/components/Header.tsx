"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/store/useWishlist";

export function Header() {
  const { items, toggleWishlistPanel } = useWishlist();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 h-16">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <div className="font-geist-sans text-xl font-medium">
            ArtIstry Collective
          </div>

          {/* Favorites Button */}
          <button
            onClick={toggleWishlistPanel}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100"
          >
            <span>Favorites</span>
            <div className="relative">
              <Heart className="h-5 w-5" />
              {items.length > 0 && (
                <motion.div
                  key={items.length} // This triggers animation on change
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white"
                >
                  {items.length}
                </motion.div>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
