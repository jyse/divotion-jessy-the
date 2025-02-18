import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: Array<{
    id: string;
    quantity: number;
  }>;
  toggleWishlistPanel: () => void;
  isWishlistOpen: boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],
      isWishlistOpen: false,
      toggleWishlistPanel: () =>
        set((state) => ({ isWishlistOpen: !state.isWishlistOpen }))
    }),
    {
      name: "wishlist-storage"
    }
  )
);
