import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTelegram } from '../../context/TelegramContext';
import { 
  Sun, 
  Moon, 
  ShoppingBag, 
  Heart, 
  Send, 
  Menu, 
  X, 
  Globe, 
  ChevronDown,
  Sparkles,
  PhoneCall,
  Sliders,
  ShieldCheck
} from 'lucide-react';

export const Navbar = () => {
  const { lang, changeLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const { openSettingsModal, botToken } = useTelegram();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/catalog', label: t.nav.catalog },
    { to: '/rooms', label: t.nav.rooms },
    { to: '/custom-order', label: t.nav.customOrder },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  const languages = [
    { code: 'uz', label: 'Oʻzbekcha', short: 'UZ' },
    { code: 'ru', label: 'Русский', short: 'RU' },
    { code: 'en', label: 'English', short: 'EN' },
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          height: 'var(--header-height)',
          backgroundColor: isScrolled ? 'var(--surface-glass)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-light)' : '1px solid transparent',
          transition: 'all var(--transition-normal)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '1440px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
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
                boxShadow: 'var(--shadow-gold)',
              }}
            >
              G
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: 'var(--text-primary)',
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                GRAND MEBEL
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-gold)',
                  fontWeight: 600,
                  display: 'block',
                }}
              >
                Atelier 2026
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'none', gap: 'clamp(14px, 1.6vw, 24px)', alignItems: 'center', whiteSpace: 'nowrap' }} className="desktop-nav">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.92rem',
                  position: 'relative',
                  padding: '6px 0',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  transition: 'color var(--transition-fast)',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            {/* Language Switcher */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)',
                  background: 'var(--surface)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
                aria-label="Language selector"
              >
                <Globe size={15} color="var(--accent-gold)" />
                <span>{lang.toUpperCase()}</span>
                <ChevronDown size={14} />
              </button>

              {langDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-md)',
                    minWidth: '130px',
                    zIndex: 1000,
                    overflow: 'hidden',
                  }}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        changeLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 14px',
                        fontSize: '0.86rem',
                        fontWeight: lang === l.code ? 600 : 400,
                        color: lang === l.code ? 'var(--accent-gold)' : 'var(--text-primary)',
                        backgroundColor: lang === l.code ? 'var(--surface-hover)' : 'transparent',
                        display: 'block',
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                background: 'var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                transition: 'all var(--transition-fast)',
              }}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} color="#d4af37" /> : <Moon size={18} />}
            </button>

            {/* Telegram Bot Settings Modal Trigger */}
            <button
              onClick={openSettingsModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: '#24A1DE',
                color: '#fff',
                fontSize: '0.82rem',
                fontWeight: 600,
                boxShadow: '0 2px 10px rgba(36, 161, 222, 0.3)',
              }}
              title="Telegram Bot Integratsiyasi"
            >
              <Send size={15} />
              <span className="desktop-only-text">TG Bot</span>
              {botToken ? (
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: '#00ff88',
                    display: 'inline-block',
                  }}
                  title="Bot ulangan"
                />
              ) : null}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                background: 'var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                position: 'relative',
              }}
              title={t.nav.wishlist}
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {totalWishlist > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: 'var(--accent-gold)',
                    color: '#0d0f12',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                background: 'var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                position: 'relative',
              }}
              title={t.nav.cart}
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    backgroundColor: 'var(--accent-gold)',
                    color: '#0d0f12',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Admin Panel Link */}
            <Link
              to="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
              title="Admin Panel (Boshqaruv)"
            >
              <Sliders size={15} color="var(--accent-gold)" />
              <span className="desktop-only-text">Admin</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                background: 'var(--surface)',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 'var(--header-height)',
            background: 'var(--surface)',
            zIndex: 890,
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-light)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '1.2rem',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                })}
              >
                <span>{link.label}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>→</span>
              </NavLink>
            ))}
          </div>

          <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border-light)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              {t.brandTagline}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="tel:+998712004488"
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                <PhoneCall size={14} /> +998 71 200 44 88
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSettingsModal();
                }}
                className="btn btn-telegram btn-sm"
                style={{ flex: 1 }}
              >
                <Send size={14} /> TG Bot
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 991px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          .desktop-only-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
