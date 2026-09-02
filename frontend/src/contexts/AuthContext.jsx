import { createContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('zakhira_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('zakhira_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.data) {
            setUser(res.data);
            localStorage.setItem('zakhira_user', JSON.stringify(res.data));
          }
        } catch (err) {
          console.error('Auth verification failed', err);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (credentials) => {
    try {
      const res = await authService.login(credentials);
      if (res.success && res.data) {
        setToken(res.data.token);
        setUser(res.data);
        localStorage.setItem('zakhira_token', res.data.token);
        localStorage.setItem('zakhira_user', JSON.stringify(res.data));
        toast.success(res.message || 'Logged in successfully!');
        return { success: true, user: res.data };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      if (res.success && res.data) {
        setToken(res.data.token);
        setUser(res.data);
        localStorage.setItem('zakhira_token', res.data.token);
        localStorage.setItem('zakhira_user', JSON.stringify(res.data));
        toast.success(res.message || 'Registered successfully!');
        return { success: true, user: res.data };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const res = await authService.updateProfile(userData);
      if (res.success && res.data) {
        setUser(res.data);
        localStorage.setItem('zakhira_user', JSON.stringify(res.data));
        toast.success('Profile updated successfully!');
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('zakhira_token');
    localStorage.removeItem('zakhira_user');
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
