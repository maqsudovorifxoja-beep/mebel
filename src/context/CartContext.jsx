import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredPromoCodes } from '../data/promoCodes';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    localStorage.setItem('gm_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, selectedColor = null) => {
    const color = selectedColor || (product.colors && product.colors[0]) || null;
    const colorHex = color ? color.hex : 'default';

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && (item.selectedColor?.hex || 'default') === colorHex
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevItems, { product, quantity, selectedColor: color }];
      }
    });
  };

  const removeFromCart = (productId, colorHex) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.product.id === productId && (item.selectedColor?.hex || 'default') === colorHex)
      )
    );
  };

  const updateQuantity = (productId, colorHex, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, colorHex);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId && (item.selectedColor?.hex || 'default') === colorHex) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    const storedPromos = getStoredPromoCodes();
    const found = storedPromos.find((p) => p.code.toUpperCase() === clean);

    if (!found || !found.isActive) {
      return { success: false, message: "Promokod notoʻgʻri yoki faol emas" };
    }

    if (found.expiresAt) {
      const today = new Date().toISOString().split('T')[0];
      if (today > found.expiresAt) {
        return { success: false, message: "Promokodning amal qilish muddati tugagan" };
      }
    }

    if (found.minOrderAmount && subtotal < found.minOrderAmount) {
      const formattedMin = new Intl.NumberFormat('uz-UZ').format(found.minOrderAmount) + " so'm";
      return { 
        success: false, 
        message: `Ushbu promokod minimal ${formattedMin} xarid uchun amal qiladi` 
      };
    }

    setPromoCode(clean);
    setDiscountPercent(found.discountPercent);
    return { success: true, discountPercent: found.discountPercent };
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalTotal = subtotal - discountAmount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        discountPercent,
        discountAmount,
        finalTotal,
        promoCode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
