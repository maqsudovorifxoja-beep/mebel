import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  ArrowRight, 
  Ruler, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  Sparkles, 
  ShoppingBag, 
  X,
  Play,
  Pause
} from 'lucide-react';

const HERO_SCENES = [
  {
    id: 'living',
    tag: { uz: 'Yangi Kolleksiya 2026', ru: 'Новая Коллекция 2026', en: 'New 2026 Collection' },
    title: { 
      uz: 'Uyingizga Haqiqiy Italiya Hashamati va Qulayligini Olib Kiring', 
      ru: 'Итальянская Элегантность и Абсолютный Комфорт', 
      en: 'Italian Architectural Grandeur & Unrivaled Comfort' 
    },
    subtitle: {
      uz: 'Mualliflik mebellari, tabiiy yogʻoch, Italiya baxmali va Rim marmaridan tayyorlangan 100% individual dizayn.',
      ru: 'Авторская мебель из массива дуба, натурального мрамора и итальянского бархата по индивидуальным размерам.',
      en: 'Bespoke furniture handcrafted from European oak, Calacatta marble, and water-repellent Italian velvet.'
    },
    image: '/hero-main.jpg',
    hotspots: [
      {
        id: 'spot-sofa',
        top: '68%',
        left: '46%',
        productId: 'sofa-milano-velvet',
        name: 'Milano Royal Baxmal Divan',
        price: '18 500 000 soʻm',
        thumb: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 'spot-coffee',
        top: '78%',
        left: '68%',
        productId: 'table-verona-marble',
        name: 'Verona Marmar Kofe Stoli',
        price: '16 800 000 soʻm',
        thumb: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=300&q=80'
      }
    ]
  },
  {
    id: 'bedroom',
    tag: { uz: 'Sokin Hashamat', ru: 'Гармония Сна', en: 'Restorative Serenity' },
    title: { 
      uz: 'Mukammal Uyqu va Akustik Tinchlik Yarating', 
      ru: 'Пространство Идеального Сна и Тишины', 
      en: 'Sculptural Beds Crafted for Restorative Sleep' 
    },
    subtitle: {
      uz: 'Ortopedik qulaylik, yumshoq bukle qoplamasi va shovqinsiz yopiluvchi yashirin saqlash tizimlari.',
      ru: 'Анатомическая поддержка, роскошное фактурное букле и бесшумные подъемные механизмы.',
      en: 'Orthopedic sleep systems wrapped in tactile bouclé with silent hydraulic under-bed storage.'
    },
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'spot-bed',
        top: '60%',
        left: '52%',
        productId: 'bed-venezia-king',
        name: 'Venezia King Ortopedik Karavot',
        price: '24 200 000 soʻm',
        thumb: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=300&q=80'
      }
    ]
  },
  {
    id: 'kitchen',
    tag: { uz: 'Arxitekturaviy Oshxonalar', ru: 'Архитектурные Кухни', en: 'Architectural Kitchens' },
    title: { 
      uz: 'Har Bir Tafsilotida Nozik Sanʼat: Verona & Kvars Oroli', 
      ru: 'Эстетика Чистых Линий: Мрамор и Шпон Ореха', 
      en: 'Pure Monolith Slabs & Fluted American Walnut' 
    },
    subtitle: {
      uz: 'Italiya tabiiy Calacatta marmari, nemis furniturasi va xonadoningiz burchagiga 1 millimetrgacha moslashtirilgan montaj.',
      ru: 'Итальянский мрамор Calacatta, фурнитура Blum и ювелирная подгонка с точностью до миллиметра.',
      en: 'Natural Italian marble tops paired with soft-close German hardware and seamless edge craftsmanship.'
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'spot-dining',
        top: '64%',
        left: '70%',
        productId: 'table-verona-marble',
        name: 'Verona Calacatta Marmar Stol',
        price: '16 800 000 soʻm',
        thumb: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=300&q=80'
      }
    ]
  }
];

