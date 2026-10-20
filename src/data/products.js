export const CATEGORIES = [
  { id: 'all', name: { uz: 'Barcha mebellar', ru: 'Вся мебель', en: 'All Furniture' } },
  { id: 'sofa', name: { uz: 'Yumshoq mebellar', ru: 'Мягкая мебель', en: 'Sofas & Lounges' } },
  { id: 'living', name: { uz: 'Mehmonxona', ru: 'Гостиная', en: 'Living Room' } },
  { id: 'bedroom', name: { uz: 'Yotoqxona', ru: 'Спальня', en: 'Bedroom' } },
  { id: 'kitchen', name: { uz: 'Oshxona & Oshxona stollari', ru: 'Кухня и столовые', en: 'Kitchen & Dining' } },
  { id: 'office', name: { uz: 'Ofis & Ish xonasi', ru: 'Офис и кабинет', en: 'Office & Study' } },
  { id: 'storage', name: { uz: 'Shkaf & Garniturlar', ru: 'Шкафы и гарнитуры', en: 'Storage & Closets' } },
];

export const PRODUCTS = [
  {
    id: 'sofa-milano-velvet',
    name: {
      uz: 'Milano Royal Baxmal Divan',
      ru: 'Диван Milano Royal Velvet',
      en: 'Milano Royal Velvet Sofa'
    },
    category: 'sofa',
    room: 'living',
    price: 18500000,
    oldPrice: 21900000,
    rating: 4.9,
    reviewsCount: 38,
    badge: 'bestseller',
    inStock: true,
    dimensions: { width: 240, height: 85, depth: 105, unit: 'sm' },
    materials: ['Italiya baxmali (Velvet)', 'Tabiiy emon yogʻochi', 'Yuqori elastik koʻpik HR35'],
    colors: [
      { name: { uz: 'Zumrad Yashil', ru: 'Изумрудно-зеленый', en: 'Emerald Green' }, hex: '#1c3d2e' },
      { name: { uz: 'Tungi Moviy', ru: 'Глубокий синий', en: 'Midnight Navy' }, hex: '#162238' },
      { name: { uz: 'Qaymoqrang', ru: 'Слоновая кость', en: 'Warm Ivory' }, hex: '#f0ece1' },
      { name: { uz: 'Kulrang Terakota', ru: 'Терракотовый', en: 'Terracotta' }, hex: '#a6543b' },
    ],
    description: {
      uz: 'Milano Royal divani zamonaviy Italiya nafosati va mislsiz qulaylikni oʻzida mujassam etgan. Yumshoq suv oʻtkazmaydigan baxmal qoplama va mustahkam eman karkasi koʻp yillik xizmatni kafolatlaydi.',
      ru: 'Диван Milano Royal воплощает итальянскую элегантность и максимальный комфорт. Бархатная водоотталкивающая обивка и массив дуба гарантируют долговечность.',
      en: 'The Milano Royal sofa embodies Italian sophistication and unmatched ergonomic comfort. Upholstered in water-repellent luxury velvet on a solid oak frame.'
    },
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'bed-venezia-king',
    name: {
      uz: 'Venezia King Ortopedik Karavot',
      ru: 'Кровать Venezia King с ортопедом',
      en: 'Venezia King Orthopedic Bed'
    },
    category: 'bedroom',
    room: 'bedroom',
    price: 24200000,
    oldPrice: 27500000,
    rating: 5.0,
    reviewsCount: 42,
    badge: 'premium',
    inStock: true,
    dimensions: { width: 200, height: 135, depth: 220, unit: 'sm' },
    materials: ['Buk va yongʻoq yogʻochi', 'Fransuz buklesi matosi', 'Mustahkam koʻtarish mexanizmi'],
    colors: [
      { name: { uz: 'Och Kulrang Bukle', ru: 'Светло-серый букле', en: 'Light Grey Bouclé' }, hex: '#d9d5ce' },
      { name: { uz: 'Karamel Qahva', ru: 'Карамельный', en: 'Caramel Brown' }, hex: '#634735' },
      { name: { uz: 'Qora Antratsit', ru: 'Антрацит', en: 'Charcoal Anthracite' }, hex: '#26292e' },
    ],
    description: {
      uz: 'Venezia King karavoti orom va hashamat uygʻunligi. Baland yumshoq bukle suyanchigʻi va pastki qismida keng buyumlar saqlash qutisi bilan jihozlangan.',
      ru: 'Кровать Venezia King дарит глубокий восстанавливающий сон. Высокое мягкое изголовье из фактурного букле и скрытый подъемный ящик для хранения белья.',
      en: 'Venezia King Bed pairs grand scale with cloud-like comfort. Features a sculptural bouclé headboard and spacious under-bed storage hydraulic lift.'
    },
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'table-verona-marble',
    name: {
      uz: 'Verona Marmar Oshxona Stoli',
      ru: 'Обеденный стол Verona из мрамора',
      en: 'Verona Italian Marble Dining Table'
    },
    category: 'kitchen',
    room: 'kitchen',
    price: 16800000,
    oldPrice: 19500000,
    rating: 4.8,
    reviewsCount: 19,
    badge: 'new',
    inStock: true,
    dimensions: { width: 220, height: 76, depth: 100, unit: 'sm' },
    materials: ['Italiya Calacatta tabiiy marmari', 'Qora kukunli poʻlat', 'Lazer bilan kesilgan oyoqlar'],
    colors: [
      { name: { uz: 'Oq Calacatta Oltin', ru: 'Белый Calacatta Gold', en: 'Calacatta Gold White' }, hex: '#f7f6f2' },
      { name: { uz: 'Qora Nero Marquina', ru: 'Черный Nero Marquina', en: 'Nero Marquina Black' }, hex: '#1c1b18' },
    ],
    description: {
      uz: 'Verona dasturxoni 8-10 kishilik oila va mehmonlar uchun moʻljallangan. Calacatta tabiiy marmar sirti issiqqa va chizilishga bardoshli himoya qatlami bilan qoplangan.',
      ru: 'Стол Verona из натурального мрамора Calacatta рассчитан на 8-10 персон. Полированная поверхность устойчива к царапинам и высоким температурам.',
      en: 'Verona Dining Table comfortably seats 8-10. Cut from natural Italian Calacatta marble slab on an architectural powder-coated steel base.'
    },
    images: [
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'armchair-nordic-lounge',
    name: {
      uz: 'Nordic Hans Dam Olish Kreslosi',
      ru: 'Лаунж-кресло Nordic Hans',
      en: 'Nordic Hans Lounge Armchair'
    },
    category: 'sofa',
    room: 'living',
    price: 6400000,
    oldPrice: 7800000,
    rating: 4.9,
    reviewsCount: 54,
    badge: 'bestseller',
    inStock: true,
    dimensions: { width: 85, height: 92, depth: 88, unit: 'sm' },
    materials: ['Tabiiy terakota teri', 'Eman yogʻochi', 'Aylanuvchi podshipnik'],
    colors: [
      { name: { uz: 'Konyak Jigarrang Teri', ru: 'Коньячная кожа', en: 'Cognac Leather' }, hex: '#8a4b2a' },
      { name: { uz: 'Qora Nappa', ru: 'Черная Наппа', en: 'Black Nappa' }, hex: '#1e1e1e' },
      { name: { uz: 'Zaytun Yashil', ru: 'Оливковый', en: 'Olive Green' }, hex: '#556b2f' },
    ],
    description: {
      uz: 'Skandinaviya minimalizmi va ergonomikasi. Kitob oʻqish va kechki hordiq uchun moʻljallangan qulay anatomiya va aylanuvchi mexanizm.',
      ru: 'Скандинавский минимализм в сочетании с анатомическим комфортом. Поворотный механизм и натуральная зернистая кожа.',
      en: 'Scandinavian minimalism meets supreme ergonomic support. 360-degree silent swivel on crafted oak legs, wrapped in full-grain leather.'
    },
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580481077195-73ab013f33d7?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'desk-executive-walnut',
    name: {
      uz: 'Prezident Yongʻoq Rahbar Stoli',
      ru: 'Кабинетный стол President Walnut',
      en: 'Executive Walnut Office Desk'
    },
    category: 'office',
    room: 'office',
    price: 19800000,
    oldPrice: 23000000,
    rating: 4.9,
    reviewsCount: 16,
    badge: 'premium',
    inStock: true,
    dimensions: { width: 210, height: 77, depth: 95, unit: 'sm' },
    materials: ['Tabiiy yongʻoq shpon', 'Yashirin sim oʻtkazgichlar', 'Oltin rang guruch fitinglar'],
    colors: [
      { name: { uz: 'Klassik Yongʻoq', ru: 'Классический орех', en: 'Classic Walnut' }, hex: '#4a3324' },
      { name: { uz: 'Qora Dub', ru: 'Мореный дуб', en: 'Smoked Oak' }, hex: '#211d1a' },
    ],
    description: {
      uz: 'Yuqori martabali rahbarlar va shaxsiy kabinetlar uchun hashamatli yongʻoq yogʻochidan ishlangan stol. Simlarni yashirish tizimi va simsiz quvvatlagich paneli mavjud.',
      ru: 'Премиальный рабочий стол из шпона американского ореха со встроенным беспроводным зарядным устройством и скрытым кабель-менеджментом.',
      en: 'Luxury executive desk crafted in American Walnut veneer. Integrated wireless charging bay and concealed cable management.'
    },
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'wardrobe-roma-glass',
    name: {
      uz: 'Roma Shisha Fasadli Katta Shkaf',
      ru: 'Шкаф-гардероб Roma со стеклом',
      en: 'Roma Glass Front Walk-In Wardrobe'
    },
    category: 'storage',
    room: 'bedroom',
    price: 32500000,
    oldPrice: 38000000,
    rating: 5.0,
    reviewsCount: 23,
    badge: 'premium',
    inStock: true,
    dimensions: { width: 320, height: 260, depth: 65, unit: 'sm' },
    materials: ['Bronza tusli qoraytirilgan shisha', 'LED aqlli sensor chiroqlari', 'Blum avstriya mexanizmlari'],
    colors: [
      { name: { uz: 'Qora Ramka & Bronza Shisha', ru: 'Черный с бронзовым стеклом', en: 'Black Frame Bronze Glass' }, hex: '#2c2523' },
      { name: { uz: 'Oltin Ramka & Shaffof Shisha', ru: 'Золотой профиль прозрачный', en: 'Gold Profile Clear Glass' }, hex: '#483c32' },
    ],
    description: {
      uz: 'Eshiklari ochilganda avtomatik yonadigan ichki yumshoq yorugʻlik, sensorli ochilish tizimi va zargarlik buyumlari uchun baxmal tortmalar bilan jihozlangan.',
      ru: 'Гардеробная система со стеклянными тонированными фасадами, интегрированной сенсорной подсветкой и ювелирными бархатными органайзерами.',
      en: 'Showstopper wardrobe with tinted bronze glass doors, integrated LED illumination, and custom velvet jewelry drawers.'
    },
    images: [
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'coffee-table-tivoli',
    name: {
      uz: 'Tivoli Travertin Jurnal Stoli',
      ru: 'Журнальный столик Tivoli Travertine',
      en: 'Tivoli Travertine Coffee Table Set'
    },
    category: 'living',
    room: 'living',
    price: 5200000,
    oldPrice: 6100000,
    rating: 4.8,
    reviewsCount: 29,
    badge: 'new',
    inStock: true,
    dimensions: { width: 110, height: 42, depth: 70, unit: 'sm' },
    materials: ['Tabiiy Rim travertini', 'Monolit tosh'],
    colors: [
      { name: { uz: 'Tabiiy Bej Travertin', ru: 'Бежевый травертин', en: 'Natural Beige Travertine' }, hex: '#dfd7c5' },
      { name: { uz: 'Qora Bazalt', ru: 'Черный базальт', en: 'Basalt Charcoal' }, hex: '#343434' },
    ],
    description: {
      uz: 'Tabiiy Rim travertinidan yoʻnilgan monolit shaklli jurnal stoli. Mehmonxonangizga tabiiy sokinlik va arxitekturaviy goʻzallik bagʻishlaydi.',
      ru: 'Монолитный кофейный столик из натурального римского травертина. Неповторимая текстура камня придаст интерьеру благородство.',
      en: 'Carved from Roman travertine stone with an organic honed finish. A timeless architectural centerpiece for the living room.'
    },
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  },
  {
    id: 'kitchen-island-monaco',
    name: {
      uz: 'Monaco Luxury Oshxona Garnituri',
      ru: 'Кухонный гарнитур Monaco Luxury',
      en: 'Monaco Luxury Kitchen Island & Cabinetry'
    },
    category: 'kitchen',
    room: 'kitchen',
    price: 48000000,
    oldPrice: 55000000,
    rating: 5.0,
    reviewsCount: 12,
    badge: 'premium',
    inStock: true,
    dimensions: { width: 420, height: 240, depth: 60, unit: 'sm' },
    materials: ['MDF Fenix mat', 'Kvars aglomerat stol usti', 'Kashnich yongʻoq shpon'],
    colors: [
      { name: { uz: 'Mat Qora & Yongʻoq', ru: 'Матовый графит и орех', en: 'Matte Graphite & Walnut' }, hex: '#232526' },
      { name: { uz: 'Tumanli Oq & Yengil Dub', ru: 'Туманный белый и дуб', en: 'Mist White & Pale Oak' }, hex: '#eeebe5' },
    ],
    description: {
      uz: 'Monaco oshxonasi barmoq izi qolmaydigan zamonaviy FENIX sirtlari, toʻliq kvars oroli va oʻrnatiladigan maishiy texnika zonasi bilan har qanday oshpazning orzusidir.',
      ru: 'Кухня премиум-класса с фасадами Fenix с защитой от отпечатков пальцев, островом из кварцевого камня и скрытыми системами хранения.',
      en: 'State of the art bespoke kitchen suite featuring anti-fingerprint FENIX surfaces, quartz waterfall island, and motorized soft-close cabinetry.'
    },
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true
  },
  {
    id: 'bookshelf-florence-loft',
    name: {
      uz: 'Florence Arxitekturaviy Kitob Javoni',
      ru: 'Книжный стеллаж Florence Loft',
      en: 'Florence Architectural Bookshelf'
    },
    category: 'storage',
    room: 'office',
    price: 11400000,
    oldPrice: 13500000,
    rating: 4.7,
    reviewsCount: 21,
    badge: 'sale',
    inStock: true,
    dimensions: { width: 180, height: 220, depth: 38, unit: 'sm' },
    materials: ['Metall karkas', 'Qalin tabiiy eman tokchalari', 'Yashirin fiksatorlar'],
    colors: [
      { name: { uz: 'Qora Metall & Tabiiy Eman', ru: 'Черный металл и дуб', en: 'Black Steel & Oak' }, hex: '#3d322a' },
      { name: { uz: 'Guruch Oltin & Oq Marmar', ru: 'Золотая латунь и мрамор', en: 'Brass & White Marble' }, hex: '#b59e5f' },
    ],
    description: {
      uz: 'Ochiq geometrik kompozitsiyali javon kitoblar, sanʼat asarlari va dekoratsiyalarni chiroyli joylashtirish uchun moʻljallangan.',
      ru: 'Открытый стеллаж геометрической формы с полками из массива дуба для библиотеки, арт-объектов и аксессуаров.',
      en: 'Geometric open-shelving statement unit with solid oak planks and structural metal frame. Built for art, books, and curios.'
    },
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  },
  {
    id: 'chair-dining-velvet-set',
    name: {
      uz: 'Turin Dizaynerlik Oshxona Kreslolari (4 dona)',
      ru: 'Комплект стульев Turin Velvet (4 шт)',
      en: 'Turin Designer Dining Chairs (Set of 4)'
    },
    category: 'kitchen',
    room: 'kitchen',
    price: 7600000,
    oldPrice: 8900000,
    rating: 4.9,
    reviewsCount: 31,
    badge: 'bestseller',
    inStock: true,
    dimensions: { width: 56, height: 82, depth: 58, unit: 'sm' },
    materials: ['Baxmal qoplama', 'Poʻlat oyoqlar oltin uchi bilan', 'Ortopedik orqa suyangich'],
    colors: [
      { name: { uz: 'Kulrang Qushqoʻnmas', ru: 'Серый графит', en: 'Charcoal Grey' }, hex: '#4f5255' },
      { name: { uz: 'Sariq Qahrabo', ru: 'Янтарно-желтый', en: 'Amber Gold' }, hex: '#d49b28' },
      { name: { uz: 'Dengiz Toʻlqini', ru: 'Морская волна', en: 'Ocean Teal' }, hex: '#265961' },
    ],
    description: {
      uz: '4 dona toʻplam. Suyanchigʻi orqaga moslashuvchan, oyoqlari esa korroziyaga chidamli oltin qoplamali.',
      ru: 'Комплект из 4-х дизайнерских стульев с комфортной эргономичной спинкой и ножками с золотыми наконечниками.',
      en: 'Set of 4 dining chairs featuring sculpted bucket backs in soft velvet with tapered brass-tipped legs.'
    },
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  },
  {
    id: 'tv-unit-palermo',
    name: {
      uz: 'Palermo Rifleniy TV Konsol Tumbalari',
      ru: 'ТВ-тумба Palermo с рифлеными фасадами',
      en: 'Palermo Fluted Wall TV Console'
    },
    category: 'living',
    room: 'living',
    price: 8900000,
    oldPrice: 10500000,
    rating: 4.8,
    reviewsCount: 18,
    badge: 'new',
    inStock: true,
    dimensions: { width: 220, height: 48, depth: 42, unit: 'sm' },
    materials: ['Rifleniy MDF', 'Tabiiy yongʻoq shpon', 'Keramika ustki doskasi'],
    colors: [
      { name: { uz: 'Toʻq Yongʻoq & Keramika', ru: 'Темный орех и керамика', en: 'Dark Walnut & Ceramic' }, hex: '#3b2f27' },
      { name: { uz: 'Oq Emal & Oltin', ru: 'Белая эмаль и латунь', en: 'White Enamel & Brass' }, hex: '#eae7e1' },
    ],
    description: {
      uz: 'Zamonaviy rifleniy yuzalar va marmar effektli keramika doskasi. Katta oʻlchamdagi televizorlar va akustik tizimlar uchun ideal.',
      ru: 'ТВ-тумба с трендовыми фрезерованными реечными фасадами и керамическим топом. Идеальна для больших телевизоров и саундбаров.',
      en: 'Fluted wood detailing combined with a scratch-resistant ceramic top, creating a cinematic focal point in your media room.'
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  },
  {
    id: 'bedside-bellagio',
    name: {
      uz: 'Bellagio Tungi Tumba (Juftlik)',
      ru: 'Тумбы прикроватные Bellagio (Пара)',
      en: 'Bellagio Nightstand Pair'
    },
    category: 'bedroom',
    room: 'bedroom',
    price: 4900000,
    oldPrice: 5800000,
    rating: 4.9,
    reviewsCount: 27,
    badge: 'bestseller',
    inStock: true,
    dimensions: { width: 55, height: 50, depth: 45, unit: 'sm' },
    materials: ['Qora yongʻoq', 'Teri qoplamali tortma tubi', 'Yumshoq yopiluvchi Blum relslar'],
    colors: [
      { name: { uz: 'Shokolad Yongʻoq', ru: 'Шоколадный орех', en: 'Chocolate Walnut' }, hex: '#402e21' },
      { name: { uz: 'Tabiiy Och Eman', ru: 'Светлый дуб', en: 'Natural Light Oak' }, hex: '#c5b59a' },
    ],
    description: {
      uz: '2 dona toʻplam. Tortmalari shovqinsiz yopiladi, ichi yumshoq baxmal bilan qoplangan, soat va zargarlik buyumlari uchun juda qulay.',
      ru: 'Комплект из двух тумб с доводчиками плавного хода и бархатным дном ящиков для часов и аксессуаров.',
      en: 'Pair of nightstands with soft-close push mechanisms and velvet-lined drawer bottoms for watches and personal jewelry.'
    },
    images: [
      'https://images.unsplash.com/photo-1532372576444-dda954194ad0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false
  }
];

export const ROOM_LOOKBOOKS = [
  {
    id: 'room-living-luxury',
    title: {
      uz: 'Neoklassik Italiya Mehmonxonasi',
      ru: 'Итальянская Неоклассическая Гостиная',
      en: 'Italian Neoclassical Living Space'
    },
    subtitle: {
      uz: 'Nafis marmar, baxmal va issiq yogʻoch uygʻunligi',
      ru: 'Гармония бархата, мрамора и теплого дерева',
      en: 'A seamless blend of velvet, marble, and warm timber'
    },
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
    hotspots: [
      { productId: 'sofa-milano-velvet', top: '65%', left: '42%', title: 'Milano Royal Divan' },
      { productId: 'coffee-table-tivoli', top: '75%', left: '60%', title: 'Tivoli Travertin Stol' },
      { productId: 'armchair-nordic-lounge', top: '58%', left: '80%', title: 'Nordic Hans Kreslo' }
    ]
  },
  {
    id: 'room-bedroom-serenity',
    title: {
      uz: 'Sokin Zamonaviy Yotoqxona',
      ru: 'Умиротворенная Современная Спальня',
      en: 'Serene Contemporary Master Bedroom'
    },
    subtitle: {
      uz: 'Mukammal dam olish va yuqori darajadagi akustik qulaylik',
      ru: 'Идеальный отдых и акустический уют',
      en: 'Designed for restorative sleep and tactile pleasure'
    },
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
    hotspots: [
      { productId: 'bed-venezia-king', top: '55%', left: '48%', title: 'Venezia King Karavot' },
      { productId: 'bedside-bellagio', top: '62%', left: '20%', title: 'Bellagio Tungi Tumba' },
      { productId: 'wardrobe-roma-glass', top: '40%', left: '85%', title: 'Roma Shisha Shkaf' }
    ]
  },
  {
    id: 'room-kitchen-chef',
    title: {
      uz: 'Arxitekturaviy Ochiq Oshxona & Studio',
      ru: 'Архитектурная Открытая Кухня & Студия',
      en: 'Architectural Open Kitchen & Studio'
    },
    subtitle: {
      uz: 'Kvars monolit oroli va qora yogʻoch estetikasi',
      ru: 'Кварцевый остров и благородный темный шпон',
      en: 'Quartz monolith island with bespoke dark cabinetry'
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    hotspots: [
      { productId: 'kitchen-island-monaco', top: '50%', left: '35%', title: 'Monaco Oshxona' },
      { productId: 'table-verona-marble', top: '65%', left: '72%', title: 'Verona Marmar Stol' },
      { productId: 'chair-dining-velvet-set', top: '72%', left: '62%', title: 'Turin Kreslolar' }
    ]
  }
];
