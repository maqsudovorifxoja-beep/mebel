import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Ruler, Play } from 'lucide-react';

export const HeroSection = () => {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={styles.hero}>
      {/* Full-bleed hero image */}
      <div style={styles.imageContainer}>
        <img
          src="/hero-main.jpg"
          alt="Grand Mebel — Luxury Italian Interior"
          style={{
            ...styles.heroImage,
            transform: loaded ? 'scale(1)' : 'scale(1.06)',
            opacity: loaded ? 1 : 0,
          }}
          onLoad={() => setLoaded(true)}
        />
        <div style={styles.imageOverlay} />
      </div>

      {/* Content layer */}
      <div className="container" style={styles.contentWrap}>
        <div
          style={{
            ...styles.content,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
          }}
        >
          <div style={styles.eyebrow}>
            <span style={styles.eyebrowLine} />
            <span>{t.hero.tag}</span>
          </div>

          <h1 style={styles.heading}>
            {t.hero.title}
          </h1>

          <p style={styles.subheading}>
            {t.hero.subtitle}
          </p>

          <div style={styles.actions}>
            <Link to="/catalog" className="btn btn-primary btn-lg">
              <span>{t.hero.exploreCatalog}</span>
              <ArrowRight size={17} />
            </Link>

            <Link to="/custom-order" className="btn btn-lg" style={styles.btnGhost}>
              <Ruler size={17} />
              <span>{t.hero.customOrderBtn}</span>
            </Link>
          </div>

          {/* Stat strip */}
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <span style={styles.statValue}>12+</span>
              <span style={styles.statLabel}>{t.hero.stat1}</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statValue}>3 500+</span>
              <span style={styles.statLabel}>{t.hero.stat2}</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.statItem}>
              <span style={styles.statValue}>5 Yil</span>
              <span style={styles.statLabel}>{t.hero.stat3}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={styles.scrollHint}>
        <div style={styles.scrollDot} />
      </div>
    </section>
  );
};

const styles = {
  hero: {
    position: 'relative',
    height: '100vh',
    minHeight: '640px',
    maxHeight: '960px',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'absolute',
    inset: 0,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 35%',
    transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
  },
  imageOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(14, 16, 15, 0.88) 0%, rgba(14, 16, 15, 0.45) 40%, rgba(14, 16, 15, 0.1) 100%)',
  },
  contentWrap: {
    position: 'relative',
    zIndex: 2,
    paddingBottom: '72px',
    width: '100%',
  },
  content: {
    maxWidth: '640px',
  },
  eyebrow: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '0.76rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    fontWeight: '600',
    color: '#c9a54a',
    marginBottom: '20px',
  },
  eyebrowLine: {
    display: 'inline-block',
    width: '32px',
    height: '1.5px',
    background: '#c9a54a',
  },
  heading: {
    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
    fontFamily: "'Playfair Display', Georgia, serif",
    fontWeight: 700,
    color: '#ffffff',
    lineHeight: 1.12,
    marginBottom: '20px',
    letterSpacing: '-0.02em',
  },
  subheading: {
    fontSize: '1.08rem',
    color: 'rgba(255, 255, 255, 0.72)',
    lineHeight: 1.65,
    marginBottom: '32px',
    maxWidth: '520px',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '44px',
  },
  btnGhost: {
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(6px)',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.12)',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  statValue: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#c9a54a',
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  statLabel: {
    fontSize: '0.74rem',
    color: 'rgba(255, 255, 255, 0.55)',
    letterSpacing: '0.04em',
  },
  statDivider: {
    width: '1px',
    height: '32px',
    background: 'rgba(255, 255, 255, 0.12)',
  },
  scrollHint: {
    position: 'absolute',
    bottom: '28px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
    width: '20px',
    height: '32px',
    borderRadius: '10px',
    border: '1.5px solid rgba(255, 255, 255, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '6px',
  },
  scrollDot: {
    width: '3px',
    height: '8px',
    borderRadius: '3px',
    background: 'rgba(255, 255, 255, 0.5)',
    animation: 'fadeIn 1.5s ease infinite',
  },
};
