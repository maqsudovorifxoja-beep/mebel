import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTelegram } from '../../context/TelegramContext';
import { Send, CheckCircle2, Settings, Zap } from 'lucide-react';

export const TelegramPromoBanner = () => {
  const { lang } = useLanguage();
  const { openSettingsModal } = useTelegram();

  const features = [
    {
      title: { uz: '1-Bosishda Xarid', ru: 'Покупка в 1 клик', en: '1-Click Ordering' },
      desc: { uz: 'Telefon raqamni kiritish kifoya', ru: 'Быстрое подтверждение', en: 'Instant dispatch' },
    },
    {
      title: { uz: 'Maxsus Oʻlcham', ru: 'Индивидуальный расчет', en: 'Bespoke Dimensions' },
      desc: { uz: 'Xona oʻlchami boʻyicha hisob', ru: 'Параметры передаются технологу', en: 'Dimensions sent to craftsmen' },
    },
    {
      title: { uz: 'Shaxsiy Bot Ulanish', ru: 'Свой Бот', en: 'Personal Bot API' },
      desc: { uz: 'Oʻz bot tokeningizni sozlang', ru: 'Легкая привязка бота', en: 'Plug in your own token' },
    },
  ];

  return (
    <section style={{ padding: '40px 0 0' }}>
      <div className="container">
        <div style={bannerStyle}>
          <div style={bannerGrid}>
            {/* Left text */}
            <div>
              <div style={pillStyle}>
                <Zap size={13} />
                <span>
                  {lang === 'uz' ? '24/7 Telegram Bot' : lang === 'ru' ? 'Telegram Бот 24/7' : '24/7 Telegram Bot'}
                </span>
              </div>

              <h2 style={bannerHeading}>
                {lang === 'uz'
                  ? 'Buyurtma va Soʻrovlar — Telegram Botingizda'
                  : lang === 'ru'
                  ? 'Заказы Напрямую в Telegram'
                  : 'Orders & Quotes via Telegram'}
              </h2>

              <p style={bannerDesc}>
                {lang === 'uz'
                  ? 'Xarid qilingan mebel, maxsus chizmalar va kontaktlar Telegram botga avtomatik yuboriladi.'
                  : lang === 'ru'
                  ? 'Заказы и чертежи мгновенно отправляются в Telegram бот.'
                  : 'Every cart checkout and design request syncs with Telegram.'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-telegram btn-lg"
                >
                  <Send size={16} />
                  <span>{lang === 'uz' ? 'Telegram Botni Ochish' : lang === 'ru' ? 'Открыть Бот' : 'Launch Bot'}</span>
                </a>

                <button
                  onClick={openSettingsModal}
                  className="btn btn-lg"
                  style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)' }}
                >
                  <Settings size={16} />
                  <span>{lang === 'uz' ? 'Token Sozlash' : lang === 'ru' ? 'Настроить' : 'Configure'}</span>
                </button>
              </div>
            </div>

            {/* Right feature list */}
            <div style={featureListStyle}>
              {features.map((f, i) => (
                <div key={i} style={featureItemStyle}>
                  <CheckCircle2 size={18} color="#229ED9" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={featureTitle}>{f.title[lang] || f.title.uz}</h4>
                    <p style={featureDesc}>{f.desc[lang] || f.desc.uz}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const bannerStyle = {
  background: 'linear-gradient(135deg, #172033 0%, #0e1520 100%)',
  border: '1px solid rgba(34, 158, 217, 0.2)',
  borderRadius: 'var(--r-lg)',
  padding: 'clamp(32px, 5vw, 56px)',
  color: '#ffffff',
  position: 'relative',
  overflow: 'hidden',
};

const bannerGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '40px',
  alignItems: 'center',
};

const pillStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  padding: '5px 12px',
  borderRadius: 'var(--r-full)',
  backgroundColor: 'rgba(34, 158, 217, 0.15)',
  color: '#229ED9',
  fontSize: '0.78rem',
  fontWeight: 600,
  marginBottom: '16px',
  border: '1px solid rgba(34, 158, 217, 0.3)',
};

const bannerHeading = {
  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
  color: '#ffffff',
  marginBottom: '14px',
  fontFamily: 'var(--font-display)',
  lineHeight: 1.2,
};

const bannerDesc = {
  fontSize: '0.92rem',
  color: '#9cb3cc',
  lineHeight: 1.6,
  marginBottom: '24px',
  maxWidth: '480px',
};

const featureListStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 'var(--r-md)',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

const featureItemStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
};

const featureTitle = {
  fontSize: '0.92rem',
  fontWeight: 600,
  color: '#ffffff',
  marginBottom: '2px',
};

const featureDesc = {
  fontSize: '0.78rem',
  color: '#8aa3bd',
  lineHeight: 1.4,
};
