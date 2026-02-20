import { create } from 'zustand';

export type CartItem = {
  id: string;
  sku?: string;
  slug?: string;
  title: string;
  brand: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

type Store = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const useStore = create<Store>()((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          ),
        };
      }

      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
      };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart
        .map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useStore;
