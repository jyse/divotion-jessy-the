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

// ✅ Helper: Calculate total
const calculateTotal = (items: WishlistItem[]) =>
  items.reduce((total, item) => total + item.quantity, 0);

// ✅ Zustand Store
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
          const itemInWishlist = state.wishlistItems.some(
            (item) => item.id === product.id
          );
          let updatedWishlist;
          if (itemInWishlist) {
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
            totalWishlistItems: calculateTotal(updatedWishlist)
          };
        }),

      // updateQuantity: (id, quantity) =>
      // set((state) => {
      //   const updatedWishlist = state.wishlistItems.map((item) =>
      //     item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      //   );
      //   return {
      //     wishlistItems: updatedWishlist,
      //     totalWishlistItems: calculateTotal(updatedWishlist)
      //   };
      // }),
      // set((state) => {
      //   const index = state.wishlistItems.findIndex((item) => item.id === id);
      //   if (index === -1) return state;

      //   const updatedWishlist = [...state.wishlistItems];
      //   updatedWishlist[index] = {
      //     ...updatedWishlist[index],
      //     quantity: Math.max(1, quantity)
      //   };

      //   return {
      //     wishlistItems: updatedWishlist,
      //     totalWishlistItems: calculateTotal(updatedWishlist)
      //   };
      // }),

      // updateQuantity: (id, quantity) =>
      //   set((state) => {
      //     return {
      //       wishlistItems: state.wishlistItems.map(
      //         (item) =>
      //           item.id === id && item.quantity !== quantity
      //             ? { ...item, quantity: Math.max(1, quantity) } // Only replace when quantity actually changes
      //             : item // Keep the same reference otherwise
      //       ),
      //       totalWishlistItems: calculateTotal(state.wishlistItems) // This will not trigger a change if the total count is the same
      //     };
      //   }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const itemIndex = state.wishlistItems.findIndex(
            (item) => item.id === id
          );
          if (itemIndex === -1) return state; // ✅ No change if item not found

          const newWishlistItems = state.wishlistItems.map((item, index) =>
            index === itemIndex
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          );

          return {
            wishlistItems: newWishlistItems,
            totalWishlistItems: calculateTotal(newWishlistItems)
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const updatedWishlist = state.wishlistItems.filter(
            (item) => item.id !== id
          );
          return {
            wishlistItems: updatedWishlist,
            totalWishlistItems: calculateTotal(updatedWishlist)
          };
        }),

      clearWishlist: () =>
        set({
          wishlistItems: [],
          totalWishlistItems: 0
        })
    }),
    {
      name: "wishlist-storage"
    }
  )
);

// ✅ Optimized Zustand Selectors
export const useWishlistItem = (id: string) =>
  useWishlist((state) => state.wishlistItems.find((item) => item.id === id));

export const useWishlistCount = () =>
  useWishlist((state) => state.totalWishlistItems);

export const useWishlistOpen = () =>
  useWishlist((state) => state.isWishlistOpen);

export const useWishlistActions = () =>
  useWishlist(
    useShallow((state: WishlistState) => ({
      updateQuantity: state.updateQuantity,
      removeItem: state.removeItem
    }))
  );
