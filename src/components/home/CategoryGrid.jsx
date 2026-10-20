import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid = () => {
  const { lang } = useLanguage();

  const categories = [
    {
      id: 'sofa',
      title: { uz: 'Yumshoq Mebellar & Divanlar', ru: 'Мягкая Мебель и Диваны', en: 'Sofas & Luxury Lounges' },
      desc: { uz: 'Italiya baxmali va qulay ergonomika', ru: 'Итальянский бархат и эргономика', en: 'Italian velvet & supreme comfort' },
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      count: '18+ model',
    },
    {
      id: 'bedroom',
      title: { uz: 'Yotoqxona & Ortopedik Karavotlar', ru: 'Спальни и Кровати', en: 'Bedrooms & Master Beds' },
      desc: { uz: 'Sogʻlom uyqu va hashamatli dizayn', ru: 'Глубокий сон и эстетика', en: 'Restorative rest & timeless craft' },
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      count: '14+ model',
    },
    {
      id: 'kitchen',
      title: { uz: 'Oshxona & Marmar Stollari', ru: 'Кухни и Обеденные Столы', en: 'Kitchen & Marble Dining' },
      desc: { uz: 'Calacatta marmari va kvars orollari', ru: 'Мрамор Calacatta и кварц', en: 'Calacatta marble and quartz' },
      image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
      count: '12+ model',
    },
    {
      id: 'living',
      title: { uz: 'Mehmonxona & TV Konsollari', ru: 'Гостиные и ТВ-тумбы', en: 'Living Room Suites & TV Units' },
      desc: { uz: 'Travertin stollar va rifleniy tumba', ru: 'Травертин и рифленые фасады', en: 'Travertine stone & fluted wood' },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      count: '16+ model',
    },
    {
      id: 'office',
      title: { uz: 'Ofis & Rahbar Stol-Kreslolari', ru: 'Кабинеты и Столы Руководителя', en: 'Executive Office Desks' },
      desc: { uz: 'Tabiiy yongʻoq shpon va qulaylik', ru: 'Американский орех и стиль', en: 'American walnut & prestige' },
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
      count: '9+ model',
    },
    {
      id: 'storage',
      title: { uz: 'Shkaflar & Shisha Garderoblar', ru: 'Гардеробные и Шкафы', en: 'Walk-In Closets & Storage' },
      desc: { uz: 'Bronza shisha va LED yoritgichlar', ru: 'Бронзовое стекло и сенсорный свет', en: 'Bronze tinted glass & sensor lights' },
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80',
      count: '11+ model',
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
              ? 'Har Bir Xona Uchun Mukammal Mebel'
              : lang === 'ru'
              ? 'Идеальная Мебель Для Каждого Пространства'
              : 'Curated Collections for Every Living Space'}
          </h2>
          <p className="section-subtitle">
            {lang === 'uz'
              ? 'Mehmonxonadan tortib shaxsiy kabinetgacha — har bir burchakni nafosat bilan toʻldiramiz.'
              : lang === 'ru'
              ? 'От уютной гостиной до представительского кабинета — бескомпромиссная эстетика.'
              : 'From intimate private bedrooms to open-concept living suites, discover handcrafted distinction.'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/catalog?category=${cat.id}`}
              className="luxury-card"
              style={{
                display: 'block',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                height: '340px',
              }}
            >
              <img
                src={cat.image}
                alt={cat.title[lang] || cat.title.uz}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />

              {/* Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '28px',
                  color: '#ffffff',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--accent-gold)',
                      fontWeight: 600,
                    }}
                  >
                    {cat.count}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.4rem',
                    color: '#ffffff',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  {cat.title[lang] || cat.title.uz}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                  {cat.desc[lang] || cat.desc.uz}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
