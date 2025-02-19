"use client";
// 🐲Still add comments in here and re-factoring
import { X, Trash } from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/store/useWishlist";
import { motion, AnimatePresence } from "framer-motion";

export function WishlistPanel() {
  const {
    isWishlistOpen,
    toggleWishlistPanel,
    items,
    updateQuantity,
    removeItem,
    clearWishlist
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
          <motion.div
            role="dialog"
            aria-labelledby="wishlist-title"
            aria-modal="true"
            tabIndex={-1}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute right-4 top-4 bottom-4 h-[calc(100%-2rem)] w-full max-w-md bg-white shadow-lg rounded-xl overflow-hidden" // ✅ Added `right-4 top-4 bottom-4` and `h-[calc(100%-2rem)]`
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <button
                onClick={clearWishlist}
                className="text-sm text-gray-500 hover:text-red-500 transition"
                aria-label="Clear all wishlist items"
              >
                Clear All
              </button>
              <h2 className="text-lg font-medium">
                Wishlist {/* Note🐲 TotalWisthlist variable here*/}
                {items.length > 0 &&
                  `(${items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )})`}
              </h2>

              <button
                onClick={toggleWishlistPanel}
                className="rounded-full p-2 hover:bg-gray-100"
                aria-label="Close wishlist panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="h-full overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {items.length === 0 ? (
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
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 100 }} // ✅ Smooth removal animation
                          transition={{ duration: 0.3 }}
                          className="flex gap-4 border-b pb-4 last:border-none" // ✅ Last item has no border
                        >
                          <div className="relative h-24 w-24 flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <h3 className="font-medium">{item.title}</h3>
                            <p className="text-sm text-gray-500">
                              {item.dimensions}
                            </p>
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
                          {/* ✅ Trash icon with extra padding */}
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
