import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTelegram } from '../../context/TelegramContext';
import { Send, CheckCircle2, Settings, MessageSquare, Zap, ShieldCheck } from 'lucide-react';

export const TelegramPromoBanner = () => {
  const { lang } = useLanguage();
  const { openSettingsModal } = useTelegram();

  return (
    <section className="section" style={{ padding: '40px 0' }}>
      <div className="container">
        <div
          className="luxury-card"
          style={{
            background: 'linear-gradient(135deg, #162438 0%, #0d1624 100%)',
            border: '1px solid rgba(36, 161, 222, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '48px',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Subtle background glow */}
          <div
            style={{
              position: 'absolute',
              top: '-30%',
              right: '-10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(36, 161, 222, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '36px',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(36, 161, 222, 0.2)',
                  color: '#24A1DE',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  marginBottom: '16px',
                  border: '1px solid rgba(36, 161, 222, 0.4)',
                }}
              >
                <Zap size={14} />
                <span>
                  {lang === 'uz' ? '24/7 Tezkor Telegram Bot' : lang === 'ru' ? 'Быстрый Telegram Бот 24/7' : '24/7 Telegram Concierge Bot'}
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  color: '#ffffff',
                  marginBottom: '14px',
                  fontFamily: 'var(--font-serif)',
                }}
              >
                {lang === 'uz'
                  ? 'Barcha Buyurtma va Soʻrovlar Telegram Botingizda!'
                  : lang === 'ru'
                  ? 'Все Заказы и Заявки Напрямую в Вашем Telegram!'
                  : 'Instant Quotes & Direct Telegram Orders'}
              </h2>

              <p style={{ fontSize: '0.96rem', color: '#b0c4de', lineHeight: 1.6, marginBottom: '24px' }}>
                {lang === 'uz'
                  ? 'Sayt orqali xarid qilingan har bir mebel, maxsus oʻlchamli chizmalar va kontaktlar sizning yoki fabrikamizning Telegram botiga avtomatik yuboriladi.'
                  : lang === 'ru'
                  ? 'Каждый оформленный заказ, индивидуальный чертеж и контактные данные мгновенно отправляются в Telegram бот с детальным отчетом.'
                  : 'Every customized quote, cart checkout, and direct design request syncs in real-time with the factory Telegram bot.'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-telegram btn-lg"
                >
                  <Send size={18} />
                  <span>{lang === 'uz' ? 'Telegram Botni Ochish' : lang === 'ru' ? 'Открыть Telegram Бот' : 'Launch Telegram Bot'}</span>
                </a>

                <button
                  onClick={openSettingsModal}
                  className="btn btn-outline btn-lg"
                  style={{ color: '#ffffff', borderColor: 'rgba(255, 255, 255, 0.3)' }}
                >
                  <Settings size={18} />
                  <span>{lang === 'uz' ? 'Bot Tokenni Sozlash' : lang === 'ru' ? 'Настроить Токен Бота' : 'Configure Bot Token'}</span>
                </button>
              </div>
            </div>

            {/* Feature Checklist */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 'var(--radius-md)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="#24A1DE" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#ffffff' }}>
                    {lang === 'uz' ? '1-Bosishda Xarid' : lang === 'ru' ? 'Покупка в 1 клик' : '1-Click Fast Ordering'}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#9bb0cb' }}>
                    {lang === 'uz' ? 'Telefon raqamni kiritish kifoya — bot darhol buyurtmani yetkazadi' : lang === 'ru' ? 'Быстрое подтверждение без лишних шагов' : 'Instant dispatch without account friction'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="#24A1DE" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#ffffff' }}>
                    {lang === 'uz' ? 'Maxsus Oʻlchamli Konstruktor' : lang === 'ru' ? 'Индивидуальный расчет' : 'Bespoke Dimensions Sync'}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#9bb0cb' }}>
                    {lang === 'uz' ? 'Xonaning uzunligi, kengligi va materiali boʻyicha toʻliq hisob-kitob' : lang === 'ru' ? 'Точные параметры изделия передаются технологу' : 'Dimensions and chosen wood species sent directly to craftsmen'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={20} color="#24A1DE" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#ffffff' }}>
                    {lang === 'uz' ? 'Shaxsiy Botga Ulanish Imkoniyati' : lang === 'ru' ? 'Подключение своего бота' : 'Personal Bot API Compatibility'}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: '#9bb0cb' }}>
                    {lang === 'uz' ? 'Oʻz bot tokeningizni va chat ID ni bir zumda sozlab qoʻyishingiz mumkin' : lang === 'ru' ? 'Легкая привязка вашего собственного бота и канала' : 'Easily plug in your own @BotFather token anytime'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
