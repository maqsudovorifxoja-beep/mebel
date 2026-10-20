import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useProducts } from '../../context/ProductContext';
import { ProductCard } from '../catalog/ProductCard';
import { QuickViewModal } from '../catalog/QuickViewModal';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedProducts = () => {
  const { lang, t } = useLanguage();
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filterProducts = () => {
    if (activeTab === 'bestseller') {
      return products.filter((p) => p.badge === 'bestseller');
    }
    if (activeTab === 'new') {
      return products.filter((p) => p.badge === 'new');
    }
    if (activeTab === 'sofa') {
      return products.filter((p) => p.category === 'sofa');
    }
    return products.slice(0, 8);
  };

  const displayedProducts = filterProducts();

  const tabs = [
    { id: 'all', label: { uz: 'Barcha yangilar', ru: 'Все новинки', en: 'All Featured' } },
    { id: 'bestseller', label: { uz: 'Xaridbop modellar', ru: 'Хиты продаж', en: 'Bestsellers' } },
    { id: 'new', label: { uz: '2026 Yangi kolleksiya', ru: 'Новинки 2026', en: 'New 2026' } },
    { id: 'sofa', label: { uz: 'Yumshoq divanlar', ru: 'Мягкие диваны', en: 'Luxury Sofas' } },
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>{lang === 'uz' ? 'Eksklyuziv Tanlov' : lang === 'ru' ? 'Эксклюзивная подборка' : 'Curated Selection'}</span>
          </div>
          <h2 className="section-title">
            {lang === 'uz'
              ? 'Maftunkor Dizayn & Qulaylik'
              : lang === 'ru'
              ? 'Безупречный Дизайн и Уют'
              : 'Enduring Aesthetics & Tactile Comfort'}
          </h2>
          <p className="section-subtitle">
            {lang === 'uz'
              ? 'Ustalarimiz tomonidan eng sara materiallardan qoʻlda sayqallangan premium mebellar'
              : lang === 'ru'
              ? 'Премиальная мебель, доведенная до совершенства руками наших ведущих мастеров'
              : 'Individually bench-made by master woodworkers using hand-selected European timbers'}
          </p>

          {/* Filter Tabs */}
          <div
            style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border-light)',
              marginTop: '28px',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: activeTab === tab.id ? 600 : 500,
                  backgroundColor: activeTab === tab.id ? 'var(--accent-gold)' : 'transparent',
                  color: activeTab === tab.id ? '#0d0f12' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {tab.label[lang] || tab.label.uz}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* View All button */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/catalog" className="btn btn-secondary btn-lg">
            <span>{t.hero.exploreCatalog}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};
