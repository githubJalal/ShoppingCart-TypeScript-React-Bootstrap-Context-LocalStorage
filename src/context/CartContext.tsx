import { ReactNode, createContext, useState } from "react";
import CartSidebar from "../components/CartSidebar";

import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProviderProp = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  qty: number;
};

type CartContext = {
  getItemQty: (id: number) => number;
  addItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;

  cartQty: number;
  cartItems: CartItem[];

  openCartSidebar: () => void;
  closeCartSidebar: () => void;
};

export const CartContext = createContext({} as CartContext);

export function CartProvider({ children }: CartProviderProp) {
  const [isOpen, setIsOpen] = useState(false);

  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",[]);

  const cartQty = cartItems.reduce((qty, item) => qty + item.qty, 0);

  const openCartSidebar = () => setIsOpen(true);
  const closeCartSidebar = () => setIsOpen(false);

  function getItemQty(id: number) {
    return cartItems.find((item) => item.id === id)?.qty || 0;
  }

  function addItem(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, qty: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseItem(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.qty == 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeItem(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        cartQty,
        cartItems,
        getItemQty,
        addItem,
        decreaseItem,
        removeItem,
        openCartSidebar,
        closeCartSidebar,
      }}
    >
      {children}
      <CartSidebar isOpen={isOpen} />
    </CartContext.Provider>
  );
}
