import React, { useState } from 'react';
import { useTelegram } from '../../context/TelegramContext';
import { Send, Key, MessageSquare, Check, Shield, HelpCircle, Zap, RefreshCw } from 'lucide-react';

export const TelegramBotView = () => {
  const { botToken, setBotToken, chatId, setChatId, testBot, addToast } = useTelegram();

  const [tempToken, setTempToken] = useState(botToken || '8690944939:AAFAoy4ubx52L3BK5xM0p2IBSnBlwUd3qSY');
  const [tempChatId, setTempChatId] = useState(chatId || '5389465132');
  const [isTesting, setIsTesting] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setBotToken(tempToken);
    setChatId(tempChatId);
    addToast('Telegram Bot sozlamalari muvaffaqiyatli saqlandi!', 'success');
  };

  const handleTestPing = async () => {
    setIsTesting(true);
    setBotToken(tempToken);
    setChatId(tempChatId);
    await testBot();
    setIsTesting(false);
  };

  const handleSetDemoCredentials = () => {
    setTempToken('7123456789:AAHxyzFakeTokenExampleForGrandMebel99');
    setTempChatId('123456789');
    addToast('Demo bot parametrlari toʻldirildi. Saqlash tugmasini bosing!', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
      <div>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Telegram Bot API Boshqaruvi</h2>
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
          Saytdan barcha buyurtmalar, toʻlov hisobotlari va soʻrovlarni Telegram orqali qabul qilish
        </p>
      </div>

      {/* Integration Status Card */}
      <div
        className="luxury-card"
        style={{
          padding: '24px',
          backgroundColor: tempToken && tempChatId ? 'var(--success-bg)' : 'var(--accent-gold-light)',
          border: `1px solid ${tempToken && tempChatId ? 'var(--success)' : 'var(--accent-gold)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: tempToken && tempChatId ? 'var(--success)' : 'var(--accent-gold)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Zap size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>
            {tempToken && tempChatId ? 'Telegram Bot Faol Ulangan' : 'Simulyatsiya / Demo Rejimi'}
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0 }}>
            {tempToken && tempChatId
              ? 'Xabarlar toʻgʻridan-toʻgʻri https://api.telegram.org/bot<TOKEN>/sendMessage orqali yuborilmoqda.'
              : 'Oʻz botingiz tokeni kiritilmaguncha, barcha buyurtmalar va soʻrovlar vizual demo rejimida xavfsiz qabul qilinadi.'}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="luxury-card" style={{ padding: '32px' }}>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Key size={15} color="var(--accent-gold)" />
              <span>Bot API Token (@BotFather bergan token)</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Masalan: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ..."
              value={tempToken}
              onChange={(e) => setTempToken(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MessageSquare size={15} color="var(--accent-gold)" />
              <span>Chat ID yoki Kanal ID (Xabarlar boradigan joy)</span>
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="Masalan: 987654321 yoki @kanalingiz"
              value={tempChatId}
              onChange={(e) => setTempChatId(e.target.value)}
            />
          </div>

          {/* Quick instructions box */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
              marginBottom: '24px',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 600 }}>
              <HelpCircle size={16} color="var(--accent-gold)" />
              <span>Bot yaratish va Chat ID ni bilish yoʻriqnomasi:</span>
            </div>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>Telegramda <strong>@BotFather</strong> ga kiring va <code>/newbot</code> buyrugʻini yuboring.</li>
              <li>Botga nom bering va berilgan uzun API tokenni yuqoridagi <strong>Bot API Token</strong> katagiga qoʻying.</li>
              <li>Oʻz Chat ID ingizni bilish uchun <strong>@userinfobot</strong> ga <code>/start</code> bosing va ID raqamni <strong>Chat ID</strong> katagiga yozing.</li>
              <li>Quyidagi <strong>"Test Xabari Yuborish"</strong> tugmasini bosib tekshirib koʻring!</li>
            </ol>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={handleTestPing}
                disabled={isTesting}
                className="btn btn-secondary"
              >
                <Send size={15} />
                <span>{isTesting ? 'Yuborilmoqda...' : 'Test Xabari Yuborish (Ping)'}</span>
              </button>

              <button
                type="button"
                onClick={handleSetDemoCredentials}
                className="btn btn-outline"
              >
                Demo toʻldirish
              </button>
            </div>

            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>Sozlamalarni Saqlash</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
