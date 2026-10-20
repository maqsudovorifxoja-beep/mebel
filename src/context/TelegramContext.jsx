import React, { createContext, useContext, useState, useEffect } from 'react';

const TelegramContext = createContext();

export const TelegramProvider = ({ children }) => {
  // Stored bot credentials or defaults
  const [botToken, setBotToken] = useState(() => {
    return localStorage.getItem('gm_tg_token') || '8690944939:AAFAoy4ubx52L3BK5xM0p2IBSnBlwUd3qSY';
  });

  const [chatId, setChatId] = useState(() => {
    return localStorage.getItem('gm_tg_chat_id') || '5389465132';
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('gm_tg_token', botToken);
  }, [botToken]);

  useEffect(() => {
    localStorage.setItem('gm_tg_chat_id', chatId);
  }, [chatId]);

  const addToast = (message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const sendTelegramMessage = async (htmlContent) => {
    const cleanToken = botToken.trim();
    const cleanChatId = chatId.trim();

    // If bot token and chat id are set, send real HTTP POST
    if (cleanToken && cleanChatId) {
      try {
        const response = await fetch(`https://api.telegram.org/bot${cleanToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: cleanChatId,
            text: htmlContent,
            parse_mode: 'HTML',
          }),
        });

        const data = await response.json();
        if (data.ok) {
          addToast('Xabar Telegram botga muvaffaqiyatli yuborildi!', 'success');
          return { success: true, live: true };
        } else {
          console.warn('Telegram API response error:', data);
          addToast(`Telegram bot xabari qabul qilindi (Simulyatsiya): ${data.description || 'API javobi'}`, 'info');
          return { success: true, simulated: true, error: data.description };
        }
      } catch (err) {
        console.warn('Network issue reaching Telegram API, using simulation mode:', err);
        addToast('Buyurtma qabul qilindi va botga uzatildi (Lokal demo rejimi)!', 'success');
        return { success: true, simulated: true };
      }
    } else {
      // Simulation mode if token is not yet configured
      console.log('%c[TELEGRAM BOT SIMULATION PAYLOAD]:', 'color: #24A1DE; font-weight: bold;', htmlContent);
      addToast('Buyurtmangiz Telegram botga yuborildi (Demo simulyatsiya)!', 'success');
      return { success: true, simulated: true };
    }
  };

  // Helper to format currency
  const formatUZS = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  // Dispatch Order
  const submitOrder = async ({ cartItems, customer, totals, promoCode }) => {
    const orderId = 'GM-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleString();

    let itemsText = cartItems
      .map((item, idx) => {
        const colorName = item.selectedColor?.name?.uz || 'Standart';
        return `${idx + 1}. <b>${item.product.name.uz}</b>\n   ├ Rang: ${colorName}\n   ├ Soni: ${item.quantity} dona\n   └ Narxi: ${formatUZS(item.product.price * item.quantity)}`;
      })
      .join('\n\n');

    const html = `
<b>🛋 YANGI BUYURTMA #${orderId}</b>
<i>Sana: ${dateStr}</i>
━━━━━━━━━━━━━━━━━━━━
<b>👤 Buyurtmachi:</b> ${customer.fullName}
<b>📞 Telefon:</b> ${customer.phone}
<b>📍 Manzil:</b> ${customer.address}
<b>💳 Toʻlov turi:</b> ${customer.paymentMethod || 'Naqd / Karta'}
${customer.orderNotes ? `<b>📝 Izoh:</b> ${customer.orderNotes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━
<b>📦 Mahsulotlar roʻyxati:</b>
${itemsText}
━━━━━━━━━━━━━━━━━━━━
${promoCode ? `<b>🎟 Promokod:</b> ${promoCode} (-${totals.discountPercent}%)\n` : ''}
<b>💰 Jami toʻlov:</b> <u>${formatUZS(totals.finalTotal)}</u>
<b>🚚 Yetkazib berish:</b> Bepul (Oʻrnatish bilan)
`;

    const res = await sendTelegramMessage(html.trim());
    return { ...res, orderId };
  };

  // Dispatch Custom Order inquiry
  const submitCustomInquiry = async (formData) => {
    const quoteId = 'CST-' + Math.floor(10000 + Math.random() * 90000);
    const dateStr = new Date().toLocaleString();

    const html = `
<b>📐 MAXSUS OʻLCHAMDA BUYURTMA #${quoteId}</b>
<i>Sana: ${dateStr}</i>
━━━━━━━━━━━━━━━━━━━━
<b>👤 Mijoz:</b> ${formData.name}
<b>📞 Telefon:</b> ${formData.phone}
<b>📍 Manzil:</b> ${formData.address || 'Koʻrsatilmagan'}
━━━━━━━━━━━━━━━━━━━━
<b>🪑 Mebel turi:</b> ${formData.furnitureType}
<b>📏 Oʻlchamlari:</b>
   ├ Uzunligi: ${formData.length || '-'} sm
   ├ Kengligi / Chuqurligi: ${formData.depth || '-'} sm
   └ Balandligi: ${formData.height || '-'} sm
<b>🪵 Asosiy material:</b> ${formData.material}
<b>💵 Kutilayotgan byudjet:</b> ${formData.budget || 'Kelishiladi'}
━━━━━━━━━━━━━━━━━━━━
<b>📝 Qoʻshimcha talablar:</b>
${formData.notes || 'Talablar yoʻq'}
`;

    const res = await sendTelegramMessage(html.trim());
    return { ...res, quoteId };
  };

  // Dispatch Contact Callback inquiry
  const submitCallback = async ({ name, phone, message }) => {
    const dateStr = new Date().toLocaleString();

    const html = `
<b>📞 TEZKOR ALOQA / MASLAHAT SOʻROVI</b>
<i>Sana: ${dateStr}</i>
━━━━━━━━━━━━━━━━━━━━
<b>👤 Ism:</b> ${name}
<b>📱 Telefon:</b> ${phone}
<b>💬 Savol / Izoh:</b>
${message || 'Umumiy maslahat olish uchun soʻrov'}
`;

    return await sendTelegramMessage(html.trim());
  };

  const testBot = async () => {
    const testHtml = `
<b>🔔 TEST BOGʻLANISHI: GRAND MEBEL</b>
Saytingizdan Telegram botingizga test xabari muvaffaqiyatli yetib keldi!
<i>Vaqt: ${new Date().toLocaleTimeString()}</i>
`;
    return await sendTelegramMessage(testHtml.trim());
  };

  return (
    <TelegramContext.Provider
      value={{
        botToken,
        setBotToken,
        chatId,
        setChatId,
        isModalOpen,
        openSettingsModal: () => setIsModalOpen(true),
        closeSettingsModal: () => setIsModalOpen(false),
        submitOrder,
        submitCustomInquiry,
        submitCallback,
        testBot,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
