import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Armchair, 
  ShoppingBag, 
  Ruler, 
  Send, 
  Store, 
  ChevronRight, 
  Sliders, 
  ShieldAlert,
  X,
  LogOut
} from 'lucide-react';

export const AdminSidebar = ({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) => {
  const { orders, customInquiries } = useOrders();
  const { logout } = useAuth();

  const newOrdersCount = orders.filter((o) => o.status === 'new').length;
  const newInquiriesCount = customInquiries.filter((i) => i.status === 'new').length;

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard & Statistika',
      icon: LayoutDashboard,
    },
    {
      id: 'products',
      label: 'Mebellar Boshqaruvi',
      icon: Armchair,
    },
    {
      id: 'orders',
      label: 'Buyurtmalar',
      icon: ShoppingBag,
      badge: newOrdersCount > 0 ? newOrdersCount : null,
      badgeColor: 'var(--accent-gold)',
    },
    {
      id: 'inquiries',
      label: 'Maxsus Buyurtmalar',
      icon: Ruler,
      badge: newInquiriesCount > 0 ? newInquiriesCount : null,
      badgeColor: '#24A1DE',
    },
    {
      id: 'telegram',
      label: 'Telegram Bot API',
      icon: Send,
    },
  ];

  return (
    <>
      <aside
        className={`admin-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}
        style={{
          width: '280px',
          backgroundColor: 'var(--surface)',
          borderRight: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 850,
          transition: 'transform var(--transition-normal)',
        }}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div
            style={{
              padding: '24px 20px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, var(--accent-gold), #8f6d14)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0d0f12',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                G
              </div>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, lineHeight: 1.1 }}>
                  GRAND MEBEL
                </h2>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: 'var(--accent-gold)',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Admin Boshqaruv
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            {setIsMobileOpen && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="admin-mobile-close"
                style={{ display: 'none', color: 'var(--text-muted)' }}
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Sidebar Menu Items */}
          <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              style={{
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                padding: '8px 12px',
                fontWeight: 600,
              }}
            >
              Asosiy Menyu
            </div>

            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (setIsMobileOpen) setIsMobileOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 500,
                    backgroundColor: isActive ? 'var(--accent-gold-light)' : 'transparent',
                    color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    border: `1px solid ${isActive ? 'var(--accent-gold)' : 'transparent'}`,
                    transition: 'all var(--transition-fast)',
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <IconComp size={18} color={isActive ? 'var(--accent-gold)' : 'var(--text-secondary)'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: item.badgeColor,
                        color: '#0d0f12',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Link to Store & Logout */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link
            to="/"
            className="btn btn-outline"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '10px',
              fontSize: '0.88rem',
              gap: '8px',
            }}
          >
            <Store size={16} />
            <span>Saytga Qaytish</span>
          </Link>

          <button
            onClick={logout}
            className="btn btn-outline"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '10px',
              fontSize: '0.88rem',
              gap: '8px',
              color: 'var(--danger)',
              borderColor: 'rgba(211, 47, 47, 0.3)',
            }}
          >
            <LogOut size={16} />
            <span>Tizimdan Chiqish</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 840,
          }}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            position: fixed !important;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-100%);
          }
          .admin-sidebar.mobile-open {
            transform: translateX(0);
          }
          .admin-mobile-close {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};
