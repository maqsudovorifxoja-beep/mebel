import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTelegram } from '../context/TelegramContext';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';
import { ProductCard } from '../components/catalog/ProductCard';
import { 
  Heart, 
  ShoppingBag, 
  Send, 
  Star, 
  Check, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  Ruler, 
  ArrowLeft,
  Share2
} from 'lucide-react';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { submitOrder, addToast } = useTelegram();
  const { products } = useProducts();
  const { addOrder } = useOrders();

  const product = products.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isOrderingTelegram, setIsOrderingTelegram] = useState(false);
  const [showTelegramOrderModal, setShowTelegramOrderModal] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    setActiveImage(0);
  }, [id, product]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>{lang === 'uz' ? 'Mebel topilmadi' : 'Товар не найден'}</h2>
        <Link to="/catalog" className="btn btn-primary" style={{ marginTop: '20px' }}>
          {t.productDetail.backToCatalog}
        </Link>
      </div>
    );
  }

  const title = product.name[lang] || product.name.uz;
  const description = product.description[lang] || product.description.uz;
  const wishlisted = isWishlisted(product.id);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + ` ${t.catalog.currency}`;
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
    addToast(`${title} (${quantity} dona) ${t.catalog.addedToCart}`, 'success');
  };

  const handleFastTelegramCheckout = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      addToast('Iltimos, ism va telefon raqamingizni kiriting', 'error');
      return;
    }

    setIsOrderingTelegram(true);
    const orderPayload = {
      cartItems: [{ product, quantity, selectedColor }],
      customer: {
        fullName: customerName,
        phone: customerPhone,
        address: customerAddress || 'Tezkor 1-klik buyurtma',
        paymentMethod: 'Qabul qilganda toʻlash',
        orderNotes: `Mijoz mahsulot sahifasidan toʻgʻridan-toʻgʻri 1-klikda buyurtma berdi. Rang: ${selectedColor?.name?.uz || 'standart'}`,
      },
      totals: {
        finalTotal: product.price * quantity,
        discountPercent: 0,
      },
      promoCode: null,
    };

    const res = await submitOrder(orderPayload);
    addOrder({ ...orderPayload, orderId: res.orderId });

    setIsOrderingTelegram(false);
    setShowTelegramOrderModal(false);
  };

  // Related products from same room/category
  const relatedProducts = products.filter(
    (p) => (p.category === product.category || p.room === product.room) && p.id !== product.id
  ).slice(0, 4);

  return (
    <div style={{ padding: '32px 0 80px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Back Link */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={16} />
            <span>{t.productDetail.backToCatalog}</span>
          </button>
        </div>

        {/* Main Product Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Left Column: Image Gallery */}
          <div>
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                aspectRatio: '4/3',
                backgroundColor: 'var(--bg-secondary)',
                marginBottom: '16px',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <img
                src={product.images[activeImage] || product.images[0]}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnail row */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: activeImage === idx ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                      padding: 0,
                      opacity: activeImage === idx ? 1 : 0.7,
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <img src={img} alt="thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Specs & Ordering */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <span className="badge badge-gold">
                {product.badge ? product.badge.toUpperCase() : 'PREMIUM'}
              </span>

              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-light)',
                  background: 'var(--surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: wishlisted ? '#e53935' : 'var(--text-primary)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                aria-label="Wishlist toggle"
              >
                <Heart size={20} fill={wishlisted ? '#e53935' : 'none'} />
              </button>
            </div>

            <h1
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                fontFamily: 'var(--font-serif)',
                marginBottom: '12px',
              }}
            >
              {title}
            </h1>

            {/* Rating & SKU */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', color: '#ffb300' }}>
                <Star size={16} fill="#ffb300" />
                <span style={{ marginLeft: '4px', fontWeight: 600, color: 'var(--text-primary)' }}>{product.rating}</span>
              </div>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                {product.reviewsCount} {t.catalog.reviews}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>•</span>
              <span style={{ color: 'var(--text-muted)' }}>
                {t.productDetail.sku}: GM-{product.id.substring(0, 7).toUpperCase()}
              </span>
            </div>

            {/* Price Box */}
            <div
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-secondary)',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                {formatPrice(product.price)}
              </div>
              {product.oldPrice && (
                <div style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                  {formatPrice(product.oldPrice)}
                </div>
              )}
            </div>

            {/* Description */}
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '28px' }}>
              {description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '10px' }}>
                  {t.productDetail.selectColor}:{' '}
                  <span style={{ color: 'var(--accent-gold)' }}>
                    {selectedColor?.name[lang] || selectedColor?.name.uz}
                  </span>
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {product.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-full)',
                        border: selectedColor?.hex === c.hex ? '2px solid var(--accent-gold)' : '1px solid var(--border-light)',
                        backgroundColor: 'var(--surface)',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                      }}
                    >
                      <span
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          backgroundColor: c.hex,
                          display: 'inline-block',
                        }}
                      />
                      <span>{c.name[lang] || c.name.uz}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Dimensions Card */}
            <div
              className="luxury-card"
              style={{
                padding: '20px',
                marginBottom: '28px',
                backgroundColor: 'var(--surface)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 600 }}>
                <Ruler size={18} color="var(--accent-gold)" />
                <span>{t.productDetail.specifications}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', textAlign: 'center' }}>
                <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.productDetail.width}</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{product.dimensions.width} sm</div>
                </div>
                <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.productDetail.height}</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{product.dimensions.height} sm</div>
                </div>
                <div style={{ padding: '10px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.productDetail.depth}</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{product.dimensions.depth} sm</div>
                </div>
              </div>

              {/* Materials */}
              <div style={{ marginTop: '16px', fontSize: '0.85rem' }}>
                <strong>{t.catalog.materials}:</strong>{' '}
                <span style={{ color: 'var(--text-secondary)' }}>{product.materials.join(', ')}</span>
              </div>
            </div>

            {/* Actions: Quantity + Add to Cart + Telegram 1-click */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--surface)',
                }}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ padding: '12px 18px', fontSize: '1.2rem', fontWeight: 600 }}
                >
                  -
                </button>
                <span style={{ padding: '0 12px', fontWeight: 700, fontSize: '1.1rem' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ padding: '12px 18px', fontSize: '1.2rem', fontWeight: 600 }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flex: 1, fontSize: '1.05rem' }}
              >
                <ShoppingBag size={20} />
                <span>{t.catalog.addToCart}</span>
              </button>
            </div>

            <button
              onClick={() => setShowTelegramOrderModal(true)}
              className="btn btn-telegram"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginBottom: '28px' }}
            >
              <Send size={18} />
              <span>{t.productDetail.directTelegramOrder}</span>
            </button>

            {/* Trust Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={18} color="var(--accent-gold)" />
                <span>{t.productDetail.warranty}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Truck size={18} color="var(--accent-gold)" />
                <span>{t.productDetail.delivery}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={18} color="var(--accent-gold)" />
                <span>{t.productDetail.ecoMaterials}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '80px', borderTop: '1px solid var(--border-light)', paddingTop: '64px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '32px', textAlign: 'center' }}>
              {t.productDetail.relatedTitle}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 1-Click Telegram Order Modal */}
      {showTelegramOrderModal && (
        <div className="modal-overlay" onClick={() => setShowTelegramOrderModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '32px', maxWidth: '500px' }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
              {t.productDetail.directTelegramOrder}
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Mebel: <strong>{title}</strong> ({formatPrice(product.price * quantity)})
            </p>

            <form onSubmit={handleFastTelegramCheckout}>
              <div className="form-group">
                <label className="form-label">{t.cart.fullName} *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Sardor Aliyev"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.cart.phone} *</label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.cart.address}</label>
                <input
                  type="text"
                  placeholder="Toshkent sh., Yunusobod..."
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setShowTelegramOrderModal(false)}
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isOrderingTelegram}
                  className="btn btn-telegram"
                  style={{ flex: 1 }}
                >
                  <Send size={16} />
                  <span>{isOrderingTelegram ? 'Yuborilmoqda...' : 'Telegramga Yuborish'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
