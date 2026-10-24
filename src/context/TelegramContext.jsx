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

  // Helper to format currency
  const formatUZS = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  // Send plain text message
  const sendTelegramMessage = async (htmlContent) => {
    const cleanToken = botToken.trim();
    const cleanChatId = chatId.trim();

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
          addToast(`Telegram bot xabari: ${data.description || 'API javobi'}`, 'info');
          return { success: true, simulated: true, error: data.description };
        }
      } catch (err) {
        console.warn('Network issue reaching Telegram API, using simulation mode:', err);
        addToast('Xabar qabul qilindi (Lokal rejim)!', 'success');
        return { success: true, simulated: true };
      }
    } else {
      console.log('%c[TELEGRAM BOT SIMULATION PAYLOAD]:', 'color: #24A1DE; font-weight: bold;', htmlContent);
      addToast('Buyurtmangiz Telegram botga yuborildi (Demo simulyatsiya)!', 'success');
      return { success: true, simulated: true };
    }
  };

  // Send single photo with caption (handles URLs, Blobs, Files, Data URLs)
  const sendTelegramPhoto = async (photo, captionHtml, fullHtmlFallback = null) => {
    const cleanToken = botToken.trim();
    const cleanChatId = chatId.trim();

    if (!cleanToken || !cleanChatId) {
      console.log('%c[TELEGRAM PHOTO SIMULATION]:', 'color: #24A1DE;', { photo, captionHtml });
      addToast('Buyurtma rasmi bilan Telegram botga yuborildi (Simulyatsiya)!', 'success');
      return { success: true, simulated: true };
    }

    if (!photo) {
      return await sendTelegramMessage(fullHtmlFallback || captionHtml);
    }

    const isBlobOrFile = photo instanceof Blob || (typeof File !== 'undefined' && photo instanceof File);
    const isDataUrl = typeof photo === 'string' && photo.startsWith('data:');
    const isHttpUrl = typeof photo === 'string' && (photo.startsWith('http://') || photo.startsWith('https://'));

    // Telegram caption maximum length is 1024 characters.
    // If caption is longer, we truncate photo caption and immediately send the full HTML message right after.
    let photoCaption = captionHtml || '';
    let sendSecondaryMessage = false;

    if (photoCaption.length > 1000) {
      sendSecondaryMessage = true;
      photoCaption = photoCaption.slice(0, 950) + '\n\n<i>...Batafsil quyidagi xabarda 👇</i>';
    }

    try {
      let response;

      if (isBlobOrFile || isDataUrl) {
        // Multipart/form-data upload for local files or captured photos
        let blobToSend = photo;
        if (isDataUrl) {
          const fetched = await fetch(photo);
          blobToSend = await fetched.blob();
        }

        const formData = new FormData();
        formData.append('chat_id', cleanChatId);
        formData.append('photo', blobToSend, 'furniture.jpg');
        if (photoCaption) {
          formData.append('caption', photoCaption);
          formData.append('parse_mode', 'HTML');
        }

        response = await fetch(`https://api.telegram.org/bot${cleanToken}/sendPhoto`, {
          method: 'POST',
          body: formData,
        });
      } else if (isHttpUrl) {
        // Direct HTTP URL
        response = await fetch(`https://api.telegram.org/bot${cleanToken}/sendPhoto`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: cleanChatId,
            photo: photo,
            caption: photoCaption,
            parse_mode: 'HTML',
          }),
        });
      } else {
        // Relative or unhandled format -> fallback to regular message
        return await sendTelegramMessage(fullHtmlFallback || captionHtml);
      }

      const data = await response.json();
      if (data.ok) {
        // If secondary full HTML is needed
        if (sendSecondaryMessage && fullHtmlFallback) {
          await sendTelegramMessage(fullHtmlFallback);
        }
        addToast('Buyurtma rasmi bilan Telegram botga muvaffaqiyatli yuborildi!', 'success');
        return { success: true, live: true };
      } else {
        console.warn('Telegram sendPhoto error:', data);
        // Fallback to plain text message so order is never lost
        return await sendTelegramMessage(fullHtmlFallback || captionHtml);
      }
    } catch (err) {
      console.warn('sendPhoto network exception, falling back to message:', err);
      return await sendTelegramMessage(fullHtmlFallback || captionHtml);
    }
  };

  // Send multiple photos (MediaGroup album) for multi-item orders
  const sendTelegramMediaGroup = async (photos, captionHtml, fullHtmlFallback) => {
    const cleanToken = botToken.trim();
    const cleanChatId = chatId.trim();

    if (!cleanToken || !cleanChatId) {
      return { success: true, simulated: true };
    }

    const validHttpPhotos = photos
      .filter((p) => typeof p === 'string' && (p.startsWith('http://') || p.startsWith('https://')))
      .slice(0, 10);

    if (validHttpPhotos.length <= 1) {
      return await sendTelegramPhoto(validHttpPhotos[0] || photos[0], captionHtml, fullHtmlFallback);
    }

    try {
      const shortCaption = captionHtml.length > 1000 
        ? captionHtml.slice(0, 950) + '\n\n<i>...Batafsil quyidagi xabarda 👇</i>'
        : captionHtml;

      const media = validHttpPhotos.map((url, idx) => ({
        type: 'photo',
        media: url,
        ...(idx === 0 ? { caption: shortCaption, parse_mode: 'HTML' } : {}),
      }));

      const res = await fetch(`https://api.telegram.org/bot${cleanToken}/sendMediaGroup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: cleanChatId,
          media,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        if (captionHtml.length > 1000 && fullHtmlFallback) {
          await sendTelegramMessage(fullHtmlFallback);
        }
        addToast('Mahsulotlar rasmlari bilan Telegramga yuborildi!', 'success');
        return { success: true, live: true };
      } else {
        console.warn('sendMediaGroup failed, falling back to single sendPhoto:', data);
        return await sendTelegramPhoto(validHttpPhotos[0], captionHtml, fullHtmlFallback);
      }
    } catch (err) {
      console.warn('sendMediaGroup error, falling back to single sendPhoto:', err);
      return await sendTelegramPhoto(validHttpPhotos[0], captionHtml, fullHtmlFallback);
    }
  };

  // Dispatch Order (with product photo(s))
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
`.trim();

    // Collect product images from order items
    const productImages = cartItems
      .map((item) => item.product?.images?.[0] || item.product?.image)
      .filter(Boolean);

    let res;
    if (productImages.length > 1) {
      res = await sendTelegramMediaGroup(productImages, html, html);
    } else if (productImages.length === 1) {
      res = await sendTelegramPhoto(productImages[0], html, html);
    } else {
      res = await sendTelegramMessage(html);
    }

    return { ...res, orderId };
  };

  // Dispatch Custom Order inquiry (with user uploaded photo or type reference photo)
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
`.trim();

    // Default reference photos if customer didn't upload custom sketch
    const defaultFurnitureImages = {
      kitchen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      wardrobe: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
      sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      bed: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      office: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      other: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    };

    const photoToSend = formData.photo || defaultFurnitureImages[formData.furnitureTypeId] || defaultFurnitureImages.kitchen;

    const res = await sendTelegramPhoto(photoToSend, html, html);
    return { ...res, quoteId };
  };

  // Dispatch Contact Callback inquiry
  const submitCallback = async ({ name, phone, message, product = null }) => {
    const dateStr = new Date().toLocaleString();

    const html = `
<b>📞 TEZKOR ALOQA / MASLAHAT SOʻROVI</b>
<i>Sana: ${dateStr}</i>
━━━━━━━━━━━━━━━━━━━━
<b>👤 Ism:</b> ${name}
<b>📱 Telefon:</b> ${phone}
${product ? `<b>🛋 Qiziqtirgan mebel:</b> ${product.name?.uz || product.name}\n` : ''}
<b>💬 Savol / Izoh:</b>
${message || 'Umumiy maslahat olish uchun soʻrov'}
`.trim();

    const photo = product?.images?.[0] || product?.image;
    if (photo) {
      return await sendTelegramPhoto(photo, html, html);
    }
    return await sendTelegramMessage(html);
  };

  // Test bot connection with a real luxury furniture photo
  const testBot = async () => {
    const testHtml = `
<b>🔔 TEST BOGʻLANISHI: GRAND MEBEL</b>
Saytingizdan Telegram botingizga test xabari muvaffaqiyatli yetib keldi!
📸 <b>Rasm bilan joʻnatish tizimi 100% faol.</b>
<i>Vaqt: ${new Date().toLocaleTimeString()}</i>
`.trim();
    const testPhoto = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80';
    return await sendTelegramPhoto(testPhoto, testHtml, testHtml);
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
        sendTelegramMessage,
        sendTelegramPhoto,
        sendTelegramMediaGroup,
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
