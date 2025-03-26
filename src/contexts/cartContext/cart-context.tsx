import {
  useState,
  useMemo,
  createContext,
  useEffect,
  useCallback,
} from "react";

import { CartItem, Address } from "types/cart";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  address: Address;
  setBillingAddress: (address: Address) => void;
  setBillingEmail: (email: string) => void;
  email: string;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  address: null,
  setBillingAddress: () => {},
  setBillingEmail: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  email: "",
});

export const CartConsumer = CartContext.Consumer;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<Address>(null);
  const [email, setPaymentEmail] = useState<string>("");

  const addToCart = useCallback(
    ({ id, name, price, currency, type }: CartItem) => {
      setCartItems([...cartItems, { id, name, price, currency, type }]);
    },
    [cartItems]
  );

  const removeFromCart = useCallback(
    (id: number) => {
      setCartItems(cartItems.filter((item) => item.id !== id));
    },
    [cartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const setBillingAddress = useCallback(
    ({ country, city, addressLine, postalCode }: Address) => {
      setAddress({ country, city, addressLine, postalCode });
    },
    []
  );

  const setBillingEmail = useCallback((email: string) => {
    setPaymentEmail(email);
  }, []);

  useEffect(() => {
    const storedItems = localStorage.getItem("cartItems");
    setCartItems(
      storedItems && storedItems !== "undefined" ? JSON.parse(storedItems) : []
    );
    const storedAddress = localStorage.getItem("address");
    setAddress(storedAddress ? JSON.parse(storedAddress) : null);
    const storedEmail = localStorage.getItem("email");
    setPaymentEmail(storedEmail ? JSON.parse(storedEmail) : "");
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);

  useEffect(() => {
    localStorage.setItem("email", JSON.stringify(email));
  }),
    [email];

  const cartContextValue = useMemo(
    () => ({
      cartItems,
      addToCart,
      address,
      setBillingAddress,
      setBillingEmail,
      email,
      removeFromCart,
      clearCart,
    }),
    [
      cartItems,
      address,
      addToCart,
      setBillingAddress,
      setBillingEmail,
      email,
      removeFromCart,
      clearCart,
    ]
  );
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
