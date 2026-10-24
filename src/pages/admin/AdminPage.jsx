import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminLoginPage } from './AdminLoginPage';
import { DashboardView } from './DashboardView';
import { ProductsView } from './ProductsView';
import { OrdersView } from './OrdersView';
import { CustomInquiriesView } from './CustomInquiriesView';
import { TelegramBotView } from './TelegramBotView';
import { PromoCodesView } from './PromoCodesView';
import { 
  Menu, 
  Sun, 
  Moon, 
  Store, 
  Bell, 
  User, 
  ShieldCheck,
  Plus,
  LogOut
} from 'lucide-react';

export const AdminPage = () => {
  const { isAuthenticated, logout, adminUser } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // If not authenticated, render Login Page
  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* 1. Admin Sidebar (Strict requirement: "uni ichida sidebar bo'lishi shart") */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* 2. Main Admin Workspace Container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowX: 'hidden' }}>
        {/* Admin Top Navigation Bar */}
        <header
          style={{
            height: '70px',
            backgroundColor: 'var(--surface)',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            position: 'sticky',
            top: 0,
            zIndex: 800,
          }}
        >
          {/* Left: Mobile hamburger toggle & title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsMobileOpen(true)}
              className="admin-mobile-toggle"
              style={{
                display: 'none',
                padding: '6px',
                borderRadius: '6px',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)',
              }}
              aria-label="Open Admin Menu"
            >
              <Menu size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
                {activeTab === 'dashboard' && 'Boshqaruv Paneli (Dashboard)'}
                {activeTab === 'products' && 'Mebellar Katalogi Boshqaruvi'}
                {activeTab === 'orders' && 'Buyurtmalar Roʻyxati'}
                {activeTab === 'inquiries' && 'Maxsus Oʻlchamli Buyurtmalar'}
                {activeTab === 'promos' && 'Promokodlar Boshqaruvi'}
                {activeTab === 'telegram' && 'Telegram Bot Sozlamalari'}
              </span>
            </div>
          </div>

          {/* Right: Quick Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                background: 'var(--surface-hover)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
              title="Theme Toggle"
            >
              {isDark ? <Sun size={17} color="#d4af37" /> : <Moon size={17} />}
            </button>

            {/* Link to public store */}
            <Link
              to="/"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Store size={15} color="var(--accent-gold)" />
              <span className="desktop-only-text">Saytga Qaytish</span>
            </Link>

            {/* Admin Avatar Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 12px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-gold)',
                  color: '#0d0f12',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                }}
              >
                A
              </div>
              <div className="desktop-only-text" style={{ fontSize: '0.82rem', lineHeight: 1.2 }}>
                <div style={{ fontWeight: 600 }}>Administrator</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{adminUser.role}</div>
              </div>
            </div>

            {/* Quick Logout Button */}
            <button
              onClick={logout}
              className="btn btn-outline btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--danger)',
                borderColor: 'rgba(211, 47, 47, 0.3)',
                padding: '6px 10px',
              }}
              title="Tizimdan Chiqish"
            >
              <LogOut size={15} />
              <span className="desktop-only-text">Chiqish</span>
            </button>
          </div>
        </header>

        {/* Admin Content Body */}
        <main style={{ padding: '32px 28px', flex: 1 }}>
          {activeTab === 'dashboard' && <DashboardView setActiveTab={setActiveTab} />}
          {activeTab === 'products' && <ProductsView />}
          {activeTab === 'orders' && <OrdersView />}
          {activeTab === 'inquiries' && <CustomInquiriesView />}
          {activeTab === 'promos' && <PromoCodesView />}
          {activeTab === 'telegram' && <TelegramBotView />}
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-mobile-toggle {
            display: flex !important;
          }
          .desktop-only-text {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
