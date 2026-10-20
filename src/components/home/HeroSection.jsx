import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTelegram } from '../../context/TelegramContext';
import { ArrowRight, Sparkles, Send, ShieldCheck, Award, Ruler } from 'lucide-react';

export const HeroSection = () => {
  const { t } = useLanguage();
  const { openSettingsModal } = useTelegram();

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 0 80px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-gold-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Text Column */}
          <div style={{ maxWidth: '640px' }}>
            <div className="section-tag" style={{ justifyContent: 'flex-start' }}>
              <Sparkles size={14} />
              <span>{t.hero.tag}</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.18,
                marginBottom: '20px',
              }}
            >
              {t.hero.title}
            </h1>

            <p
              style={{
                fontSize: '1.12rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '36px',
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
              <Link to="/catalog" className="btn btn-primary btn-lg">
                <span>{t.hero.exploreCatalog}</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/custom-order" className="btn btn-secondary btn-lg">
                <Ruler size={18} color="var(--accent-gold)" />
                <span>{t.hero.customOrderBtn}</span>
              </Link>

              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="btn btn-telegram btn-lg"
              >
                <Send size={18} />
                <span>{t.hero.consultTelegram}</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-light)',
              }}
            >
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)' }}>
                  12+
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {t.hero.stat1}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)' }}>
                  3 500+
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {t.hero.stat2}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)' }}>
                  5 Yil
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {t.hero.stat3}
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-light)',
                aspectRatio: '4/3',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
                alt="Grand Mebel Luxury Living Room"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Luxury Detail Badge */}
            <div
              className="luxury-card pulse-glow"
              style={{
                position: 'absolute',
                bottom: '-24px',
                left: '-20px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                maxWidth: '280px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--surface-glass)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  flexShrink: 0,
                }}
              >
                <Award size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                  Premium Italiya Baxmali
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Suv va qahva dogʻlariga chidamli
                </div>
              </div>
            </div>

            {/* Floating Bot Badge */}
            <div
              className="luxury-card"
              style={{
                position: 'absolute',
                top: '20px',
                right: '-16px',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#24A1DE',
                color: '#fff',
                fontSize: '0.82rem',
                fontWeight: 600,
                boxShadow: '0 8px 24px rgba(36, 161, 222, 0.4)',
              }}
            >
              <Send size={15} />
              <span>Telegram Bot 24/7 Ulanish</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
