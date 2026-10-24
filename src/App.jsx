import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { TelegramProvider } from './context/TelegramContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { TelegramSettingsModal } from './components/layout/TelegramSettingsModal';
import { ToastContainer } from './components/common/ToastContainer';
import { AIAssistantWidget } from './components/ai/AIAssistantWidget';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RoomsLookbookPage } from './pages/RoomsLookbookPage';
import { CustomOrderPage } from './pages/CustomOrderPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/admin/AdminPage';

// Scroll to top on page navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Route controller that distinguishes between storefront and admin layout
const AppContent = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main key={location.pathname} className="page-transition" style={{ flex: 1 }}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/rooms" element={<RoomsLookbookPage />} />
          <Route path="/custom-order" element={<CustomOrderPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProductProvider>
          <OrderProvider>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <TelegramProvider>
                    <BrowserRouter>
                      <ScrollToTop />
                      <AppContent />
                      {/* Global Modals, AI Assistant & Notifications */}
                      <TelegramSettingsModal />
                      <ToastContainer />
                      <AIAssistantWidget />
                    </BrowserRouter>
                  </TelegramProvider>
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </OrderProvider>
        </ProductProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
