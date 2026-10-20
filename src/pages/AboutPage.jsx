import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Award, ShieldCheck, Compass, Users, Sparkles, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  const { lang, t } = useLanguage();

  return (
    <div style={{ padding: '40px 0 80px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '800px', margin: '0 auto 64px', textAlign: 'center' }}>
          <div className="section-tag">
            <Sparkles size={14} />
            <span>2014 — 2026</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '16px' }}>
            {t.about.title}
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {t.about.subtitle}
          </p>
        </div>

        {/* Story Section with Imagery */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '80px',
          }}
        >
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
              alt="Grand Mebel Factory Workshop"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
              {t.about.storyTitle}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              {t.about.storyDesc}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)' }}>
                  12 000+ m²
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {lang === 'uz' ? 'Ishlab chiqarish maydoni' : 'Производственные площади'}
                </div>
              </div>
              <div style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-serif)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {lang === 'uz' ? 'Yevropa standartlari' : 'Европейский стандарт ISO'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '36px', textAlign: 'center' }}>
            {lang === 'uz' ? 'Bizning Sifat Ustunlarimiz' : lang === 'ru' ? 'Стандарты Нашего Качества' : 'Pillars of Excellence'}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {t.about.values.map((v, i) => (
              <div
                key={i}
                className="luxury-card"
                style={{
                  padding: '32px 24px',
                  backgroundColor: 'var(--surface)',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--accent-gold-light)',
                    color: 'var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <Award size={22} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{v.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to showroom or custom order */}
        <div
          className="luxury-card"
          style={{
            padding: '48px 32px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--surface) 100%)',
          }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>
            {lang === 'uz' ? 'Uyingiz Uchun Maxsus Loyiha Yaratamiz' : 'Создадим Мебель Вашей Мечты'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 28px', fontSize: '1.05rem' }}>
            {lang === 'uz'
              ? 'Xonangiz rejasini yuboring va biz 24 soat ichida bepul 3D vizualizatsiya hamda Telegram orqali aniq smeta tayyorlab beramiz.'
              : 'Отправьте планировку вашего дома и получите индивидуальный 3D-проект в Telegram.'}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/custom-order" className="btn btn-primary btn-lg">
              <span>{t.nav.customOrder}</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg">
              <span>{t.nav.contact}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
