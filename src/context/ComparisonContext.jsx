import React, { createContext, useContext, useState, useEffect } from 'react';

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [comparedProducts, setComparedProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_compared_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('gm_compared_products', JSON.stringify(comparedProducts));
    } catch {
      // localStorage unavailable or full
    }
  }, [comparedProducts]);

  const addToCompare = (product) => {
    if (!product || !product.id) return { success: false, reason: 'invalid' };

    if (comparedProducts.some((p) => p.id === product.id)) {
      return { success: false, reason: 'already_added' };
    }

    if (comparedProducts.length >= 4) {
      return { success: false, reason: 'limit_reached' };
    }

    setComparedProducts((prev) => [...prev, product]);
    return { success: true };
  };

  const removeFromCompare = (productId) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => {
    setComparedProducts([]);
    setIsDrawerOpen(false);
  };

  const isCompared = (productId) => {
    return comparedProducts.some((p) => p.id === productId);
  };

  const toggleCompare = (product) => {
    if (isCompared(product.id)) {
      removeFromCompare(product.id);
      return { action: 'removed' };
    } else {
      const res = addToCompare(product);
      return { action: res.success ? 'added' : 'failed', reason: res.reason };
    }
  };

  return (
    <ComparisonContext.Provider
      value={{
        comparedProducts,
        totalCompared: comparedProducts.length,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompared,
        toggleCompare,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const ctx = useContext(ComparisonContext);
  if (!ctx) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return ctx;
};
