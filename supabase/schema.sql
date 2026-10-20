-- ==========================================================================
-- GRAND MEBEL - SUPABASE DATABASE SCHEMA (100% ISHONCHLI VA XATOSIZ)
-- Ushbu skriptni Supabase SQL Editor'ga to'liq nusxalab, RUN tugmasini bosing
-- ==========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================================================
-- 2. ESKI JADVALLARNI TOZALASH (Eski xato tiplar yoki UUID to'qnashuvlarini yo'qotish)
-- ==========================================================================
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS custom_inquiries CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS telegram_settings CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- ==========================================================================
-- 3. JADVALLARNI YARATISH
-- ==========================================================================

-- A. CATEGORIES TABLE
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- B. PRODUCTS TABLE
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  room TEXT DEFAULT 'living',
  price NUMERIC(15, 2) NOT NULL,
  old_price NUMERIC(15, 2),
  rating NUMERIC(2, 1) DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  badge TEXT DEFAULT 'new',
  in_stock BOOLEAN DEFAULT TRUE,
  width NUMERIC(6, 1) DEFAULT 100,
  height NUMERIC(6, 1) DEFAULT 80,
  depth NUMERIC(6, 1) DEFAULT 80,
  materials TEXT[] DEFAULT ARRAY[]::TEXT[],
  colors JSONB DEFAULT '[]'::JSONB,
  images TEXT[] DEFAULT ARRAY[]::TEXT[],
  description_uz TEXT,
  description_ru TEXT,
  description_en TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- C. ORDERS TABLE
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  payment_method TEXT DEFAULT 'Naqd / Karta',
  order_notes TEXT,
  total_amount NUMERIC(15, 2) NOT NULL,
  discount_percent NUMERIC(5, 2) DEFAULT 0,
  promo_code TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- D. ORDER ITEMS TABLE
