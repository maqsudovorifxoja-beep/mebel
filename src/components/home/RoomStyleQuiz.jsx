import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useTelegram } from '../../context/TelegramContext';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  ShoppingBag, 
  Layers, 
  Heart,
  Palette,
  Home,
  Check
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 'vibe',
    question: {
      uz: '1. Sizga qaysi interyer ruhiyati va kayfiyati koʻproq mos?',
      ru: '1. Какая атмосфера интерьера вам ближе всего?',
      en: '1. Which interior mood reflects your ideal living space?',
    },
    options: [
      {
        id: 'italian_luxury',
        title: { uz: 'Italiya Hashamati & Neoklassika', ru: 'Итальянская неоклассика', en: 'Italian Neoclassical Luxury' },
        desc: { uz: 'Baxmal divanlar, tabiiy marmar va tilla latun jilolari', ru: 'Бархат, мрамор и латунные акценты', en: 'Plush velvet, Calacatta marble & warm brass' },
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
        palette: ['#c9a54a', '#1c3d2e', '#f0ece1'],
      },
      {
        id: 'scandi_serenity',
        title: { uz: 'Skandinaviya & Japandi Tinchligi', ru: 'Сканди и Джапанди уют', en: 'Scandi & Japandi Serenity' },
        desc: { uz: 'Och rangli eman, yumshoq bukle va erkin fazo', ru: 'Светлый дуб, тактильное букле и воздух', en: 'Light oak, textured bouclé & serene natural light' },
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
        palette: ['#d9d5ce', '#faf9f6', '#4a2f1d'],
      },
      {
        id: 'modern_minimal',
        title: { uz: 'Arxitekturaviy Zamonaviy Minimalizm', ru: 'Современный минимализм', en: 'Architectural Modernism' },
        desc: { uz: 'Monolit kvars orollari, qora yongʻoq va yashirin chiroqlar', ru: 'Монолитный кварц, темный шпон и скрытый свет', en: 'Monolith quartz, smoked walnut & concealed LED' },
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        palette: ['#1c1b18', '#8a4b2a', '#e8e4db'],
      },
    ],
  },
  {
    id: 'space',
    question: {
      uz: '2. Siz jihozlamoqchi boʻlgan xonadon turi qanday?',
      ru: '2. Какой формат пространства вы планируете обустроить?',
      en: '2. What kind of space are you looking to furnish?',
    },
    options: [
      {
        id: 'apartment',
        title: { uz: 'Shahar markazidagi kvartira (70-130 m²)', ru: 'Городская квартира', en: 'City Residence (70-130 m²)' },
        desc: { uz: 'Ergonomik qulaylik, ixcham va keng koʻrinuvchi modellar', ru: 'Эргономика и визуальный простор', en: 'Optimized proportions & airy spatial flow' },
        icon: Home,
      },
      {
        id: 'villa',
        title: { uz: 'Shaxsiy hovli / Penthouse (150+ m²)', ru: 'Загородный дом / Пентхаус', en: 'Estate Villa / Penthouse (150+ m²)' },
        desc: { uz: 'Katta burchakli divanlar, 8-10 kishilik marmar stollar', ru: 'Масштабные диваны и обеденные зоны', en: 'Grand sectional lounges & 10-seater dining' },
        icon: Sparkles,
      },
    ],
  },
  {
    id: 'palette',
    question: {
      uz: '3. Qaysi ranglar gammasi sizga eng koʻp tinchlik bagʻishlaydi?',
      ru: '3. Какая цветовая палитра вам ближе?',
      en: '3. Which color palette brings you peace and comfort?',
    },
    options: [
      {
        id: 'warm_natural',
        title: { uz: 'Issiq Tabiiy Ranglar (Krem, Terakota, Eman)', ru: 'Теплые природные тона', en: 'Warm Earth & Natural Oak' },
        hexColors: ['#f0ece1', '#a6543b', '#d4b27f'],
      },
      {
        id: 'royal_deep',
        title: { uz: 'Toʻq Hashamat (Zumrad, Tungi Moviy, Tilla)', ru: 'Глубокие королевские тона', en: 'Royal Emerald, Midnight & Brass' },
        hexColors: ['#1c3d2e', '#162238', '#c9a54a'],
      },
      {
        id: 'monochrome',
        title: { uz: 'Monoxrom & Tutunli Kulrang (Antratsit, Oq)', ru: 'Монохромная элегантность', en: 'Monochrome Anthracite & Pure Stone' },
        hexColors: ['#1c1b18', '#707070', '#ffffff'],
      },
    ],
  },
];

