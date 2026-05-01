import { useState, useEffect } from 'react';
import { logoutUser, getMe } from '../api/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await getMe();
        const userData = res.data?.user || res.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (err) {
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error", error);
    } finally {
      localStorage.clear();
      setUser(null);
      window.location.href = '/login';
    }
  };

  return { user, loading, login, logout };
};