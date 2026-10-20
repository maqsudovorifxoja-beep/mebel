import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useTelegram } from '../context/TelegramContext';
import { useOrders } from '../context/OrderContext';
import { 
  Trash2, 
  ShoppingBag, 
  Send, 
  ArrowRight, 
  CheckCircle2, 
  Tag, 
  Truck, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export const CartPage = () => {
  const { lang, t } = useLanguage();
  const { addOrder } = useOrders();
  const { 
    cartItems, 
    subtotal, 
    discountPercent, 
    discountAmount, 
    finalTotal, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    applyPromo,
    promoCode
  } = useCart();
  const { submitOrder, addToast } = useTelegram();

  const [inputPromo, setInputPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  const formatPrice = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    const res = applyPromo(inputPromo);
    if (res.success) {
      setPromoMessage({ text: t.cart.promoSuccess, type: 'success' });
      addToast(t.cart.promoSuccess, 'success');
    } else {
      setPromoMessage({ text: t.cart.promoInvalid, type: 'error' });
      addToast(t.cart.promoInvalid, 'error');
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      addToast('Iltimos, ismingiz, telefoningiz va manzilingizni toʻldiring', 'error');
      return;
    }

    setIsSubmitting(true);
    const paymentLabel = 
      paymentMethod === 'cash' 
        ? t.cart.payCash 
        : paymentMethod === 'payme' 
        ? t.cart.payPayme 
        : t.cart.payInstallment;

    const orderPayload = {
      cartItems,
      customer: {
        fullName,
        phone,
        address,
        paymentMethod: paymentLabel,
        orderNotes,
      },
      totals: {
        subtotal,
        discountPercent,
        finalTotal,
      },
      promoCode: promoCode || null,
    };

    const res = await submitOrder(orderPayload);
    addOrder({ ...orderPayload, orderId: res.orderId });

    setIsSubmitting(false);
    setConfirmedOrderId(res.orderId || 'GM-982143');
    clearCart();
  };

  if (confirmedOrderId) {
    return (
      <div style={{ padding: '80px 0', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container">
          <div
            className="luxury-card animate-fade-in"
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              padding: '48px 32px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: 'var(--success-bg)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <h1 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              {t.cart.orderSuccess}
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Buyurtmangiz toʻliq hisobot bilan Telegram botimizga yetkazildi. Kuryer va menejerimiz 15 daqiqada siz bilan bogʻlanadi.
            </p>

            <div
              style={{
                padding: '16px 24px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '36px',
                display: 'inline-block',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Buyurtma ID: </span>
              <strong style={{ color: 'var(--accent-gold)', fontSize: '1.25rem' }}>#{confirmedOrderId}</strong>
            </div>

            <div>
              <Link to="/catalog" className="btn btn-primary btn-lg">
                <span>{t.cart.goToCatalog}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '100px 0', backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div className="container">
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <ShoppingBag size={36} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t.cart.empty}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>
            {t.cart.emptyDesc}
          </p>
          <Link to="/catalog" className="btn btn-primary btn-lg">
            <span>{t.cart.goToCatalog}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '36px' }}>{t.cart.title}</h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'flex-start',
          }}
        >
          {/* Left Column: Cart Items List */}
          <div>
            <div className="luxury-card" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {cartItems.map((item, idx) => {
                  const title = item.product.name[lang] || item.product.name.uz;
                  const colorHex = item.selectedColor ? item.selectedColor.hex : 'default';
                  const colorName = item.selectedColor?.name[lang] || item.selectedColor?.name.uz;

                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: '16px',
                        paddingBottom: '20px',
                        borderBottom: idx === cartItems.length - 1 ? 'none' : '1px solid var(--border-light)',
                        alignItems: 'center',
                      }}
                    >
                      {/* Thumbnail */}
                      <Link to={`/product/${item.product.id}`}>
                        <img
                          src={item.product.images[0]}
                          alt={title}
                          style={{
                            width: '84px',
                            height: '84px',
                            borderRadius: 'var(--radius-sm)',
                            objectFit: 'cover',
                            backgroundColor: 'var(--bg-secondary)',
                            flexShrink: 0,
                          }}
                        />
                      </Link>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <Link to={`/product/${item.product.id}`}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '4px' }}>
                            {title}
                          </h4>
                        </Link>
                        {colorName && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.selectedColor.hex, display: 'inline-block' }} />
                            <span>{colorName}</span>
                          </div>
                        )}
                        <div style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                          {formatPrice(item.product.price)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-sm)',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, colorHex, item.quantity - 1)}
                          style={{ padding: '6px 12px', fontSize: '1rem' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '0 8px', fontWeight: 600, fontSize: '0.95rem' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, colorHex, item.quantity + 1)}
                          style={{ padding: '6px 12px', fontSize: '1rem' }}
                        >
                          +
                        </button>
                      </div>

                      {/* Total for item & Remove */}
                      <div style={{ textAlign: 'right', minWidth: '90px' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id, colorHex)}
                          style={{ color: 'var(--danger)', marginTop: '8px', padding: '4px' }}
                          title="Oʻchirish"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Promo Code Form */}
            <div className="luxury-card" style={{ padding: '20px' }}>
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder={t.cart.promoCode + " (Masalan: GRAND2026)"}
                  value={inputPromo}
                  onChange={(e) => setInputPromo(e.target.value)}
                  className="form-input"
                  style={{ textTransform: 'uppercase' }}
                />
                <button type="submit" className="btn btn-secondary">
                  <Tag size={16} />
                  <span>{t.cart.applyPromo}</span>
                </button>
              </form>
              {promoMessage && (
                <div
                  style={{
                    marginTop: '10px',
                    fontSize: '0.85rem',
                    color: promoMessage.type === 'success' ? 'var(--success)' : 'var(--danger)',
                  }}
                >
                  {promoMessage.text}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Checkout & Direct Telegram Dispatch */}
          <div className="luxury-card" style={{ padding: '32px' }}>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '20px' }}>
              {t.cart.checkoutTitle}
            </h2>

            {/* Order Summary figures */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{t.cart.subtotal}:</span>
                <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
              </div>

              {discountPercent > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--success)' }}>
                  <span>{t.cart.discount} ({discountPercent}%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-gold)' }}>
                <span>Yetkazish:</span>
                <span style={{ fontWeight: 600 }}>BEPUL</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                <span>{t.cart.total}:</span>
                <span style={{ color: 'var(--accent-gold)' }}>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Inputs Form */}
            <form onSubmit={handleCheckoutSubmit}>
              <div className="form-group">
                <label className="form-label">{t.cart.fullName} *</label>
                <input
                  type="text"
                  required
                  placeholder="Ism-familiyangiz"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.cart.phone} *</label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.cart.address} *</label>
                <input
                  type="text"
                  required
                  placeholder="Shahar, tuman, koʻcha, xonadon raqami"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.cart.paymentMethod}</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-select"
                >
                  <option value="cash">{t.cart.payCash}</option>
                  <option value="payme">{t.cart.payPayme}</option>
                  <option value="installment">{t.cart.payInstallment}</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">{t.cart.orderNotes}</label>
                <textarea
                  placeholder="Eshik kodi, qulay vaqt yoki boshqa izoh..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="form-textarea"
                  style={{ minHeight: '80px' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-telegram btn-lg"
                style={{ width: '100%', marginTop: '12px' }}
              >
                <Send size={18} />
                <span>{isSubmitting ? 'Telegramga uzatilmoqda...' : t.cart.submitOrderBtn}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
