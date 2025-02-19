import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";

interface WishlistItem {
  id: string;
  title: string;
  image: string;
  quantity: number;
}

interface WishlistState {
  wishlistItems: WishlistItem[];
  totalWishlistItems: number;
  isWishlistOpen: boolean;
  toggleItem: (product: Omit<WishlistItem, "quantity">) => void;
  toggleWishlistPanel: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
}

const calculateTotal = (items: WishlistItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

const findItemIndex = (items: WishlistItem[], id: string) =>
  items.findIndex((item) => item.id === id);

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      wishlistItems: [],
      totalWishlistItems: 0,
      isWishlistOpen: false,

      toggleWishlistPanel: () =>
        set((state) => ({
          isWishlistOpen: !state.isWishlistOpen
        })),

      toggleItem: (product) =>
        set((state) => {
          // Find the product in the wishlist
          const itemIndex = findItemIndex(state.wishlistItems, product.id);
          // If product not found (-1), add it with quantity: 1
          // If product found, remove by .slice()
          const updatedWishlist =
            itemIndex === -1
              ? [...state.wishlistItems, { ...product, quantity: 1 }]
              : [
                  ...state.wishlistItems.slice(0, itemIndex),
                  ...state.wishlistItems.slice(itemIndex + 1)
                ];

          return {
            wishlistItems: updatedWishlist,
            totalWishlistItems: calculateTotal(updatedWishlist)
          };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          // Find product in wishlist
          const itemIndex = findItemIndex(state.wishlistItems, id);

          // If product doesn't exist, return current state
          if (itemIndex === -1) return state;

          // if new quantity same as old -> no update needed
          if (state.wishlistItems[itemIndex].quantity === quantity)
            return state;

          const updatedWishlist = [...state.wishlistItems];
          updatedWishlist[itemIndex] = {
            ...updatedWishlist[itemIndex],
            quantity: Math.max(1, quantity)
          };

          return {
            wishlistItems: updatedWishlist,
            totalWishlistItems: calculateTotal(updatedWishlist)
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const itemIndex = findItemIndex(state.wishlistItems, id);

          if (itemIndex === -1) return state;

          const updatedWishlist = [
            ...state.wishlistItems.slice(0, itemIndex),
            ...state.wishlistItems.slice(itemIndex + 1)
          ];

          return {
            wishlistItems: updatedWishlist,
            totalWishlistItems: calculateTotal(updatedWishlist)
          };
        }),

      clearWishlist: () =>
        set({
          wishlistItems: [],
          totalWishlistItems: 0,
          isWishlistOpen: false
        })
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({
        wishlistItems: state.wishlistItems,
        totalWishlistItems: state.totalWishlistItems
      })
    }
  )
);
export const useWishlistItem = (id: string) =>
  useWishlist((state) => state.wishlistItems.find((item) => item.id === id));

export const useWishlistCount = () =>
  useWishlist((state) => state.totalWishlistItems);

export const useWishlistOpen = () =>
  useWishlist((state) => state.isWishlistOpen);

export const useWishlistActions = () =>
  useWishlist(
    useShallow((state) => ({
      updateQuantity: state.updateQuantity,
      removeItem: state.removeItem
    }))
  );

export type { WishlistItem };
