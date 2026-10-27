import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useComparison } from '../../context/ComparisonContext';
import { useTelegram } from '../../context/TelegramContext';
import { Heart, ShoppingBag, Eye, Star, Check, Scale } from 'lucide-react';

export const ProductCard = ({ product, onQuickView }) => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useComparison();
  const { addToast } = useTelegram();

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [isAdded, setIsAdded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ` ${t.catalog.currency}`;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, selectedColor);
    setIsAdded(true);
    addToast(`${product.name[lang] || product.name.uz} ${t.catalog.addedToCart}`, 'success');
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleToggleCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = toggleCompare(product);
    if (res.action === 'added') {
      addToast(`${product.name[lang] || product.name.uz} taqqoslashga qoʻshildi`, 'info');
    } else if (res.action === 'removed') {
      addToast(`${product.name[lang] || product.name.uz} taqqoslashdan olib tashlandi`, 'info');
    } else if (res.reason === 'limit_reached') {
      addToast('Maksimal 4 ta mebelni taqqoslashingiz mumkin', 'warning');
    }
  };

  const title = product.name[lang] || product.name.uz;
  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);

  return (
    <div
      className="luxury-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden', backgroundColor: 'var(--bg-secondary)' }}>
        <Link to={`/product/${product.id}`} style={{ position: 'absolute', inset: 0 }}>
          <img
            src={product.images[0]}
            alt={title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        </Link>

        {/* Badges */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px' }}>
          {product.badge === 'bestseller' && <span className="badge badge-gold">Best</span>}
          {product.badge === 'new' && <span className="badge badge-new">New</span>}
          {product.badge === 'premium' && <span className="badge badge-gold">Atelier</span>}
          {product.oldPrice && (
            <span className="badge badge-sale">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Action icons */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(6px)',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          <button
            onClick={handleToggleWishlist}
            style={{
              ...actionBtnStyle,
              color: wishlisted ? '#e53935' : 'var(--text-primary)',
            }}
            aria-label="Wishlist toggle"
          >
            <Heart size={14} fill={wishlisted ? '#e53935' : 'none'} />
          </button>

          <button
            onClick={handleToggleCompare}
            style={{
              ...actionBtnStyle,
              color: compared ? 'var(--accent)' : 'var(--text-primary)',
              backgroundColor: compared ? 'var(--accent-subtle)' : 'var(--surface)',
            }}
            title={compared ? 'Taqqoslashdan olib tashlash' : 'Taqqoslashga qoʻshish'}
            aria-label="Compare toggle"
          >
            <Scale size={14} />
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              style={actionBtnStyle}
              title={t.catalog.quickView}
              aria-label="Quick view"
            >
              <Eye size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
            <Star size={12} fill="#d4a017" color="#d4a017" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{product.rating}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.35 }}>
              {title}
            </h3>
          </Link>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: color.hex,
                    border: selectedColor?.hex === color.hex ? '2px solid var(--accent)' : '1px solid var(--border)',
                    padding: 0,
                    outline: 'none',
                    transition: 'transform 0.15s ease',
                    transform: selectedColor?.hex === color.hex ? 'scale(1.2)' : 'scale(1)',
                  }}
                  title={color.name[lang] || color.name.uz}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border)', marginTop: '4px' }}>
          <div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {formatPrice(product.price)}
            </div>
            {product.oldPrice && (
              <div style={{ fontSize: '0.78rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`btn btn-sm ${isAdded ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
          >
            {isAdded ? (
              <>
                <Check size={13} />
                <span>{t.catalog.addedToCart}</span>
              </>
            ) : (
              <>
                <ShoppingBag size={13} />
                <span>{t.catalog.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const actionBtnStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--text-primary)',
  transition: 'all 0.15s ease',
  boxShadow: 'var(--shadow-sm)',
};
