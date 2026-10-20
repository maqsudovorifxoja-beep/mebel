import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ROOM_LOOKBOOKS, PRODUCTS } from '../data/products';
import { ProductCard } from '../components/catalog/ProductCard';
import { Plus, Compass, Sparkles, ArrowRight, Eye } from 'lucide-react';

export const RoomsLookbookPage = () => {
  const { lang, t } = useLanguage();
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [activeSpotId, setActiveSpotId] = useState(null);

  const activeRoom = ROOM_LOOKBOOKS[selectedRoomIndex] || ROOM_LOOKBOOKS[0];

  // Get products included in the active lookbook
  const roomProducts = activeRoom.hotspots
    .map((spot) => PRODUCTS.find((p) => p.id === spot.productId))
    .filter(Boolean);

  return (
    <div style={{ padding: '40px 0 80px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
          <div className="section-tag">
            <Compass size={14} />
            <span>{lang === 'uz' ? 'Dizaynerlar Yechimi' : lang === 'ru' ? 'Дизайнерские концепты' : 'Architectural Spaces'}</span>
          </div>
          <h1 style={{ fontSize: '2.6rem', marginBottom: '14px' }}>{t.rooms.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            {t.rooms.subtitle}
          </p>
        </div>

        {/* Room Tab Selector */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '36px',
          }}
        >
          {ROOM_LOOKBOOKS.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => {
                setSelectedRoomIndex(idx);
                setActiveSpotId(null);
              }}
              style={{
                padding: '12px 24px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600,
                fontSize: '0.92rem',
                backgroundColor: selectedRoomIndex === idx ? 'var(--accent-gold)' : 'var(--surface)',
                color: selectedRoomIndex === idx ? '#0d0f12' : 'var(--text-primary)',
                border: `1px solid ${selectedRoomIndex === idx ? 'var(--accent-gold)' : 'var(--border-light)'}`,
                boxShadow: selectedRoomIndex === idx ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)',
              }}
            >
              {room.title[lang] || room.title.uz}
            </button>
          ))}
        </div>

        {/* Main Interactive Lookbook Visual */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            aspectRatio: '16/9',
            maxHeight: '650px',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-lg)',
            marginBottom: '48px',
          }}
        >
          <img
            src={activeRoom.image}
            alt={activeRoom.title[lang] || activeRoom.title.uz}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Interactive Hotspot pins */}
          {activeRoom.hotspots.map((spot, i) => {
            const isSelected = activeSpotId === spot.productId;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: spot.top,
                  left: spot.left,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                }}
              >
                <button
                  onClick={() => setActiveSpotId(isSelected ? null : spot.productId)}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? 'var(--accent-gold)' : 'var(--surface-glass)',
                    color: isSelected ? '#0d0f12' : 'var(--accent-gold)',
                    backdropFilter: 'blur(8px)',
                    border: '2px solid var(--accent-gold)',
                    boxShadow: '0 0 0 8px rgba(197, 155, 39, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: isSelected ? 'none' : 'pulseGlow 2s infinite',
                  }}
                  title={spot.title}
                  aria-label={spot.title}
                >
                  <Plus size={20} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Room Title and Subtitle */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
            {activeRoom.title[lang] || activeRoom.title.uz}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            {activeRoom.subtitle[lang] || activeRoom.subtitle.uz}
          </p>
        </div>

        {/* Products in this Lookbook */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>
            {lang === 'uz' ? 'Ushbu Interyerdagi Mebellar:' : lang === 'ru' ? 'Мебель из этого интерьера:' : 'Furniture in this space:'}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {roomProducts.map((prod) => (
              <div
                key={prod.id}
                style={{
                  outline: activeSpotId === prod.id ? '3px solid var(--accent-gold)' : 'none',
                  borderRadius: 'var(--radius-md)',
                  transition: 'outline 0.2s ease',
                }}
              >
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
