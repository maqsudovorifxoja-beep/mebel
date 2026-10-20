import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTelegram } from '../context/TelegramContext';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Building2
} from 'lucide-react';

export const ContactPage = () => {
  const { lang, t } = useLanguage();
  const { submitCallback, addToast } = useTelegram();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      addToast('Iltimos, ism va telefoningizni kiriting', 'error');
      return;
    }

    setIsSubmitting(true);
    await submitCallback({ name, phone, message });
    setIsSubmitting(false);
    setIsSent(true);
    setName('');
    setPhone('');
    setMessage('');
  };

  const showrooms = [
    {
      city: { uz: 'Toshkent — Bosh Showroom', ru: 'Ташкент — Флагманский Шоурум', en: 'Tashkent — Flagship Showroom' },
      address: { uz: 'Mirobod tumani, Nukus koʻchasi, 84-uy', ru: 'Мирабадский р-н, ул. Нукус, 84', en: '84 Nukus Street, Mirabad District' },
      phone: '+998 (71) 200-44-88',
      hours: '09:00 - 21:00 (Dam olishsiz)',
    },
    {
      city: { uz: 'Samarqand — Galereya', ru: 'Самарканд — Галерея', en: 'Samarkand — Gallery' },
      address: { uz: 'Universitet xiyoboni, 15-uy', ru: 'Университетский бульвар, 15', en: '15 University Blvd' },
      phone: '+998 (66) 235-90-90',
      hours: '10:00 - 20:00',
    },
  ];

  return (
    <div style={{ padding: '40px 0 80px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 56px' }}>
          <div className="section-tag">
            <Building2 size={14} />
            <span>Showroom & Atelier</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', marginBottom: '14px' }}>{t.contact.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Contact Info & Direct Telegram Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            marginBottom: '64px',
          }}
        >
          {/* Left Column: Showroom Cards & Telegram Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {showrooms.map((sh, idx) => (
              <div
                key={idx}
                className="luxury-card"
                style={{ padding: '28px', backgroundColor: 'var(--surface)' }}
              >
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--accent-gold)' }}>
                  {sh.city[lang] || sh.city.uz}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{sh.address[lang] || sh.address.uz}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Phone size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                    <a href={`tel:${sh.phone}`} style={{ fontWeight: 600 }}>{sh.phone}</a>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Clock size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                    <span>{sh.hours}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Direct Telegram Action Card */}
            <div
              className="luxury-card"
              style={{
                padding: '28px',
                background: 'linear-gradient(135deg, #24A1DE 0%, #1579ac 100%)',
                color: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Send size={24} />
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
                  {t.contact.telegramLabel}
                </h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#e1f2fb', marginBottom: '20px', lineHeight: 1.5 }}>
                {t.contact.telegramDesc}
              </p>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
                style={{ backgroundColor: '#ffffff', color: '#1579ac', fontWeight: 600 }}
              >
                <Send size={16} />
                <span>Telegram Kanalimizga Ulanish</span>
              </a>
            </div>
          </div>

          {/* Right Column: Callback & Inquiry Form */}
          <div className="luxury-card" style={{ padding: '36px', backgroundColor: 'var(--surface)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
              {t.contact.formTitle}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '24px' }}>
              Ushbu formani toʻldiring va xabaringiz darhol navbatchi dizaynerimizning Telegramiga yetib boradi.
            </p>

            {isSent ? (
              <div
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--success-bg)',
                  border: '1px solid var(--success)',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                }}
              >
                <CheckCircle2 size={36} color="var(--success)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{t.contact.formSuccess}</h4>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Xodimlarimiz 15 daqiqada siz bilan bogʻlanadi.
                </p>
                <button onClick={() => setIsSent(false)} className="btn btn-outline btn-sm">
                  Yana xabar yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">{t.contact.formName} *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ismingiz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t.contact.formPhone} *</label>
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
                  <label className="form-label">{t.contact.formMsg}</label>
                  <textarea
                    placeholder="Masalan: Milano divanining oʻlchamlarini kattalashtirish mumkinmi?.."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="form-textarea"
                    style={{ minHeight: '120px' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-telegram btn-lg"
                  style={{ width: '100%', marginTop: '8px' }}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Yuborilmoqda...' : t.contact.formSend}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