export const HeroSection = () => {
  const { lang, t } = useLanguage();
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [lightingMode, setLightingMode] = useState('night'); // 'day' or 'night'
  const [isPlaying, setIsPlaying] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const autoPlayRef = useRef(null);
  const activeScene = HERO_SCENES[currentSceneIdx];

  // Auto transition scenes
  useEffect(() => {
    if (!isPlaying) return;
    autoPlayRef.current = setInterval(() => {
      setCurrentSceneIdx((prev) => (prev + 1) % HERO_SCENES.length);
      setActiveHotspot(null);
    }, 7000);

    return () => clearInterval(autoPlayRef.current);
  }, [isPlaying, currentSceneIdx]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleNext = () => {
    setCurrentSceneIdx((prev) => (prev + 1) % HERO_SCENES.length);
    setActiveHotspot(null);
  };

  const handlePrev = () => {
    setCurrentSceneIdx((prev) => (prev - 1 + HERO_SCENES.length) % HERO_SCENES.length);
    setActiveHotspot(null);
  };

  return (
    <section 
      style={styles.hero}
      aria-label="Grand Mebel Bosh Sahifa Banner"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Images with Cross-fade */}
      {HERO_SCENES.map((scene, idx) => (
        <div
          key={scene.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: currentSceneIdx === idx ? 1 : 0,
            transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 7s ease-out',
            transform: currentSceneIdx === idx ? 'scale(1)' : 'scale(1.04)',
            zIndex: currentSceneIdx === idx ? 1 : 0,
          }}
        >
          <img
            src={scene.image}
            alt={scene.title[lang] || scene.title.uz}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
            }}
          />
        </div>
      ))}

      {/* Dynamic Ambience Lighting Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          transition: 'background 0.8s ease',
          background:
            lightingMode === 'night'
              ? 'linear-gradient(to top, rgba(10, 12, 11, 0.94) 0%, rgba(10, 12, 11, 0.55) 45%, rgba(10, 12, 11, 0.25) 100%)'
              : 'linear-gradient(to top, rgba(20, 22, 20, 0.85) 0%, rgba(20, 22, 20, 0.35) 45%, rgba(255, 255, 255, 0.05) 100%)',
        }}
      />

      {/* Interactive Hotspot Pins on Hero Scene */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        {activeScene.hotspots.map((spot) => (
          <div
            key={spot.id}
            style={{
              position: 'absolute',
              top: spot.top,
              left: spot.left,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'auto',
            }}
          >
            {/* Glowing Hotspot Button */}
            <button
              onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
              aria-label={spot.name}
              style={{
                position: 'relative',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(201, 165, 74, 0.92)',
                border: '2px solid #ffffff',
                color: '#0d0f12',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(201, 165, 74, 0.8)',
                outline: 'none',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(201, 165, 74, 0.7)',
                  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                }}
              />
              <Sparkles size={16} />
            </button>

            {/* Micro Product Card Popup */}
            {activeHotspot === spot.id && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '48px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '230px',
                  backgroundColor: 'rgba(20, 24, 22, 0.94)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(201, 165, 74, 0.4)',
                  borderRadius: '16px',
                  padding: '12px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                  color: '#ffffff',
                  zIndex: 20,
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.68rem', color: '#c9a54a', textTransform: 'uppercase', fontWeight: 700 }}>
                    {lang === 'uz' ? 'Interyerdagi Mebel' : 'Предмет в кадре'}
                  </span>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 0 }}
                  >
                    <X size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                  <img
                    src={spot.thumb}
                    alt=""
                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, lineHeight: 1.25, color: '#ffffff' }}>
                      {spot.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#c9a54a', fontWeight: 700, marginTop: '2px' }}>
                      {spot.price}
                    </div>
                  </div>
                </div>

                <Link
                  to={`/product/${spot.productId}`}
                  className="btn btn-primary btn-sm"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '0.76rem',
                    padding: '6px 10px',
                    borderRadius: '8px',
                  }}
                >
                  <span>{t.catalog.viewDetails}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Hero Content */}
      <div className="container" style={styles.contentWrap}>
        <div style={styles.content}>
          {/* Eyebrow Tag */}
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowLine} />
            <span>{activeScene.tag[lang] || activeScene.tag.uz}</span>
          </div>

          {/* Heading */}
          <h1 style={styles.heading}>
            {activeScene.title[lang] || activeScene.title.uz}
          </h1>

          {/* Subheading */}
          <p style={styles.subheading}>
            {activeScene.subtitle[lang] || activeScene.subtitle.uz}
          </p>

          {/* Actions */}
          <div style={styles.actions}>
            <Link to="/catalog" className="btn btn-primary btn-lg">
              <span>{t.hero.exploreCatalog}</span>
              <ArrowRight size={17} />
            </Link>

            <Link to="/custom-order" className="btn btn-lg" style={styles.btnGhost}>
              <Ruler size={17} />
              <span>{t.hero.customOrderBtn}</span>
            </Link>
          </div>

          {/* Stat Strip */}
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <span style={styles.statValue}>12+</span>
              <span style={styles.statLabel}>{t.hero.stat1}</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statValue}>3 500+</span>
              <span style={styles.statLabel}>{t.hero.stat2}</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statValue}>5 Yil</span>
              <span style={styles.statLabel}>{t.hero.stat3}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Controls Bar (Right Side / Bottom) */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '5%',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          backgroundColor: 'rgba(10, 12, 11, 0.65)',
          backdropFilter: 'blur(12px)',
          padding: '8px 16px',
          borderRadius: 'var(--r-full)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Lighting Mode Switcher */}
        <button
          onClick={() => setLightingMode((m) => (m === 'night' ? 'day' : 'night'))}
          title={lightingMode === 'night' ? 'Kunduzgi yorug‘likka o‘tish' : 'Kechki shinam chiroqqa o‘tish'}
          style={{
            background: 'none',
            border: 'none',
            color: '#c9a54a',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.74rem',
            fontWeight: 600,
            padding: '4px 8px',
            borderRadius: 'var(--r-full)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          {lightingMode === 'night' ? <Moon size={14} /> : <Sun size={14} />}
          <span style={{ color: '#ffffff' }}>
            {lightingMode === 'night' ? 'Kechki Shom' : 'Kunduzgi Nur'}
          </span>
        </button>

        <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Slide Counter */}
        <span style={{ fontSize: '0.8rem', color: '#ffffff', fontWeight: 600, fontFamily: 'monospace' }}>
          0{currentSceneIdx + 1} / 0{HERO_SCENES.length}
        </span>

        {/* Prev / Next Buttons */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={handlePrev}
            aria-label="Oldingi slayd"
            style={styles.navIconBtn}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Keyingi slayd"
            style={styles.navIconBtn}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

const styles = {
  hero: {
    position: 'relative',
    height: '100vh',
    minHeight: '660px',
    maxHeight: '960px',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
    backgroundColor: '#0a0c0b',
  },
  contentWrap: {
    position: 'relative',
    zIndex: 4,
    paddingBottom: '80px',
    width: '100%',
  },
  content: {
    maxWidth: '680px',
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '0.78rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontWeight: '700',
    color: '#c9a54a',
    marginBottom: '20px',
  },
  eyebrowLine: {
    display: 'inline-block',
    width: '32px',
    height: '2px',
    background: '#c9a54a',
  },
  heading: {
    fontSize: 'clamp(2.3rem, 5.2vw, 3.6rem)',
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 700,
    color: '#ffffff',
    lineHeight: 1.12,
    marginBottom: '22px',
    letterSpacing: '-0.02em',
    textShadow: '0 4px 16px rgba(0,0,0,0.5)',
  },
  subheading: {
    fontSize: '1.08rem',
    color: 'rgba(255, 255, 255, 0.82)',
    lineHeight: 1.65,
    marginBottom: '34px',
    maxWidth: '560px',
    textShadow: '0 2px 8px rgba(0,0,0,0.6)',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '14px',
    marginBottom: '44px',
  },
  btnGhost: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(8px)',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  statValue: {
    fontSize: '1.35rem',
    fontWeight: 700,
    color: '#c9a54a',
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  statLabel: {
    fontSize: '0.74rem',
    color: 'rgba(255, 255, 255, 0.65)',
    letterSpacing: '0.04em',
  },
  statDivider: {
    width: '1px',
    height: '32px',
    background: 'rgba(255, 255, 255, 0.15)',
  },
  navIconBtn: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};