CREATE TABLE order_items (
  id TEXT PRIMARY KEY,
  order_id TEXT REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT REFERENCES products(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  price NUMERIC(15, 2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  color TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E. CUSTOM BESPOKE INQUIRIES TABLE (Konstruktor arizalari)
CREATE TABLE custom_inquiries (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  furniture_type TEXT NOT NULL,
  length NUMERIC(6, 1),
  depth NUMERIC(6, 1),
  height NUMERIC(6, 1),
  material TEXT,
  budget TEXT,
  notes TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- F. CONTACT CALLBACKS TABLE
CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- G. TELEGRAM BOT SETTINGS TABLE
CREATE TABLE telegram_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  bot_token TEXT NOT NULL,
  chat_id TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- Sayt va Admin panel bemalol ma'lumot qo'sha olishi va o'qishi uchun to'liq ruxsat
-- ==========================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE telegram_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public full access on categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access on products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access on orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access on order_items" ON order_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access on custom_inquiries" ON custom_inquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access on contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public full access on telegram_settings" ON telegram_settings FOR ALL USING (true) WITH CHECK (true);

-- ==========================================================================
-- 5. DASTLABKI MAʼLUMOTLAR (SEED DATA)
-- ==========================================================================

-- Seed Categories
INSERT INTO categories (id, name_uz, name_ru, name_en, slug) VALUES
('sofa', 'Yumshoq mebellar', 'Мягкая мебель', 'Sofas & Lounges', 'sofas'),
('living', 'Mehmonxona', 'Гостиная', 'Living Room', 'living-room'),
('bedroom', 'Yotoqxona', 'Спальня', 'Bedroom', 'bedroom'),
('kitchen', 'Oshxona & Oshxona stollari', 'Кухня и столовые', 'Kitchen & Dining', 'kitchen-dining'),
('office', 'Ofis & Ish xonasi', 'Офис и кабинет', 'Office & Study', 'office-study'),
('storage', 'Shkaf & Garniturlar', 'Шкафы и гарнитуры', 'Storage & Closets', 'storage');

-- Seed Products
INSERT INTO products (
  id, name_uz, name_ru, name_en, category_id, room, price, old_price, rating, reviews_count, badge, in_stock,
  width, height, depth, materials, colors, images, description_uz, description_ru, description_en, featured
) VALUES
(
  'sofa-milano-velvet',
  'Milano Royal Baxmal Divan',
  'Диван Milano Royal Velvet',
  'Milano Royal Velvet Sofa',
  'sofa', 'living', 18500000, 21900000, 4.9, 38, 'bestseller', true,
  240, 85, 105,
  ARRAY['Italiya baxmali (Velvet)', 'Tabiiy emon yogʻochi', 'Yuqori elastik koʻpik HR35'],
  '[{"name": {"uz": "Zumrad Yashil", "ru": "Изумрудно-зеленый", "en": "Emerald Green"}, "hex": "#1c3d2e"}, {"name": {"uz": "Tungi Moviy", "ru": "Глубокий синий", "en": "Midnight Navy"}, "hex": "#162238"}, {"name": {"uz": "Qaymoqrang", "ru": "Слоновая кость", "en": "Warm Ivory"}, "hex": "#f0ece1"}]'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
  ],
  'Milano Royal divani zamonaviy Italiya nafosati va mislsiz qulaylikni oʻzida mujassam etgan. Yumshoq suv oʻtkazmaydigan baxmal qoplama va mustahkam eman karkasi koʻp yillik xizmatni kafolatlaydi.',
  'Диван Milano Royal воплощает итальянскую элегантность и максимальный комфорт. Бархатная водоотталкивающая обивка и массив дуба гарантируют долговечность.',
  'The Milano Royal sofa embodies Italian sophistication and unmatched ergonomic comfort. Upholstered in water-repellent luxury velvet on a solid oak frame.',
  true
),
(
  'bed-venezia-king',
  'Venezia King Ortopedik Karavot',
  'Кровать Venezia King с ортопедом',
  'Venezia King Orthopedic Bed',
  'bedroom', 'bedroom', 24200000, 27500000, 5.0, 42, 'premium', true,
  200, 135, 220,
  ARRAY['Buk va yongʻoq yogʻochi', 'Fransuz buklesi matosi', 'Mustahkam koʻtarish mexanizmi'],
  '[{"name": {"uz": "Och Kulrang Bukle", "ru": "Светло-серый букле", "en": "Light Grey Bouclé"}, "hex": "#d9d5ce"}, {"name": {"uz": "Karamel Qahva", "ru": "Карамельный", "en": "Caramel Brown"}, "hex": "#634735"}]'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80'
  ],
  'Venezia King karavoti orom va hashamat uygʻunligi. Baland yumshoq bukle suyanchigʻi va pastki qismida keng buyumlar saqlash qutisi bilan jihozlangan.',
  'Кровать Venezia King дарит глубокий восстанавливающий сон. Высокое мягкое изголовье из фактурного букле и скрытый подъемный ящик для хранения белья.',
  'Venezia King Bed pairs grand scale with cloud-like comfort. Features a sculptural bouclé headboard and spacious under-bed storage hydraulic lift.',
  true
),
(
  'table-verona-marble',
  'Verona Marmar Oshxona Stoli',
  'Обеденный стол Verona из мрамора',
  'Verona Italian Marble Dining Table',
  'kitchen', 'kitchen', 16800000, 19500000, 4.8, 19, 'new', true,
  220, 76, 100,
  ARRAY['Italiya Calacatta tabiiy marmari', 'Qora kukunli poʻlat', 'Lazer bilan kesilgan oyoqlar'],
  '[{"name": {"uz": "Oq Calacatta Oltin", "ru": "Белый Calacatta Gold", "en": "Calacatta Gold White"}, "hex": "#f7f6f2"}, {"name": {"uz": "Qora Nero Marquina", "ru": "Черный Nero Marquina", "en": "Nero Marquina Black"}, "hex": "#1c1b18"}]'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80'
  ],
  '8 kishilik hashamatli oshxona stoli. Har bir marmar plitasi oʻziga xos takrorlanmas tabiiy naqshga ega va maxsus himoya qatlami bilan qoplangan.',
  'Обеденный стол на 8 персон с полированной столешницей из итальянского мрамора Calacatta и минималистичным основанием.',
  'Distinctive 8-seater dining centerpiece with authentic Calacatta gold-veined marble slab and architectural steel legs.',
  false
),
(
  'armchair-toscana-leather',
  'Toscana Premium Teri Kreslo',
  'Кожаное кресло Toscana Premium',
  'Toscana Premium Leather Armchair',
  'sofa', 'living', 9400000, 11200000, 4.9, 15, 'sale', true,
  95, 92, 90,
  ARRAY['Tabiiy italyan anilin terisi', 'Qora mat poʻlat karkas', 'Qush pati toʻldirgichi'],
  '[{"name": {"uz": "Konyak Jigarrang", "ru": "Коньячный", "en": "Cognac Brown"}, "hex": "#8c4a2f"}, {"name": {"uz": "Klassik Qora", "ru": "Классический черный", "en": "Classic Black"}, "hex": "#1f1f1f"}]'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1580481077195-c3a821a58875?auto=format&fit=crop&w=1200&q=80'
  ],
  'Tabiiy sifatli anilin teridan tayyorlangan eksklyuziv dam olish kreslosi. Vaqt oʻtishi bilan terisi yanada olijanob koʻrinish kasb etadi.',
  'Кресло для отдыха из премиальной итальянской анилиновой кожи. Со временем приобретает благородную патину.',
  'Ergonomic lounge armchair upholstered in full-grain Italian saddle leather over a sculpted matte black steel frame.',
  true
),
(
  'desk-nordic-walnut',
  'Nordic Yongʻoq Yogʻochli Ish Stoli',
  'Письменный стол Nordic из ореха',
  'Nordic Solid Walnut Executive Desk',
  'office', 'office', 14500000, null, 4.7, 11, 'exclusive', true,
  180, 75, 80,
  ARRAY['100% Amerika yongʻoq massivi', 'Yashirin sim oʻtkazgichlar', 'Simsiz zaryadlash paneli'],
  '[{"name": {"uz": "Tabiiy Yongʻoq", "ru": "Натуральный орех", "en": "Natural Walnut"}, "hex": "#543d2b"}]'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80'
  ],
  'Zamonaviy rahbarlar va ijodkorlar uchun mukammal ish stoli. Integratsiyalashgan kabel boshqaruvi va oʻrnatilgan simsiz quvvatlash moduliga ega.',
  'Премиальный рабочий стол из массива американского ореха со встроенным органайзером кабелей и беспроводной зарядкой.',
  'Heirloom-grade solid walnut executive desk with concealed cable management and wireless Qi charging pad integration.',
  false
),
(
  'wardrobe-roma-glass',
  'Roma Shisha Fasadli Katta Shkaf',
  'Шкаф-гардероб Roma со стеклом',
  'Roma Glass Front Walk-In Wardrobe',
  'storage', 'bedroom', 32500000, 38000000, 5.0, 23, 'premium', true,
  320, 260, 65,
  ARRAY['Bronza tusli qoraytirilgan shisha', 'LED aqlli sensor chiroqlari', 'Blum avstriya mexanizmlari'],
  '[{"name": {"uz": "Qora Ramka & Bronza Shisha", "ru": "Черный с бронзовым стеклом", "en": "Black Frame Bronze Glass"}, "hex": "#2c2523"}]'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80'
  ],
  'Eshiklari ochilganda avtomatik yonadigan ichki yumshoq yorugʻlik, sensorli ochilish tizimi va zargarlik buyumlari uchun baxmal tortmalar bilan jihozlangan.',
  'Гардеробная система со стеклянными тонированными фасадами, интегрированной сенсорной подсветкой и ювелирными бархатными органайзерами.',
  'Showstopper wardrobe with tinted bronze glass doors, integrated LED illumination, and custom velvet jewelry drawers.',
  true
);

