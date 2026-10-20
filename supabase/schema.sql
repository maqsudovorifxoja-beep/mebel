-- ==========================================================================
-- GRAND MEBEL - SUPABASE DATABASE SCHEMA & INITIAL DATA
-- PostgreSQL Schema with RLS, Indexes, Triggers, and Initial Furniture Seed
-- ==========================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. DROP TABLES IF EXIST (Optional, for clean re-runs)
-- DROP TABLE IF EXISTS order_items CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS custom_inquiries CASCADE;
-- DROP TABLE IF EXISTS contact_messages CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS categories CASCADE;
-- DROP TABLE IF EXISTS telegram_settings CASCADE;

-- ==========================================================================
-- 3. TABLES DEFINITION
-- ==========================================================================

-- A. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- B. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
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
  badge TEXT DEFAULT 'new', -- 'bestseller', 'new', 'premium', 'sale'
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
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY, -- e.g. 'GM-948215'
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  payment_method TEXT DEFAULT 'Naqd / Karta',
  order_notes TEXT,
  total_amount NUMERIC(15, 2) NOT NULL,
  discount_percent NUMERIC(5, 2) DEFAULT 0,
  promo_code TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'processing', 'delivered', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- D. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
CREATE TABLE IF NOT EXISTS custom_inquiries (
  id TEXT PRIMARY KEY, -- e.g. 'CST-58192'
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
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'approved'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- F. CONTACT CALLBACKS TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'resolved'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- G. TELEGRAM BOT SETTINGS TABLE
CREATE TABLE IF NOT EXISTS telegram_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bot_token TEXT NOT NULL,
  chat_id TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE telegram_settings ENABLE ROW LEVEL SECURITY;

-- Categories & Products: Anyone can read (anon & authenticated)
CREATE POLICY "Public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON products FOR SELECT USING (true);

-- Anyone can insert orders, custom inquiries, and contact messages
CREATE POLICY "Public insert access for orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for custom_inquiries" ON custom_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert access for contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);

-- Authenticated (Admins) have full access to manage everything
CREATE POLICY "Full access for authenticated admins on categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Full access for authenticated admins on products" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Full access for authenticated admins on orders" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Full access for authenticated admins on order_items" ON order_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Full access for authenticated admins on custom_inquiries" ON custom_inquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Full access for authenticated admins on contact_messages" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Full access for authenticated admins on telegram_settings" ON telegram_settings FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================================================
-- 5. INITIAL DATA SEED (Categories, Products, and Telegram credentials)
-- ==========================================================================

-- Seed Categories
INSERT INTO categories (id, name_uz, name_ru, name_en, slug) VALUES
('sofa', 'Yumshoq mebellar', 'Мягкая мебель', 'Sofas & Lounges', 'sofas'),
('living', 'Mehmonxona', 'Гостиная', 'Living Room', 'living-room'),
('bedroom', 'Yotoqxona', 'Спальня', 'Bedroom', 'bedroom'),
('kitchen', 'Oshxona & Oshxona stollari', 'Кухня и столовые', 'Kitchen & Dining', 'kitchen-dining'),
('office', 'Ofis & Ish xonasi', 'Офис и кабинет', 'Office & Study', 'office-study'),
('storage', 'Shkaf & Garniturlar', 'Шкафы и гарнитуры', 'Storage & Closets', 'storage')
ON CONFLICT (id) DO NOTHING;

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
    'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80'
  ],
  'Verona dasturxoni 8-10 kishilik oila va mehmonlar uchun moʻljallangan. Calacatta tabiiy marmar sirti issiqqa va chizilishga bardoshli himoya qatlami bilan qoplangan.',
  'Стол Verona из натурального мрамора Calacatta рассчитан на 8-10 персон. Полированная поверхность устойчива к царапинам и высоким температурам.',
  'Verona Dining Table comfortably seats 8-10. Cut from natural Italian Calacatta marble slab on an architectural powder-coated steel base.',
  true
),
(
  'armchair-nordic-lounge',
  'Nordic Hans Dam Olish Kreslosi',
  'Лаунж-кресло Nordic Hans',
  'Nordic Hans Lounge Armchair',
  'sofa', 'living', 6400000, 7800000, 4.9, 54, 'bestseller', true,
  85, 92, 88,
  ARRAY['Tabiiy terakota teri', 'Eman yogʻochi', 'Aylanuvchi podshipnik'],
  '[{"name": {"uz": "Konyak Jigarrang Teri", "ru": "Коньячная кожа", "en": "Cognac Leather"}, "hex": "#8a4b2a"}, {"name": {"uz": "Qora Nappa", "ru": "Черная Наппа", "en": "Black Nappa"}, "hex": "#1e1e1e"}]'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80'
  ],
  'Skandinaviya minimalizmi va ergonomikasi. Kitob oʻqish va kechki hordiq uchun moʻljallangan qulay anatomiya va aylanuvchi mexanizm.',
  'Скандинавский минимализм в сочетании с анатомическим комфортом. Поворотный механизм и натуральная зернистая кожа.',
  'Scandinavian minimalism meets supreme ergonomic support. 360-degree silent swivel on crafted oak legs, wrapped in full-grain leather.',
  true
),
(
  'desk-executive-walnut',
  'Prezident Yongʻoq Rahbar Stoli',
  'Кабинетный стол President Walnut',
  'Executive Walnut Office Desk',
  'office', 'office', 19800000, 23000000, 4.9, 16, 'premium', true,
  210, 77, 95,
  ARRAY['Tabiiy yongʻoq shpon', 'Yashirin sim oʻtkazgichlar', 'Oltin rang guruch fitinglar'],
  '[{"name": {"uz": "Klassik Yongʻoq", "ru": "Классический орех", "en": "Classic Walnut"}, "hex": "#4a3324"}]'::jsonb,
  ARRAY[
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80'
  ],
  'Yuqori martabali rahbarlar va shaxsiy kabinetlar uchun hashamatli yongʻoq yogʻochidan ishlangan stol. Simlarni yashirish tizimi va simsiz quvvatlagich paneli mavjud.',
  'Премиальный рабочий стол из шпона американского ореха со встроенным беспроводным зарядным устройством и скрытым кабель-менеджментом.',
  'Luxury executive desk crafted in American Walnut veneer. Integrated wireless charging bay and concealed cable management.',
  true
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
)
ON CONFLICT (id) DO NOTHING;

-- Seed User's Telegram Bot Credentials
INSERT INTO telegram_settings (bot_token, chat_id, is_active)
VALUES ('8690944939:AAFAoy4ubx52L3BK5xM0p2IBSnBlwUd3qSY', '5389465132', true);

-- Seed Sample Demo Order
INSERT INTO orders (id, customer_name, phone, address, payment_method, total_amount, status)
VALUES ('GM-948215', 'Sardorbek Rahimov', '+998 90 123 45 67', 'Toshkent sh., Mirzo Ulugʻbek tumani', 'Payme / Click', 18500000, 'new')
ON CONFLICT (id) DO NOTHING;

INSERT INTO order_items (order_id, product_id, title, price, quantity, color, image_url)
VALUES (
  'GM-948215',
  'sofa-milano-velvet',
  'Milano Royal Baxmal Divan',
  18500000,
  1,
  'Zumrad Yashil',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80'
);

-- ==========================================================================
-- 6. REALTIME REPLICATION (For instant updates in Admin Panel)
-- ==========================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE custom_inquiries;
