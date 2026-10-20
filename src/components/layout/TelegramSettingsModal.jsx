import React, { useState } from 'react';
import { useTelegram } from '../../context/TelegramContext';
import { useLanguage } from '../../context/LanguageContext';
import { Send, X, Key, MessageSquare, Check, HelpCircle, AlertCircle, Shield } from 'lucide-react';

export const TelegramSettingsModal = () => {
  const { 
    botToken, 
    setBotToken, 
    chatId, 
    setChatId, 
    isModalOpen, 
    closeSettingsModal, 
    testBot, 
    addToast 
  } = useTelegram();
  const { t } = useLanguage();

  const [tempToken, setTempToken] = useState(botToken || '8690944939:AAFAoy4ubx52L3BK5xM0p2IBSnBlwUd3qSY');
  const [tempChatId, setTempChatId] = useState(chatId || '5389465132');
  const [isTesting, setIsTesting] = useState(false);

  if (!isModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setBotToken(tempToken);
    setChatId(tempChatId);
    addToast('Telegram bot sozlamalari muvaffaqiyatli saqlandi!', 'success');
    closeSettingsModal();
  };

  const handleTestPing = async () => {
    setIsTesting(true);
    // temporary apply for test
    setBotToken(tempToken);
    setChatId(tempChatId);
    await testBot();
    setIsTesting(false);
  };

  const handleSetDemoCredentials = () => {
    // Fill demo placeholder for quick test
    setTempToken('7123456789:AAHxyzFakeTokenExampleForGrandMebel99');
    setTempChatId('123456789');
    addToast('Demo bot parametrlari toʻldirildi. Saqlash tugmasini bosing!', 'info');
  };

  return (
    <div className="modal-overlay" onClick={closeSettingsModal}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '32px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#24A1DE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}
            >
              <Send size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                {t.telegramModal.title}
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Telegram Bot API 2026
              </span>
            </div>
          </div>
          <button 
            onClick={closeSettingsModal}
            style={{ 
              color: 'var(--text-muted)', 
              padding: '6px', 
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
          {t.telegramModal.desc}
        </p>

        {/* Status banner */}
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: tempToken && tempChatId ? 'var(--success-bg)' : 'var(--accent-gold-light)',
            border: `1px solid ${tempToken && tempChatId ? 'var(--success)' : 'var(--accent-gold)'}`,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            fontSize: '0.85rem',
          }}
        >
          <Shield size={18} color={tempToken && tempChatId ? 'var(--success)' : 'var(--accent-gold)'} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>
              {tempToken && tempChatId ? 'Bot Sozlangan' : 'Simulyatsiya / Demo Rejimi'}
            </strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
              {tempToken && tempChatId ? t.telegramModal.liveStatus : t.telegramModal.demoNotice}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Key size={15} color="var(--accent-gold)" />
              {t.telegramModal.botToken}
            </label>
            <input
              type="text"
              className="form-input"
              placeholder={t.telegramModal.botTokenPlaceholder}
              value={tempToken}
              onChange={(e) => setTempToken(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={15} color="var(--accent-gold)" />
              {t.telegramModal.chatId}
            </label>
            <input
              type="text"
              className="form-input"
              placeholder={t.telegramModal.chatIdPlaceholder}
              value={tempChatId}
              onChange={(e) => setTempChatId(e.target.value)}
            />
          </div>

          {/* Quick instructions box */}
          <div
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              marginBottom: '24px',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px', color: 'var(--text-primary)', fontWeight: 600 }}>
              <HelpCircle size={15} color="var(--accent-gold)" />
              <span>Qanday olinadi? (Yoʻriqnoma)</span>
            </div>
            <p>{t.telegramModal.instruction}</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleTestPing}
                disabled={isTesting}
                className="btn btn-secondary btn-sm"
              >
                <Send size={14} />
                <span>{isTesting ? t.telegramModal.testing : t.telegramModal.testBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleSetDemoCredentials}
                className="btn btn-outline btn-sm"
              >
                Demo toʻldirish
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={closeSettingsModal}
                className="btn btn-outline btn-sm"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-sm"
              >
                <Check size={16} />
                <span>{t.telegramModal.saveBtn}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
