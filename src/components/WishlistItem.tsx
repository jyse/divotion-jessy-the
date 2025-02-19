import { memo, useCallback } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useWishlistItem, useWishlistActions } from "@/lib/useWishlist";

interface WishlistItemProps {
  id: string;
}

export const WishlistItem = memo(
  ({ id }: WishlistItemProps) => {
    const item = useWishlistItem(id);
    const { updateQuantity, removeItem } = useWishlistActions();

    const handleDecrease = useCallback(() => {
      if (!item) return;
      if (item.quantity > 1) {
        updateQuantity(id, item.quantity - 1);
      } else {
        removeItem(id);
      }
    }, [item, id, updateQuantity, removeItem]);

    const handleIncrease = useCallback(() => {
      if (!item) return;
      updateQuantity(id, item.quantity + 1);
    }, [item, id, updateQuantity]);

    // Removes entire product of wishlist
    const handleRemove = useCallback(() => {
      if (!item) return;
      removeItem(id);
    }, [item, id, removeItem]);

    if (!item) return null;

    return (
      <div
        className="flex gap-4 border-b pb-4 last:border-none"
        role="listitem"
        aria-label={`Wishlist item: ${item.title}`}
      >
        <div className="relative h-24 w-24 flex-shrink-0 mx-auto sm:mx-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="96px"
            priority={false}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col items-center sm:items-start">
          <h3 className="text-sm sm:text-base text-center sm:text-left font-medium">
            {item.title}
          </h3>

          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={handleDecrease}
              data-testid="decrease-quantity"
              className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200 active:bg-gray-300 transition-colors"
              aria-label={`Decrease quantity of ${item.title}`}
            >
              -
            </button>
            <span className="min-w-[1.5rem] text-center">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="rounded-full bg-gray-100 px-3 py-1 hover:bg-gray-200 active:bg-gray-300 transition-colors"
              aria-label={`Increase quantity of ${item.title}`}
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleRemove}
          data-testid="remove-from-wishlist"
          className="text-gray-500 hover:text-red-500 transition-colors p-2 hover:bg-gray-100 rounded-full"
          aria-label={`Remove ${item.title} from wishlist`}
        >
          <Trash className="h-5 w-5" />
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.id === nextProps.id
);

WishlistItem.displayName = "WishlistItem";
