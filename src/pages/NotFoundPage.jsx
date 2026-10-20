import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage = () => {
  const { lang } = useLanguage();

  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div style={{ maxWidth: '500px' }}>
        <div
          style={{
            fontSize: '6rem',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            color: 'var(--accent-gold)',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
          {lang === 'uz' ? 'Sahifa topilmadi' : lang === 'ru' ? 'Страница не найдена' : 'Page Not Found'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          {lang === 'uz'
            ? 'Siz qidirayotgan sahifa oʻchirilgan yoki manzili oʻzgartirilgan boʻlishi mumkin.'
            : 'Запрошенная страница не существует или была перемещена.'}
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <Home size={18} />
          <span>{lang === 'uz' ? 'Bosh sahifaga qaytish' : 'На главную'}</span>
        </Link>
      </div>
    </div>
  );
};
