import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Sparkles, Compass, Cpu } from 'lucide-react';

export const CraftsmanshipSpotlight = () => {
  const { lang } = useLanguage();

  const materials = [
    {
      title: { uz: 'Yevropa Emon va Yongʻogʻi', ru: 'Массив Европейского Дуба', en: 'European Oak & Walnut' },
      desc: {
        uz: 'FSC sertifikatlangan, 8-10% namlik darajasiga quritilgan mustahkam massiv.',
        ru: 'Камерная сушка до 8-10% влажности, не деформируется со временем.',
        en: 'Kiln-dried to 8-10% moisture, preventing warping for lifetimes.'
      },
      image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=600&q=80',
      icon: Shield,
    },
    {
      title: { uz: 'Italiya Baxmali va Charm', ru: 'Итальянский Бархат и Наппа', en: 'Italian Velvet & Nappa' },
      desc: {
        uz: '100 000+ ishqalanishga bardoshli EasyClean qatlami bilan himoyalangan.',
        ru: '100 000+ циклов истирания, водоотталкивающее нанопокрытие.',
        en: '100,000+ Martindale rubs with EasyClean stain resistance.'
      },
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      icon: Sparkles,
    },
    {
      title: { uz: 'Calacatta Marmari', ru: 'Мрамор Calacatta', en: 'Calacatta Marble' },
      desc: {
        uz: 'Italiya Karara konlaridan keltirilgan, dogʻ qoldirmaydigan himoyali.',
        ru: 'Натуральный камень Каррары с защитой от пищевых красителей.',
        en: 'Quarried in Italy with oleophobic sealant for upkeep.'
      },
      image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80',
      icon: Compass,
    },
    {
      title: { uz: 'Blum & Hettich Mexanizm', ru: 'Фурнитура Blum & Hettich', en: 'Blum & Hettich Hardware' },
      desc: {
        uz: 'Soft-close tizimi, 100 000 marta silliq ishlash kafolati.',
        ru: 'Плавные доводчики, 25+ лет безупречной службы.',
        en: 'Soft-close runners, 100,000+ effortless movements.'
      },
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      icon: Cpu,
    },
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Two-column editorial layout */}
        <div style={layoutStyle}>
          {/* Left — sticky text */}
          <div style={stickyCol}>
            <div className="section-tag" style={{ justifyContent: 'flex-start' }}>
              <span>{lang === 'uz' ? 'Sifat & Material' : lang === 'ru' ? 'Качество' : 'Materials'}</span>
            </div>
            <h2 style={headingStyle}>
              {lang === 'uz'
                ? 'Nega Bizning Mebellar Avloddan-Avlodga Oʻtadi?'
                : lang === 'ru'
                ? 'Почему Наша Мебель Служит Десятилетиями?'
                : 'Built to Transcend Trends'}
            </h2>
            <p style={paraStyle}>
              {lang === 'uz'
                ? 'Arzon komponentlarga murosasiz. Faqat oliy toifali xomashyo va jahon yetakchilari furniturasi.'
                : lang === 'ru'
                ? 'Никаких компромиссов. Только массив, премиальный текстиль и европейская инженерия.'
                : 'No shortcuts, no synthetics. Pure materials crafted with uncompromising integrity.'}
            </p>
          </div>

          {/* Right — material cards */}
          <div style={cardsCol}>
            {materials.map((mat, i) => {
              const IconComponent = mat.icon;
              return (
                <div key={i} className="luxury-card" style={cardStyle}>
                  <div style={cardImageWrap}>
                    <img
                      src={mat.image}
                      alt={mat.title[lang] || mat.title.uz}
                      loading="lazy"
                      style={cardImage}
                    />
                  </div>
                  <div style={cardContent}>
                    <div style={iconBox}>
                      <IconComponent size={18} />
                    </div>
                    <h3 style={cardTitle}>{mat.title[lang] || mat.title.uz}</h3>
                    <p style={cardDesc}>{mat.desc[lang] || mat.desc.uz}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const layoutStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1.4fr',
  gap: '60px',
  alignItems: 'start',
};

const stickyCol = {
  position: 'sticky',
  top: '120px',
};

const headingStyle = {
  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  lineHeight: 1.18,
  marginBottom: '18px',
  letterSpacing: '-0.02em',
};

const paraStyle = {
  fontSize: '1rem',
  color: 'var(--text-secondary)',
  lineHeight: 1.65,
};

const cardsCol = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const cardImageWrap = {
  height: '160px',
  overflow: 'hidden',
};

const cardImage = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
};

const cardContent = {
  padding: '20px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const iconBox = {
  width: '32px',
  height: '32px',
  borderRadius: '6px',
  backgroundColor: 'var(--accent-subtle)',
  color: 'var(--accent)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '12px',
};

const cardTitle = {
  fontSize: '1.02rem',
  marginBottom: '6px',
  fontWeight: 600,
};

const cardDesc = {
  fontSize: '0.82rem',
  color: 'var(--text-secondary)',
  lineHeight: 1.5,
};
