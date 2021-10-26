import React, {createContext, useState, useEffect} from 'react';
import {addItemsToCart, removeItemFromCart, filterItemFromCart, getCartItemsCount, getCartTotal} from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemsCount: 0,
    cartTotal: 0
});

const CartProvider = ({children}) => {
    const [hidden, setHidden] = useState(true);

    const getItemsFromStorage = () => JSON.parse(window.localStorage.getItem('cartItems'));

    const [cartItems, setCartItems] = useState(getItemsFromStorage() || []);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItem = item => setCartItems(addItemsToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const clearItemFromCart = item => setCartItems(filterItemFromCart(cartItems, item));
    const toggleHidden = () => setHidden(!hidden);

    useEffect(() => {
        setCartItemsCount(getCartItemsCount(cartItems));
        setCartTotal(getCartTotal(cartItems));
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
        
    }, [cartItems])

    return <CartContext.Provider 
    value ={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        clearItemFromCart,
        cartItemsCount,
        cartTotal

    }}
        >
        {children}
        </CartContext.Provider>
}

export default CartProvider;