const STYLE_RESULTS = {
  italian_luxury: {
    title: { uz: 'Zamonaviy Italiya Neoklassikasi', ru: 'Итальянская Неоклассика', en: 'Italian Modern Neoclassic' },
    desc: {
      uz: 'Siz uchun uy — bu chinakam hashamat va nafosat maskani. Sizga chuqur zumrad rangli baxmal divan, travertin jurnallar stoli va tilla latun qoplamali dekorativ mebellar aʼlo darajada mos keladi.',
      ru: 'Ваш дом — это отражение высокого статуса и безупречного вкуса. Вам идеально подходят бархатные фактуры и натуральный камень.',
      en: 'Your residence is a sanctuary of refined grandeur. Tailored with water-repellent velvet, natural stone, and brushed brass details.'
    },
    badge: '12% Toʻplam Chegirmasi',
    bundleProducts: [
      {
        id: 'sofa-milano-velvet',
        name: 'Milano Royal Baxmal Divan',
        price: 18500000,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'table-verona-marble',
        name: 'Verona Calacatta Marmar Stol',
        price: 16800000,
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'armchair-nordic-lounge',
        name: 'Nordic Dam Olish Kreslosi',
        price: 6400000,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
      },
    ],
    totalOriginal: 41700000,
    totalDiscounted: 36696000, // -12%
    savings: 5004000,
  },
  scandi_serenity: {
    title: { uz: 'Skandinaviya & Japandi Oazisi', ru: 'Сканди-Джапанди Гармония', en: 'Scandi-Japandi Sanctuary' },
    desc: {
      uz: 'Siz tinchlik, yorugʻlik va tabiiy soddalikni sevasiz. Venezia bukle karavoti, och rangli yogʻoch tumba va ergonomik qulaylik sizning xonadoningizni orom maskaniga aylantiradi.',
      ru: 'Вам близка эстетика чистого воздуха, светлого дерева и тактильного комфорта.',
      en: 'You cherish calm spaces bathed in light, organic wood curves, and sculptural tactile bouclé.'
    },
    badge: '12% Toʻplam Chegirmasi',
    bundleProducts: [
      {
        id: 'bed-venezia-king',
        name: 'Venezia King Ortopedik Karavot',
        price: 24200000,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'armchair-nordic-lounge',
        name: 'Nordic Dam Olish Kreslosi',
        price: 6400000,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=600&q=80',
      },
    ],
    totalOriginal: 30600000,
    totalDiscounted: 26928000,
    savings: 3672000,
  },
  modern_minimal: {
    title: { uz: 'Zamonaviy Arxitekturaviy Minimalizm', ru: 'Архитектурный Модернизм', en: 'Architectural Modernism' },
    desc: {
      uz: 'Aniq chiziqlar, monolit marmar va funksional tartib sizning uslubingiz. Qora Nero Marquina marmar stoli va qatʼiy qora eman mebellari sizning xonangizga shohona salobat baxsh etadi.',
      ru: 'Четкая геометрия, монолитные объемы и функциональный перфекционизм.',
      en: 'Sculptural purity, monolithic stone surfaces, and clean concealed cabinetry define your aesthetic.'
    },
    badge: '12% Toʻplam Chegirmasi',
    bundleProducts: [
      {
        id: 'table-verona-marble',
        name: 'Verona Calacatta Marmar Stol',
        price: 16800000,
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'sofa-milano-velvet',
        name: 'Milano Royal Baxmal Divan',
        price: 18500000,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      },
    ],
    totalOriginal: 35300000,
    totalDiscounted: 31064000,
    savings: 4236000,
  },
};

