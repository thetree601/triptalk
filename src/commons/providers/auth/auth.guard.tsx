'use client';

import { useEffect, useState } from 'react';

interface AuthUser {
  _id?: string;
  name?: string;
  profileImage?: string;
}

export function useAuthGuard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const refreshFromStorage = () => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('accessToken');
    const userRaw = localStorage.getItem('user');
    setIsAuthenticated(!!token);
    try {
      setUser(userRaw ? (JSON.parse(userRaw) as AuthUser) : null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshFromStorage();

    const onStorage = () => refreshFromStorage();
    const onAuthChanged = () => refreshFromStorage();
    const onFocus = () => refreshFromStorage();
    const onVisibility = () => refreshFromStorage();

    window.addEventListener('storage', onStorage);
    window.addEventListener('auth:changed', onAuthChanged as EventListener);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('auth:changed', onAuthChanged as EventListener);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const login = () => {};

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      // notify listeners in same tab
      window.dispatchEvent(new Event('auth:changed'));
    }
  };

  const checkPermission = () => true;

  return {
    isAuthenticated,
    user,
    login,
    logout,
    checkPermission,
  };
}
