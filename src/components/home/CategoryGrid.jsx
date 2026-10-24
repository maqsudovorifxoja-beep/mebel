import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid = () => {
  const { lang } = useLanguage();

  const categories = [
    {
      id: 'sofa',
      title: { uz: 'Yumshoq Mebellar', ru: 'Мягкая Мебель', en: 'Sofas & Lounges' },
      desc: { uz: 'Italiya baxmali, qulay ergonomika', ru: 'Итальянский бархат и эргономика', en: 'Italian velvet & supreme comfort' },
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      count: '18+',
      span: 'large',
    },
    {
      id: 'bedroom',
      title: { uz: 'Yotoqxona', ru: 'Спальня', en: 'Bedrooms' },
      desc: { uz: 'Sogʻlom uyqu va hashamat', ru: 'Сон и эстетика', en: 'Restorative rest & craft' },
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      count: '14+',
      span: 'normal',
    },
    {
      id: 'kitchen',
      title: { uz: 'Oshxona', ru: 'Кухня', en: 'Kitchen & Dining' },
      desc: { uz: 'Calacatta marmari, kvars', ru: 'Мрамор Calacatta и кварц', en: 'Calacatta marble & quartz' },
      image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
      count: '12+',
      span: 'normal',
    },
    {
      id: 'living',
      title: { uz: 'Mehmonxona', ru: 'Гостиная', en: 'Living Room' },
      desc: { uz: 'Travertin, rifleniy konsol', ru: 'Травертин и рифленые фасады', en: 'Travertine & fluted wood' },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      count: '16+',
      span: 'normal',
    },
    {
      id: 'office',
      title: { uz: 'Ofis & Kabinet', ru: 'Кабинет', en: 'Executive Office' },
      desc: { uz: 'Tabiiy yongʻoq, qulaylik', ru: 'Американский орех', en: 'American walnut & prestige' },
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
      count: '9+',
      span: 'normal',
    },
    {
      id: 'storage',
      title: { uz: 'Shkaflar', ru: 'Гардеробные', en: 'Walk-In Closets' },
      desc: { uz: 'Bronza shisha, LED chiroq', ru: 'Бронзовое стекло и LED', en: 'Bronze glass & sensor lights' },
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80',
      count: '11+',
      span: 'large',
    },
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>{lang === 'uz' ? 'Xonalar boʻyicha' : lang === 'ru' ? 'По категориям' : 'By Space'}</span>
          </div>
          <h2 className="section-title">
            {lang === 'uz'
              ? 'Har Bir Xona Uchun Mukammal Yechim'
              : lang === 'ru'
              ? 'Мебель Для Каждого Пространства'
              : 'Curated for Every Living Space'}
          </h2>
          <p className="section-subtitle">
            {lang === 'uz'
              ? 'Mehmonxonadan tortib shaxsiy kabinetgacha — har bir burchakni nafosat bilan toʻldiramiz.'
              : lang === 'ru'
              ? 'От уютной гостиной до представительского кабинета.'
              : 'From private bedrooms to open-concept living suites.'}
          </p>
        </div>

        <div style={gridStyle}>
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              style={{
                ...cardStyle,
                gridColumn: cat.span === 'large' ? 'span 2' : 'span 1',
                height: cat.span === 'large' ? '380px' : '320px',
                animationDelay: `${i * 80}ms`,
              }}
              className="category-card animate-fade-in-up"
            >
              <img
                src={cat.image}
                alt={cat.title[lang] || cat.title.uz}
                loading="lazy"
                style={imageStyle}
              />
              <div style={overlayStyle} />
              <div style={contentStyle}>
                <div style={topRow}>
                  <span style={countStyle}>
                    {cat.count} {lang === 'uz' ? 'model' : lang === 'ru' ? 'моделей' : 'models'}
                  </span>
                  <div style={arrowCircle}>
                    <ArrowUpRight size={15} />
                  </div>
                </div>
                <div>
                  <h3 style={titleStyle}>{cat.title[lang] || cat.title.uz}</h3>
                  <p style={descStyle}>{cat.desc[lang] || cat.desc.uz}</p>
                </div>
              </div>

              <style>{`
                .category-card img {
                  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) !important;
                }
                .category-card:hover img {
                  transform: scale(1.06) !important;
                }
                .category-card:hover .arrow-circle {
                  background: var(--accent) !important;
                  color: #0e100f !important;
                }
              `}</style>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .category-card {
            grid-column: span 1 !important;
            height: 260px !important;
          }
        }
      `}</style>
    </section>
  );
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
};

const cardStyle = {
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 'var(--r-md)',
  display: 'block',
  textDecoration: 'none',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  inset: 0,
};

const overlayStyle = {
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(to top, rgba(14, 16, 15, 0.78) 0%, rgba(14, 16, 15, 0.15) 60%, rgba(14, 16, 15, 0.05) 100%)',
};

const contentStyle = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '20px',
  color: '#ffffff',
};

const topRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
};

const countStyle = {
  fontSize: '0.72rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0.65)',
  fontWeight: 500,
};

const arrowCircle = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(4px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.25s ease',
};

const titleStyle = {
  fontSize: '1.25rem',
  color: '#ffffff',
  marginBottom: '4px',
  fontFamily: 'var(--font-display)',
  fontWeight: 600,
};

const descStyle = {
  fontSize: '0.82rem',
  color: 'rgba(255, 255, 255, 0.7)',
  lineHeight: 1.4,
};