export const RoomStyleQuiz = () => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { addToast } = useTelegram();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [resultKey, setResultKey] = useState(null);

  const handleSelectOption = (questionId, optionId) => {
    const updated = { ...answers, [questionId]: optionId };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Finished all questions -> calculate
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        const vibe = updated['vibe'] || 'italian_luxury';
        setResultKey(vibe);
      }, 700);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResultKey(null);
    setIsCalculating(false);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ` ${t.catalog.currency}`;
  };

  const activeResult = resultKey ? STYLE_RESULTS[resultKey] || STYLE_RESULTS.italian_luxury : null;

  const handleAddBundleToCart = () => {
    if (!activeResult) return;
    activeResult.bundleProducts.forEach((item) => {
      addToCart(
        {
          id: item.id,
          name: { uz: item.name, ru: item.name, en: item.name },
          price: Math.round(item.price * 0.88), // bundle discounted price
          images: [item.image],
        },
        1
      );
    });
    addToast(
      lang === 'uz'
        ? `Ajoyib! Sizning shaxsiy toʻplamingiz (-12% chegirma bilan) savatga qoʻshildi!`
        : `Персональный комплект со скидкой 12% добавлен в корзину!`,
      'success'
    );
  };

  return (
    <section
      id="style-quiz"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={14} />
            <span>{lang === 'uz' ? '30 Soniyalik Test' : lang === 'ru' ? 'Тест за 30 секунд' : '30-Second Style Matchmaker'}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.7rem)', marginBottom: '14px', fontFamily: 'var(--font-display)' }}>
            {lang === 'uz'
              ? 'Qaysi Mebel Uslubi Sizning Xonadoningizga 100% Mos?'
              : lang === 'ru'
              ? 'Какой стиль мебели идеально подходит именно вам?'
              : 'Discover Your Tailored Interior Aesthetic'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            {lang === 'uz'
              ? '3 ta savolga javob bering va professional dizayner tavsiyasi hamda toʻliq toʻplamga -12% chegirmaga ega boʻling.'
              : 'Ответьте на 3 вопроса и получите готовый комплект с персональной скидкой 12%.'}
          </p>
        </div>

        {/* Calculating Loading State */}
        {isCalculating && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--r-xl)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                border: '3px solid var(--accent-subtle)',
                borderTopColor: 'var(--accent)',
                margin: '0 auto 20px',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-display)', margin: '0 0 8px' }}>
              {lang === 'uz' ? 'Dizayner algoritmi hisoblamoqda...' : 'Дизайнерский алгоритм подбирает коллекцию...'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {lang === 'uz' ? 'Ranglar va oʻlchamlar uygʻunligi tekshirilmoqda' : 'Гармония оттенков и текстур'}
            </p>
          </div>
        )}

        {/* Active Question Cards */}
        {!isCalculating && !resultKey && (
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--r-xl)',
              padding: '36px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {/* Progress Bar & Step Counter */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                <span>{lang === 'uz' ? `Savol ${currentStep + 1} dan ${QUESTIONS.length}` : `Вопрос ${currentStep + 1} из ${QUESTIONS.length}`}</span>
                <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div style={{ height: '6px', borderRadius: '3px', backgroundColor: 'var(--border)', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    backgroundColor: 'var(--accent)',
                    width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Question Title */}
            <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-display)', marginBottom: '24px', color: 'var(--text-primary)' }}>
              {QUESTIONS[currentStep].question[lang] || QUESTIONS[currentStep].question.uz}
            </h3>

            {/* Options List */}
            <div style={{ display: 'grid', gridTemplateColumns: QUESTIONS[currentStep].options.length === 3 ? 'repeat(auto-fit, minmax(240px, 1fr))' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {QUESTIONS[currentStep].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(QUESTIONS[currentStep].id, opt.id)}
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--r-lg)',
                    border: '1.5px solid var(--border)',
                    backgroundColor: 'var(--bg-secondary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Image if available */}
                  {opt.image && (
                    <div style={{ width: '100%', height: '140px', borderRadius: 'var(--r-md)', overflow: 'hidden', marginBottom: '4px' }}>
                      <img src={opt.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}

                  {/* Color Swatch row if available */}
                  {opt.hexColors && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      {opt.hexColors.map((hex, i) => (
                        <span
                          key={i}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: hex,
                            border: '1.5px solid var(--border)',
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {opt.title[lang] || opt.title.uz}
                  </div>

                  {opt.desc && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                      {opt.desc[lang] || opt.desc.uz}
                    </div>
                  )}

                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)' }}>
                    <span>Tanlash</span>
                    <ArrowRight size={14} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Celebratory Result Screen */}
        {!isCalculating && resultKey && activeResult && (
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--r-xl)',
              padding: '40px',
              border: '2px solid var(--accent)',
              boxShadow: 'var(--shadow-xl)',
              animation: 'scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Top result badge & style name */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 16px',
                  borderRadius: 'var(--r-full)',
                  backgroundColor: 'var(--accent-subtle)',
                  color: 'var(--accent)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  marginBottom: '14px',
                }}
              >
                <Sparkles size={14} />
                <span>{activeResult.badge}</span>
              </div>

              <h3 style={{ fontSize: '2.1rem', fontFamily: 'var(--font-display)', margin: '0 0 12px', color: 'var(--text-primary)' }}>
                {activeResult.title[lang] || activeResult.title.uz}
              </h3>

              <p style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.98rem' }}>
                {activeResult.desc[lang] || activeResult.desc.uz}
              </p>
            </div>

            {/* Curated 2-3 piece Furniture Bundle */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-primary)', marginBottom: '16px' }}>
                {lang === 'uz' ? 'Siz uchun saralangan toʻliq toʻplam:' : 'Рекомендованный комплект мебели:'}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`, gap: '16px' }}>
                {activeResult.bundleProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: 'var(--r-md)',
                      padding: '14px',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div style={{ width: '100%', height: '140px', borderRadius: 'var(--r-sm)', overflow: 'hidden' }}>
                      <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent)', marginTop: 'auto' }}>
                      {formatPrice(p.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Price Summary & 1-Click Order */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--r-lg)',
                padding: '24px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {lang === 'uz' ? 'Alohida olinganda:' : 'При покупке по отдельности:'}{' '}
                  <span style={{ textDecoration: 'line-through' }}>{formatPrice(activeResult.totalOriginal)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: '4px' }}>
                  <span style={{ fontSize: '1.7rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                    {formatPrice(activeResult.totalDiscounted)}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>
                    ({lang === 'uz' ? `${formatPrice(activeResult.savings)} tejamkorlik!` : `Экономия ${formatPrice(activeResult.savings)}`})
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleAddBundleToCart}
                  className="btn btn-primary btn-lg"
                  style={{ borderRadius: 'var(--r-full)', padding: '14px 28px' }}
                >
                  <ShoppingBag size={18} />
                  <span>{lang === 'uz' ? 'Toʻliq toʻplamni 1-klikda xarid qilish' : 'Купить комплект со скидкой 12%'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="btn btn-secondary btn-lg"
                  style={{ borderRadius: 'var(--r-full)', padding: '14px 20px' }}
                >
                  <RotateCcw size={16} />
                  <span>{lang === 'uz' ? 'Qayta topshirish' : 'Пройти заново'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
