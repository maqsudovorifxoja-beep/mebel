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
  Settings
} from 'lucide-react';

export const Footer = () => {
  const { lang, t } = useLanguage();
  const { openSettingsModal } = useTelegram();

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        paddingTop: '64px',
        paddingBottom: '32px',
        transition: 'background-color var(--transition-normal)',
      }}
    >
      <div className="container">
        {/* Trust Badges Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
            paddingBottom: '48px',
            marginBottom: '48px',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
              }}
            >
              <Award size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px' }}>
                {lang === 'uz' ? '100% Tabiiy Massiv' : lang === 'ru' ? '100% Массив Дерева' : '100% Solid Hardwood'}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {lang === 'uz' ? 'Eman, buk va yongʻoq yogʻochi' : lang === 'ru' ? 'Дуб, бук и благородный орех' : 'Oak, beech, and premium walnut'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px' }}>
                {lang === 'uz' ? '5 Yil Rasmiy Kafolat' : lang === 'ru' ? '5 Лет Гарантии' : '5-Year Official Warranty'}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {lang === 'uz' ? 'Karkas va furnituralarga toʻliq' : lang === 'ru' ? 'На каркас и австрийскую фурнитуру' : 'On frame and Blum mechanisms'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
              }}
            >
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '2px' }}>
                {lang === 'uz' ? 'Bepul Yetkazish & Yigʻish' : lang === 'ru' ? 'Бесплатная Сборка' : 'White Glove Delivery'}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {lang === 'uz' ? 'Toshkent boʻylab xonadoningizga' : lang === 'ru' ? 'По Ташкенту до вашей комнаты' : 'Direct to your room of choice'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Info */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                GRAND MEBEL
              </span>
            </Link>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
              {t.footer.brandDesc}
            </p>
            <button
              onClick={openSettingsModal}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Settings size={15} color="var(--accent-gold)" />
              <span>{t.footer.botSettings}</span>
            </button>
          </div>

          {/* Quick Pages */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              {t.footer.pagesTitle}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/catalog" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {t.nav.catalog}
                </Link>
              </li>
              <li>
                <Link to="/rooms" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {t.nav.rooms}
                </Link>
              </li>
              <li>
                <Link to="/custom-order" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {t.nav.customOrder}
                </Link>
              </li>
              <li>
                <Link to="/about" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              {t.footer.categoriesTitle}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/catalog?category=${cat.id}`}
                    style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}
                  >
                    {cat.name[lang] || cat.name.uz}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              {t.contact.title}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{t.contact.addressValue}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <span>+998 (71) 200-44-88</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Clock size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                <span>09:00 - 21:00 ({lang === 'uz' ? 'Dam olishsiz' : lang === 'ru' ? 'Без выходных' : 'Every day'})</span>
              </div>
              <div style={{ paddingTop: '8px' }}>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-telegram btn-sm"
                  style={{ width: '100%', gap: '8px' }}
                >
                  <Send size={15} />
                  <span>Telegram Kanalimiz</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
          }}
        >
          <p>{t.footer.copyright}</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Tashkent, Uzbekistan</span>
            <span>•</span>
            <span>Bespoke Atelier</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
