import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useTelegram } from '../../context/TelegramContext';
import { 
  Sparkles, 
  Layers, 
  RotateCw, 
  Sun, 
  Moon, 
  ShoppingBag, 
  Check, 
  Ruler, 
  Shield, 
  Award,
  Maximize2
} from 'lucide-react';

const MODELS = [
  {
    id: 'sofa-milano',
    name: { uz: 'Milano Royal Divan', ru: 'Диван Milano Royal', en: 'Milano Royal Sofa' },
    category: 'Yumshoq mebel',
    basePrice: 18500000,
    dimensions: { width: 240, height: 85, depth: 105, unit: 'sm' },
    angles: {
      front: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      iso: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
      side: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    },
    productId: 'sofa-milano-velvet',
  },
  {
    id: 'bed-venezia',
    name: { uz: 'Venezia King Karavot', ru: 'Кровать Venezia King', en: 'Venezia King Bed' },
    category: 'Yotoqxona',
    basePrice: 24200000,
    dimensions: { width: 200, height: 135, depth: 220, unit: 'sm' },
    angles: {
      front: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
      iso: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=85',
      side: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    },
    productId: 'bed-venezia-king',
  },
  {
    id: 'chair-nordic',
    name: { uz: 'Nordic Dam Olish Kreslosi', ru: 'Кресло Nordic Hans', en: 'Nordic Lounge Chair' },
    category: 'Dam olish',
    basePrice: 6400000,
    dimensions: { width: 85, height: 92, depth: 88, unit: 'sm' },
    angles: {
      front: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
      iso: 'https://images.unsplash.com/photo-1580481077195-c3a8b066060c?auto=format&fit=crop&w=1200&q=85',
      side: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    },
    productId: 'armchair-nordic-lounge',
  },
  {
    id: 'table-verona',
    name: { uz: 'Verona Marmar Stol', ru: 'Стол Verona Calacatta', en: 'Verona Marble Table' },
    category: 'Oshxona & Mehmonxona',
    basePrice: 16800000,
    dimensions: { width: 220, height: 76, depth: 100, unit: 'sm' },
    angles: {
      front: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      iso: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85',
      side: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85',
      texture: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85',
    },
    productId: 'table-verona-marble',
  },
];

const FABRICS = [
  {
    id: 'velvet',
    name: { uz: 'Italiya Baxmali (Royal Velvet)', ru: 'Итальянский бархат', en: 'Italian Royal Velvet' },
    badge: 'EasyClean Suv Oʻtkazmas',
    priceModifier: 0,
    colors: [
      { name: { uz: 'Zumrad Yashil', ru: 'Изумрудный', en: 'Emerald Green' }, hex: '#1c3d2e', overlay: 'rgba(28, 61, 46, 0.22)' },
      { name: { uz: 'Tungi Moviy', ru: 'Глубокий синий', en: 'Midnight Navy' }, hex: '#162238', overlay: 'rgba(22, 34, 56, 0.24)' },
      { name: { uz: 'Qaymoqrang Fil Suyagi', ru: 'Слоновая кость', en: 'Warm Ivory' }, hex: '#f0ece1', overlay: 'rgba(240, 236, 225, 0.12)' },
      { name: { uz: 'Issiq Terakota', ru: 'Терракота', en: 'Terracotta' }, hex: '#a6543b', overlay: 'rgba(166, 84, 59, 0.22)' },
    ],
  },
  {
    id: 'leather',
    name: { uz: 'Tabiiy Nappa Charmi', ru: 'Натуральная кожа Nappa', en: 'Full-Grain Nappa Leather' },
    badge: '100% Tabiiy Teri',
    priceModifier: 2400000,
    colors: [
      { name: { uz: 'Konyak Qahva', ru: 'Коньячный', en: 'Cognac Brown' }, hex: '#8a4b2a', overlay: 'rgba(138, 75, 42, 0.25)' },
      { name: { uz: 'Qora Onyx', ru: 'Черный оникс', en: 'Black Onyx' }, hex: '#1a1a1a', overlay: 'rgba(26, 26, 26, 0.28)' },
      { name: { uz: 'Toʻq Shokolad', ru: 'Темный шоколад', en: 'Deep Chocolate' }, hex: '#3e2723', overlay: 'rgba(62, 39, 35, 0.26)' },
    ],
  },
  {
    id: 'boucle',
    name: { uz: 'Fransuz Bukle Toʻqimasi', ru: 'Фактурное букле', en: 'French Textured Bouclé' },
    badge: 'Yumshoq & Havoiy',
    priceModifier: 950000,
    colors: [
      { name: { uz: 'Arktik Oq', ru: 'Арктический белый', en: 'Arctic Cloud' }, hex: '#faf9f6', overlay: 'rgba(250, 249, 246, 0.1)' },
      { name: { uz: 'Krem Bej', ru: 'Кремовый беж', en: 'Cream Beige' }, hex: '#dfd7c5', overlay: 'rgba(223, 215, 197, 0.15)' },
      { name: { uz: 'Kumush Kulrang', ru: 'Серебристый', en: 'Silver Mist' }, hex: '#b8b5ad', overlay: 'rgba(184, 181, 173, 0.18)' },
    ],
  },
];

