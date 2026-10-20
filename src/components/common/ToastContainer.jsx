import React from 'react';
import { useTelegram } from '../../context/TelegramContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useTelegram();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className={`toast toast-${toast.type || 'info'}`}
        >
          <div style={{ flexShrink: 0 }}>
            {toast.type === 'success' && <CheckCircle2 size={20} color="var(--success)" />}
            {toast.type === 'error' && <AlertCircle size={20} color="var(--danger)" />}
            {toast.type === 'info' && <Info size={20} color="var(--accent-gold)" />}
          </div>
          <div style={{ flex: 1, fontSize: '0.88rem', fontWeight: 500, lineHeight: 1.4 }}>
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2px',
              borderRadius: '4px',
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
