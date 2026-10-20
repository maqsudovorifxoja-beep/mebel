import React from 'react';
import { useOrders } from '../../context/OrderContext';
import { useTelegram } from '../../context/TelegramContext';
import { Ruler, Phone, MapPin, Trash2, CheckCircle2, Clock } from 'lucide-react';

export const CustomInquiriesView = () => {
  const { customInquiries, updateInquiryStatus, deleteInquiry } = useOrders();
  const { addToast } = useTelegram();

  const handleStatus = (id, newStatus) => {
    updateInquiryStatus(id, newStatus);
    addToast(`Ariza #${id} holati yangilandi`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Maxsus Konstruktor Arizalari</h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
          Mijozlar tomonidan saytdagi kalkulyator orqali yuborilgan individual mebel buyurtmalari
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {customInquiries.map((inq) => (
          <div
            key={inq.id}
            className="luxury-card"
            style={{
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            {/* Inquiry Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-gold">#{inq.id}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{inq.date}</span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{inq.furnitureType}</h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <strong>Oʻlchamlari:</strong> {inq.dimensions}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <strong>Material:</strong> {inq.material}
              </div>
            </div>

            {/* Customer Details */}
            <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><strong>Mijoz:</strong> {inq.customerName}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={15} color="var(--accent-gold)" />
                <a href={`tel:${inq.phone}`} style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>
                  {inq.phone}
                </a>
              </div>
              {inq.address && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <MapPin size={15} />
                  <span>{inq.address}</span>
                </div>
              )}
              {inq.notes && (
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '4px' }}>
                  "{inq.notes}"
                </div>
              )}
            </div>

            {/* Budget & Status Action */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Kutilayotgan byudjet:</div>
                <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  {inq.budget}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <select
                  value={inq.status}
                  onChange={(e) => handleStatus(inq.id, e.target.value)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    backgroundColor: inq.status === 'new' ? 'rgba(36,161,222,0.15)' : 'var(--success-bg)',
                    color: inq.status === 'new' ? '#24A1DE' : 'var(--success)',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <option value="new">Yangi ariza</option>
                  <option value="contacted">Aloqaga chiqildi</option>
                  <option value="approved">Tasdiqlandi / Ishga olindi</option>
                </select>

                <button
                  onClick={() => {
                    deleteInquiry(inq.id);
                    addToast(`Ariza #${inq.id} oʻchirildi`, 'info');
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--danger)', padding: '6px 10px' }}
                  title="Oʻchirish"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
