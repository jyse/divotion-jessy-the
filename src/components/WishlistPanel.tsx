"use client";
import { X, Trash } from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/lib/useWishlist";
import { motion, AnimatePresence } from "framer-motion";

export function WishlistPanel() {
  const {
    isWishlistOpen,
    toggleWishlistPanel,
    wishlistItems,
    updateQuantity,
    removeItem,
    clearWishlist,
    totalWishlistItems
  } = useWishlist();

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
          {/* 🛠️ Wishlist Panel Container */}
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
            {/* 🔹 Header Section */}
            <div className="flex items-center justify-between border-b p-4">
              <button
                onClick={clearWishlist}
                className="text-sm text-gray-500 hover:text-red-500 transition"
                aria-label="Clear all wishlist items"
              >
                Clear All
              </button>
              <h2 id="wishlist-title" className="text-lg font-medium">
                Wishlist {totalWishlistItems > 0 && `(${totalWishlistItems})`}
              </h2>

              <button
                onClick={toggleWishlistPanel}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Close wishlist panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 🔹 Wishlist Items Section */}
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
                  <div className="space-y-4">
                    <AnimatePresence>
                      {wishlistItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 100 }}
                          transition={{ duration: 0.3 }}
                          className="flex gap-4 border-b pb-4 last:border-none"
                        >
                          {/* 🔹 Image Section */}
                          <div className="relative h-24 w-24 flex-shrink-0 mx-auto sm:mx-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>

                          {/* 🔹 Product Info */}
                          <div className="flex flex-1 flex-col items-center sm:items-start">
                            <h3 className="text-center sm:text-left font-medium">
                              {item.title}
                            </h3>
                            {/* 🔹 Quantity */}
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                                aria-label={`Decrease quantity of ${item.title}`}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                                aria-label={`Increase quantity of ${item.title}`}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* 🔹 Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-red-500 transition pr-4"
                            aria-label={`Remove ${item.title} from wishlist`}
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
