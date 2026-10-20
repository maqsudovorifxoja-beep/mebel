import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Shield, Cpu, Compass } from 'lucide-react';

export const CraftsmanshipSpotlight = () => {
  const { lang } = useLanguage();

  const materials = [
    {
      title: { uz: 'Tabiiy Yevropa Emoni va Yongʻogʻi', ru: 'Массив Европейского Дуба и Ореха', en: 'Solid European Oak & Walnut' },
      desc: {
        uz: 'FSC sertifikatlangan, maxsus quritish kameralarida 8-10% namlik darajasiga keltirilgan mustahkam daraxt massivi.',
        ru: 'Сертифицированная древесина камерной сушки с влажностью 8-10%, не деформирующаяся со временем.',
        en: 'Kiln-dried to 8-10% moisture content, preventing warping and cracking for lifetimes of use.'
      },
      image: 'https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&w=600&q=80',
      icon: Shield,
    },
    {
      title: { uz: 'Italiya Baxmali va Tabiiy Charm', ru: 'Итальянский Бархат и Наппа', en: 'Italian Bouclé, Velvet & Nappa' },
      desc: {
        uz: 'Martindale testi boʻyicha 100 000+ ishqalanishga bardoshli, suv va kirlardan himoyalangan EasyClean qatlami.',
        ru: '100 000+ циклов истирания по Мартиндейлу, с водоотталкивающим нанопокрытием EasyClean.',
        en: 'Rated for 100,000+ Martindale rubs with EasyClean stain and liquid resistant barriers.'
      },
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      icon: Sparkles,
    },
    {
      title: { uz: 'Rim Travertini & Calacatta Marmari', ru: 'Римский Травертин и Мрамор', en: 'Roman Travertine & Calacatta Marble' },
      desc: {
        uz: 'Italiyaning Karara konlaridan keltirilgan, tabiiy polirovka qilingan va dogʻ qoldirmaydigan himoyalangan plitalar.',
        ru: 'Натуральный камень из итальянских карьеров Каррары с защитой от пищевых красителей и масел.',
        en: 'Quarried in Italy with oleophobic and stain-resistant sealant for effortless upkeep.'
      },
      image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=600&q=80',
      icon: Compass,
    },
    {
      title: { uz: 'Avstriya Blum & Hettich Mexanizmlari', ru: 'Фурнитура Blum и Hettich', en: 'Austrian Blum & Hettich Hardware' },
      desc: {
        uz: 'Yumshoq pnevmatik yopilish tizimi (soft-close), 100 000 marta silliq harakatlanish kafolati.',
        ru: 'Плавные доводчики и скрытые направляющие, рассчитанные на 25+ лет безупречной службы.',
        en: 'Synchronized soft-close runners engineered for 100,000+ effortless open-close movements.'
      },
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      icon: Cpu,
    },
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>{lang === 'uz' ? 'Hunarmandchilik & Sifat' : lang === 'ru' ? 'Качество и Материалы' : 'Artisanal Materials'}</span>
          </div>
          <h2 className="section-title">
            {lang === 'uz'
              ? 'Nega Bizning Mebellarimiz Avloddan-Avlodga Oʻtadi?'
              : lang === 'ru'
              ? 'Почему Наша Мебель Служит Десятилетиями?'
              : 'Built to Transcend Trends and Generations'}
          </h2>
          <p className="section-subtitle">
            {lang === 'uz'
              ? 'Biz hech qachon arzon komponentlar bilan murosaga bormaymiz. Faqat oliy toifali xomashyo va jahon yetakchilari furniturasi.'
              : lang === 'ru'
              ? 'Мы не идем на компромиссы. Только отборный массив, премиальный текстиль и лучшая европейская инженерия.'
              : 'No shortcuts, no synthetics where solid wood belongs. Pure materials crafted with uncompromising architectural integrity.'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {materials.map((mat, i) => {
            const IconComponent = mat.icon;
            return (
              <div
                key={i}
                className="luxury-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img
                    src={mat.image}
                    alt={mat.title[lang] || mat.title.uz}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--accent-gold-light)',
                      color: 'var(--accent-gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <IconComponent size={20} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>
                    {mat.title[lang] || mat.title.uz}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {mat.desc[lang] || mat.desc.uz}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
