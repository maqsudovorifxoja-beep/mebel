import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTelegram } from '../../context/TelegramContext';
import { CATEGORIES } from '../../data/products';
import {
  Send,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Award,
  Truck,
} from 'lucide-react';

export const Footer = () => {
  const { lang, t } = useLanguage();
  const { openSettingsModal } = useTelegram();

  return (
    <footer style={footerStyle}>
      <div className="container">
        {/* Trust badges */}
        <div style={trustGrid}>
          {[
            {
              icon: Award,
              title: lang === 'uz' ? '100% Tabiiy Massiv' : lang === 'ru' ? '100% Массив' : '100% Solid Hardwood',
              desc: lang === 'uz' ? 'Eman, buk va yongʻoq' : lang === 'ru' ? 'Дуб, бук, орех' : 'Oak, beech, walnut',
            },
            {
              icon: ShieldCheck,
              title: lang === 'uz' ? '5 Yil Kafolat' : lang === 'ru' ? '5 Лет Гарантии' : '5-Year Warranty',
              desc: lang === 'uz' ? 'Karkas va furnituralarga' : lang === 'ru' ? 'На каркас и фурнитуру' : 'Frame & mechanisms',
            },
            {
              icon: Truck,
              title: lang === 'uz' ? 'Bepul Yetkazish' : lang === 'ru' ? 'Бесплатная Сборка' : 'Free Delivery',
              desc: lang === 'uz' ? 'Toshkent boʻylab' : lang === 'ru' ? 'По Ташкенту' : 'Across Tashkent',
            },
          ].map((item, i) => (
            <div key={i} style={trustItem}>
              <div style={trustIcon}>
                <item.icon size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: '2px' }}>{item.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={dividerStyle} />

        {/* Links grid */}
        <div style={linksGrid}>
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent)' }}>
                GRAND MEBEL
              </span>
            </Link>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 style={colTitle}>{t.footer.pagesTitle}</h4>
            <ul style={linkList}>
              {[
                { to: '/', label: t.nav.home },
                { to: '/catalog', label: t.nav.catalog },
                { to: '/rooms', label: t.nav.rooms },
                { to: '/custom-order', label: t.nav.customOrder },
                { to: '/about', label: t.nav.about },
                { to: '/contact', label: t.nav.contact },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} style={linkStyle}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={colTitle}>{t.footer.categoriesTitle}</h4>
            <ul style={linkList}>
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <Link to={`/catalog?category=${cat.id}`} style={linkStyle}>
                    {cat.name[lang] || cat.name.uz}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={colTitle}>{t.contact.title}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <MapPin size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{t.contact.addressValue}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                <span>+998 (71) 200-44-88</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Clock size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                <span>09:00 – 21:00 ({lang === 'uz' ? 'Dam olishsiz' : lang === 'ru' ? 'Без выходных' : 'Every day'})</span>
              </div>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="btn btn-telegram btn-sm"
                style={{ marginTop: '6px', width: '100%', gap: '6px' }}
              >
                <Send size={14} />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>

        <div style={dividerStyle} />

        {/* Bottom bar */}
        <div style={bottomBar}>
          <p>{t.footer.copyright}</p>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem' }}>
            <span>Toshkent, Uzbekistan</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Bespoke Atelier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: 'var(--bg-secondary)',
  borderTop: '1px solid var(--border)',
  paddingTop: '56px',
  paddingBottom: '28px',
};

const trustGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '20px',
  paddingBottom: '40px',
};

const trustItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
};

const trustIcon = {
  width: '40px',
  height: '40px',
  borderRadius: 'var(--r-sm)',
  backgroundColor: 'var(--accent-subtle)',
  color: 'var(--accent)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const dividerStyle = {
  height: '1px',
  background: 'var(--border)',
  margin: '0 0 40px',
};

const linksGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '36px',
  marginBottom: '40px',
};

const colTitle = {
  fontSize: '0.92rem',
  fontWeight: 600,
  marginBottom: '14px',
  color: 'var(--text-primary)',
};

const linkList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const linkStyle = {
  color: 'var(--text-secondary)',
  fontSize: '0.84rem',
  transition: 'color 0.15s ease',
};

const bottomBar = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  fontSize: '0.78rem',
  color: 'var(--text-muted)',
};
