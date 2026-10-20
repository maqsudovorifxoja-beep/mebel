import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('gm_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  const toggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlistIds.includes(productId);

  const wishlistProducts = PRODUCTS.filter((product) => wishlistIds.includes(product.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        totalWishlist: wishlistIds.length,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
