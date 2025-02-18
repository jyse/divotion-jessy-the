"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useWishlist } from "@/store/useWishlist";
import { motion, AnimatePresence } from "framer-motion";

export function WishlistPanel() {
  const { isWishlistOpen, toggleWishlistPanel, items, updateQuantity } =
    useWishlist();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={toggleWishlistPanel} // ✅ Clicking background closes it
        >
          {/* Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }} // Start off-screen
            animate={{ x: "0%" }} // Slide into view
            exit={{ x: "100%" }} // Slide out when closing
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()} // ✅ Prevents clicks inside panel from closing it
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-medium">Wishlist</h2>
              <button
                onClick={toggleWishlistPanel}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="h-full overflow-y-auto p-4">
              {items.length === 0 ? (
                <p className="text-center text-gray-500">
                  Your wishlist is empty
                </p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
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
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="font-medium">€{item.price}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
