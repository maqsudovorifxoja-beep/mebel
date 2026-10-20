import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useTelegram } from '../../context/TelegramContext';
import { X, ShoppingBag, Send, Star, Check, ArrowRight } from 'lucide-react';

export const QuickViewModal = ({ product, onClose }) => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { submitOrder, addToast } = useTelegram();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isOrdering, setIsOrdering] = useState(false);
  const [showDirectOrder, setShowDirectOrder] = useState(false);
  const [directPhone, setDirectPhone] = useState('');
  const [directName, setDirectName] = useState('');

  if (!product) return null;

  const title = product.name[lang] || product.name.uz;
  const description = product.description[lang] || product.description.uz;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ` ${t.catalog.currency}`;
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    addToast(`${title} (${quantity} dona) ${t.catalog.addedToCart}`, 'success');
    onClose();
  };

  const handleDirectTelegramSubmit = async (e) => {
    e.preventDefault();
    if (!directPhone.trim() || !directName.trim()) {
      addToast('Iltimos, ismingiz va telefon raqamingizni kiriting', 'error');
      return;
    }

    setIsOrdering(true);
    await submitOrder({
      cartItems: [{ product, quantity, selectedColor }],
      customer: {
        fullName: directName,
        phone: directPhone,
        address: '1-Bosishda xarid (Tezkor buyurtma)',
        paymentMethod: 'Naqd / Karta',
        orderNotes: 'Mijoz Quick View orqali 1-klikda tezkor buyurtma berdi',
      },
      totals: {
        finalTotal: product.price * quantity,
        discountPercent: 0,
      },
      promoCode: null,
    });

    setIsOrdering(false);
    setShowDirectOrder(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px', padding: '0', overflow: 'hidden' }}
      >
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              zIndex: 10,
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--surface-glass)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
            }}
          >
            <X size={18} />
          </button>

          {/* Left: Images */}
          <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                aspectRatio: '4/3',
                marginBottom: '16px',
                backgroundColor: 'var(--surface)',
              }}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                      padding: 0,
                    }}
                  >
                    <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ display: 'flex', color: '#ffb300' }}>
                  <Star size={16} fill="#ffb300" />
                </div>
                <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{product.rating}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  ({product.reviewsCount} {t.catalog.reviews})
                </span>
                <span className="badge badge-gold" style={{ marginLeft: 'auto' }}>
                  {product.inStock ? (lang === 'uz' ? 'Omborda mavjud' : lang === 'ru' ? 'В наличии' : 'In Stock') : 'Order'}
                </span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '1.6rem', marginBottom: '12px' }}>{title}</h2>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1rem' }}>
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                {description}
              </p>

              {/* Dimensions */}
              <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                <strong>{t.catalog.dimensions}:</strong> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} {product.dimensions.unit}
              </div>

              {/* Color swatches */}
              {product.colors && (
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                    {t.catalog.color}: <span style={{ color: 'var(--accent-gold)' }}>{selectedColor?.name[lang] || selectedColor?.name.uz}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: c.hex,
                          border: selectedColor?.hex === c.hex ? '2px solid var(--accent-gold)' : '2px solid var(--border-light)',
                          outline: 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct 1-click Telegram Order Form or Standard Buttons */}
            {showDirectOrder ? (
              <form onSubmit={handleDirectTelegramSubmit} style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: 'var(--accent-gold)' }}>
                  Telegram orqali 1-klikda xarid qilish:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    required
                    placeholder="Ismingiz"
                    value={directName}
                    onChange={(e) => setDirectName(e.target.value)}
                    className="form-input"
                    style={{ padding: '8px 12px' }}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={directPhone}
                    onChange={(e) => setDirectPhone(e.target.value)}
                    className="form-input"
                    style={{ padding: '8px 12px' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setShowDirectOrder(false)}
                    className="btn btn-outline btn-sm"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    disabled={isOrdering}
                    className="btn btn-telegram btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Send size={15} />
                    <span>{isOrdering ? 'Yuborilmoqda...' : 'Telegramga Yuborish'}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  {/* Quantity selector */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--surface)',
                    }}
                  >
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      style={{ padding: '8px 14px', fontSize: '1.1rem' }}
                    >
                      -
                    </button>
                    <span style={{ padding: '0 8px', fontWeight: 600 }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      style={{ padding: '8px 14px', fontSize: '1.1rem' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    <ShoppingBag size={18} />
                    <span>{t.catalog.addToCart}</span>
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setShowDirectOrder(true)}
                    className="btn btn-telegram"
                    style={{ flex: 1 }}
                  >
                    <Send size={16} />
                    <span>{t.catalog.buyNow}</span>
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="btn btn-secondary"
                  >
                    <span>{t.catalog.viewDetails}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
