import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useProducts } from '../../context/ProductContext';
import { ProductCard } from '../catalog/ProductCard';
import { QuickViewModal } from '../catalog/QuickViewModal';
import { ArrowRight } from 'lucide-react';

export const FeaturedProducts = () => {
  const { lang, t } = useLanguage();
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filterProducts = () => {
    if (activeTab === 'bestseller') return products.filter((p) => p.badge === 'bestseller');
    if (activeTab === 'new') return products.filter((p) => p.badge === 'new');
    if (activeTab === 'sofa') return products.filter((p) => p.category === 'sofa');
    return products.slice(0, 8);
  };

  const displayedProducts = filterProducts();

  const tabs = [
    { id: 'all', label: { uz: 'Barcha tanlanganlar', ru: 'Все новинки', en: 'All Featured' } },
    { id: 'bestseller', label: { uz: 'Xaridbop', ru: 'Хиты продаж', en: 'Bestsellers' } },
    { id: 'new', label: { uz: 'Yangi 2026', ru: 'Новинки 2026', en: 'New 2026' } },
    { id: 'sofa', label: { uz: 'Divanlar', ru: 'Диваны', en: 'Sofas' } },
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span>{lang === 'uz' ? 'Tanlangan Kolleksiya' : lang === 'ru' ? 'Избранное' : 'Curated Selection'}</span>
          </div>
          <h2 className="section-title">
            {lang === 'uz'
              ? 'Nafis Dizayn, Yoqimli Qulaylik'
              : lang === 'ru'
              ? 'Безупречный Дизайн и Уют'
              : 'Enduring Aesthetics & Comfort'}
          </h2>
          <p className="section-subtitle">
            {lang === 'uz'
              ? 'Sara materiallardan qoʻlda sayqallangan premium mebellar'
              : lang === 'ru'
              ? 'Мебель, созданная руками наших мастеров'
              : 'Bench-made by master woodworkers using hand-selected timbers'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <div style={tabWrapStyle}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--r-full)',
                  fontSize: '0.84rem',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  backgroundColor: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                  color: activeTab === tab.id ? '#0e100f' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label[lang] || tab.label.uz}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '48px',
          }}
        >
          {displayedProducts.map((product, idx) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.07}s` }}
            >
              <ProductCard
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/catalog" className="btn btn-outline btn-lg">
            <span>{t.hero.exploreCatalog}</span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};

const tabWrapStyle = {
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: '6px',
  padding: '4px',
  borderRadius: 'var(--r-full)',
  backgroundColor: 'var(--surface)',
  border: '1px solid var(--border)',
};
