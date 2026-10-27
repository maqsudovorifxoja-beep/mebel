import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useComparison } from '../../context/ComparisonContext';
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
  PhoneCall,
  Sliders,
  Scale,
} from 'lucide-react';

export const Navbar = () => {
  const { lang, changeLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { totalWishlist } = useWishlist();
  const { totalCompared, openDrawer: openComparisonDrawer } = useComparison();
  const { openSettingsModal, botToken } = useTelegram();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/catalog', label: t.nav.catalog },
    { to: '/rooms', label: t.nav.rooms },
    { to: '/custom-order', label: t.nav.customOrder },
    { to: '/about', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ];

  const languages = [
    { code: 'uz', label: "Oʻzbekcha", short: 'UZ' },
    { code: 'ru', label: 'Русский', short: 'RU' },
    { code: 'en', label: 'English', short: 'EN' },
  ];

  const headerStyle = {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 900,
    height: 'var(--header-height)',
    backgroundColor: isScrolled ? 'var(--surface-glass)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
    WebkitBackdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
    borderBottom: isScrolled ? '1px solid var(--border)' : '1px solid transparent',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <>
      <header style={headerStyle}>
        <div
          className="container"
          style={{
            maxWidth: '1440px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--r-sm)',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0e100f',
                fontWeight: 800,
                fontSize: '1.1rem',
                fontFamily: 'var(--font-display)',
              }}
            >
              G
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
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
                  fontSize: '0.62rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  fontWeight: 500,
                  display: 'block',
                }}
              >
                Atelier · Toshkent
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="desktop-nav"
            style={{
              display: 'none',
              gap: 'clamp(12px, 1.6vw, 24px)',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.88rem',
                  position: 'relative',
                  padding: '6px 2px',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  lineHeight: 1,
                  transition: 'color var(--t-fast)',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            {/* Language */}
            <div ref={langRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="btn-icon"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--r-sm)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  gap: '4px',
                  display: 'flex',
                  padding: 0,
                }}
                aria-label="Language selector"
              >
                <Globe size={14} color="var(--accent)" />
                <span style={{ fontSize: '0.72rem' }}>{lang.toUpperCase()}</span>
              </button>

              {langOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-sm)',
                    boxShadow: 'var(--shadow-lg)',
                    minWidth: '140px',
                    zIndex: 1000,
                    overflow: 'hidden',
                    animation: 'fadeIn 0.15s ease',
                  }}
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        changeLanguage(l.code);
                        setLangOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '9px 14px',
                        fontSize: '0.84rem',
                        fontWeight: lang === l.code ? 600 : 400,
                        color: lang === l.code ? 'var(--accent)' : 'var(--text-primary)',
                        backgroundColor: lang === l.code ? 'var(--accent-subtle)' : 'transparent',
                        display: 'block',
                        transition: 'background 0.1s ease',
                      }}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="btn-icon"
              style={{ width: '36px', height: '36px' }}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} color="var(--accent)" /> : <Moon size={16} />}
            </button>

            {/* TG Bot */}
            <button
              onClick={openSettingsModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 10px',
                borderRadius: 'var(--r-sm)',
                background: '#229ED9',
                color: '#fff',
                fontSize: '0.78rem',
                fontWeight: 600,
                transition: 'background 0.15s ease',
              }}
              title="Telegram Bot"
            >
              <Send size={13} />
              <span className="desktop-only-text">Bot</span>
              {botToken ? (
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#34d399',
                    display: 'inline-block',
                  }}
                  title="Bot ulangan"
                />
              ) : null}
            </button>

            {/* Comparison */}
            <button
              onClick={openComparisonDrawer}
              className="btn-icon"
              style={{ width: '36px', height: '36px', position: 'relative' }}
              title={lang === 'uz' ? 'Taqqoslash' : 'Сравнение моделей'}
              aria-label="Compare"
            >
              <Scale size={16} />
              {totalCompared > 0 && (
                <span style={badgeCountStyle}>{totalCompared}</span>
              )}
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="btn-icon"
              style={{ width: '36px', height: '36px', position: 'relative' }}
              title={t.nav.wishlist}
              aria-label="Wishlist"
            >
              <Heart size={16} />
              {totalWishlist > 0 && (
                <span style={badgeCountStyle}>{totalWishlist}</span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn-icon"
              style={{ width: '36px', height: '36px', position: 'relative' }}
              title={t.nav.cart}
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={16} />
              {totalItems > 0 && (
                <span style={badgeCountStyle}>{totalItems}</span>
              )}
            </Link>

            {/* Admin */}
            <Link
              to="/admin"
              className="btn-icon"
              style={{
                width: '36px',
                height: '36px',
              }}
              title="Admin Panel"
            >
              <Sliders size={14} color="var(--accent)" />
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                width: '36px',
                height: '36px',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
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
            borderTop: '1px solid var(--border)',
            animation: 'fadeIn 0.2s ease',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '1.1rem',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                })}
              >
                <span>{link.label}</span>
                <ChevronDown size={16} style={{ transform: 'rotate(-90deg)', opacity: 0.4 }} />
              </NavLink>
            ))}
          </div>

          <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              {t.brandTagline}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
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
    </>
  );
};

const badgeCountStyle = {
  position: 'absolute',
  top: '-4px',
  right: '-4px',
  backgroundColor: 'var(--accent)',
  color: '#0e100f',
  fontSize: '0.65rem',
  fontWeight: 700,
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
};
