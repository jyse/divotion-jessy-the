import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistItem {
  id: string;
  title: string;
  image: string;
  price: number;
  dimensions: string;
  quantity: number;
}

interface WishlistState {
  wishlistItems: WishlistItem[]; // ✅ Renamed from `items` for clarity
  totalWishlistItems: number; // ✅ Stored in Zustand for better performance
  isWishlistOpen: boolean;
  toggleWishlistPanel: () => void;
  toggleItem: (product: Omit<WishlistItem, "quantity">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      wishlistItems: [],
      totalWishlistItems: 0, // ✅ Tracks total number of all wishlist items
      isWishlistOpen: false,

      toggleWishlistPanel: () =>
        set((state) => ({
          isWishlistOpen: !state.isWishlistOpen
        })),

      toggleItem: (product) =>
        set((state) => {
          const exists = state.wishlistItems.some(
            (item) => item.id === product.id
          );

          let updatedWishlist;
          if (exists) {
            updatedWishlist = state.wishlistItems.filter(
              (item) => item.id !== product.id
            );
          } else {
            updatedWishlist = [
              ...state.wishlistItems,
              { ...product, quantity: 1 }
            ];
          }

          return {
            wishlistItems: updatedWishlist,
            totalWishlistItems: updatedWishlist.reduce(
              (total, item) => total + item.quantity,
              0
            )
          };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const updatedWishlist = state.wishlistItems
            .map((item) =>
              item.id === id
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
            )
            .filter((item) => item.quantity > 0);

          return {
            wishlistItems: updatedWishlist,
            totalWishlistItems: updatedWishlist.reduce(
              (total, item) => total + item.quantity,
              0
            )
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const updatedWishlist = state.wishlistItems.filter(
            (item) => item.id !== id
          );

          return {
            wishlistItems: updatedWishlist,
            totalWishlistItems: updatedWishlist.reduce(
              (total, item) => total + item.quantity,
              0
            )
          };
        }),

      clearWishlist: () =>
        set(() => ({
          wishlistItems: [],
          totalWishlistItems: 0
        }))
    }),
    {
      name: "wishlist-storage"
    }
  )
);
