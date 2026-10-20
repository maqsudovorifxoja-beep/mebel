import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTelegram } from '../../context/TelegramContext';
import { Heart, ShoppingBag, Eye, Star, Check } from 'lucide-react';

export const ProductCard = ({ product, onQuickView }) => {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToast } = useTelegram();

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [isAdded, setIsAdded] = useState(false);

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

  const title = product.name[lang] || product.name.uz;
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className="luxury-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Product Image Container */}
      <div
        style={{
          position: 'relative',
          paddingTop: '80%',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <Link to={`/product/${product.id}`} style={{ position: 'absolute', inset: 0 }}>
          <img
            src={product.images[0]}
            alt={title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          />
        </Link>

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          {product.badge === 'bestseller' && (
            <span className="badge badge-gold">Bestseller</span>
          )}
          {product.badge === 'new' && (
            <span className="badge badge-new">New 2026</span>
          )}
          {product.badge === 'premium' && (
            <span className="badge badge-gold">Atelier</span>
          )}
          {product.oldPrice && (
            <span className="badge badge-sale">
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Action icons (Wishlist & Quick View) */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <button
            onClick={handleToggleWishlist}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--surface-glass)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: wishlisted ? '#e53935' : 'var(--text-primary)',
              transition: 'all var(--transition-fast)',
              boxShadow: 'var(--shadow-sm)',
            }}
            aria-label="Wishlist toggle"
          >
            <Heart size={16} fill={wishlisted ? '#e53935' : 'none'} />
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--surface-glass)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                transition: 'all var(--transition-fast)',
                boxShadow: 'var(--shadow-sm)',
              }}
              title={t.catalog.quickView}
              aria-label="Quick view"
            >
              <Eye size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Rating & reviews */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: '#ffb300' }}>
              <Star size={14} fill="#ffb300" />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{product.rating}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              ({product.reviewsCount})
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`}>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '10px',
                lineHeight: 1.35,
              }}
            >
              {title}
            </h3>
          </Link>

          {/* Color preview dots */}
          {product.colors && product.colors.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: color.hex,
                    border: selectedColor?.hex === color.hex ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                    padding: 0,
                    outline: 'none',
                    transform: selectedColor?.hex === color.hex ? 'scale(1.15)' : 'scale(1)',
                    transition: 'transform var(--transition-fast)',
                  }}
                  title={color.name[lang] || color.name.uz}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid var(--border-light)',
            marginTop: '8px',
          }}
        >
          <div>
            <div style={{ fontSize: '1.18rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {formatPrice(product.price)}
            </div>
            {product.oldPrice && (
              <div
                style={{
                  fontSize: '0.82rem',
                  textDecoration: 'line-through',
                  color: 'var(--text-muted)',
                }}
              >
                {formatPrice(product.oldPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`btn btn-sm ${isAdded ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            {isAdded ? (
              <>
                <Check size={15} />
                <span>{t.catalog.addedToCart}</span>
              </>
            ) : (
              <>
                <ShoppingBag size={15} />
                <span>{t.catalog.addToCart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
