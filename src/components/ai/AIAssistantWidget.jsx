import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useTelegram } from '../../context/TelegramContext';
import { PRODUCTS } from '../../data/products';
import { 
  Sparkles, 
  X, 
  Send, 
  RotateCcw, 
  ShoppingBag, 
  ArrowRight, 
  Bot, 
  Check, 
  Ruler,
  Maximize2,
  Minimize2
} from 'lucide-react';

export const AIAssistantWidget = () => {
  const { lang } = useLanguage();
  const { addToCart } = useCart();
  const { addToast } = useTelegram();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial welcome message generator based on language
  const getInitialMessage = (currLang) => {
    if (currLang === 'ru') {
      return {
        id: 'welcome',
        sender: 'ai',
        text: 'Здравствуйте! Я **Grand AI** — ваш персональный дизайнер интерьера и консультант по мебели. \n\nПомогу подобрать идеальный диван, рассчитать индивидуальные размеры, подобрать цветовую гамму или сориентировать по ценам и материалам. О чем вы хотите узнать?',
        timestamp: new Date(),
        recommendedProducts: [PRODUCTS[0], PRODUCTS[1]], // Milano Velvet, Venezia King
      };
    }
    if (currLang === 'en') {
      return {
        id: 'welcome',
        sender: 'ai',
        text: 'Hello! I am **Grand AI** — your virtual interior stylist and luxury furniture consultant.\n\nI can recommend the perfect sofa for your room size, calculate custom dimensions, or find pieces within your budget. How can I assist your home today?',
        timestamp: new Date(),
        recommendedProducts: [PRODUCTS[0], PRODUCTS[1]],
      };
    }
    return {
      id: 'welcome',
      sender: 'ai',
      text: 'Assalomu alaykum! Men **Grand AI** — sizning shaxsiy interyer dizayneri va mebel boʻyicha virtual maslahatchingizman.\n\nMehmonxona yoki yotoqxonangiz uchun mos mebel tanlash, oʻlcham boʻyicha maslahat olish yoki byudjetingizga mos eng yaxshi modellarni topishda yordam bera olaman. Sizni nima qiziqtiryapti?',
      timestamp: new Date(),
      recommendedProducts: [PRODUCTS[0], PRODUCTS[1]],
    };
  };

  const [messages, setMessages] = useState(() => [getInitialMessage(lang)]);

  // Quick suggestion prompts
  const getQuickPrompts = (currLang) => {
    if (currLang === 'ru') {
      return [
        '🛋 Какой диван выбрать в гостиную?',
        '📐 Мебель для небольшой спальни',
        '💰 Варианты до 20 млн сум',
        '🪵 Мебель из массива дуба и ореха',
        '📏 Заказ по индивидуальным размерам',
      ];
    }
    if (currLang === 'en') {
      return [
        '🛋 Best sofa for luxury living room',
        '📐 Compact bedroom furniture tips',
        '💰 Options under 20M UZS',
        '🪵 Solid oak & walnut collections',
        '📏 Bespoke custom order inquiry',
      ];
    }
    return [
      '🛋 Mehmonxona uchun qaysi divan yaxshi?',
      '📐 Kichik xonaga qanday mebel mos?',
      '💰 20 mln soʻmgacha variantlar',
      '🪵 Tabiiy eman va yongʻoq mebellar',
      '📏 Oʻlcham boʻyicha buyurtma berish',
    ];
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Hide teaser after 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTeaser(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  // Format currency
  const formatPrice = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  // Intelligent response engine
  const generateAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase().trim();
    const isRu = /[а-яё]/i.test(q) || lang === 'ru';
    const isEn = /^(what|how|which|can|tell|sofa|bed|table|desk|best|price|cost|dimension)/i.test(q) || lang === 'en';

    // 1. Sofa / Living room inquiry
    if (q.includes('divan') || q.includes('yumshoq') || q.includes('диван') || q.includes('гостиная') || q.includes('sofa') || q.includes('couch') || q.includes('kreslo') || q.includes('кресло')) {
      const sofas = PRODUCTS.filter((p) => p.category === 'sofa' || p.room === 'living').slice(0, 3);
      if (isRu) {
        return {
          text: 'Для просторной гостиной безусловным фаворитом является **Milano Royal Velvet** из итальянского бархата с наполнителем HR35 и каркасом из массива дуба. А для уютного уголка отдыха рекомендуем кресло **Nordic Hans** из натуральной кожи с поворотным механизмом 360°.\n\n✨ Все модели доступны в 4 фирменных оттенках под ваш интерьер.',
          products: sofas,
          actionLink: '/catalog?category=sofa',
          actionText: 'Все диваны в каталоге',
        };
      }
      if (isEn) {
        return {
          text: 'For a grand living area, our signature **Milano Royal Velvet** sofa offers unmatched luxury and stain-resistant Italian velvet upholstery. For an executive reading nook, the **Nordic Hans** swivel lounge armchair in cognac leather is the perfect companion.',
          products: sofas,
          actionLink: '/catalog?category=sofa',
          actionText: 'Browse all sofas',
        };
      }
      return {
        text: 'Mehmonxona uchun eng koʻp tanlanadigan model — **Milano Royal Baxmal Divani**. Uning suv oʻtkazmaydigan Italiya baxmali, ortopedik HR35 koʻpigi va mustahkam eman karkasi uzoq yillar oʻz nafosatini yoʻqotmaydi. Agar alohida dam olish burchagi kerak boʻlsa, 360° aylanuvchi **Nordic Hans** tabiiy charm kreslosini tavsiya qilaman!',
        products: sofas,
        actionLink: '/catalog?category=sofa',
        actionText: 'Barcha divanlarni koʻrish',
      };
    }

    // 2. Bedroom / Bed / Wardrobe
    if (q.includes('yotoqxona') || q.includes('karavot') || q.includes('shkaf') || q.includes('спальня') || q.includes('кровать') || q.includes('шкаф') || q.includes('bed') || q.includes('wardrobe')) {
      const bedItems = PRODUCTS.filter((p) => p.category === 'bedroom' || p.category === 'storage' || p.room === 'bedroom').slice(0, 3);
      if (isRu) {
        return {
          text: 'В спальню советуем королевскую кровать **Venezia King** с мягким фактурным изголовьем букле и подъемным гидравлическим механизмом для хранения. В пару к ней идеально подходит премиальный шкаф **Roma** с тонированным стеклом и сенсорной LED подсветкой.',
          products: bedItems,
          actionLink: '/catalog?category=bedroom',
          actionText: 'Мебель для спальни',
        };
      }
      if (isEn) {
        return {
          text: 'For the ultimate master bedroom suite, explore our **Venezia King Bed** with sculptural bouclé fabric and hidden hydraulic lift storage, paired with the architectural **Roma Glass Wardrobe** with bronze tinted doors.',
          products: bedItems,
          actionLink: '/catalog?category=bedroom',
          actionText: 'View Bedroom Suite',
        };
      }
      return {
        text: 'Yotoqxona uchun eng oliy toifali tanlov — **Venezia King Ortopedik Karavot**. Baland yumshoq bukle suyanchigʻi va ostida keng buyumlar saqlash qutisi bor. Shkaf uchun esa bronza tusli qoraytirilgan shisha va avtomatik LED chiroqli **Roma Shkafi** ajoyib juftlik hosil qiladi!',
        products: bedItems,
        actionLink: '/catalog?category=bedroom',
        actionText: 'Yotoqxona toʻplami',
      };
    }

    // 3. Kitchen / Dining table
    if (q.includes('oshxona') || q.includes('stol') || q.includes('stul') || q.includes('кухня') || q.includes('стол') || q.includes('dining') || q.includes('table') || q.includes('kitchen')) {
      const kitchenItems = PRODUCTS.filter((p) => p.category === 'kitchen' || p.room === 'kitchen').slice(0, 3);
      if (isRu) {
        return {
          text: 'Обеденная зона — сердце дома. Наш стол **Verona** изготовлен из цельной плиты натурального мрамора Calacatta с защитным термостойким слоем. А кухонный гарнитур **Monaco Luxury** оснащен фасадами Fenix, на которых не остаются отпечатки пальцев.',
          products: kitchenItems,
          actionLink: '/catalog?category=kitchen',
          actionText: 'Столы и кухни',
        };
      }
      return {
        text: 'Oshxona va mehmonlar dasturxoni uchun tabiiy Italiya Calacatta marmaridan ishlangan **Verona Marmar Stoli** (8-10 kishilik) eng oliyjanob koʻrinish beradi. Agar toʻliq oshxona mebeli kerak boʻlsa, barmoq izi qolmaydigan Fenix sirtli **Monaco Luxury** orolli garnituriga eʼtibor bering.',
        products: kitchenItems,
        actionLink: '/catalog?category=kitchen',
        actionText: 'Oshxona mebellari',
      };
    }

    // 4. Budget / Price queries (e.g. "20 mln", "10 mln", "arzon", "narx", "скидка")
    if (q.includes('mln') || q.includes('narx') || q.includes('arzon') || q.includes('цена') || q.includes('бюджет') || q.includes('budget') || q.includes('cost') || q.includes('price')) {
      const budgetItems = PRODUCTS.filter((p) => p.price <= 20000000).slice(0, 3);
      if (isRu) {
        return {
          text: 'В сегменте до 20 000 000 сум у нас представлены бестселлеры: \n• **Nordic Hans** лаунж-кресло (6 400 000 сум)\n• **Tivoli** столик из римского травертина (5 200 000 сум)\n• **Milano Royal Velvet** диван по скидке (18 500 000 сум вместо 21 900 000)\n\nДоставка и профессиональная сборка по Ташкенту — абсолютно бесплатно!',
          products: budgetItems,
          actionLink: '/catalog',
          actionText: 'Открыть каталог с ценами',
        };
      }
      return {
        text: '20 000 000 soʻmgacha boʻlgan eng mashhur va xaridorgir modellarimiz:\n\n1. **Tivoli Rim Travertin Jurnal Stoli** — 5 200 000 soʻm\n2. **Nordic Hans Dam Olish Kreslosi** — 6 400 000 soʻm\n3. **Milano Royal Baxmal Divan** — maxsus taklifda 18 500 000 soʻm (eski narxi 21.9 mln)\n\nToshkent boʻylab yetkazib berish va oʻrnatish — **mutlaqo bepul**!',
        products: budgetItems,
        actionLink: '/catalog',
        actionText: 'Katalogni koʻrish',
      };
    }

    // 5. Custom orders & measurements
    if (q.includes('oʻlcham') || q.includes('olcham') || q.includes('maxsus') || q.includes('zakaz') || q.includes('yasab') || q.includes('размер') || q.includes('индивидуальн') || q.includes('custom') || q.includes('bespoke') || q.includes('o\'lchov')) {
      if (isRu) {
        return {
          text: 'Мы создаем мебель точно под размеры вашей квартиры или дома! \n\n• **Бесплатный выезд дизайнера-замерщика** по Ташкенту с образцами тканей и дерева\n• **3D-визуализация** перед началом производства\n• Официальная гарантия 10 лет\n\nВы можете рассчитать ориентировочную стоимость и прикрепить фото/эскиз на странице индивидуального заказа.',
          products: [],
          actionLink: '/custom-order',
          actionText: '📐 Рассчитать индивидуальный заказ',
        };
      }
      return {
        text: 'Albatta! Grand Mebel atelesida uyingizning aniq oʻlchamlariga moslab individual mebel buyurtma qilishingiz mumkin:\n\n• **Usta-texnolog bepul oʻlchovga boradi** (mato va yogʻoch namunalari bilan)\n• 3D loyiha chizmasi tayyorlab beriladi\n• 10 yillik rasmiy kafolat bilan topshiriladi\n\nTaxminiy narxni hisoblash va eskiz yoki xonangiz rasmini yuklash uchun quyidagi tugmani bosing:',
        products: [],
        actionLink: '/custom-order',
        actionText: '📐 Maxsus oʻlchamda hisoblash',
      };
    }

    // 6. Materials / Wood / Marble / Velvet
    if (q.includes('yogoch') || q.includes('yogʻoch') || q.includes('eman') || q.includes('marmar') || q.includes('baxmal') || q.includes('дерев') || q.includes('дуб') || q.includes('мрамор') || q.includes('wood') || q.includes('marble') || q.includes('velvet')) {
      const premiumItems = PRODUCTS.filter((p) => p.materials.some((m) => m.toLowerCase().includes('eman') || m.toLowerCase().includes('marmar') || m.toLowerCase().includes('yongʻoq'))).slice(0, 3);
      if (isRu) {
        return {
          text: 'Grand Mebel использует исключительно сертифицированные премиальные материалы:\n\n• **Массив дуба и американский орех** камерной сушки (не деформируется со временем)\n• **Натуральный итальянский мрамор Calacatta и римский травертин**\n• **Европейский водоотталкивающий бархат** и фактурное букле\n• Австрийская фурнитура **Blum** с пожизненной гарантией плавности.',
          products: premiumItems,
          actionLink: '/about',
          actionText: 'О нашем производстве',
        };
      }
      return {
        text: 'Grand Mebel mebellarida faqat eng yuqori sifatli sertifikatlangan materiallar qoʻllaniladi:\n\n• **Tabiiy eman va Amerika yongʻogʻi** (maxsus pechda quritilgan, yillar davomida egilmaydi)\n• **Italiya Calacatta marmari va Rim travertini**\n• **Suv va dogʻ oʻtkazmaydigan Italiya baxmali**\n• Avstriyaning mashhur **Blum** yumshoq yopilish mexanizmlari\n\nSifat kafolati — 10 yil!',
        products: premiumItems,
        actionLink: '/about',
        actionText: 'Ishlab chiqarish haqida',
      };
    }

    // 7. Delivery / Warranty / Contact
    if (q.includes('yetkaz') || q.includes('dostavka') || q.includes('доставк') || q.includes('гаранти') || q.includes('kafolat') || q.includes('delivery') || q.includes('warranty') || q.includes('aloqa') || q.includes('telefon') || q.includes('manzil')) {
      if (isRu) {
        return {
          text: '🚚 **Доставка и сервис Grand Mebel:**\n\n• Доставка по Ташкенту и сборка — **БЕСПЛАТНО**\n• Доставка в регионы Узбекистана — по договоренности через бережную логистику\n• **10 лет официальной гарантии** на каркас и механизмы\n• Телефон шоурума: **+998 (90) 123-45-67**\n• Адрес: Ташкент, ул. Навои, 24 (Showroom Grand Mebel)',
          products: [],
          actionLink: '/contact',
          actionText: 'Контакты и Шоурум',
        };
      }
      return {
        text: '🚚 **Yetkazib berish va kafolat shartlari:**\n\n• Toshkent shahri boʻylab yetkazib berish va professional oʻrnatish — **MUTLAQO BEPUL**\n• Oʻzbekistonning barcha viloyatlariga ishonchli xavfsiz yetkazib berish\n• Barcha karkas va furnituralarga **10 yillik rasmiy kafolat**\n• Telefon: **+998 (90) 123-45-67**\n• Manzil: Toshkent sh., Alisher Navoiy koʻchasi, 24-uy',
        products: [],
        actionLink: '/contact',
        actionText: 'Manzil va kontaktlar',
      };
    }

    // Default friendly assistant response
    const featured = PRODUCTS.filter((p) => p.featured).slice(0, 2);
    if (isRu) {
      return {
        text: 'Отличный вопрос! Чтобы дать вам максимально точную рекомендацию, подскажите, для какой комнаты вы подбираете мебель (гостиная, спальня, кухня, кабинет) и какой стиль вам ближе — современный минимализм или теплая итальянская классика?\n\nВот две наши флагманские модели этого сезона:',
        products: featured,
        actionLink: '/catalog',
        actionText: 'Смотреть каталог',
      };
    }
    if (isEn) {
      return {
        text: 'Wonderful question! To tailor my recommendations, which room are you styling (living, bedroom, dining, or office)? Here are two of our most celebrated architectural pieces:',
        products: featured,
        actionLink: '/catalog',
        actionText: 'Explore Catalog',
      };
    }
    return {
      text: 'Ajoyib savol! Sizga eng mos mebelni tavsiya qilishim uchun qaysi xona haqida gaplashayotganimizni (mehmonxona, yotoqxona, oshxona yoki ish xonasi) va taxminiy oʻlchamlarni aytsangiz, eng yaxshi variantlarni tanlab beraman.\n\nMavsumning eng xaridorgir ikkita modeli bilan tanishing:',
      products: featured,
      actionLink: '/catalog',
      actionText: 'Katalogni koʻrish',
    };
  };

  const handleSendMessage = (textToSend = inputMessage) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now() + '-user',
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Realistic thinking pause (600ms - 900ms)
    setTimeout(() => {
      const responseData = generateAIResponse(userMsg.text);
      const aiMsg = {
        id: Date.now() + '-ai',
        sender: 'ai',
        text: responseData.text,
        recommendedProducts: responseData.products || [],
        actionLink: responseData.actionLink || null,
        actionText: responseData.actionText || null,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handleClearChat = () => {
    setMessages([getInitialMessage(lang)]);
  };

  const handleAddToCartQuick = (product, e) => {
    e.stopPropagation();
    const defaultColor = product.colors?.[0] || null;
    addToCart(product, 1, defaultColor);
    addToast(`${product.name[lang] || product.name.uz} savatchaga qoʻshildi!`, 'success');
  };

  return (
    <>
      {/* ─── Floating Trigger Button ─── */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '10px',
        }}
      >
        {/* Optional Teaser Speech Bubble */}
        {!isOpen && showTeaser && (
          <div
            onClick={() => {
              setIsOpen(true);
              setShowTeaser(false);
            }}
            className="animate-fade-in"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--text-primary)',
              padding: '10px 16px',
              borderRadius: 'var(--r-lg)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              maxWidth: '280px',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-subtle)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles size={15} />
            </div>
            <div style={{ fontSize: '0.82rem', lineHeight: 1.35, fontWeight: 500 }}>
              {lang === 'uz' ? 'Mebel tanlashda yordam beraymi? ✨' : lang === 'ru' ? 'Помочь с выбором мебели? ✨' : 'Need help styling your room? ✨'}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '2px',
                marginLeft: '4px',
              }}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Floating Circular Trigger */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTeaser(false);
          }}
          aria-label="Open AI Assistant"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: isOpen ? 'var(--surface)' : 'var(--accent)',
            color: isOpen ? 'var(--text-primary)' : '#ffffff',
            border: `2px solid ${isOpen ? 'var(--border)' : 'var(--accent-hover)'}`,
            boxShadow: isOpen ? 'var(--shadow-lg)' : '0 8px 24px rgba(176, 141, 62, 0.4)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--t-normal)',
            transform: isOpen ? 'rotate(90deg)' : 'scale(1)',
            position: 'relative',
          }}
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <>
              <Sparkles size={26} />
              {/* Online pulse indicator */}
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#2ecc71',
                  border: '2px solid #ffffff',
                }}
              />
            </>
          )}
        </button>
      </div>

      {/* ─── Expandable Chat Window ─── */}
      {isOpen && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: isExpanded ? '16px' : '96px',
            right: isExpanded ? '16px' : '24px',
            width: isExpanded ? 'calc(100vw - 32px)' : 'min(420px, calc(100vw - 32px))',
            height: isExpanded ? 'calc(100vh - 32px)' : 'min(580px, calc(100vh - 120px))',
            maxHeight: isExpanded ? '96vh' : '620px',
            maxWidth: isExpanded ? '800px' : '420px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: 998,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'all var(--t-normal)',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent) 0%, #7d5e1b 100%)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.02rem', fontWeight: 600, margin: 0, fontFamily: 'var(--font-body)' }}>
                    Grand AI
                  </h3>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      color: 'var(--success)',
                      backgroundColor: 'var(--success-bg)',
                      padding: '2px 8px',
                      borderRadius: 'var(--r-full)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2ecc71' }} />
                    Online
                  </span>
                </div>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {lang === 'uz' ? 'Virtual Interyer Dizayner' : lang === 'ru' ? 'Виртуальный дизайнер' : 'Virtual Interior Stylist'}
                </p>
              </div>
            </div>

            {/* Header Action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleClearChat}
                className="btn-icon"
                title={lang === 'uz' ? 'Suhbatni tozalash' : 'Очистить чат'}
                style={{ width: '32px', height: '32px' }}
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="btn-icon"
                title={isExpanded ? 'Kichraytirish' : 'Kengaytirish'}
                style={{ width: '32px', height: '32px' }}
              >
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-icon"
                style={{ width: '32px', height: '32px' }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: 'var(--bg-primary)',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '100%',
                }}
              >
                {/* Bubble Container */}
                <div
                  style={{
                    maxWidth: msg.sender === 'user' ? '82%' : '90%',
                    padding: '14px 18px',
                    borderRadius: msg.sender === 'user' 
                      ? '18px 18px 4px 18px' 
                      : '18px 18px 18px 4px',
                    backgroundColor: msg.sender === 'user' ? 'var(--accent)' : 'var(--surface)',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                    boxShadow: 'var(--shadow-xs)',
                    border: msg.sender === 'user' ? 'none' : '1px solid var(--border)',
                    fontSize: '0.9rem',
                    lineHeight: 1.55,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {/* Clean text formatting */}
                  <div>
                    {msg.text.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <strong key={i} style={{ display: 'block', margin: '4px 0' }}>{line.replace(/\*\*/g, '')}</strong>;
                      }
                      // Basic bold replacement
                      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      return (
                        <p
                          key={i}
                          style={{ margin: line ? '0 0 6px 0' : '0', minHeight: line ? 'auto' : '6px' }}
                          dangerouslySetInnerHTML={{ __html: formatted }}
                        />
                      );
                    })}
                  </div>

                  {/* Embedded Recommended Product Cards */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {lang === 'uz' ? 'Tavsiya etilgan mebellar:' : 'Рекомендуемые модели:'}
                      </span>
                      {msg.recommendedProducts.map((p) => (
                        <div
                          key={p.id}
                          style={{
                            display: 'flex',
                            gap: '12px',
                            padding: '10px',
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: 'var(--r-md)',
                            border: '1px solid var(--border)',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name[lang] || p.name.uz}
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: 'var(--r-sm)',
                              objectFit: 'cover',
                              flexShrink: 0,
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {p.name[lang] || p.name.uz}
                            </div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', marginTop: '2px' }}>
                              {formatPrice(p.price)}
                            </div>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                              <button
                                onClick={() => {
                                  navigate(`/product/${p.id}`);
                                  setIsOpen(false);
                                }}
                                style={{
                                  fontSize: '0.74rem',
                                  padding: '4px 8px',
                                  borderRadius: 'var(--r-xs)',
                                  backgroundColor: 'var(--surface)',
                                  border: '1px solid var(--border)',
                                  color: 'var(--text-primary)',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontWeight: 500,
                                }}
                              >
                                {lang === 'uz' ? 'Koʻrish' : 'Смотреть'}
                                <ArrowRight size={11} />
                              </button>
                              <button
                                onClick={(e) => handleAddToCartQuick(p, e)}
                                style={{
                                  fontSize: '0.74rem',
                                  padding: '4px 8px',
                                  borderRadius: 'var(--r-xs)',
                                  backgroundColor: 'var(--accent)',
                                  border: 'none',
                                  color: '#ffffff',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontWeight: 500,
                                }}
                              >
                                <ShoppingBag size={11} />
                                {lang === 'uz' ? 'Savatchaga' : 'В корзину'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Direct Link Action button (e.g. to Custom Order or Catalog) */}
                  {msg.actionLink && (
                    <div style={{ marginTop: '12px' }}>
                      <button
                        onClick={() => {
                          navigate(msg.actionLink);
                          setIsOpen(false);
                        }}
                        className="btn btn-outline btn-sm"
                        style={{
                          width: '100%',
                          fontSize: '0.82rem',
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <span>{msg.actionText}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Message Timestamp */}
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    marginTop: '4px',
                    marginRight: msg.sender === 'user' ? '4px' : '0',
                    marginLeft: msg.sender === 'ai' ? '4px' : '0',
                  }}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    padding: '12px 18px',
                    borderRadius: '18px 18px 18px 4px',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      display: 'inline-block',
                      animation: 'pulse 1s infinite alternate',
                    }}
                  />
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      display: 'inline-block',
                      animation: 'pulse 1s infinite alternate 0.2s',
                    }}
                  />
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent)',
                      display: 'inline-block',
                      animation: 'pulse 1s infinite alternate 0.4s',
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Grand AI oʻylamoqda...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div
            style={{
              padding: '10px 16px',
              backgroundColor: 'var(--surface)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              flexShrink: 0,
            }}
          >
            {getQuickPrompts(lang).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isTyping}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--r-full)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all var(--t-fast)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent-subtle)';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--surface)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                lang === 'uz'
                  ? "Mebel, o'lcham yoki dizayn bo'yicha so'rang..."
                  : lang === 'ru'
                  ? 'Спросите о мебели, размерах или дизайне...'
                  : 'Ask about furniture, size or design...'
              }
              disabled={isTyping}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 'var(--r-full)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: inputMessage.trim() && !isTyping ? 'var(--accent)' : 'var(--bg-secondary)',
                color: inputMessage.trim() && !isTyping ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                cursor: inputMessage.trim() && !isTyping ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all var(--t-fast)',
                flexShrink: 0,
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
