import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTelegram } from '../context/TelegramContext';
import { useOrders } from '../context/OrderContext';
import { 
  Ruler,
  Send, 
  CheckCircle2, 
  Sparkles, 
  Calculator, 
  Layers, 
  FileText, 
  User, 
  Phone, 
  MapPin,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  X
} from 'lucide-react';

export const CustomOrderPage = () => {
  const { lang, t } = useLanguage();
  const { submitCustomInquiry, addToast } = useTelegram();
  const { addCustomInquiry } = useOrders();

  const [furnitureType, setFurnitureType] = useState('kitchen');
  const [length, setLength] = useState('280');
  const [depth, setDepth] = useState('60');
  const [height, setHeight] = useState('240');
  const [material, setMaterial] = useState('solidWood');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedQuote, setSubmittedQuote] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        addToast('Rasm hajmi 10 MB dan oshmasligi kerak', 'warning');
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const furnitureTypes = [
    { id: 'kitchen', label: t.customOrder.typeKitchen, basePrice: 28000000 },
    { id: 'wardrobe', label: t.customOrder.typeWardrobe, basePrice: 18000000 },
    { id: 'sofa', label: t.customOrder.typeSofa, basePrice: 14000000 },
    { id: 'bed', label: t.customOrder.typeBed, basePrice: 16000000 },
    { id: 'office', label: t.customOrder.typeOffice, basePrice: 15000000 },
    { id: 'other', label: t.customOrder.typeOther, basePrice: 12000000 },
  ];

  const materialOptions = [
    { id: 'solidWood', label: t.customOrder.matSolidWood, multiplier: 1.35 },
    { id: 'mdfVeneer', label: t.customOrder.matMDFVeneer, multiplier: 1.15 },
    { id: 'fenix', label: t.customOrder.matFenix, multiplier: 1.4 },
    { id: 'italianVelvet', label: t.customOrder.matItalianVelvet, multiplier: 1.25 },
  ];

  // Estimated Price formula
  const calculateEstimatedPrice = () => {
    const selectedTypeObj = furnitureTypes.find((f) => f.id === furnitureType) || furnitureTypes[0];
    const selectedMatObj = materialOptions.find((m) => m.id === material) || materialOptions[0];

    const l = Number(length) || 200;
    const d = Number(depth) || 60;
    const h = Number(height) || 100;

    // Relative volume scale based on standard
    const volumeFactor = (l * d * h) / (200 * 60 * 100);
    const estimated = Math.round(selectedTypeObj.basePrice * Math.max(0.7, volumeFactor) * selectedMatObj.multiplier);
    return estimated;
  };

  const estimatedTotal = calculateEstimatedPrice();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      addToast('Iltimos, ism va telefoningizni toʻliq kiriting', 'error');
      return;
    }

    setIsSubmitting(true);
    const chosenType = furnitureTypes.find((f) => f.id === furnitureType)?.label || furnitureType;
    const chosenMat = materialOptions.find((m) => m.id === material)?.label || material;

    const inquiryPayload = {
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
      furnitureType: chosenType,
      furnitureTypeId: furnitureType,
      length,
      depth,
      height,
      material: chosenMat,
      budget: new Intl.NumberFormat('uz-UZ').format(estimatedTotal) + " so'm",
      notes,
      photo: photoFile || photoPreview || null,
    };

    const res = await submitCustomInquiry(inquiryPayload);
    addCustomInquiry({ ...inquiryPayload, quoteId: res.quoteId });

    setIsSubmitting(false);
    setSubmittedQuote(res.quoteId || 'CST-SUCCESS');
  };

  const formatPrice = (val) => new Intl.NumberFormat('uz-UZ').format(val) + " so'm";

  return (
    <div style={{ padding: '40px 0 80px', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px' }}>
          <div className="section-tag">
            <Ruler size={14} />
            <span>{lang === 'uz' ? 'Mualliflik Loyihasi' : lang === 'ru' ? 'Индивидуальный проект' : 'Custom Atelier'}</span>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '14px' }}>{t.customOrder.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem' }}>
            {t.customOrder.subtitle}
          </p>
        </div>

        {submittedQuote ? (
          /* Confirmation Success Screen */
          <div
            className="luxury-card animate-fade-in"
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              padding: '48px 32px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--success-bg)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>
              {lang === 'uz' ? 'Buyurtmangiz Qabul Qilindi!' : lang === 'ru' ? 'Заявка Успешно Принята!' : 'Custom Inquiry Received!'}
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {t.customOrder.successNotice}
            </p>

            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '32px',
                display: 'inline-block',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ariza raqami: </span>
              <strong style={{ color: 'var(--accent-gold)', fontSize: '1.1rem' }}>#{submittedQuote}</strong>
            </div>

            <div>
              <button
                onClick={() => setSubmittedQuote(null)}
                className="btn btn-primary btn-lg"
              >
                <span>Yangi buyurtma hisoblash</span>
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Calculator Form */
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
              }}
            >
              {/* Left Column: Dimensions & Material Parameters */}
              <div className="luxury-card" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} color="var(--accent-gold)" />
                  <span>1. {t.customOrder.furnitureType}</span>
                </h3>

                {/* Furniture Types selection grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '10px',
                    marginBottom: '28px',
                  }}
                >
                  {furnitureTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFurnitureType(type.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        textAlign: 'left',
                        fontSize: '0.86rem',
                        fontWeight: furnitureType === type.id ? 600 : 400,
                        backgroundColor: furnitureType === type.id ? 'var(--accent-gold-light)' : 'var(--bg-secondary)',
                        color: furnitureType === type.id ? 'var(--accent-gold)' : 'var(--text-primary)',
                        border: `1px solid ${furnitureType === type.id ? 'var(--accent-gold)' : 'var(--border-light)'}`,
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                {/* Dimensions inputs */}
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Ruler size={18} color="var(--accent-gold)" />
                  <span>2. {t.customOrder.dimensionsHeader}</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">{t.customOrder.length}</label>
                    <input
                      type="number"
                      min="50"
                      max="1000"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">{t.customOrder.widthOrDepth}</label>
                    <input
                      type="number"
                      min="30"
                      max="400"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">{t.customOrder.height}</label>
                    <input
                      type="number"
                      min="30"
                      max="350"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Core Materials */}
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="var(--accent-gold)" />
                  <span>3. {t.customOrder.preferredMaterial}</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {materialOptions.map((mat) => (
                    <label
                      key={mat.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: material === mat.id ? 'var(--accent-gold-light)' : 'var(--bg-secondary)',
                        border: `1px solid ${material === mat.id ? 'var(--accent-gold)' : 'var(--border-light)'}`,
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: material === mat.id ? 600 : 400,
                      }}
                    >
                      <input
                        type="radio"
                        name="customMaterial"
                        checked={material === mat.id}
                        onChange={() => setMaterial(mat.id)}
                        style={{ accentColor: 'var(--accent-gold)' }}
                      />
                      <span>{mat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Right Column: Dynamic Price Estimate & Contact Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Price Estimate Card */}
                <div
                  className="luxury-card"
                  style={{
                    padding: '28px',
                    background: 'linear-gradient(135deg, var(--surface) 0%, var(--bg-secondary) 100%)',
                    border: '1px solid var(--accent-gold)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', marginBottom: '8px' }}>
                    <Calculator size={18} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {t.customOrder.budgetExpectation} (Taxminiy)
                    </span>
                  </div>

                  <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                    {formatPrice(estimatedTotal)}
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    * Aniq narx usta kelib bepul oʻlchov olganidan va yakuniy furnituralar tanlanganidan soʻng tasdiqlanadi.
                  </p>
                </div>

                {/* Customer Details Form */}
                <div className="luxury-card" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>
                    4. {lang === 'uz' ? 'Aloqa Maʼlumotlari' : 'Контактные данные'}
                  </h3>

                  <div className="form-group">
                    <label className="form-label">{t.customOrder.customerName} *</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Jamshid Karimov"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t.customOrder.customerPhone} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 90 123 45 67"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t.customOrder.customerAddress}</label>
                    <input
                      type="text"
                      placeholder="Toshkent sh., Shayxontohur tumani..."
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t.customOrder.notes}</label>
                    <textarea
                      placeholder="Masalan: Rang toʻq yongʻoq boʻlishi kerak, Blum mexanizm bilan..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="form-textarea"
                    />
                  </div>

                  {/* Photo / Sketch Attachment */}
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{lang === 'uz' ? 'Eskiz yoki xona rasmi (ixtiyoriy)' : lang === 'ru' ? 'Фото или эскиз (необязательно)' : 'Photo / Sketch (Optional)'}</span>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>JPG, PNG (max 10MB)</span>
                    </label>

                    {photoPreview ? (
                      <div
                        style={{
                          position: 'relative',
                          borderRadius: 'var(--r-md)',
                          overflow: 'hidden',
                          border: '1px solid var(--border)',
                          backgroundColor: 'var(--bg-secondary)',
                          aspectRatio: '16/9',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src={photoPreview}
                          alt="Custom furniture sketch"
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="btn-icon"
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            backgroundColor: 'rgba(0, 0, 0, 0.65)',
                            color: '#ffffff',
                            width: '32px',
                            height: '32px',
                          }}
                          title={lang === 'uz' ? "Rasmni o'chirish" : 'Удалить фото'}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          padding: '24px 16px',
                          border: '2px dashed var(--border)',
                          borderRadius: 'var(--r-md)',
                          backgroundColor: 'var(--bg-secondary)',
                          cursor: 'pointer',
                          transition: 'border-color var(--t-fast)',
                          textAlign: 'center',
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoSelect}
                          style={{ display: 'none' }}
                        />
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
                          <Upload size={18} />
                        </div>
                        <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                          {lang === 'uz' ? 'Rasm yuklash yoki suratga olish' : lang === 'ru' ? 'Загрузить фото или эскиз' : 'Upload photo or sketch'}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {lang === 'uz' ? 'Buyurtma bilan birga Telegram botga yuboriladi' : 'Будет отправлено в Telegram бот'}
                        </span>
                      </label>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-telegram btn-lg"
                    style={{ width: '100%', marginTop: '8px' }}
                  >
                    <Send size={18} />
                    <span>{isSubmitting ? t.customOrder.submitting : t.customOrder.submitBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
