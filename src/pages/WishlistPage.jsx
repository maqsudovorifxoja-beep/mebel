import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/catalog/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage = () => {
  const { t } = useLanguage();
  const { wishlistProducts } = useWishlist();

  return (
    <div style={{ padding: '40px 0 80px', backgroundColor: 'var(--bg-primary)', minHeight: '80vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '32px' }}>{t.wishlist.title}</h1>

        {wishlistProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              maxWidth: '600px',
              margin: '40px auto 0',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'var(--text-muted)',
              }}
            >
              <Heart size={32} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
              {t.wishlist.empty}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {t.wishlist.emptyDesc}
            </p>
            <Link to="/catalog" className="btn btn-primary">
              <span>{t.cart.goToCatalog}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
