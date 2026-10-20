import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

const initialOrders = [
  {
    id: 'GM-948215',
    date: '2026-10-20 17:30',
    customer: {
      fullName: 'Sardorbek Rahimov',
      phone: '+998 90 123 45 67',
      address: 'Toshkent sh., Mirzo Ulugʻbek tumani, 14-uy',
      paymentMethod: 'Payme / Click',
      orderNotes: 'Eshik kodi: 45K. Iltimos, soat 18:00 dan keyin yetkazing.',
    },
    items: [
      {
        id: 'sofa-milano-velvet',
        title: 'Milano Royal Baxmal Divan',
        price: 18500000,
        quantity: 1,
        color: 'Zumrad Yashil',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      },
    ],
    totalAmount: 18500000,
    status: 'new', // 'new' | 'processing' | 'delivered' | 'cancelled'
  },
  {
    id: 'GM-882194',
    date: '2026-10-19 14:15',
    customer: {
      fullName: 'Nilufar Usmonova',
      phone: '+998 93 555 77 88',
      address: 'Toshkent sh., Mirobod tumani, Nukus koʻchasi',
      paymentMethod: 'Qabul qilganda toʻlash',
      orderNotes: 'Uchinchi qavat, lift bor.',
    },
    items: [
      {
        id: 'table-verona-marble',
        title: 'Verona Marmar Oshxona Stoli',
        price: 16800000,
        quantity: 1,
        color: 'Oq Calacatta Oltin',
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'chair-dining-velvet-set',
        title: 'Turin Dizaynerlik Oshxona Kreslolari',
        price: 7600000,
        quantity: 2,
        color: 'Kulrang Qushqoʻnmas',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      },
    ],
    totalAmount: 32000000,
    status: 'processing',
  },
  {
    id: 'GM-741203',
    date: '2026-10-18 11:20',
    customer: {
      fullName: 'Davron Ahmedov',
      phone: '+998 97 711 22 33',
      address: 'Toshkent sh., Yunusobod 11-mavze',
      paymentMethod: 'Muddatli toʻlov',
      orderNotes: '',
    },
    items: [
      {
        id: 'bed-venezia-king',
        title: 'Venezia King Ortopedik Karavot',
        price: 24200000,
        quantity: 1,
        color: 'Och Kulrang Bukle',
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
      },
    ],
    totalAmount: 24200000,
    status: 'delivered',
  },
];

const initialInquiries = [
  {
    id: 'CST-58192',
    date: '2026-10-20 16:45',
    customerName: 'Akmal Zokirov',
    phone: '+998 99 888 44 22',
    address: 'Toshkent sh., Chilonzor tumani',
    furnitureType: 'Oshxona garnituri',
    dimensions: 'Uzunligi: 360 sm, Chuqurligi: 60 sm, Balandligi: 260 sm',
    material: 'Fenix nano-mat va kvars',
    budget: '45 000 000 soʻm',
    notes: 'Qora mat fasad, ichki LED yoritgich, Blum tip-on mexanizm kerak.',
    status: 'new', // 'new' | 'contacted' | 'approved'
  },
  {
    id: 'CST-42109',
    date: '2026-10-19 18:10',
    customerName: 'Madina Karimova',
    phone: '+998 90 999 11 00',
    address: 'Toshkent sh., Yakkasaroy tumani',
    furnitureType: 'Katta shkaf / Garderob',
    dimensions: 'Uzunligi: 280 sm, Chuqurligi: 65 sm, Balandligi: 270 sm',
    material: 'MDF + Tabiiy shpon',
    budget: '26 000 000 soʻm',
    notes: 'Bronza tusli shisha eshiklar va zargarlik tortmalari.',
    status: 'contacted',
  },
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_orders');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  const [customInquiries, setCustomInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_custom_inquiries');
      return saved ? JSON.parse(saved) : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  useEffect(() => {
    localStorage.setItem('gm_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gm_custom_inquiries', JSON.stringify(customInquiries));
  }, [customInquiries]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: orderData.orderId || 'GM-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleString(),
      customer: orderData.customer,
      items: orderData.cartItems.map((ci) => ({
        id: ci.product.id,
        title: ci.product.name.uz,
        price: ci.product.price,
        quantity: ci.quantity,
        color: ci.selectedColor?.name?.uz || 'Standart',
        image: ci.product.images[0],
      })),
      totalAmount: orderData.totals.finalTotal,
      status: 'new',
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const addCustomInquiry = (inquiryData) => {
    const newInquiry = {
      id: inquiryData.quoteId || 'CST-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toLocaleString(),
      customerName: inquiryData.name,
      phone: inquiryData.phone,
      address: inquiryData.address,
      furnitureType: inquiryData.furnitureType,
      dimensions: `Uzunligi: ${inquiryData.length} sm, Chuqurligi: ${inquiryData.depth} sm, Balandligi: ${inquiryData.height} sm`,
      material: inquiryData.material,
      budget: inquiryData.budget,
      notes: inquiryData.notes,
      status: 'new',
    };

    setCustomInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const updateInquiryStatus = (inquiryId, newStatus) => {
    setCustomInquiries((prev) =>
      prev.map((i) => (i.id === inquiryId ? { ...i, status: newStatus } : i))
    );
  };

  const deleteInquiry = (inquiryId) => {
    setCustomInquiries((prev) => prev.filter((i) => i.id !== inquiryId));
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        customInquiries,
        addOrder,
        addCustomInquiry,
        updateOrderStatus,
        deleteOrder,
        updateInquiryStatus,
        deleteInquiry,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
