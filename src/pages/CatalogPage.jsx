import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import { CATEGORIES } from '../data/products';
import { ProductCard } from '../components/catalog/ProductCard';
import { QuickViewModal } from '../components/catalog/QuickViewModal';
import { Search, SlidersHorizontal, ArrowUpDown, RotateCcw, PackageSearch, Check } from 'lucide-react';

export const CatalogPage = () => {
  const { lang, t } = useLanguage();
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search, filter, and sorting states
  const categoryParam = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [maxPrice, setMaxPrice] = useState(55000000);
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync category state with URL search param
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const materialsList = [
    { id: 'all', label: { uz: 'Barcha materiallar', ru: 'Все материалы', en: 'All Materials' } },
    { id: 'velvet', label: { uz: 'Italiya Baxmali', ru: 'Итальянский бархат', en: 'Italian Velvet' } },
    { id: 'leather', label: { uz: 'Tabiiy Charm', ru: 'Натуральная кожа', en: 'Leather' } },
    { id: 'wood', label: { uz: 'Eman va Yongʻoq', ru: 'Массив дуба и ореха', en: 'Solid Oak & Walnut' } },
    { id: 'marble', label: { uz: 'Marmar va Travertin', ru: 'Мрамор и травертин', en: 'Marble & Travertine' } },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all') {
        if (product.category !== selectedCategory && product.room !== selectedCategory) {
          return false;
        }
      }

      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      // Max price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Material filter
      if (selectedMaterial !== 'all') {
        const matString = product.materials.join(' ').toLowerCase();
        if (selectedMaterial === 'velvet' && !matString.includes('baxmal') && !matString.includes('velvet')) return false;
        if (selectedMaterial === 'leather' && !matString.includes('teri') && !matString.includes('charm') && !matString.includes('leather')) return false;
        if (selectedMaterial === 'wood' && !matString.includes('yogʻoch') && !matString.includes('eman') && !matString.includes('dub') && !matString.includes('wood')) return false;
        if (selectedMaterial === 'marble' && !matString.includes('marmar') && !matString.includes('travertin') && !matString.includes('marble')) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const title = (product.name[lang] || product.name.uz).toLowerCase();
        const desc = (product.description[lang] || product.description.uz).toLowerCase();
        const mats = product.materials.join(' ').toLowerCase();
        if (!title.includes(query) && !desc.includes(query) && !mats.includes(query)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceAsc') return a.price - b.price;
      if (sortBy === 'priceDesc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [products, selectedCategory, inStockOnly, maxPrice, selectedMaterial, searchQuery, sortBy, lang]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setInStockOnly(false);
    setMaxPrice(55000000);
    setSelectedMaterial('all');
    setSortBy('recommended');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const formatPrice = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  return (
    <div style={{ padding: '40px 0 80px', backgroundColor: 'var(--bg-primary)', minHeight: '80vh' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ marginBottom: '36px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{t.catalog.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Filter Bar: Search, Category Chips, Sort */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
          }}
        >
          {/* Search Box */}
          <div
            style={{
              position: 'relative',
              flex: '1 1 320px',
              maxWidth: '480px',
            }}
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.catalog.searchPlaceholder}
              className="form-input"
              style={{ paddingLeft: '44px', borderRadius: 'var(--radius-full)' }}
            />
            <Search
              size={18}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>

          {/* Right controls: Mobile Filter Toggle & Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <SlidersHorizontal size={15} color="var(--accent-gold)" />
              <span>{lang === 'uz' ? 'Filtrlar' : lang === 'ru' ? 'Фильтры' : 'Filters'}</span>
            </button>

            {/* Sort Selector */}
            <div style={{ position: 'relative', minWidth: '180px' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.88rem',
                }}
              >
                <option value="recommended">{t.catalog.sortDefault}</option>
                <option value="priceAsc">{t.catalog.sortPriceAsc}</option>
                <option value="priceDesc">{t.catalog.sortPriceDesc}</option>
                <option value="rating">{t.catalog.sortRating}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '16px',
            marginBottom: '28px',
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: selectedCategory === cat.id ? 600 : 500,
                backgroundColor: selectedCategory === cat.id ? 'var(--accent-gold)' : 'var(--surface)',
                color: selectedCategory === cat.id ? '#0d0f12' : 'var(--text-secondary)',
                border: `1px solid ${selectedCategory === cat.id ? 'var(--accent-gold)' : 'var(--border-light)'}`,
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)',
              }}
            >
              {cat.name[lang] || cat.name.uz}
            </button>
          ))}
        </div>

        {/* Collapsible Detailed Filter Drawer / Box */}
        {showMobileFilters && (
          <div
            className="luxury-card animate-fade-in"
            style={{
              padding: '24px',
              marginBottom: '32px',
              backgroundColor: 'var(--surface)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '24px',
                alignItems: 'flex-start',
              }}
            >
              {/* Max Price Slider */}
              <div>
                <label className="form-label">
                  {t.catalog.priceRange}: <strong>{formatPrice(maxPrice)}</strong>
                </label>
                <input
                  type="range"
                  min="4000000"
                  max="55000000"
                  step="1000000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>4 mln</span>
                  <span>55 mln soʻm</span>
                </div>
              </div>

              {/* Material Filter */}
              <div>
                <label className="form-label">{t.catalog.materials}</label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="form-select"
                >
                  {materialsList.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label[lang] || m.label.uz}
                    </option>
                  ))}
                </select>
              </div>

              {/* In Stock Checkbox & Reset */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)' }}
                  />
                  <span>{t.catalog.inStockOnly}</span>
                </label>

                <button
                  onClick={handleResetFilters}
                  className="btn btn-outline btn-sm"
                  style={{ alignSelf: 'flex-start' }}
                >
                  <RotateCcw size={14} />
                  <span>{t.catalog.resetFilters}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {lang === 'uz' ? `Jami topildi: ${filteredProducts.length} ta mebel` : lang === 'ru' ? `Найдено: ${filteredProducts.length} моделей` : `Found: ${filteredProducts.length} pieces`}
          </span>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(idx * 0.05, 0.35)}s` }}
              >
                <ProductCard
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 24px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
            }}
          >
            <PackageSearch size={48} color="var(--accent-gold)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
              {t.catalog.noProductsFound}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {lang === 'uz' ? 'Qidiruv soʻzini oʻzgartirib koʻring yoki filtrlarni tozalang.' : 'Попробуйте изменить параметры поиска или сбросить фильтры.'}
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary">
              <RotateCcw size={16} />
              <span>{t.catalog.resetFilters}</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
