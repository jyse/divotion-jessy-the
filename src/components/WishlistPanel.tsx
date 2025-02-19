"use client";
import { X } from "lucide-react";
import { useMemo } from "react";
import { useWishlist } from "@/lib/useWishlist";
import { motion, AnimatePresence } from "framer-motion";
import { WishlistItem } from "./WishlistItem";

export function WishlistPanel() {
  const {
    isWishlistOpen,
    toggleWishlistPanel,
    wishlistItems,
    clearWishlist,
    totalWishlistItems
  } = useWishlist();

  const renderedWishlistItems = useMemo(() => {
    return wishlistItems.map((item) => (
      <WishlistItem key={item.id} id={item.id} />
    ));
  }, [wishlistItems]);

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={toggleWishlistPanel}
        >
          <motion.div
            role="dialog"
            aria-labelledby="wishlist-title"
            aria-modal="true"
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute right-4 top-4 bottom-4 w-[92%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white shadow-lg rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b p-4">
              <button
                onClick={clearWishlist}
                data-testid="clear-wishlist"
                className="text-sm text-gray-500 hover:text-red-500 transition"
                aria-label="Clear all wishlist items"
              >
                Clear All
              </button>
              <h2
                id="wishlist-title"
                className="text-base sm:text-lg font-medium"
              >
                <span data-testid="wishlist-counter">
                  Wishlist{" "}
                  {totalWishlistItems > 0 ? `(${totalWishlistItems})` : ""}
                </span>
              </h2>
              <button
                onClick={toggleWishlistPanel}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Close wishlist panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-full overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {wishlistItems.length === 0 ? (
                  <motion.p
                    key="empty-message"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="text-center text-gray-500"
                    aria-live="polite"
                  >
                    Your wishlist is empty
                  </motion.p>
                ) : (
                  <div className="flex flex-col gap-y-4">
                    {renderedWishlistItems}
                  </div> // ✅ Uses memoized items
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
