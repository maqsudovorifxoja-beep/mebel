import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Play, 
  Pause, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  MapPin, 
  CheckCircle,
  Eye,
  ShoppingBag,
  Volume2,
  VolumeX
} from 'lucide-react';

const STORIES = [
  {
    id: 'story-tashkent-city',
    title: { uz: 'Tashkent City Penthouse', ru: 'Пентхаус Tashkent City', en: 'Tashkent City Penthouse' },
    tagline: { uz: 'Toʻliq Neoklassik jihozlash', ru: 'Полная меблировка', en: 'Full turnkey furnishing' },
    thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=300&q=80',
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
        caption: {
          uz: '280 m² lik xonadon uchun maxsus buyurtma asosida tayyorlangan Milano Royal baxmal divani va travertin kofe stoli.',
          ru: 'Индивидуальный комплект для апартаментов 280 м²: диван Milano Royal в итальянском бархате и стол из травертина.',
          en: 'Custom designed for a 280 sqm residence: Milano Royal velvet sectional with travertine coffee table.'
        },
        client: 'Alisher & Madina, Tashkent City',
        taggedProductId: 'sofa-milano-velvet',
        taggedProductName: 'Milano Royal Baxmal Divan',
        taggedPrice: '18 500 000 soʻm'
      },
      {
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
        caption: {
          uz: 'Zumrad yashil baxmal va qora eman yogʻochi kechki iliq chiroqlarda alohida jilo sochadi.',
          ru: 'Изумрудно-зеленый бархат и темный массив дуба создают неповторимый уют в вечернем освещении.',
          en: 'Emerald green Italian velvet and blackened oak glow gorgeously under evening mood lighting.'
        },
        client: 'Mijoz bahosi: 5.0 ⭐',
        taggedProductId: 'sofa-milano-velvet',
        taggedProductName: 'Milano Royal Baxmal Divan',
        taggedPrice: '18 500 000 soʻm'
      }
    ]
  },
  {
    id: 'story-wood-craft',
    title: { uz: 'Eman Karkas Sayqali', ru: 'Мастерская дуба', en: 'Master Woodcraft' },
    tagline: { uz: 'Qoʻl mehnati & Sifat', ru: 'Ручная обработка', en: 'Artisan hand-finish' },
    thumbnail: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=300&q=80',
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85',
        caption: {
          uz: 'Har bir karkas kamida 3 yil tabiiy quritilgan eman va buk yogʻochidan usta duradgorlarimiz tomonidan yigʻiladi.',
          ru: 'Каждый каркас собирается вручную из массива дуба и бука естественной трехлетней сушки.',
          en: 'Every frame is hand-jointed from naturally aged European oak and beech timbers.'
        },
        client: 'Grand Mebel Ustaxonasi',
        taggedProductId: 'bed-venezia-king',
        taggedProductName: 'Venezia King Ortopedik Karavot',
        taggedPrice: '24 200 000 soʻm'
      }
    ]
  },
  {
    id: 'story-velvet-colors',
    title: { uz: 'Yangi 2026 Baxmallar', ru: 'Бархат 2026', en: '2026 Velvet Atelier' },
    tagline: { uz: 'Suv oʻtkazmaydigan matolar', ru: 'EasyClean ткани', en: 'Water-repellent weave' },
    thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=300&q=80',
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
        caption: {
          uz: 'Italiya laboratoriyalarida sinovdan oʻtgan EasyClean baxmallar: qahva, choy yoki sharbat toʻkilsa ham oddiy salfetka bilan oson tozalanadi.',
          ru: 'Ткани EasyClean с тефлоновым барьером: пролитый кофе или сок легко удаляются обычной сухой салфеткой.',
          en: 'Tested EasyClean Italian velvet: liquids bead up on surface and wipe clean with a single dry cloth.'
        },
        client: 'Atelier Yangiliklari',
        taggedProductId: 'armchair-nordic-lounge',
        taggedProductName: 'Nordic Dam Olish Kreslosi',
        taggedPrice: '6 400 000 soʻm'
      }
    ]
  },
  {
    id: 'story-delivery-white-glove',
    title: { uz: 'Oq Qoʻlqopli Oʻrnatish', ru: 'Безупречная доставка', en: 'White-Glove Setup' },
    tagline: { uz: 'Chang va shovqinsiz', ru: 'Чисто и аккуратно', en: 'Zero dust, total care' },
    thumbnail: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=300&q=80',
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
        caption: {
          uz: 'Bizning professional montaj jamoamiz xonadoningiz pol qoplamasini maxsus himoyalaydi, mebelni oʻrnatadi va barcha qadoqlarni oʻzi olib ketadi.',
          ru: 'Бригада сборщиков застилает пол защитным покрытием, собирает мебель и утилизирует всю упаковку.',
          en: 'Our white-glove team protects your flooring, assembles with precision, and removes all packaging cleanly.'
        },
        client: 'Toshkent & Butun Oʻzbekiston',
        taggedProductId: 'bed-venezia-king',
        taggedProductName: 'Venezia King Ortopedik Karavot',
        taggedPrice: '24 200 000 soʻm'
      }
    ]
  },
  {
    id: 'story-marble-selection',
    title: { uz: 'Rim Calacatta Marmari', ru: 'Мрамор Calacatta', en: 'Italian Marble Slabs' },
    tagline: { uz: 'Har biri yagona naqsh', ru: 'Уникальный срез', en: 'One-of-a-kind veining' },
    thumbnail: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=300&q=80',
    slides: [
      {
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
        caption: {
          uz: 'Verona stollari uchun Italiyadan toʻgʻridan-toʻgʻri olib kelinadigan tabiiy marmar plitalari. 100% tabiiy, har bir stol yagona sanʼat asari.',
          ru: 'Природные слэбы итальянского мрамора Calacatta. Узоры прожилок никогда не повторяются.',
          en: 'Direct imported Italian Calacatta marble slabs with natural golden and grey veining.'
        },
        client: 'Materiallar Kolleksiyasi',
        taggedProductId: 'table-verona-marble',
        taggedProductName: 'Verona Marmar Oshxona Stoli',
        taggedPrice: '16 800 000 soʻm'
      }
    ]
  }
];

