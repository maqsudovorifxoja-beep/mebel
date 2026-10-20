import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useTelegram } from '../../context/TelegramContext';
import { 
  Search, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle, 
  X,
  Phone,
  MapPin,
  CreditCard,
  FileText
} from 'lucide-react';

export const OrdersView = () => {
  const { orders, updateOrderStatus, deleteOrder } = useOrders();
  const { addToast } = useTelegram();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatPrice = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    addToast(`Buyurtma #${orderId} holati yangilandi!`, 'success');
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const idMatch = order.id.toLowerCase().includes(q);
      const nameMatch = (order.customer.fullName || '').toLowerCase().includes(q);
      const phoneMatch = (order.customer.phone || '').toLowerCase().includes(q);
      if (!idMatch && !nameMatch && !phoneMatch) return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Buyurtmalar Boshqaruvi</h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
          Saytdan kelib tushgan buyurtmalarni nazorat qilish, holatini oʻzgartirish va yetkazish
        </p>
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
            placeholder="Buyurtma ID, ism yoki telefon..."
            className="form-input"
            style={{ paddingLeft: '40px' }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
            style={{ minWidth: '160px' }}
          >
            <option value="all">Barchasi</option>
            <option value="new">Yangi</option>
            <option value="processing">Jarayonda</option>
            <option value="delivered">Yetkazildi</option>
            <option value="cancelled">Bekor qilindi</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="luxury-card" style={{ padding: '24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>ID / Sana</th>
              <th style={{ padding: '12px 14px' }}>Mijoz</th>
              <th style={{ padding: '12px 14px' }}>Mahsulotlar</th>
              <th style={{ padding: '12px 14px' }}>Jami Summa</th>
              <th style={{ padding: '12px 14px' }}>Status</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '14px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>#{order.id}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{order.date}</div>
                </td>
                <td style={{ padding: '14px' }}>
                  <div style={{ fontWeight: 600 }}>{order.customer.fullName}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--accent-gold)' }}>{order.customer.phone}</div>
                </td>
                <td style={{ padding: '14px' }}>
                  <div style={{ fontSize: '0.85rem' }}>
                    {order.items.map((it) => `${it.title} (${it.quantity}x)`).join(', ')}
                  </div>
                </td>
                <td style={{ padding: '14px', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  {formatPrice(order.totalAmount)}
                </td>
                <td style={{ padding: '14px' }}>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      backgroundColor:
                        order.status === 'new'
                          ? 'rgba(36, 161, 222, 0.15)'
                          : order.status === 'processing'
                          ? 'var(--accent-gold-light)'
                          : order.status === 'delivered'
                          ? 'var(--success-bg)'
                          : 'var(--danger-bg)',
                      color:
                        order.status === 'new'
                          ? '#24A1DE'
                          : order.status === 'processing'
                          ? 'var(--accent-gold)'
                          : order.status === 'delivered'
                          ? 'var(--success)'
                          : 'var(--danger)',
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    <option value="new">Yangi</option>
                    <option value="processing">Jarayonda</option>
                    <option value="delivered">Yetkazildi</option>
                    <option value="cancelled">Bekor qilindi</option>
                  </select>
                </td>
                <td style={{ padding: '14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '6px 12px' }}
                      title="Batafsil"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      onClick={() => {
                        deleteOrder(order.id);
                        addToast(`Buyurtma #${order.id} oʻchirildi`, 'info');
                      }}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '6px 10px', color: 'var(--danger)' }}
                      title="Oʻchirish"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', padding: '32px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Buyurtma #{selectedOrder.id}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedOrder.date}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Customer Details */}
            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.88rem',
              }}
            >
              <div><strong>Mijoz:</strong> {selectedOrder.customer.fullName}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={15} color="var(--accent-gold)" />
                <a href={`tel:${selectedOrder.customer.phone}`} style={{ fontWeight: 600 }}>
                  {selectedOrder.customer.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} color="var(--accent-gold)" />
                <span>{selectedOrder.customer.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CreditCard size={15} color="var(--accent-gold)" />
                <span>Toʻlov: {selectedOrder.customer.paymentMethod}</span>
              </div>
              {selectedOrder.customer.orderNotes && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', color: 'var(--text-secondary)' }}>
                  <FileText size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Izoh: {selectedOrder.customer.orderNotes}</span>
                </div>
              )}
            </div>

            {/* Items List */}
            <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Buyurtma qilingan mebellar:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {selectedOrder.items.map((it, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={it.image}
                      alt={it.title}
                      style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{it.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Rang: {it.color} • {it.quantity} dona
                      </div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                    {formatPrice(it.price * it.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '2px solid var(--border-light)',
                fontSize: '1.2rem',
                fontWeight: 700,
              }}
            >
              <span>Jami Summa:</span>
              <span style={{ color: 'var(--accent-gold)' }}>{formatPrice(selectedOrder.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
