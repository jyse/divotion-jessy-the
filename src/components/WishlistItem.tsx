import { memo, useState } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useWishlistItem, useWishlistActions } from "@/lib/useWishlist";
import { motion, AnimatePresence } from "framer-motion";

interface WishlistItemProps {
  id: string;
}

export const WishlistItem = memo(({ id }: WishlistItemProps) => {
  const item = useWishlistItem(id); // ✅ Select only the specific item
  const { updateQuantity, removeItem } = useWishlistActions();
  const [isRemoving, setIsRemoving] = useState(false); // ✅ Track if removing

  if (!item) return null; // If item was removed, don't render
  const handleRemove = () => {
    setIsRemoving(true); // ✅ Start animation before removing
    setTimeout(() => removeItem(id), 300); // ✅ Remove after animation duration
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      handleRemove();
    }
  };

  return (
    <AnimatePresence>
      {!isRemoving && ( // ✅ Ensures animation before removal
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="flex gap-4 border-b pb-4 last:border-none"
        >
          {/* Image */}
          <div className="relative h-24 w-24 flex-shrink-0 mx-auto sm:mx-0">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          {/* Product Info */}
          <div className="flex flex-1 flex-col items-center sm:items-start">
            <h3 className="text-sm sm:text-base text-center sm:text-left font-medium">
              {item.title}
            </h3>
            {/* Quantity Controls */}
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                aria-label={`Decrease quantity of ${item.title}`}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200"
                aria-label={`Increase quantity of ${item.title}`}
              >
                +
              </button>
            </div>
          </div>
          {/* Remove Button */}
          <button
            onClick={() => handleRemove}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <Trash className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

WishlistItem.displayName = "WishlistItem";
