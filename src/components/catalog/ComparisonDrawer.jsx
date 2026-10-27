import React from 'react';
import { Link } from 'react-router-dom';
import { useComparison } from '../../context/ComparisonContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useTelegram } from '../../context/TelegramContext';
import { 
  Scale, 
  X, 
  Trash2, 
  ShoppingBag, 
  Check, 
  ChevronRight,
  Maximize2,
  Shield,
  Layers,
  Palette,
  Star
} from 'lucide-react';

export const ComparisonDrawer = () => {
  const { 
    comparedProducts, 
    removeFromCompare, 
    clearCompare, 
    isDrawerOpen, 
    openDrawer, 
    closeDrawer 
  } = useComparison();
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { addToast } = useTelegram();

  if (comparedProducts.length === 0) return null;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ` ${t.catalog.currency}`;
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    addToast(`${product.name[lang] || product.name.uz} ${t.catalog.addedToCart}`, 'success');
  };

  return (
    <>
      {/* Floating Bottom Dock (when drawer is closed) */}
      {!isDrawerOpen && (
        <aside
          aria-label={lang === 'uz' ? 'Mebellarni taqqoslash paneli' : 'Панель сравнения мебели'}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 850,
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-full)',
            padding: '8px 16px 8px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: 'var(--shadow-xl)',
            backdropFilter: 'blur(12px)',
            maxWidth: '92vw',
            animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Scale size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {lang === 'uz'
                  ? `Taqqoslash (${comparedProducts.length}/4)`
                  : lang === 'ru'
                  ? `Сравнение (${comparedProducts.length}/4)`
                  : `Compare (${comparedProducts.length}/4)`}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                {lang === 'uz' ? 'Mebellarni solishtiring' : 'Сравните характеристики'}
              </div>
            </div>
          </div>

          {/* Mini product thumbnails */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {comparedProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  position: 'relative',
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--r-sm)',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                }}
                title={p.name[lang] || p.name.uz}
              >
                <img
                  src={p.images[0]}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCompare(p.id);
                  }}
                  aria-label={lang === 'uz' ? `${p.name[lang] || p.name.uz}ni taqqoslashdan o'chirish` : 'Удалить из сравнения'}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '14px',
                    height: '14px',
                    backgroundColor: 'rgba(0,0,0,0.65)',
                    color: '#fff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={openDrawer}
              className="btn btn-primary btn-sm"
              style={{
                borderRadius: 'var(--r-full)',
                padding: '7px 16px',
                fontSize: '0.82rem',
                fontWeight: 600,
              }}
            >
              <span>{lang === 'uz' ? 'Ochish' : lang === 'ru' ? 'Сравнить' : 'Compare'}</span>
              <ChevronRight size={14} />
            </button>

            <button
              onClick={clearCompare}
              title={lang === 'uz' ? 'Tozalash' : 'Очистить'}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </aside>
      )}

      {/* Comparison Full Modal / Overlay */}
      {isDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'uz' ? 'Mebellarni solishtirish' : 'Сравнение мебели'}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(10, 12, 11, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease',
          }}
          onClick={closeDrawer}
        >
          <div
            style={{
              backgroundColor: 'var(--surface)',
              width: '100%',
              maxWidth: '1100px',
              maxHeight: '90vh',
              borderRadius: 'var(--r-lg)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: '20px 28px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: 'var(--r-md)',
                    backgroundColor: 'var(--accent-glow)',
                    color: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Scale size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>
                    {lang === 'uz'
                      ? 'Mebellarni Yonma-Yon Solishtirish'
                      : lang === 'ru'
                      ? 'Сравнение моделей бок о бок'
                      : 'Side-by-Side Furniture Comparison'}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {lang === 'uz'
                      ? 'Hajm, materiallar va narx boʻyicha aniq taqqoslang'
                      : 'Сравните габариты, материалы, конструкцию и цены'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={clearCompare}
                  className="btn btn-ghost btn-sm"
                  style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}
                >
                  <Trash2 size={14} />
                  <span>{lang === 'uz' ? 'Barchasini tozalash' : 'Очистить все'}</span>
                </button>
                <button
                  onClick={closeDrawer}
                  aria-label={lang === 'uz' ? 'Yopish' : 'Закрыть'}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body: Scrollable Comparison Table */}
            <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `200px repeat(${comparedProducts.length}, minmax(220px, 1fr))`,
                  gap: '16px',
                  minWidth: `${200 + comparedProducts.length * 220}px`,
                }}
              >
                {/* Column 1: Labels */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', paddingTop: '180px' }}>
                  <div style={labelStyle}><Maximize2 size={14} /> {lang === 'uz' ? "O'lchamlari (GxBxCh)" : 'Габариты (ШхВхГ)'}</div>
                  <div style={labelStyle}><Layers size={14} /> {lang === 'uz' ? 'Materiallar va Karkas' : 'Материалы и каркас'}</div>
                  <div style={labelStyle}><Palette size={14} /> {lang === 'uz' ? 'Mavjud Ranglar' : 'Доступные цвета'}</div>
                  <div style={labelStyle}><Shield size={14} /> {lang === 'uz' ? 'Kafolat muddati' : 'Гарантия'}</div>
                  <div style={labelStyle}><Star size={14} /> {lang === 'uz' ? 'Mijozlar bahosi' : 'Рейтинг'}</div>
                  <div style={labelStyle}>{lang === 'uz' ? 'Omborda holati' : 'Наличие'}</div>
                </div>

                {/* Columns: Products */}
                {comparedProducts.map((p) => {
                  const title = p.name[lang] || p.name.uz;
                  return (
                    <div
                      key={p.id}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--r-md)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '18px',
                        position: 'relative',
                        border: '1px solid var(--border)',
                      }}
                    >
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        aria-label={lang === 'uz' ? `${title}ni taqqoslashdan o'chirish` : 'Удалить из сравнения'}
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          zIndex: 5,
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: 'rgba(0,0,0,0.6)',
                          color: '#fff',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <X size={14} />
                      </button>

                      {/* Top Product Card */}
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            width: '100%',
                            height: '140px',
                            borderRadius: 'var(--r-sm)',
                            overflow: 'hidden',
                            marginBottom: '10px',
                            backgroundColor: 'var(--surface)',
                          }}
                        >
                          <img
                            src={p.images[0]}
                            alt={title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <h4
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            margin: '0 0 4px',
                            color: 'var(--text-primary)',
                            lineHeight: 1.3,
                            minHeight: '2.6em',
                          }}
                        >
                          {title}
                        </h4>
                        <div
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 700,
                            color: 'var(--accent)',
                            fontFamily: 'var(--font-display)',
                            marginBottom: '8px',
                          }}
                        >
                          {formatPrice(p.price)}
                        </div>

                        <button
                          onClick={() => handleAddToCart(p)}
                          className="btn btn-primary btn-sm"
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            padding: '6px 12px',
                          }}
                        >
                          <ShoppingBag size={14} />
                          <span>{t.catalog.addToCart}</span>
                        </button>
                      </div>

                      {/* Specs Values */}
                      {/* Dimensions */}
                      <div style={valueStyle}>
                        {p.dimensions ? (
                          <span>
                            {p.dimensions.width} × {p.dimensions.height} × {p.dimensions.depth} {p.dimensions.unit || 'sm'}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>Standart</span>
                        )}
                      </div>

                      {/* Materials */}
                      <div style={{ ...valueStyle, fontSize: '0.8rem', minHeight: '44px' }}>
                        {p.materials && p.materials.length > 0 ? (
                          <span>{p.materials.join(', ')}</span>
                        ) : (
                          <span>Tabiiy materiallar</span>
                        )}
                      </div>

                      {/* Colors */}
                      <div style={{ ...valueStyle, display: 'flex', gap: '6px', justifyContent: 'center' }}>
                        {p.colors && p.colors.length > 0 ? (
                          p.colors.map((c, i) => (
                            <span
                              key={i}
                              title={c.name[lang] || c.name.uz}
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                backgroundColor: c.hex,
                                border: '1.5px solid var(--border)',
                                display: 'inline-block',
                              }}
                            />
                          ))
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>1 rang</span>
                        )}
                      </div>

                      {/* Warranty */}
                      <div style={valueStyle}>
                        <span style={{ color: 'var(--success)', fontWeight: 600 }}>5 Yil Rasmiy</span>
                      </div>

                      {/* Rating */}
                      <div style={{ ...valueStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                        <Star size={14} fill="#e6b800" color="#e6b800" />
                        <span style={{ fontWeight: 600 }}>{p.rating || 4.9}</span>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>({p.reviewsCount || 24})</span>
                      </div>

                      {/* In stock */}
                      <div style={valueStyle}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: 'var(--success)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          <Check size={14} />
                          {lang === 'uz' ? 'Omborda mavjud' : 'В наличии'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const labelStyle = {
  fontSize: '0.82rem',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  height: '42px',
  borderBottom: '1px dashed var(--border)',
};

const valueStyle = {
  fontSize: '0.85rem',
  color: 'var(--text-primary)',
  textAlign: 'center',
  height: '42px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid var(--border)',
};
