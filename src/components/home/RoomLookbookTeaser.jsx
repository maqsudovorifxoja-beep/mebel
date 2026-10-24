import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ROOM_LOOKBOOKS, PRODUCTS } from '../../data/products';
import { ArrowRight, Plus } from 'lucide-react';

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
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>{lang === 'uz' ? 'Jonli Interyer' : lang === 'ru' ? 'Живой интерьер' : 'Interactive Lookbook'}</span>
          </div>
          <h2 className="section-title">{t.rooms.title}</h2>
          <p className="section-subtitle">{t.rooms.subtitle}</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
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

        {/* Canvas */}
        <div style={canvasStyle}>
          <img
            src={room.image}
            alt={room.title[lang] || room.title.uz}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Hotspot pins */}
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
                style={hotspotStyle}
                title={spot.title}
                aria-label={spot.title}
              >
                <Plus size={16} />
              </button>
            </div>
          ))}

          {/* Product popover */}
          {activeHotspotProduct && (
            <div className="animate-fade-in" style={popoverStyle}>
              <img
                src={activeHotspotProduct.images[0]}
                alt={activeHotspotProduct.name[lang] || activeHotspotProduct.name.uz}
                style={{ width: '68px', height: '68px', borderRadius: 'var(--r-sm)', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {activeHotspotProduct.name[lang] || activeHotspotProduct.name.uz}
                </h4>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>
                  {new Intl.NumberFormat('uz-UZ').format(activeHotspotProduct.price)} {t.catalog.currency}
                </div>
                <Link
                  to={`/product/${activeHotspotProduct.id}`}
                  className="btn btn-primary btn-sm"
                  style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                >
                  <span>{t.rooms.viewFurniture}</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link to="/rooms" className="btn btn-outline btn-lg">
            <span>{t.rooms.exploreLookbook}</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const canvasStyle = {
  position: 'relative',
  borderRadius: 'var(--r-lg)',
  overflow: 'hidden',
  boxShadow: 'var(--shadow-md)',
  border: '1px solid var(--border)',
  aspectRatio: '16/9',
  maxHeight: '580px',
  backgroundColor: 'var(--bg-tertiary)',
};

const hotspotStyle = {
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  backgroundColor: 'var(--surface-glass)',
  backdropFilter: 'blur(6px)',
  border: '2px solid var(--accent)',
  boxShadow: '0 0 0 4px rgba(176, 141, 62, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--accent)',
  transition: 'transform 0.2s ease',
};

const popoverStyle = {
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  maxWidth: '320px',
  width: 'calc(100% - 40px)',
  zIndex: 20,
  padding: '14px',
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r-md)',
  boxShadow: 'var(--shadow-lg)',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
};
