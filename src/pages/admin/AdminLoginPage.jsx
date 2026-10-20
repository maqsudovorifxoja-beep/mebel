import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTelegram } from '../../context/TelegramContext';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Store, 
  Sun, 
  Moon,
  AlertCircle
} from 'lucide-react';

export const AdminLoginPage = () => {
  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { addToast } = useTelegram();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('Iltimos, login va parolni kiriting');
      return;
    }

    setIsLoading(true);
    const res = login(username, password);
    setIsLoading(false);

    if (res.success) {
      addToast('Boshqaruv paneliga xush kelibsiz!', 'success');
    } else {
      setErrorMsg(res.error || 'Login yoki parol notoʻgʻri');
      addToast(res.error || 'Login yoki parol notoʻgʻri', 'error');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-gold-glow) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top right buttons (Theme toggle & Store link) */}
      <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '10px' }}>
        <button
          onClick={toggleTheme}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            background: 'var(--surface)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Theme Toggle"
        >
          {isDark ? <Sun size={18} color="#d4af37" /> : <Moon size={18} />}
        </button>

        <Link
          to="/"
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Store size={15} color="var(--accent-gold)" />
          <span>Saytga Qaytish</span>
        </Link>
      </div>

      {/* Login Card */}
      <div
        className="luxury-card animate-fade-in"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '40px 32px',
          position: 'relative',
          zIndex: 2,
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--accent-gold), #8f6d14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0d0f12',
              fontWeight: 800,
              fontSize: '1.6rem',
              fontFamily: 'var(--font-serif)',
              margin: '0 auto 16px',
              boxShadow: 'var(--shadow-gold)',
            }}
          >
            G
          </div>
          <h1 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '6px' }}>
            GRAND MEBEL
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Boshqaruv Paneliga Kirish
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--danger-bg)',
              border: '1px solid var(--danger)',
              color: 'var(--danger)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Login Input */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={15} color="var(--accent-gold)" />
              <span>Login</span>
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              autoFocus
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={15} color="var(--accent-gold)" />
              <span>Parol</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Parolingizni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ paddingRight: '42px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', gap: '10px' }}
          >
            <ShieldCheck size={18} />
            <span>{isLoading ? 'Tekshirilmoqda...' : 'Tizimga Kirish'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
