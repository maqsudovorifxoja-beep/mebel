import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useTelegram } from '../../context/TelegramContext';
import { CATEGORIES } from '../../data/products';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Armchair, 
  Sparkles,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const ProductsView = () => {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaultProducts } = useProducts();
  const { addToast } = useTelegram();

  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const [nameUz, setNameUz] = useState('');
  const [nameRu, setNameRu] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState('sofa');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [width, setWidth] = useState('200');
  const [height, setHeight] = useState('85');
  const [depth, setDepth] = useState('90');
  const [materials, setMaterials] = useState('Tabiiy eman, Italiya baxmali');
  const [descriptionUz, setDescriptionUz] = useState('');
  const [badge, setBadge] = useState('new');
  const [inStock, setInStock] = useState(true);

  const formatPrice = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  const openAddModal = () => {
    setEditingProduct(null);
    setNameUz('');
    setNameRu('');
    setNameEn('');
    setCategory('sofa');
    setPrice('');
    setOldPrice('');
    setImageUrl('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80');
    setWidth('200');
    setHeight('85');
    setDepth('90');
    setMaterials('Tabiiy eman, Italiya baxmali');
    setDescriptionUz('Premium sifatli zamonaviy mualliflik mebeli.');
    setBadge('new');
    setInStock(true);
    setIsModalOpen(true);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setNameUz(prod.name.uz || '');
    setNameRu(prod.name.ru || '');
    setNameEn(prod.name.en || '');
    setCategory(prod.category || 'sofa');
    setPrice(prod.price || '');
    setOldPrice(prod.oldPrice || '');
    setImageUrl(prod.images[0] || '');
    setWidth(prod.dimensions?.width || '200');
    setHeight(prod.dimensions?.height || '85');
    setDepth(prod.dimensions?.depth || '90');
    setMaterials(prod.materials ? prod.materials.join(', ') : '');
    setDescriptionUz(prod.description?.uz || '');
    setBadge(prod.badge || 'new');
    setInStock(prod.inStock !== false);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!nameUz.trim() || !price) {
      addToast('Mebel nomi va narxini kiritish shart!', 'error');
      return;
    }

    const payload = {
      name: {
        uz: nameUz,
        ru: nameRu || nameUz,
        en: nameEn || nameUz,
      },
      category,
      room: category,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      images: [imageUrl || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'],
      dimensions: {
        width: Number(width) || 100,
        height: Number(height) || 80,
        depth: Number(depth) || 80,
        unit: 'sm',
      },
      materials: materials.split(',').map((m) => m.trim()).filter(Boolean),
      description: {
        uz: descriptionUz,
        ru: descriptionUz,
        en: descriptionUz,
      },
      badge,
      inStock,
      colors: [
        { name: { uz: 'Klassik', ru: 'Классик', en: 'Classic' }, hex: '#3b2f27' },
        { name: { uz: 'Qaymoqrang', ru: 'Кремовый', en: 'Ivory' }, hex: '#eeebe5' },
      ],
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      addToast(`"${nameUz}" muvaffaqiyatli yangilandi!`, 'success');
    } else {
      addProduct(payload);
      addToast(`Yangi mebel: "${nameUz}" qoʻshildi!`, 'success');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
    addToast('Mebel katalogdan oʻchirildi', 'info');
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCat !== 'all' && p.category !== selectedCat && p.room !== selectedCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const title = (p.name.uz || '').toLowerCase();
      if (!title.includes(q)) return false;
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Mebellar Katalogi Boshqaruvi</h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Mebellarni qoʻshish, tahrirlash, narxini oʻzgartirish va ombor holatini boshqarish
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={resetToDefaultProducts}
            className="btn btn-outline btn-sm"
            title="Dastlabki mebellarni qayta tiklash"
          >
            <RotateCcw size={14} />
            <span>Tiklash</span>
          </button>
          <button
            onClick={openAddModal}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={18} />
            <span>Yangi Mebel Qoʻshish</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="luxury-card"
        style={{
          padding: '16px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Mebel nomi boʻyicha qidiruv..."
            className="form-input"
            style={{ paddingLeft: '40px' }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Kategoriya:</label>
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="form-select"
            style={{ minWidth: '180px' }}
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name.uz}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="luxury-card" style={{ padding: '24px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 14px' }}>Foto</th>
              <th style={{ padding: '12px 14px' }}>Mebel Nomi</th>
              <th style={{ padding: '12px 14px' }}>Kategoriya</th>
              <th style={{ padding: '12px 14px' }}>Narxi</th>
              <th style={{ padding: '12px 14px' }}>Oʻlchamlari</th>
              <th style={{ padding: '12px 14px' }}>Holat</th>
              <th style={{ padding: '12px 14px', textAlign: 'right' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                <td style={{ padding: '12px 14px' }}>
                  <img
                    src={p.images[0]}
                    alt={p.name.uz}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      backgroundColor: 'var(--bg-secondary)',
                    }}
                  />
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name.uz}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {p.id}</div>
                </td>
                <td style={{ padding: '12px 14px', textTransform: 'capitalize' }}>
                  {p.category}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>{formatPrice(p.price)}</div>
                  {p.oldPrice && (
                    <div style={{ fontSize: '0.75rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                      {formatPrice(p.oldPrice)}
                    </div>
                  )}
                </td>
                <td style={{ padding: '12px 14px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {p.dimensions.width}x{p.dimensions.height}x{p.dimensions.depth} sm
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <button
                    onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: p.inStock ? 'var(--success-bg)' : 'var(--danger-bg)',
                      color: p.inStock ? 'var(--success)' : 'var(--danger)',
                      border: 'none',
                    }}
                  >
                    {p.inStock ? 'Omborda bor' : 'Tugagan'}
                  </button>
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => openEditModal(p)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '6px 10px' }}
                      title="Tahrirlash"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: '6px 10px', color: 'var(--danger)', borderColor: 'rgba(211,47,47,0.3)' }}
                      title="Oʻchirish"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '750px', padding: '32px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.4rem' }}>
                {editingProduct ? 'Mebelni Tahrirlash' : 'Yangi Mebel Qoʻshish'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Nomi (Oʻzbekcha) *</label>
                  <input
                    type="text"
                    required
                    value={nameUz}
                    onChange={(e) => setNameUz(e.target.value)}
                    className="form-input"
                    placeholder="Masalan: Roma Baxmal Kreslo"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Kategoriya</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name.uz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Narxi (soʻm) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="form-input"
                    placeholder="12000000"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Eski narxi (chegirma boʻlsa)</label>
                  <input
                    type="number"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                    className="form-input"
                    placeholder="15000000"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Belgi (Badge)</label>
                  <select
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="form-select"
                  >
                    <option value="new">New 2026</option>
                    <option value="bestseller">Bestseller</option>
                    <option value="premium">Atelier</option>
                    <option value="sale">Chegirma</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Rasm URL manzili</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="form-input"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Kengligi (sm)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Balandligi (sm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Chuqurligi (sm)</label>
                  <input
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Materiallar (vergul bilan)</label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  className="form-input"
                  placeholder="Tabiiy eman, Italiya baxmali, Blum furnitura"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tavsif</label>
                <textarea
                  value={descriptionUz}
                  onChange={(e) => setDescriptionUz(e.target.value)}
                  className="form-textarea"
                  style={{ minHeight: '80px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)' }}
                />
                <label htmlFor="inStockCheck" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                  Ushbu mebel omborda mavjud
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline"
                >
                  Bekor qilish
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>Saqlash</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '420px', padding: '28px', textAlign: 'center' }}
          >
            <AlertTriangle size={48} color="var(--danger)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Mebelni oʻchirishni tasdiqlaysizmi?</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Ushbu mahsulot sayt katalogidan butunlay olib tashlanadi.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="btn btn-outline"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--danger)', color: '#fff' }}
              >
                Oʻchirish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