const WOOD_TRIMS = [
  { id: 'oak', name: { uz: 'Tabiiy Eman (Oak)', ru: 'Натуральный дуб', en: 'Natural Oak' }, color: '#d4b27f' },
  { id: 'walnut', name: { uz: 'Amerika Yongʻogʻi', ru: 'Американский орех', en: 'American Walnut' }, color: '#4a2f1d' },
  { id: 'brass', name: { uz: 'Tilla Latun (Brass)', ru: 'Шлифованная латунь', en: 'Brushed Brass' }, color: '#c9a54a' },
  { id: 'black', name: { uz: 'Mat Qora Kukun', ru: 'Матовый черный', en: 'Matte Black' }, color: '#1c1b18' },
];

export const InteractiveConfigurator = () => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { addToast } = useTelegram();

  const [selectedModelIdx, setSelectedModelIdx] = useState(0);
  const [activeAngle, setActiveAngle] = useState('front'); // front, iso, side, texture
  const [selectedFabricIdx, setSelectedFabricIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedWoodId, setSelectedWoodId] = useState('oak');
  const [lighting, setLighting] = useState('day'); // 'day' or 'night'
  const [isRotating, setIsRotating] = useState(false);

  const model = MODELS[selectedModelIdx];
  const fabric = FABRICS[selectedFabricIdx];
  const color = fabric.colors[selectedColorIdx] || fabric.colors[0];
  const wood = WOOD_TRIMS.find((w) => w.id === selectedWoodId) || WOOD_TRIMS[0];

  const totalPrice = model.basePrice + fabric.priceModifier;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ` ${t.catalog.currency}`;
  };

  const handleAngleCycle = () => {
    setIsRotating(true);
    const order = ['front', 'iso', 'side', 'texture'];
    const current = order.indexOf(activeAngle);
    const next = order[(current + 1) % order.length];
    setActiveAngle(next);
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleAddToCart = () => {
    const customConfigProduct = {
      id: model.productId,
      name: {
        uz: `${model.name.uz} (${fabric.name.uz} — ${color.name.uz})`,
        ru: `${model.name.ru} (${fabric.name.ru} — ${color.name.ru})`,
        en: `${model.name.en} (${fabric.name.en} — ${color.name.en})`,
      },
      price: totalPrice,
      category: 'sofa',
      images: [model.angles[activeAngle] || model.angles.front],
      colors: [{ name: color.name, hex: color.hex }],
    };

    addToCart(customConfigProduct, 1, { name: color.name, hex: color.hex });
    addToast(
      lang === 'uz'
        ? `${model.name.uz} sizning konfiguratsiyangizda savatga qoʻshildi!`
        : `Конфигурация добавлена в корзину!`,
      'success'
    );
  };

  return (
    <section 
      id="3d-configurator"
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={14} />
            <span>{lang === 'uz' ? 'Interaktiv 3D Studiya' : lang === 'ru' ? '3D Конфигуратор' : '3D Bespoke Studio'}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '14px', fontFamily: 'var(--font-display)' }}>
            {lang === 'uz'
              ? 'Xonangiz Uchun Mebelni Real Vaqtda Sozlang'
              : lang === 'ru'
              ? 'Сконфигурируйте свою мебель в реальном времени'
              : 'Customize Your Heirloom Piece in Real Time'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {lang === 'uz'
              ? 'Mato turlari, ranglar, yogʻoch bezaklari va xona yorugʻligini interaktiv sinab koʻring va narxini darhol hisoblang.'
              : 'Выбирайте обивку, оттенки бархата и кожи, акцентную отделку ножек и проверяйте вид при дневном и вечернем свете.'}
          </p>

          {/* Model Switcher Tabs */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '6px',
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--r-full)',
              border: '1px solid var(--border)',
              marginTop: '24px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {MODELS.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedModelIdx(idx);
                  setActiveAngle('front');
                }}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--r-full)',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: selectedModelIdx === idx ? 'var(--accent)' : 'transparent',
                  color: selectedModelIdx === idx ? '#ffffff' : 'var(--text-primary)',
                  transition: 'all 0.2s ease',
                }}
              >
                {m.name[lang] || m.name.uz}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Grid: Left = 3D / Angles Visualizer Canvas; Right = Configuration Controls */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
            gap: '36px',
            alignItems: 'start',
          }}
          className="configurator-layout-grid"
        >
          {/* LEFT: Visual Canvas */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--r-xl)',
              overflow: 'hidden',
              backgroundColor: lighting === 'night' ? '#0d100e' : '#f7f6f2',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-lg)',
              transition: 'background-color 0.5s ease',
            }}
          >
            {/* Top Toolbar on Canvas */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--r-full)',
                  backgroundColor: 'rgba(20, 24, 22, 0.75)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={13} color="#c9a54a" />
                <span>{model.name[lang] || model.name.uz}</span>
              </div>

              {/* Day / Night Room Lighting Mode */}
              <button
                onClick={() => setLighting((l) => (l === 'day' ? 'night' : 'day'))}
                title="Yorug‘lik holatini almashtirish"
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--r-full)',
                  backgroundColor: 'rgba(20, 24, 22, 0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {lighting === 'night' ? <Moon size={14} color="#c9a54a" /> : <Sun size={14} color="#e6b800" />}
                <span>{lighting === 'night' ? 'Kechki chiroq' : 'Kunduzgi nur'}</span>
              </button>
            </div>

            {/* Main Interactive Image View */}
            <div
              style={{
                position: 'relative',
                height: '460px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={model.angles[activeAngle] || model.angles.front}
                alt={model.name[lang] || model.name.uz}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
                  transform: isRotating ? 'scale(0.96) rotate(1deg)' : 'scale(1)',
                  filter: lighting === 'night' ? 'brightness(0.9) contrast(1.05)' : 'brightness(1)',
                }}
              />

              {/* Tint overlay simulating chosen color warmth */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  backgroundColor: color.overlay,
                  mixBlendMode: 'multiply',
                  transition: 'background-color 0.4s ease',
                }}
              />

              {/* Night time ambient shadow gradient */}
              {lighting === 'night' && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    background: 'radial-gradient(circle at 50% 30%, rgba(201, 165, 74, 0.15) 0%, rgba(10, 12, 11, 0.65) 100%)',
                  }}
                />
              )}

              {/* Rotate 360° floating button on canvas */}
              <button
                onClick={handleAngleCycle}
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  backgroundColor: 'rgba(20, 24, 22, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  borderRadius: 'var(--r-full)',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  zIndex: 10,
                }}
              >
                <RotateCw size={15} style={{ animation: isRotating ? 'spin 0.5s linear' : 'none' }} />
                <span>{lang === 'uz' ? 'Rakursni oʻzgartirish' : 'Сменить ракурс'}</span>
              </button>
            </div>

            {/* Bottom Angle Tabs */}
            <div
              style={{
                padding: '14px 20px',
                backgroundColor: 'var(--surface)',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { id: 'front', label: { uz: 'Old koʻrinish', ru: 'Спереди', en: 'Front' } },
                  { id: 'iso', label: { uz: '3/4 Izometriya', ru: '3/4 Перспектива', en: '3/4 Perspective' } },
                  { id: 'side', label: { uz: 'Yon profil', ru: 'Сбоку', en: 'Side' } },
                  { id: 'texture', label: { uz: 'Mato makro', ru: 'Текстура', en: 'Macro Fabric' } },
                ].map((angle) => (
                  <button
                    key={angle.id}
                    onClick={() => setActiveAngle(angle.id)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--r-sm)',
                      border: '1px solid',
                      borderColor: activeAngle === angle.id ? 'var(--accent)' : 'var(--border)',
                      backgroundColor: activeAngle === angle.id ? 'var(--accent-subtle)' : 'transparent',
                      color: activeAngle === angle.id ? 'var(--accent)' : 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {angle.label[lang] || angle.label.uz}
                  </button>
                ))}
              </div>

              {/* Dimensions callout */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.76rem',
                  color: 'var(--text-muted)',
                }}
              >
                <Ruler size={14} />
                <span>
                  {model.dimensions.width} × {model.dimensions.height} × {model.dimensions.depth} {model.dimensions.unit}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Configuration Panel */}
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderRadius: 'var(--r-xl)',
              padding: '32px',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '26px',
            }}
          >
            {/* Header info */}
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {model.category}
              </div>
              <h3 style={{ fontSize: '1.6rem', margin: '4px 0 10px', fontFamily: 'var(--font-display)' }}>
                {model.name[lang] || model.name.uz}
              </h3>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                  {formatPrice(totalPrice)}
                </span>
                {fabric.priceModifier > 0 && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    (+{formatPrice(fabric.priceModifier)} {fabric.name[lang] || fabric.name.uz})
                  </span>
                )}
              </div>
            </div>

            {/* 1. Fabric Selection */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  1. {lang === 'uz' ? 'Qoplama matosi turi' : 'Тип обивки'}:
                </label>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>
                  {fabric.badge}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {FABRICS.map((f, idx) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setSelectedFabricIdx(idx);
                      setSelectedColorIdx(0);
                    }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--r-md)',
                      border: '1.5px solid',
                      borderColor: selectedFabricIdx === idx ? 'var(--accent)' : 'var(--border)',
                      backgroundColor: selectedFabricIdx === idx ? 'var(--accent-subtle)' : 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {f.name[lang] || f.name.uz}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{f.badge}</div>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent)' }}>
                      {f.priceModifier === 0 ? 'Asosiy narx' : `+${formatPrice(f.priceModifier)}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Color Swatches */}
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                2. {lang === 'uz' ? 'Mato rangi' : 'Оттенок'}: <span style={{ color: 'var(--accent)' }}>{color.name[lang] || color.name.uz}</span>
              </label>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {fabric.colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColorIdx(idx)}
                    title={c.name[lang] || c.name.uz}
                    style={{
                      position: 'relative',
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: c.hex,
                      border: selectedColorIdx === idx ? '3px solid var(--accent)' : '2px solid var(--border)',
                      cursor: 'pointer',
                      outline: selectedColorIdx === idx ? '2px solid var(--surface)' : 'none',
                      outlineOffset: '-4px',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s',
                    }}
                  >
                    {selectedColorIdx === idx && (
                      <Check size={18} color={c.hex === '#f0ece1' || c.hex === '#faf9f6' ? '#000' : '#fff'} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Wood / Metal Leg Trim */}
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                3. {lang === 'uz' ? 'Oyoq va Karkas yog‘ochi' : 'Материал ножек и опор'}: <span style={{ color: 'var(--text-secondary)' }}>{wood.name[lang] || wood.name.uz}</span>
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {WOOD_TRIMS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWoodId(w.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--r-sm)',
                      border: '1px solid',
                      borderColor: selectedWoodId === w.id ? 'var(--accent)' : 'var(--border)',
                      backgroundColor: selectedWoodId === w.id ? 'var(--accent-subtle)' : 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        backgroundColor: w.color,
                        border: '1px solid rgba(0,0,0,0.2)',
                      }}
                    />
                    <span>{w.name[lang] || w.name.uz}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality & Warranty Guarantees */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '14px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--r-md)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={16} color="var(--success)" />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  5 Yil rasmiy kafolat
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={16} color="var(--accent)" />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  100% Ekologik toza
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '16px',
                fontSize: '1rem',
                borderRadius: 'var(--r-full)',
              }}
            >
              <ShoppingBag size={18} />
              <span>
                {lang === 'uz'
                  ? `Savatga Qoʻshish — ${formatPrice(totalPrice)}`
                  : lang === 'ru'
                  ? `В корзину — ${formatPrice(totalPrice)}`
                  : `Add Configuration to Cart — ${formatPrice(totalPrice)}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
