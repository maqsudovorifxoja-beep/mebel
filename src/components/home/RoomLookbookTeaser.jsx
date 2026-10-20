import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ROOM_LOOKBOOKS, PRODUCTS } from '../../data/products';
import { ArrowRight, Eye, Plus, Check } from 'lucide-react';

export const RoomLookbookTeaser = () => {
  const { lang, t } = useLanguage();
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [activeHotspotProduct, setActiveHotspotProduct] = useState(null);

  const room = ROOM_LOOKBOOKS[selectedRoomIndex] || ROOM_LOOKBOOKS[0];

  const handleHotspotClick = (productId) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    setActiveHotspotProduct(prod || null);
  };

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>{lang === 'uz' ? 'Jonli Interyer' : lang === 'ru' ? 'Живой интерьер' : 'Interactive Lookbook'}</span>
          </div>
          <h2 className="section-title">{t.rooms.title}</h2>
          <p className="section-subtitle">{t.rooms.subtitle}</p>

          {/* Room selectors */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            {ROOM_LOOKBOOKS.map((r, idx) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRoomIndex(idx);
                  setActiveHotspotProduct(null);
                }}
                className={`btn btn-sm ${selectedRoomIndex === idx ? 'btn-primary' : 'btn-outline'}`}
              >
                {r.title[lang] || r.title.uz}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Room Canvas */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-light)',
            aspectRatio: '16/9',
            maxHeight: '620px',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <img
            src={room.image}
            alt={room.title[lang] || room.title.uz}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Interactive Hotspot pins */}
          {room.hotspots.map((spot, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: spot.top,
                left: spot.left,
                transform: 'translate(-50%, -50%)',
                zIndex: 15,
              }}
            >
              <button
                onClick={() => handleHotspotClick(spot.productId)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--surface-glass)',
                  backdropFilter: 'blur(8px)',
                  border: '2px solid var(--accent-gold)',
                  boxShadow: '0 0 0 6px rgba(197, 155, 39, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                  animation: 'pulseGlow 2s infinite',
                }}
                title={spot.title}
                aria-label={spot.title}
              >
                <Plus size={18} />
              </button>
            </div>
          ))}

          {/* Floating Product Popover Card when hotspot clicked */}
          {activeHotspotProduct && (
            <div
              className="luxury-card animate-fade-in"
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                maxWidth: '340px',
                width: 'calc(100% - 48px)',
                zIndex: 20,
                padding: '16px',
                backgroundColor: 'var(--surface-glass)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                gap: '14px',
                alignItems: 'center',
              }}
            >
              <img
                src={activeHotspotProduct.images[0]}
                alt={activeHotspotProduct.name[lang] || activeHotspotProduct.name.uz}
                style={{
                  width: '75px',
                  height: '75px',
                  borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 600, marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {activeHotspotProduct.name[lang] || activeHotspotProduct.name.uz}
                </h4>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '8px' }}>
                  {new Intl.NumberFormat('uz-UZ').format(activeHotspotProduct.price)} {t.catalog.currency}
                </div>
                <Link
                  to={`/product/${activeHotspotProduct.id}`}
                  className="btn btn-primary btn-sm"
                  style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                >
                  <span>{t.rooms.viewFurniture}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Link to Full Lookbooks page */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link to="/rooms" className="btn btn-outline btn-lg">
            <span>{t.rooms.exploreLookbook}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