export const ShowroomStories = () => {
  const { lang } = useLanguage();
  const [activeStoryIdx, setActiveStoryIdx] = useState(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewedStories, setViewedStories] = useState(() => {
    try {
      const saved = sessionStorage.getItem('gm_viewed_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const progressTimerRef = useRef(null);

  const activeStory = activeStoryIdx !== null ? STORIES[activeStoryIdx] : null;
  const currentSlide = activeStory ? activeStory.slides[activeSlideIdx] || activeStory.slides[0] : null;

  // Auto advance slide
  useEffect(() => {
    if (!activeStory || isPaused) return;

    progressTimerRef.current = setTimeout(() => {
      if (activeSlideIdx < activeStory.slides.length - 1) {
        setActiveSlideIdx((prev) => prev + 1);
      } else {
        // Move to next story or close
        if (activeStoryIdx < STORIES.length - 1) {
          const nextStoryIdx = activeStoryIdx + 1;
          setActiveStoryIdx(nextStoryIdx);
          setActiveSlideIdx(0);
          markViewed(STORIES[nextStoryIdx].id);
        } else {
          closeStories();
        }
      }
    }, 5000);

    return () => clearTimeout(progressTimerRef.current);
  }, [activeStory, activeSlideIdx, isPaused, activeStoryIdx]);

  const markViewed = (id) => {
    setViewedStories((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      try {
        sessionStorage.setItem('gm_viewed_stories', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const openStory = (idx) => {
    setActiveStoryIdx(idx);
    setActiveSlideIdx(0);
    setIsPaused(false);
    markViewed(STORIES[idx].id);
  };

  const closeStories = () => {
    setActiveStoryIdx(null);
    setActiveSlideIdx(0);
    setIsPaused(false);
  };

  const nextSlide = () => {
    if (!activeStory) return;
    if (activeSlideIdx < activeStory.slides.length - 1) {
      setActiveSlideIdx((prev) => prev + 1);
    } else if (activeStoryIdx < STORIES.length - 1) {
      const nextIdx = activeStoryIdx + 1;
      setActiveStoryIdx(nextIdx);
      setActiveSlideIdx(0);
      markViewed(STORIES[nextIdx].id);
    } else {
      closeStories();
    }
  };

  const prevSlide = () => {
    if (!activeStory) return;
    if (activeSlideIdx > 0) {
      setActiveSlideIdx((prev) => prev - 1);
    } else if (activeStoryIdx > 0) {
      const prevIdx = activeStoryIdx - 1;
      setActiveStoryIdx(prevIdx);
      setActiveSlideIdx(STORIES[prevIdx].slides.length - 1);
    }
  };

  return (
    <section 
      style={{ 
        padding: '24px 0 10px', 
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border)'
      }}
    >
      <div className="container">
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                color: '#fff',
              }}
            >
              <Sparkles size={13} />
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
              {lang === 'uz' ? 'Jonli Showroom & Mijozlar Sharhi' : lang === 'ru' ? 'Истории и Шоурум Live' : 'Live Stories & Showroom'}
            </span>
          </div>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {lang === 'uz' ? 'Koʻrish uchun bosing' : 'Нажмите для просмотра'}
          </span>
        </div>

        {/* Stories Horizontal Reel */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {STORIES.map((story, idx) => {
            const isViewed = viewedStories.includes(story.id);
            return (
              <button
                key={story.id}
                onClick={() => openStory(idx)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  width: '92px',
                  textAlign: 'center',
                  outline: 'none',
                }}
              >
                {/* Story Circle Avatar */}
                <div
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '50%',
                    padding: '3px',
                    background: isViewed
                      ? 'var(--border)'
                      : 'linear-gradient(135deg, #c9a54a 0%, #e6cb85 45%, #967426 100%)',
                    boxShadow: isViewed ? 'none' : '0 4px 14px rgba(201, 165, 74, 0.35)',
                    transition: 'transform 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid var(--surface)',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  >
                    <img
                      src={story.thumbnail}
                      alt={story.title[lang] || story.title.uz}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>

                {/* Title */}
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.25,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {story.title[lang] || story.title.uz}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Interactive Story Viewer */}
      {activeStory && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={closeStories}
        >
          {/* Main Story Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '430px',
              height: '88vh',
              maxHeight: '760px',
              borderRadius: '24px',
              overflow: 'hidden',
              backgroundColor: '#121413',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Multi-Segment Progress Bars */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                right: '12px',
                zIndex: 10,
                display: 'flex',
                gap: '5px',
              }}
            >
              {activeStory.slides.map((_, sIdx) => {
                const isPassed = sIdx < activeSlideIdx;
                const isCurrent = sIdx === activeSlideIdx;
                return (
                  <div
                    key={sIdx}
                    style={{
                      flex: 1,
                      height: '3px',
                      borderRadius: '2px',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        backgroundColor: '#ffffff',
                        width: isPassed ? '100%' : isCurrent ? '100%' : '0%',
                        transition: isCurrent && !isPaused ? 'width 5s linear' : 'none',
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Story Header */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                left: '14px',
                right: '14px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={activeStory.thumbnail}
                  alt=""
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    border: '1.5px solid #c9a54a',
                    objectFit: 'cover',
                  }}
                />
                <div>
                  <div style={{ color: '#ffffff', fontWeight: 600, fontSize: '0.88rem' }}>
                    {activeStory.title[lang] || activeStory.title.uz}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem' }}>
                    {currentSlide?.client || 'Grand Mebel'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setIsPaused((p) => !p)}
                  aria-label={isPaused ? 'Davom ettirish' : 'To‘xtatib turish'}
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {isPaused ? <Play size={14} /> : <Pause size={14} />}
                </button>

                <button
                  onClick={closeStories}
                  aria-label="Yopish"
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Slide Image */}
            <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
              <img
                src={currentSlide?.image}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,12,11,0.95) 0%, rgba(10,12,11,0.3) 45%, rgba(10,12,11,0.5) 100%)',
                }}
              />

              {/* Tap Left / Right Hotzones for Navigation */}
              <div
                onClick={prevSlide}
                style={{
                  position: 'absolute',
                  top: '80px',
                  bottom: '160px',
                  left: 0,
                  width: '35%',
                  cursor: 'pointer',
                  zIndex: 8,
                }}
              />
              <div
                onClick={nextSlide}
                style={{
                  position: 'absolute',
                  top: '80px',
                  bottom: '160px',
                  right: 0,
                  width: '65%',
                  cursor: 'pointer',
                  zIndex: 8,
                }}
              />
            </div>

            {/* Bottom Content & Tagged Furniture Product Card */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                padding: '20px 18px 24px',
              }}
            >
              {/* Slide text caption */}
              <p
                style={{
                  color: 'rgba(255,255,255,0.92)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  margin: '0 0 16px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                }}
              >
                {currentSlide?.caption[lang] || currentSlide?.caption.uz}
              </p>

              {/* Tagged Product Pill Card */}
              {currentSlide?.taggedProductId && (
                <Link
                  to={`/product/${currentSlide.taggedProductId}`}
                  onClick={closeStories}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        backgroundColor: '#c9a54a',
                        color: '#0d0f12',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ShoppingBag size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                        {currentSlide.taggedProductName}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#c9a54a', fontWeight: 600 }}>
                        {currentSlide.taggedPrice}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(255,255,255,0.18)',
                      padding: '5px 10px',
                      borderRadius: '8px',
                    }}
                  >
                    <span>{lang === 'uz' ? 'Koʻrish' : 'Посмотреть'}</span>
                    <ChevronRight size={13} />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
