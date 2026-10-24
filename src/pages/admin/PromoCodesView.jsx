import React, { useState, useEffect } from 'react';
import { useTelegram } from '../../context/TelegramContext';
import { getStoredPromoCodes, saveStoredPromoCodes } from '../../data/promoCodes';
import { 
  Ticket, 
  Plus, 
  Search, 
  Trash2, 
  Copy, 
  Check, 
  Clock, 
  Calendar, 
  Percent, 
  X, 
  ShieldCheck, 
  TrendingUp, 
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export const PromoCodesView = () => {
  const { addToast } = useTelegram();

  const [promos, setPromos] = useState(() => getStoredPromoCodes());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'inactive'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  // New Promo form state
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(15);
  const [minOrderAmount, setMinOrderAmount] = useState(0);
  const [expiresAt, setExpiresAt] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Synchronize with localStorage
  useEffect(() => {
    saveStoredPromoCodes(promos);
  }, [promos]);

  const formatPrice = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  // KPIs
  const totalCount = promos.length;
  const activeCount = promos.filter((p) => p.isActive).length;
  const totalUsage = promos.reduce((sum, p) => sum + (p.usageCount || 0), 0);
  const avgDiscount = totalCount > 0 ? Math.round(promos.reduce((s, p) => s + p.discountPercent, 0) / totalCount) : 0;

  // Filtered
  const filteredPromos = promos.filter((promo) => {
    if (statusFilter === 'active' && !promo.isActive) return false;
    if (statusFilter === 'inactive' && promo.isActive) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const codeMatch = promo.code.toLowerCase().includes(q);
      const descMatch = (promo.description || '').toLowerCase().includes(q);
      if (!codeMatch && !descMatch) return false;
    }
    return true;
  });

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(codeText);
    addToast(`"${codeText}" kodi nusxalandi!`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleToggleStatus = (promoId) => {
    setPromos((prev) =>
      prev.map((p) => {
        if (p.id === promoId) {
          const nextState = !p.isActive;
          addToast(`"${p.code}" ${nextState ? 'faollashtirildi' : 'nofaol qilindi'}`, 'info');
          return { ...p, isActive: nextState };
        }
        return p;
      })
    );
  };

  const handleDeletePromo = (promoId, codeName) => {
    if (window.confirm(`Haqiqatan ham "${codeName}" promokodini oʻchirmoqchimisiz?`)) {
      setPromos((prev) => prev.filter((p) => p.id !== promoId));
      addToast(`"${codeName}" promokodi oʻchirildi`, 'info');
    }
  };

  const handleCreatePromoSubmit = (e) => {
    e.preventDefault();

    const cleanCode = code.trim().toUpperCase().replace(/\s+/g, '');
    if (!cleanCode) {
      addToast('Iltimos, promokod nomini kiriting', 'error');
      return;
    }

    // Check duplicate
    if (promos.some((p) => p.code === cleanCode)) {
      addToast(`"${cleanCode}" promokodi allaqachon mavjud!`, 'error');
      return;
    }

    const newPromo = {
      id: 'promo-' + Date.now(),
      code: cleanCode,
      discountPercent: Number(discountPercent) || 10,
      minOrderAmount: Number(minOrderAmount) || 0,
      expiresAt: expiresAt || null,
      description: description.trim() || `${discountPercent}% umumiy chegirma`,
      isActive: Boolean(isActive),
      usageCount: 0,
    };

    setPromos((prev) => [newPromo, ...prev]);
    addToast(`Yangi "${cleanCode}" (${discountPercent}%) promokodi yaratildi!`, 'success');

    // Reset Form
    setCode('');
    setDiscountPercent(15);
    setMinOrderAmount(0);
    setExpiresAt('');
    setDescription('');
    setIsActive(true);
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Ticket size={24} color="var(--accent-gold)" />
            Promokodlar va Chegirmalar
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Xaridorlar uchun chegirma kuponlarini yaratish, boshqarish va savatcha bilan real-vaqtda sinxronlash
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={18} />
          <span>Yangi Promokod Yaratish</span>
        </button>
      </div>

      {/* KPI Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        <div className="luxury-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>
            Jami Promokodlar
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {totalCount} ta
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>
            Faol Promokodlar
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--success)' }}>
            {activeCount} ta
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>
            Oʻrtacha Chegirma
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
            {avgDiscount}%
          </div>
        </div>

        <div className="luxury-card" style={{ padding: '22px' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>
            Jami Foydalanildi
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {totalUsage} marta
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="luxury-card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Promokod kodi yoki tavsifi..."
            className="form-input"
            style={{ paddingLeft: '40px' }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Holati:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
            style={{ minWidth: '150px' }}
          >
            <option value="all">Barchasi</option>
            <option value="active">Faqat Faollar</option>
            <option value="inactive">Nofaollar</option>
          </select>
        </div>
      </div>

      {/* Promo Codes Table */}
      <div className="luxury-card" style={{ padding: '24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '12px 14px' }}>Promokod</th>
              <th style={{ padding: '12px 14px' }}>Chegirma</th>
              <th style={{ padding: '12px 14px' }}>Min Xarid</th>
              <th style={{ padding: '12px 14px' }}>Muddati</th>
              <th style={{ padding: '12px 14px' }}>Qoʻllandi</th>
              <th style={{ padding: '12px 14px' }}>Tavsif</th>
              <th style={{ padding: '12px 14px' }}>Holat</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromos.length > 0 ? (
              filteredPromos.map((p) => {
                const isExpired = p.expiresAt && new Date().toISOString().split('T')[0] > p.expiresAt;

                return (
                  <tr
                    key={p.id}
                    style={{
                      borderBottom: '1px solid var(--border-light)',
                      transition: 'background-color var(--transition-fast)',
                      opacity: p.isActive && !isExpired ? 1 : 0.65,
                    }}
                    className="table-row"
                  >
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            padding: '4px 10px',
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px dashed var(--accent-gold)',
                            borderRadius: '4px',
                            color: 'var(--accent-gold)',
                            fontFamily: 'monospace',
                            fontSize: '0.95rem',
                          }}
                        >
                          {p.code}
                        </span>
                        <button
                          onClick={() => handleCopyCode(p.code)}
                          className="btn-icon"
                          style={{ width: '28px', height: '28px' }}
                          title="Kodni nusxalash"
                        >
                          {copiedCode === p.code ? <Check size={13} color="var(--success)" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </td>

                    <td style={{ padding: '14px' }}>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: 'var(--success-bg)',
                          color: 'var(--success)',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                        }}
                      >
                        -{p.discountPercent}%
                      </span>
                    </td>

                    <td style={{ padding: '14px', fontWeight: 500 }}>
                      {p.minOrderAmount > 0 ? formatPrice(p.minOrderAmount) : 'Cheklovsiz'}
                    </td>

                    <td style={{ padding: '14px', fontSize: '0.82rem' }}>
                      {p.expiresAt ? (
                        isExpired ? (
                          <span style={{ color: 'var(--danger)', fontWeight: 600 }}>
                            {p.expiresAt} (Tugagan)
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-secondary)' }}>
                            {p.expiresAt} gacha
                          </span>
                        )
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Muddatsiz</span>
                      )}
                    </td>

                    <td style={{ padding: '14px', fontWeight: 600 }}>
                      {p.usageCount || 0} marta
                    </td>

                    <td style={{ padding: '14px', color: 'var(--text-secondary)', maxWidth: '240px', fontSize: '0.82rem' }}>
                      {p.description}
                    </td>

                    <td style={{ padding: '14px' }}>
                      <button
                        onClick={() => handleToggleStatus(p.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: p.isActive ? 'var(--success)' : 'var(--text-muted)',
                          fontWeight: 600,
                          fontSize: '0.82rem',
                          padding: 0,
                        }}
                      >
                        {p.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                        <span>{p.isActive ? 'Faol' : 'Nofaol'}</span>
                      </button>
                    </td>

                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleDeletePromo(p.id, p.code)}
                        className="btn-icon"
                        style={{ color: 'var(--danger)' }}
                        title="Oʻchirish"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Promokodlar topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ─── CREATE PROMO MODAL ─── */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '580px', padding: '32px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Ticket size={22} color="var(--accent-gold)" />
                  Yangi Promokod Yaratish
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Yaratilgan promokod xaridorlar savatchasida darhol ishlay boshlaydi
                </span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="btn-icon">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreatePromoSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="form-label">Promokod Nomi / Kodi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: BAHOR15, VIP20, YANGIYIL"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="form-input"
                    style={{ fontWeight: 700, letterSpacing: '0.06em' }}
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Faqat lotin harflari va raqamlar tavsiya etiladi (avtomatik bosh harflarda saqlanadi).
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">Chegirma Foizi (%) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="90"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">Minimal Xarid Summasi (soʻm)</label>
                    <input
                      type="number"
                      min="0"
                      step="500000"
                      placeholder="0 — cheklovsiz"
                      value={minOrderAmount}
                      onChange={(e) => setMinOrderAmount(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Amal Qilish Tugash Sanasi (ixtiyoriy)</label>
                  <input
                    type="date"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="form-input"
                  />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Boʻsh qoldirilsa, muddatsiz amal qiladi.
                  </span>
                </div>

                <div>
                  <label className="form-label">Tavsif yoki Maqsadi</label>
                  <textarea
                    placeholder="Masalan: Bahorgi yangilanish aksiyasi boʻyicha mijozlarga 15% chegirma..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                    style={{ minHeight: '64px' }}
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }}
                  />
                  <span>Promokodni darhol faollashtirish (saytda ishlaydigan qilish)</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Check size={16} />
                  <span>Promokodni Saqlash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
