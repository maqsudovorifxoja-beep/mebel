import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Award, 
  ShieldCheck, 
  Compass, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Leaf, 
  Clock, 
  MapPin, 
  Phone,
  Ruler,
  Hammer,
  Eye,
  Calendar,
  HeartHandshake
} from 'lucide-react';

export const AboutPage = () => {
  const { lang } = useLanguage();

  // Milestone timeline
  const milestones = [
    {
      year: '2014',
      title: { uz: 'Atelening ochilishi', ru: 'Основание ателье', en: 'Foundation of the Atelier' },
      desc: {
        uz: 'Toshkent shahrida 3 nafar mohir usta va Italiya duradgorlik anʼanalari bilan dastlabki maxsus buyurtmalar ustaxonasi ish boshladi.',
        ru: 'В Ташкенте открылась первая мастерская индивидуального заказа с тремя мастерами, вдохновленными традициями Ломбардии.',
        en: 'Our boutique custom workshop began with three master woodworkers inspired by the timeless traditions of northern Italy.'
      }
    },
    {
      year: '2017',
      title: { uz: 'Robotlashtirilgan CNC liniyasi', ru: 'Высокоточное ЧПУ оборудование', en: 'High-Precision CNC Integration' },
      desc: {
        uz: 'Italiyaning Biesse kompaniyasidan 0.1 mm aniqlikda ishlov beruvchi 5 oʻqli dastgohlar keltirilib, sifat yangi pogʻonaga koʻtarildi.',
        ru: 'Внедрение 5-осевых обрабатывающих центров Biesse (Италия) с лазерной точностью до 0.1 мм.',
        en: 'Integrated 5-axis Biesse machining centers from Italy, achieving surgical 0.1mm tolerance.'
      }
    },
    {
      year: '2020',
      title: { uz: 'Flagman Showroom', ru: 'Открытие флагманского шоурума', en: 'Flagship Showroom Launch' },
      desc: {
        uz: 'Navoiy koʻchasida 3 000 m² maydonga ega 3 qavatli Grand Mebel Showroomi ochildi va 10 000-mijozga xizmat koʻrsatildi.',
        ru: 'Открытие трехуровневого флагманского шоурума на ул. Навои площадью более 3 000 м².',
        en: 'Unveiled our three-level 3,000 m² flagship showroom in central Tashkent, celebrating 10,000 clients.'
      }
    },
    {
      year: '2023',
      title: { uz: 'Yilning eng yaxshi mebel brendi', ru: 'Бренд года в премиум-мебели', en: 'Luxury Furniture Brand of the Year' },
      desc: {
        uz: 'Oʻzbekistonda ekologik toza va mualliflik mebellari yoʻnalishida milliy sifat va dizayn mukofoti sohibi boʻldik.',
        ru: 'Национальная премия качества и экологичности за использование массива древесины и безопасных материалов.',
        en: 'Recognized with the National Quality & Design Award for eco-conscious luxury craftsmanship.'
      }
    },
    {
      year: '2026',
      title: { uz: 'Virtual Dizayner & AI Integratsiya', ru: 'AI-дизайн и экспортные стандарты', en: 'AI Atelier & Modern Era' },
      desc: {
        uz: 'Uyingiz uchun bir zumda 3D vizualizatsiya yaratuvchi Grand AI yordamchisi va xalqaro ISO 9001:2015 sertifikatlari joriy etildi.',
        ru: 'Запуск интеллектуального онлайн-ассистента Grand AI и подтверждение сертификации ISO 9001:2015.',
        en: 'Pioneered our interactive AI interior consultant and reinforced ISO 9001:2015 international standards.'
      }
    }
  ];

  // 5 Step Craftsmanship process
  const steps = [
    {
      step: '01',
      title: { uz: 'Oʻlchov & 3D Arxitektura', ru: 'Замер и 3D-архитектура', en: 'Laser Survey & 3D CAD' },
      desc: {
        uz: 'Muhandis-texnolog xonadoningizga bepul borib, devorlar geometriyasi va yorugʻlikni lazer bilan oʻlchaydi. 24 soatda fotorealistik 3D loyiha taqdim etiladi.',
        ru: 'Инженер бесплатно выезжает на объект с лазерными дальномерами и образцами. Создание точной 3D-модели за 24 часа.',
        en: 'Engineers perform laser room scans and present photorealistic 3D interior plans within 24 hours.'
      },
      icon: Ruler
    },
    {
      step: '02',
      title: { uz: 'Oliy Toifali Materiallar', ru: 'Отбор материалов', en: 'Material Selection' },
      desc: {
        uz: 'Faqat 8-10% namlikkacha quritilgan tabiiy eman, Carrera tabiiy marmari, Rim travertini va suv oʻtkazmaydigan Italiya baxmallari tanlab olinadi.',
        ru: 'Камерная сушка дуба и ореха до 8%, плиты итальянского мрамора Calacatta и грязеотталкивающий европейский бархат.',
        en: 'Hand-selected kiln-dried solid oak, honed Roman travertine, Carrara marble, and stain-shield velvets.'
      },
      icon: Layers
    },
    {
      step: '03',
      title: { uz: 'Nozik Kesim & Qoʻl Silliqlashi', ru: 'Обработка и ручная шлифовка', en: 'Precision Joinery & Hand Craft' },
      desc: {
        uz: 'Italiya dastgohlaridagi aniq kesimdan soʻng, har bir detal mohir ustalarimiz tomonidan 4 qatlamli qoʻl silliqlashidan oʻtkaziladi.',
        ru: 'После высокоточной распиловки на итальянских станках каждый элемент проходит ручную 4-ступенчатую доводку.',
        en: 'Milled on Italian CNC routers followed by quadruple-stage hand sanding by master joiners.'
      },
      icon: Hammer
    },
    {
      step: '04',
      title: { uz: '7 Bosqichli Sifat Nazorati (QA)', ru: '7 ступеней контроля качества', en: '7-Stage Quality Audit' },
      desc: {
        uz: 'Har bir mebel karkas mustahkamligi, mexanizmlar silliqligi, choklar tekisligi va boʻyoq chidamliligi boʻyicha maxsus stendlarda sinovdan oʻtadi.',
        ru: 'Испытания на динамические нагрузки, плавность австрийских петель Blum и стойкость экологичных покрытий.',
        en: 'Stress-tested for dynamic load, cycle-tested Blum hardware, and finish scratch resistance.'
      },
      icon: ShieldCheck
    },
    {
      step: '05',
      title: { uz: 'Oq Qoʻlqopda Oʻrnatish', ru: 'Безупречная доставка и монтаж', en: 'White-Glove Installation' },
      desc: {
        uz: 'Maxsus yumshoq qadoqda ehtiyotkorona yetkazib berilib, professional mutaxassislarimiz tomonidan oʻrnatiladi va tozalab topshiriladi.',
        ru: 'Бережная доставка в термопленке, сборка бригадой сертифицированных монтажников и передача 10-летней гарантии.',
        en: 'Delivered in reinforced protective packaging, assembled by certified specialists with 10-year warranty.'
      },
      icon: Award
    }
  ];

  // Core values
  const pillars = [
    {
      title: { uz: '10 Yillik Kafolat', ru: '10 Лет Гарантии', en: '10-Year Warranty' },
      desc: {
        uz: 'Barcha karkaslar, tabiiy yogʻoch birikmalari va Avstriya Blum furniturasiga rasmiy 10 yillik kafolat va servis taqdim etiladi.',
        ru: 'Полная юридическая гарантия на все несущие конструкции, массив дуба и оригинальную австрийскую фурнитуру Blum.',
        en: 'Formal 10-year structural warranty on all solid wood frames and Austrian Blum mechanical components.'
      },
      icon: ShieldCheck,
    },
    {
      title: { uz: '100% Ekologik Sertifikat', ru: '100% Эко-стандарты', en: '100% Eco-Certified' },
      desc: {
        uz: 'Faqat xavfsiz E1 toifasidagi plitalar va zaharli hidsiz, suv asosidagi Italiya boʻyoq va moylari (VOC Free) ishlatiladi.',
        ru: 'Только безопасные плиты класса E1, натуральные масла и итальянские полиуретановые эмали без запаха.',
        en: 'Strictly zero-emission E1 core panels, food-safe hardwax oils, and waterborne non-toxic Italian lacquers.'
      },
      icon: Leaf,
    },
    {
      title: { uz: 'Mualliflik Dizayni', ru: 'Авторский Дизайн', en: 'Bespoke Atelier' },
      desc: {
        uz: 'Har bir buyurtma xonadoningiz oʻlchamlari va estetik didingizga moslab, millimetrigacha individual yaratiladi.',
        ru: 'Каждое изделие адаптируется под пропорции помещения, цветовую палитру и образ жизни вашей семьи.',
        en: 'Every piece is tailored to the exact millimeter, harmonizing with your space and personal lifestyle.'
      },
      icon: Compass,
    },
    {
      title: { uz: 'Oliy Toifali Usta Duradgorlar', ru: 'Мастера с 20-летним опытом', en: 'Master Artisans' },
      desc: {
        uz: 'Jamoamizda 15-25 yillik tajribaga ega usta duradgorlar, mebel konstruktorlari va toʻqimachilik ustalari faoliyat yuritadi.',
        ru: 'В нашей команде работают конструкторы, краснодеревщики и драпировщики с опытом более двух десятилетий.',
        en: 'Our workshop unites cabinetmakers, woodturners, and upholsterers with over two decades of experience.'
      },
      icon: Users,
    }
  ];

  // Partners & Hardware
  const partners = [
    { name: 'Blum Austria', desc: { uz: 'Avstriya furnituralari va umrbod silliq yopilish', ru: 'Австрийские подъемники и петли', en: 'Austrian Blum hardware' } },
    { name: 'Fenix NTM Italy', desc: { uz: 'Barmoq izi qolmaydigan nanomat fasadlar', ru: 'Наноматериалы с защитой от отпечатков', en: 'Anti-fingerprint thermal facades' } },
    { name: 'Egger Austria', desc: { uz: 'E1 xalqaro ekologik xavfsiz plitalar', ru: 'Экологичные австрийские плиты E1', en: 'E1 certified sustainable boards' } },
    { name: 'Milesi Vernici', desc: { uz: 'Italiya ekologik toza yogʻoch laklari', ru: 'Премиальные итальянские лаки', en: 'Italian low-VOC wood coatings' } }
  ];

  return (
    <div style={{ padding: '40px 0 100px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        
        {/* ─── 1. Hero Header ─── */}
        <div style={{ maxWidth: '880px', margin: '0 auto 64px', textAlign: 'center' }}>
          <div className="section-tag animate-fade-in">
            <Sparkles size={14} />
            <span>2014 — 2026 · {lang === 'uz' ? 'Italiya Sanʼati & Toshkent Ustaxonalari' : 'Итальянские традиции в Ташкенте'}</span>
          </div>

          <h1 
            className="animate-fade-in-up"
            style={{ 
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', 
              marginBottom: '20px',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.15
            }}
          >
            {lang === 'uz'
              ? 'Uyingizda Avloddan Avlodga Oʻtadigan Mebel Sanʼati'
              : lang === 'ru'
              ? 'Искусство Мебели, Которое Передается Из Поколения в Поколение'
              : 'Heirloom Furniture Craftsmanship for Generations'}
          </h1>

          <p 
            className="animate-fade-in-up stagger-1"
            style={{ 
              fontSize: '1.18rem', 
              color: 'var(--text-secondary)', 
              lineHeight: 1.7,
              maxWidth: '720px',
              margin: '0 auto 40px'
            }}
          >
            {lang === 'uz'
              ? 'Grand Mebel — bu shunchaki mebel fabrikasi emas. Bu tabiiy eman yogʻochi, Italiya baxmali va Rim marmariga mehr berib, har bir xonadonga xos xotiralar maskanini yaratuvchi mualliflik atelesidir.'
              : lang === 'ru'
              ? 'Grand Mebel — премиальное ателье индивидуального дизайна, где массив благородного дуба, итальянский бархат и натуральный мрамор обретают форму истинного уюта.'
              : 'Grand Mebel is a bespoke atelier where solid European oak, Italian velvet, and natural stone are hand-shaped into architectural heirlooms.'}
          </p>

          {/* Quick Metrics Bar */}
          <div 
            className="luxury-card animate-fade-in-up stagger-2"
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '20px',
              padding: '28px 24px',
              backgroundColor: 'var(--surface)',
            }}
          >
            <div>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>12+</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {lang === 'uz' ? 'Yillik mukammal tajriba' : 'Лет безупречной работы'}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border)' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>12 000 m²</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {lang === 'uz' ? 'Zamonaviy zavod maydoni' : 'Производственный комплекс'}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border)' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>4 500+</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {lang === 'uz' ? 'Mamnun xonadonlar' : 'Счастливых интерьеров'}
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border)' }}>
              <div style={{ fontSize: '2.4rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>10 Yil</div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {lang === 'uz' ? 'Toʻliq rasmiy kafolat' : 'Официальной гарантии'}
              </div>
            </div>
          </div>
        </div>

        {/* ─── 2. Story & Heritage ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '56px',
            alignItems: 'center',
            marginBottom: '100px',
          }}
        >
          <div 
            className="img-hover-zoom"
            style={{ 
              borderRadius: 'var(--r-xl)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-xl)',
              aspectRatio: '4/3',
              position: 'relative'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
              alt="Grand Mebel Factory Workshop"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div 
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
                padding: '16px 20px',
                borderRadius: 'var(--r-md)',
                backgroundColor: 'rgba(14, 16, 15, 0.85)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                fontSize: '0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              📍 Toshkent shahri, Yakkasaroy tumani · 12 000 m² Robotlashtirilgan Ishlab Chiqarish Kompleksi
            </div>
          </div>

          <div>
            <div className="section-tag" style={{ marginBottom: '12px' }}>
              <span>{lang === 'uz' ? 'Bizning Tarix' : 'Наша История'}</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', fontFamily: 'var(--font-display)' }}>
              {lang === 'uz'
                ? 'Ehtiros, Mohir Qoʻl Mehnati va Texnologik Mukammallik'
                : 'Страсть к дереву, ручной труд и безупречная точность'}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '20px' }}>
              {lang === 'uz'
                ? '2014-yilda Toshkentda kichik duradgorlik ustaxonasidan boshlangan faoliyatimiz bugungi kunda Oʻzbekistonning eng zamonaviy premium mebel korxonasiga aylandi. Biz bir narsaga qatʼiy ishonamiz: arzon, bir mavsumlik mebellar oʻrniga inson oʻz xonadonida oʻnlab yillar faxr bilan foydalanadigan mustahkam sanʼat asarlarini yaratish kerak.'
                : 'Начав в 2014 году с небольшой мастерской, сегодня Grand Mebel объединяет передовые европейские технологии и многовековые традиции ручной обработки дерева.'}
            </p>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '28px' }}>
              {lang === 'uz'
                ? 'Biz har bir daraxt tanasini alohida saralaymiz. Eman, Amerika yongʻogʻi, Rim travertini va tabiiy baxmallar usta qoʻlidan oʻtgach, xonadoningizga nafis hashamat va iliqlik bagʻishlaydi.'
                : 'Каждый элемент — от скрытых соединений каркаса до финального стежка обивки — проходит строгий контроль и несет тепло рук наших мастеров.'}
            </p>

            {/* Quote Box */}
            <div
              style={{
                borderLeft: '3px solid var(--accent)',
                paddingLeft: '20px',
                fontStyle: 'italic',
                color: 'var(--text-primary)',
                fontSize: '1.02rem',
                lineHeight: 1.6,
                backgroundColor: 'var(--bg-secondary)',
                padding: '16px 20px',
                borderRadius: '0 var(--r-md) var(--r-md) 0'
              }}
            >
              “Haqiqiy sifat — bu hech kim qaramayotgan paytda ham ishni eng yuqori darajada bajarishdir.”
              <div style={{ fontStyle: 'normal', fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent)', marginTop: '8px' }}>
                — Grand Mebel Bosh Konstruktori
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3. The 5-Step Process ─── */}
        <div style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
            <div className="section-tag">
              <Cpu size={14} />
              <span>{lang === 'uz' ? 'Texnologik Zanjir' : 'Производственный процесс'}</span>
            </div>
            <h2 className="section-title">
              {lang === 'uz' ? 'Mukammallikka Olib Boruvchi 5 Bosqich' : '5 Шагов к Безупречной Мебели'}
            </h2>
            <p className="section-subtitle">
              {lang === 'uz'
                ? 'Har bir buyurtma lazer oʻlchovdan boshlab xonadoningizga oʻrnatilguncha qatʼiy xalqaro standartlar asosida amalga oshiriladi.'
                : 'От лазерного сканирования помещения до финальной сборки в белых перчатках.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
            }}
          >
            {steps.map((st, i) => {
              const IconComponent = st.icon;
              return (
                <div
                  key={i}
                  className="luxury-card card-hover-lift animate-fade-in-up"
                  style={{
                    padding: '32px 24px',
                    position: 'relative',
                    animationDelay: `${i * 0.08}s`,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <span
                        style={{
                          fontSize: '1.8rem',
                          fontWeight: 700,
                          color: 'var(--accent)',
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        {st.step}
                      </span>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--accent-subtle)',
                          color: 'var(--accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconComponent size={20} />
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.18rem', marginBottom: '12px', fontWeight: 600 }}>
                      {st.title[lang] || st.title.uz}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {st.desc[lang] || st.desc.uz}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── 4. Pillars of Excellence ─── */}
        <div style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
            <div className="section-tag">
              <Award size={14} />
              <span>{lang === 'uz' ? 'Bizning Qadriyatlarimiz' : 'Наши ценности'}</span>
            </div>
            <h2 className="section-title">
              {lang === 'uz' ? 'Nega 4 500 dan Ortiq Oila Bizni Tanlaydi?' : 'Почему Нам Доверяют Тысячи Семей?'}
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {pillars.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={idx}
                  className="luxury-card card-hover-lift animate-fade-in-up"
                  style={{
                    padding: '36px 28px',
                    backgroundColor: 'var(--surface)',
                    animationDelay: `${idx * 0.08}s`,
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--r-md)',
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <IconComp size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', fontWeight: 600 }}>
                    {p.title[lang] || p.title.uz}
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    {p.desc[lang] || p.desc.uz}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── 5. Milestones & Timeline ─── */}
        <div style={{ marginBottom: '100px' }}>
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
            <div className="section-tag">
              <Calendar size={14} />
              <span>{lang === 'uz' ? '12 Yillik Yoʻl' : 'Хроника Развития'}</span>
            </div>
            <h2 className="section-title">
              {lang === 'uz' ? 'Rivojlanishning Asosiy Bosqichlari' : 'Главные Вехи Истории Grand Mebel'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '840px', margin: '0 auto' }}>
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="luxury-card card-hover-lift animate-fade-in-up"
                style={{
                  display: 'flex',
                  gap: '24px',
                  padding: '24px 28px',
                  alignItems: 'flex-start',
                  backgroundColor: 'var(--surface)',
                  animationDelay: `${idx * 0.06}s`,
                }}
              >
                <div
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-display)',
                    minWidth: '90px',
                    lineHeight: 1,
                    paddingTop: '4px'
                  }}
                >
                  {m.year}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '6px' }}>
                    {m.title[lang] || m.title.uz}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {m.desc[lang] || m.desc.uz}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 6. Global Standards & Hardware Partners ─── */}
        <div 
          className="luxury-card"
          style={{
            padding: '48px 36px',
            marginBottom: '80px',
            backgroundColor: 'var(--bg-secondary)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '8px', fontFamily: 'var(--font-display)' }}>
              {lang === 'uz' ? 'Xalqaro Sertifikatlangan Hamkorlarimiz' : 'Европейские поставщики комплектующих'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {lang === 'uz'
                ? 'Biz mebellarimiz uzoq oʻn yillar xizmat qilishi uchun faqat Yevropaning eng ishonchli brendlari bilan toʻgʻridan-toʻgʻri ishlaymiz.'
                : 'Прямые поставки от ведущих брендов Австрии, Германии и Италии.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            {partners.map((pt, i) => (
              <div
                key={i}
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--surface)',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--border)',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--accent)', marginBottom: '6px' }}>
                  {pt.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {pt.desc[lang] || pt.desc.uz}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 7. CTA & Showroom Invitation ─── */}
        <div
          className="luxury-card card-hover-lift"
          style={{
            padding: '56px 36px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg-secondary) 100%)',
            border: '1px solid var(--accent)',
            borderRadius: 'var(--r-xl)',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-subtle)',
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <HeartHandshake size={28} />
          </div>

          <h2 style={{ fontSize: '2.2rem', marginBottom: '14px', fontFamily: 'var(--font-display)' }}>
            {lang === 'uz' ? 'Showroomimizga Qahva Ichishga Taklif Qilamiz' : 'Приглашаем на Чашечку Кофе в Наш Шоурум'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 32px', fontSize: '1.08rem', lineHeight: 1.65 }}>
            {lang === 'uz'
              ? 'Toshkent sh., Navoiy koʻchasidagi 3 qavatli flagman salonimizga tashrif buyuring. Tabiiy materiallar va baxmal namunalarini oʻz qoʻlingiz bilan his qiling va dizaynerlarimiz bilan bepul konsultatsiya oling.'
              : 'Посетите наш флагманский шоурум на ул. Навои. Оцените текстуры итальянских тканей, массива дерева и натурального мрамора вживую.'}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/custom-order" className="btn btn-primary btn-lg">
              <Ruler size={18} />
              <span>{lang === 'uz' ? 'Maxsus Oʻlchamda Buyurtma' : 'Индивидуальный заказ'}</span>
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">
              <MapPin size={18} />
              <span>{lang === 'uz' ? 'Showroom Manzili & Aloqa' : 'Адрес и контакты'}</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
