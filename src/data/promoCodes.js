export const INITIAL_PROMO_CODES = [
  {
    id: 'promo-1',
    code: 'GRAND2026',
    discountPercent: 10,
    minOrderAmount: 0,
    expiresAt: '2026-12-31',
    description: 'Grand Mebel 2026 yangi mavsum umumiy xaridlar uchun chegirma',
    isActive: true,
    usageCount: 142,
  },
  {
    id: 'promo-2',
    code: 'MEBEL10',
    discountPercent: 10,
    minOrderAmount: 5000000,
    expiresAt: '2026-12-31',
    description: '5 mln soʻmdan yuqori mebel xaridlari uchun maxsus chegirma',
    isActive: true,
    usageCount: 89,
  },
  {
    id: 'promo-3',
    code: 'VIP15',
    discountPercent: 15,
    minOrderAmount: 20000000,
    expiresAt: '2026-11-30',
    description: 'Katta buyurtmalar va VIP xaridorlar uchun chegirma',
    isActive: true,
    usageCount: 34,
  },
  {
    id: 'promo-4',
    code: 'BAHOR20',
    discountPercent: 20,
    minOrderAmount: 35000000,
    expiresAt: '2026-12-31',
    description: 'Toʻliq mebel garniturlari va xonadon toʻplamlari uchun chegirma',
    isActive: true,
    usageCount: 18,
  },
];

export const getStoredPromoCodes = () => {
  try {
    const saved = localStorage.getItem('gm_promo_codes');
    return saved ? JSON.parse(saved) : INITIAL_PROMO_CODES;
  } catch {
    return INITIAL_PROMO_CODES;
  }
};

export const saveStoredPromoCodes = (promos) => {
  try {
    localStorage.setItem('gm_promo_codes', JSON.stringify(promos));
  } catch (err) {
    console.warn('Failed to save promo codes to localStorage:', err);
  }
};
