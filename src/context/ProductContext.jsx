import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as initialProducts } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_products');
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  useEffect(() => {
    localStorage.setItem('gm_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    const id = newProduct.id || 'mebel-' + Date.now();
    const productToAdd = {
      ...newProduct,
      id,
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 1,
      badge: newProduct.badge || 'new',
      inStock: newProduct.inStock !== false,
      images: newProduct.images && newProduct.images.length > 0 
        ? newProduct.images 
        : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'],
    };

    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefaultProducts = () => {
    setProducts(initialProducts);
    localStorage.setItem('gm_products', JSON.stringify(initialProducts));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaultProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
