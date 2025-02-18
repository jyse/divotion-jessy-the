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
  items: WishlistItem[];
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
      items: [],
      isWishlistOpen: false,
      toggleWishlistPanel: () =>
        set((state) => ({
          isWishlistOpen: !state.isWishlistOpen
        })),
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) {
            return {
              items: state.items.filter((item) => item.id !== product.id)
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                dimensions: product.dimensions,
                quantity: 1 // ✅ Make sure quantity starts at 1
              }
            ]
          };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        })),
      clearWishlist: () =>
        set(() => ({
          items: []
        }))
    }),
    {
      name: "wishlist-storage"
    }
  )
);
