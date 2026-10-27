import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ArrowRight, MoveHorizontal, CheckCircle2, Ruler } from 'lucide-react';

export const BeforeAfterSlider = () => {
  const { lang } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percent = (x / rect.width) * 100;
    if (percent < 5) percent = 5;
    if (percent > 95) percent = 95;
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleTouchStart = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (!isDragging || !e.touches[0]) return;
      handleMove(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handleMove]);

  return (
    <section
      style={{
        padding: '90px 0',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 46px' }}>
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={14} />
            <span>{lang === 'uz' ? 'Xonani Oʻzgartirish' : lang === 'ru' ? 'Преображение интерьера' : 'Living Space Transformation'}</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '14px', fontFamily: 'var(--font-display)' }}>
            {lang === 'uz'
              ? 'Oddiy Xonadan Hashamatli Koshonagacha'
              : lang === 'ru'
              ? 'От пустого бетона до премиального уюта'
              : 'From Bare Concrete to Bespoke Luxury'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {lang === 'uz'
              ? 'Chiziqni oʻngga va chapga surib, Grand Mebel mebellari xonadonni qanday oʻzgartirib yuborishini oʻz koʻzingiz bilan koʻring.'
              : 'Перетаскивайте ползунок, чтобы увидеть преображение пространства нашими мастерами и дизайнерами.'}
          </p>
        </div>

        {/* Interactive Comparison Canvas */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1050px',
            height: '520px',
            margin: '0 auto',
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            border: '1px solid var(--border)',
            cursor: 'ew-resize',
            userSelect: 'none',
          }}
        >
          {/* AFTER Image (Full background) */}
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85"
            alt="Grand Mebel Furnished Luxury Room"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* AFTER Label Pill */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(20, 24, 22, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(201, 165, 74, 0.5)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: 'var(--r-full)',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              zIndex: 3,
            }}
          >
            <Sparkles size={14} color="#c9a54a" />
            <span>{lang === 'uz' ? 'Grand Mebel bilan (Keyin)' : 'С мебелью Grand Mebel (После)'}</span>
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: `${sliderPosition}%`,
              overflow: 'hidden',
              zIndex: 2,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
              alt="Empty Bare Room Before"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '1050px',
                maxWidth: 'none',
                objectFit: 'cover',
                filter: 'grayscale(20%) brightness(0.9)',
              }}
            />

            {/* BEFORE Label Pill */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: 'rgba(20, 24, 22, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: 'var(--r-full)',
                fontSize: '0.82rem',
                fontWeight: 700,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{lang === 'uz' ? 'Boʻsh xona (Oldin)' : 'Пустая комната (До)'}</span>
            </div>
          </div>

          {/* Draggable Divider Line & Knob */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${sliderPosition}%`,
              width: '3px',
              backgroundColor: '#ffffff',
              transform: 'translateX(-50%)',
              zIndex: 4,
              boxShadow: '0 0 12px rgba(0,0,0,0.6)',
            }}
          >
            {/* Round Knob */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                border: '3px solid #c9a54a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0d0f12',
                cursor: 'ew-resize',
              }}
            >
              <MoveHorizontal size={20} />
            </div>
          </div>

          {/* Subtle instruction pill at bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '18px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(10, 12, 11, 0.75)',
              backdropFilter: 'blur(8px)',
              padding: '6px 16px',
              borderRadius: 'var(--r-full)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.76rem',
              fontWeight: 600,
              zIndex: 5,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <MoveHorizontal size={13} />
            <span>{lang === 'uz' ? 'Chiziqni suring va farqni solishtiring' : 'Перетащите ползунок для сравнения'}</span>
          </div>
        </div>

        {/* Action Callout beneath Slider */}
        <div
          style={{
            marginTop: '36px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={16} color="var(--accent)" />
              {lang === 'uz' ? 'Bepul lazer oʻlchov' : 'Бесплатный лазерный замер'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={16} color="var(--accent)" />
              {lang === 'uz' ? 'Mualliflik 3D dizayn loyihasi' : '3D дизайн-проект в подарок'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <CheckCircle2 size={16} color="var(--accent)" />
              {lang === 'uz' ? 'Toshkent boʻylab bepul oʻrnatish' : 'Бесплатная сборка и доставка'}
            </span>
          </div>

          <Link to="/custom-order" className="btn btn-primary btn-lg" style={{ marginTop: '8px' }}>
            <Ruler size={18} />
            <span>{lang === 'uz' ? 'Xonangiz Uchun Bepul 3D Loyiha Buyurtma Qiling' : 'Заказать бесплатный 3D проект'}</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};