-- Seed Telegram Settings
INSERT INTO telegram_settings (id, bot_token, chat_id, is_active)
VALUES ('default', '8690944939:AAFAoy4ubx52L3BK5xM0p2IBSnBlwUd3qSY', '5389465132', true);

-- Seed Sample Demo Order
INSERT INTO orders (id, customer_name, phone, address, payment_method, total_amount, status)
VALUES ('GM-948215', 'Sardorbek Rahimov', '+998 90 123 45 67', 'Toshkent sh., Mirzo Ulugʻbek tumani', 'Payme / Click', 18500000, 'new');

INSERT INTO order_items (id, order_id, product_id, title, price, quantity, color, image_url)
VALUES (
  'item-948215-1',
  'GM-948215',
  'sofa-milano-velvet',
  'Milano Royal Baxmal Divan',
  18500000,
  1,
  'Zumrad Yashil',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
);

-- ==========================================================================
-- 6. REALTIME REPLICATION (XAVFSIZ TEKSHIRUV BILAN)
-- ==========================================================================
DO $$ 
BEGIN 
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE orders;
    EXCEPTION WHEN others THEN NULL;
    END;

    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE products;
    EXCEPTION WHEN others THEN NULL;
    END;

    BEGIN
      ALTER PUBLICATION supabase_realtime ADD TABLE custom_inquiries;
    EXCEPTION WHEN others THEN NULL;
    END;
  END IF;
END $$;
