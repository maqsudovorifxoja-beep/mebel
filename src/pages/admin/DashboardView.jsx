import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import { 
  TrendingUp, 
  ShoppingBag, 
  Armchair, 
  Ruler, 
  Clock, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const DashboardView = ({ setActiveTab }) => {
  const { products } = useProducts();
  const { orders, customInquiries, updateOrderStatus } = useOrders();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'new').length;
  const inStockCount = products.filter((p) => p.inStock).length;

  const formatPrice = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  // Demo monthly sales bars
  const salesData = [
    { month: 'May', amount: 48 },
    { month: 'Iyun', amount: 62 },
    { month: 'Iyul', amount: 55 },
    { month: 'Avgust', amount: 78 },
    { month: 'Sentabr', amount: 92 },
    { month: 'Oktabr', amount: 115 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Metric 1: Total Revenue */}
        <div className="luxury-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Jami Tushum (Buyurtmalar)
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-gold-light)',
                color: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '6px' }}>
            {formatPrice(totalRevenue)}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: 600 }}>
            +18.4% oʻtgan oyga nisbatan
          </span>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="luxury-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Buyurtmalar Soni
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(36, 161, 222, 0.15)',
                color: '#24A1DE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShoppingBag size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
            {orders.length} ta
          </div>
          <span style={{ fontSize: '0.78rem', color: pendingOrders > 0 ? 'var(--warning)' : 'var(--text-muted)' }}>
            {pendingOrders} ta yangi koʻrib chiqilmoqda
          </span>
        </div>

        {/* Metric 3: Active Products */}
        <div className="luxury-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Katalogdagi Mebellar
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--accent-gold-light)',
                color: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Armchair size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
            {products.length} ta
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {inStockCount} ta omborda mavjud
          </span>
        </div>

        {/* Metric 4: Custom Inquiries */}
        <div className="luxury-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Maxsus Konstruktor Arizalari
            </span>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'rgba(76, 175, 80, 0.15)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ruler size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
            {customInquiries.length} ta
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Shaxsiy oʻlchamdagi loyihalar
          </span>
        </div>
      </div>

      {/* Chart & Highlights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Sales Chart Bar Card */}
        <div className="luxury-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Savdo Dinamikasi (Mln soʻm)</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Oxirgi 6 oylik buyurtmalar hajmi
              </p>
            </div>
            <span className="badge badge-gold">2026 Yil</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '200px',
              paddingTop: '20px',
              borderBottom: '1px solid var(--border-light)',
            }}
          >
            {salesData.map((bar, i) => {
              const heightPercent = (bar.amount / 120) * 100;
              return (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
                    {bar.amount}M
                  </span>
                  <div
                    style={{
                      width: '36px',
                      height: `${heightPercent}%`,
                      backgroundColor: i === salesData.length - 1 ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.4s ease',
                    }}
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {bar.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions & Status */}
        <div className="luxury-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Tezkor Boshqaruv</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Admin panelning asosiy boʻlimlariga bir bosishda oʻtish
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => setActiveTab('products')}
                className="btn btn-secondary"
                style={{ justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Armchair size={16} color="var(--accent-gold)" />
                  <span>Yangi Mebel Qoʻshish / Tahrirlash</span>
                </div>
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className="btn btn-secondary"
                style={{ justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShoppingBag size={16} color="#24A1DE" />
                  <span>Buyurtmalarni Koʻrish va Status Berish</span>
                </div>
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className="btn btn-secondary"
                style={{ justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Ruler size={16} color="var(--success)" />
                  <span>Maxsus Konstruktor Arizalarini Koʻrish</span>
                </div>
                <ArrowUpRight size={16} />
              </button>

              <button
                onClick={() => setActiveTab('telegram')}
                className="btn btn-secondary"
                style={{ justifyContent: 'space-between' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={16} color="var(--accent-gold)" />
                  <span>Telegram Bot API va Ulanishni Tekshirish</span>
                </div>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="luxury-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Soʻnggi Buyurtmalar</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Saytdan onlayn qabul qilingan oxirgi buyurtmalar
            </p>
          </div>
          <button
            onClick={() => setActiveTab('orders')}
            className="btn btn-outline btn-sm"
          >
            Barchasini koʻrish →
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>Buyurtma ID</th>
                <th style={{ padding: '12px 14px' }}>Mijoz</th>
                <th style={{ padding: '12px 14px' }}>Telefon</th>
                <th style={{ padding: '12px 14px' }}>Summa</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Amal</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => {
                const statusBadge =
                  order.status === 'new'
                    ? { bg: 'rgba(36, 161, 222, 0.15)', text: '#24A1DE', label: 'Yangi' }
                    : order.status === 'processing'
                    ? { bg: 'var(--accent-gold-light)', text: 'var(--accent-gold)', label: 'Jarayonda' }
                    : order.status === 'delivered'
                    ? { bg: 'var(--success-bg)', text: 'var(--success)', label: 'Yetkazildi' }
                    : { bg: 'var(--danger-bg)', text: 'var(--danger)', label: 'Bekor qilindi' };

                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '14px', fontWeight: 600 }}>#{order.id}</td>
                    <td style={{ padding: '14px' }}>{order.customer.fullName}</td>
                    <td style={{ padding: '14px', color: 'var(--text-secondary)' }}>{order.customer.phone}</td>
                    <td style={{ padding: '14px', fontWeight: 700, color: 'var(--accent-gold)' }}>
                      {formatPrice(order.totalAmount)}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <span
                        style={{
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: statusBadge.bg,
                          color: statusBadge.text,
                        }}
                      >
                        {statusBadge.label}
                      </span>
                    </td>
                    <td style={{ padding: '14px', textAlign: 'right' }}>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.8rem' }}
                      >
                        Batafsil
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
