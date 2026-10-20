import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Stored credentials (allows changing password)
  const [credentials, setCredentials] = useState(() => {
    try {
      const saved = localStorage.getItem('gm_admin_creds');
      return saved ? JSON.parse(saved) : { username: 'admin', password: 'admin123' };
    } catch {
      return { username: 'admin', password: 'admin123' };
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('gm_admin_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('gm_admin_creds', JSON.stringify(credentials));
  }, [credentials]);

  const login = (inputUsername, inputPassword) => {
    const cleanUser = inputUsername.trim().toLowerCase();
    const targetUser = credentials.username.toLowerCase();

    if (cleanUser === targetUser && inputPassword === credentials.password) {
      setIsAuthenticated(true);
      localStorage.setItem('gm_admin_auth', 'true');
      return { success: true };
    }
    return { success: false, error: 'Login yoki parol notoʻgʻri!' };
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('gm_admin_auth');
  };

  const changePassword = (oldPass, newPass) => {
    if (oldPass !== credentials.password) {
      return { success: false, error: 'Eski parol notoʻgʻri!' };
    }
    if (!newPass || newPass.length < 4) {
      return { success: false, error: 'Yangi parol kamida 4 ta belgidan iborat boʻlishi kerak!' };
    }

    setCredentials((prev) => ({ ...prev, password: newPass }));
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        adminUser: { username: credentials.username, role: 'Bosh Administrator' },
        login,
        logout,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
