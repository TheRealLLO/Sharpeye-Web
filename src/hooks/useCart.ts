import { useContext } from 'react';
import { CartContext } from 'contexts/cartContext/cart-context';
import type { CartContextType } from 'contexts/cartContext/cart-context';


export const useCart = <T = CartContextType>() => useContext(CartContext) as T;