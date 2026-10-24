import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useTelegram } from '../../context/TelegramContext';
import { PRODUCTS } from '../../data/products';
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
  FileText,
  Plus,
  Send,
  ShoppingBag,
  Check
} from 'lucide-react';

export const OrdersView = () => {
  const { orders, updateOrderStatus, deleteOrder, createManualOrder } = useOrders();
  const { addToast, submitOrder } = useTelegram();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Order Form state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Naqd pul');
  const [orderStatus, setOrderStatus] = useState('new');
  const [orderNotes, setOrderNotes] = useState('');
  const [notifyTelegram, setNotifyTelegram] = useState(true);

  // Selected items in new order
  const [orderItems, setOrderItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0]?.id || '');
  const [selectedColor, setSelectedColor] = useState(PRODUCTS[0]?.colors?.[0]?.name?.uz || 'Standart');
  const [quantity, setQuantity] = useState(1);
  const [customPrice, setCustomPrice] = useState(PRODUCTS[0]?.price || 0);

  const formatPrice = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  // When selected product changes, sync price and colors
  const handleProductSelectChange = (prodId) => {
    setSelectedProductId(prodId);
    const prod = PRODUCTS.find((p) => p.id === prodId);
    if (prod) {
      setCustomPrice(prod.price);
      setSelectedColor(prod.colors?.[0]?.name?.uz || 'Standart');
    }
  };

  const handleAddItemToOrder = () => {
    const prod = PRODUCTS.find((p) => p.id === selectedProductId);
    if (!prod) return;

    const newItem = {
      id: prod.id,
      title: prod.name.uz,
      price: Number(customPrice) || prod.price,
      quantity: Number(quantity) || 1,
      color: selectedColor,
      image: prod.images[0],
    };

    setOrderItems((prev) => [...prev, newItem]);
    addToast(`${prod.name.uz} roʻyxatga qoʻshildi!`, 'info');
  };

  const handleRemoveItem = (index) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCalculatedAmount = orderItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

  const handleCreateOrderSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim()) {
      addToast('Iltimos, mijoz ismi va telefon raqamini kiriting', 'error');
      return;
    }

    if (orderItems.length === 0) {
      addToast('Buyurtmaga kamida 1 ta mahsulot qoʻshing', 'warning');
      return;
    }

    const newOrderPayload = {
      customerName,
      customerPhone,
      customerAddress: customerAddress.trim() || 'Showroom (Doʻkondan olib ketish)',
      paymentMethod,
      orderStatus,
      orderNotes,
      items: orderItems,
      totalAmount: totalCalculatedAmount,
    };

    const created = createManualOrder(newOrderPayload);

    // Optional Telegram notification dispatch
    if (notifyTelegram) {
      try {
        await submitOrder({
          cartItems: orderItems.map((it) => {
            const matchedProd = PRODUCTS.find((p) => p.id === it.id);
            return {
              product: matchedProd || { name: { uz: it.title }, price: it.price, images: [it.image] },
              quantity: it.quantity,
              selectedColor: { name: { uz: it.color } },
            };
          }),
          customer: {
            fullName: `${customerName} (Admin tomonidan qoʻshildi)`,
            phone: customerPhone,
            address: customerAddress || 'Showroom / Doʻkondan',
            paymentMethod,
            orderNotes,
          },
          totals: {
            finalTotal: totalCalculatedAmount,
            discountPercent: 0,
          },
          promoCode: null,
        });
      } catch (err) {
        console.warn('Telegram notification failed:', err);
      }
    }

    addToast(`Yangi buyurtma #${created.id} muvaffaqiyatli yaratildi!`, 'success');

    // Reset form
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setOrderNotes('');
    setOrderItems([]);
    setIsAddModalOpen(false);
  };

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(52, 152, 219, 0.15)', color: '#2980b9' }}>
            <Clock size={12} style={{ marginRight: '4px' }} /> Yangi
          </span>
        );
      case 'processing':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(243, 156, 18, 0.15)', color: '#d35400' }}>
            <Truck size={12} style={{ marginRight: '4px' }} /> Jarayonda
          </span>
        );
      case 'delivered':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(46, 204, 113, 0.15)', color: '#27ae60' }}>
            <CheckCircle size={12} style={{ marginRight: '4px' }} /> Yetkazildi
          </span>
        );
      case 'cancelled':
        return (
          <span className="badge" style={{ backgroundColor: 'rgba(231, 76, 60, 0.15)', color: '#c0392b' }}>
            <XCircle size={12} style={{ marginRight: '4px' }} /> Bekor qilindi
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Add Order Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Buyurtmalar Boshqaruvi</h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Saytdan yoki doʻkondan tushgan buyurtmalarni nazorat qilish, yangi buyurtma yaratish va statusini yangilash
          </p>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Plus size={18} />
          <span>Yangi Buyurtma Qoʻshish</span>
        </button>
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
            <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '12px 14px' }}>ID</th>
              <th style={{ padding: '12px 14px' }}>Mijoz</th>
              <th style={{ padding: '12px 14px' }}>Telefon</th>
              <th style={{ padding: '12px 14px' }}>Mahsulotlar</th>
              <th style={{ padding: '12px 14px' }}>Jami Summa</th>
              <th style={{ padding: '12px 14px' }}>Status</th>
              <th style={{ padding: '12px 14px' }}>Sana</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom: '1px solid var(--border-light)',
                    transition: 'background-color var(--transition-fast)',
                  }}
                  className="table-row"
                >
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--accent-gold)' }}>
                    #{order.id}
                  </td>
                  <td style={{ padding: '14px', fontWeight: 600 }}>
                    {order.customer.fullName}
                  </td>
                  <td style={{ padding: '14px', color: 'var(--text-secondary)' }}>
                    {order.customer.phone}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img
                        src={order.items[0]?.image}
                        alt="item"
                        style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }}
                      />
                      <span>
                        {order.items[0]?.title}
                        {order.items.length > 1 && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {' '}(+{order.items.length - 1})
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '14px', fontWeight: 700 }}>
                    {formatPrice(order.totalAmount)}
                  </td>
                  <td style={{ padding: '14px' }}>
                    {getStatusBadge(order.status)}
                  </td>
                  <td style={{ padding: '14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {order.date}
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="btn-icon"
                        title="Batafsil koʻrish"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Haqiqatan ham #${order.id} buyurtmani oʻchirmoqchimisiz?`)) {
                            deleteOrder(order.id);
                            addToast(`Buyurtma #${order.id} oʻchirildi`, 'info');
                          }
                        }}
                        className="btn-icon"
                        style={{ color: 'var(--danger)' }}
                        title="Oʻchirish"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  Buyurtmalar topilmadi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ─── ADD NEW ORDER MODAL ─── */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div
            className="modal-content animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '820px', padding: '32px', maxHeight: '92vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.45rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag size={22} color="var(--accent-gold)" />
                  Yangi Buyurtma Yaratish
                </h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Doʻkon, qoʻngʻiroq yoki salon orqali qabul qilingan buyurtmani tizimga kiritish
                </span>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="btn-icon">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit}>
              {/* Section 1: Customer Info */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  1. Mijoz Maʼlumotlari
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label className="form-label">Mijoz F.I.Sh *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Azizbek Mahmudov"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">Telefon Raqami *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 90 123 45 67"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label className="form-label">Yetkazib Berish Manzili</label>
                    <input
                      type="text"
                      placeholder="Toshkent sh., Yunusobod tumani... (yoki Showroomdan olib ketish)"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label">Toʻlov Turi</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-select"
                    >
                      <option value="Naqd pul">Naqd pul (Yetkazilganda)</option>
                      <option value="Payme / Click">Payme / Click (Karta)</option>
                      <option value="Muddatli toʻlov">Muddatli toʻlov (Nasiya)</option>
                      <option value="Bank hisobi (Perechisleniye)">Bank hisobi (Yuridik shaxs)</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Boshlangʻich Status</label>
                    <select
                      value={orderStatus}
                      onChange={(e) => setOrderStatus(e.target.value)}
                      className="form-select"
                    >
                      <option value="new">Yangi</option>
                      <option value="processing">Jarayonda (Ishlab chiqarishda)</option>
                      <option value="delivered">Yetkazildi / Yakunlangan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Items Picker */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  2. Mahsulotlarni Tanlash va Qoʻshish
                </h4>

                <div
                  style={{
                    padding: '16px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px',
                    alignItems: 'flex-end',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ flex: 2 }}>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Mebel Modeli</label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => handleProductSelectChange(e.target.value)}
                      className="form-select"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name.uz} — {formatPrice(p.price)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Rang</label>
                    <select
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="form-select"
                    >
                      {PRODUCTS.find((p) => p.id === selectedProductId)?.colors?.map((c, i) => (
                        <option key={i} value={c.name.uz}>
                          {c.name.uz}
                        </option>
                      )) || <option value="Standart">Standart</option>}
                    </select>
                  </div>

                  <div style={{ maxWidth: '100px' }}>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Soni</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Narx (dona)</label>
                    <input
                      type="number"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(Number(e.target.value))}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleAddItemToOrder}
                      className="btn btn-secondary"
                      style={{ width: '100%' }}
                    >
                      <Plus size={16} />
                      <span>Qoʻshish</span>
                    </button>
                  </div>
                </div>

                {/* Selected items table */}
                {orderItems.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {orderItems.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-light)',
                          backgroundColor: 'var(--surface)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img
                            src={item.image}
                            alt={item.title}
                            style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.title}</div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              Rang: {item.color} • {item.quantity} dona × {formatPrice(item.price)}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                            {formatPrice(item.price * item.quantity)}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="btn-icon"
                            style={{ color: 'var(--danger)', width: '28px', height: '28px' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 14px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        marginTop: '4px',
                      }}
                    >
                      <span>Jami Hisob:</span>
                      <span style={{ color: 'var(--accent-gold)', fontSize: '1.2rem' }}>
                        {formatPrice(totalCalculatedAmount)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Hali birorta mahsulot qoʻshilmadi. Yuqoridagi roʻyxatdan tanlang va "Qoʻshish" tugmasini bosing.
                  </div>
                )}
              </div>

              {/* Section 3: Notes & Telegram Notification */}
              <div style={{ marginBottom: '24px' }}>
                <label className="form-label">Qoʻshimcha Izoh / Xodim eslatmasi</label>
                <textarea
                  placeholder="Masalan: Mijoz telefon qilib buyurtma berdi, shanba kuni yetkazilsin..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="form-textarea"
                  style={{ minHeight: '70px' }}
                />

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', cursor: 'pointer', fontSize: '0.88rem' }}>
                  <input
                    type="checkbox"
                    checked={notifyTelegram}
                    onChange={(e) => setNotifyTelegram(e.target.checked)}
                    style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }}
                  />
                  <span>Ushbu buyurtmani Telegram botga ham yuborish (Rasmi va toʻliq cheki bilan)</span>
                </label>
              </div>

              {/* Modal Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn btn-outline"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Check size={16} />
                  <span>Buyurtmani Saqlash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ORDER DETAILS MODAL ─── */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div
            className="modal-content animate-scale-in"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', padding: '32px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Buyurtma #{selectedOrder.id}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedOrder.date}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="btn-icon">
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

            {/* Status Selector */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontWeight: 600, fontSize: '0.88rem' }}>Buyurtma holati:</label>
              <select
                value={selectedOrder.status}
                onChange={(e) => {
                  handleStatusChange(selectedOrder.id, e.target.value);
                  setSelectedOrder({ ...selectedOrder, status: e.target.value });
                }}
                className="form-select"
                style={{ width: 'auto' }}
              >
                <option value="new">Yangi</option>
                <option value="processing">Jarayonda</option>
                <option value="delivered">Yetkazildi</option>
                <option value="cancelled">Bekor qilindi</option>
              </select>
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
