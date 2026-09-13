import React, { createContext, useContext, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'keylo-auth-session';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const Context = createContext(undefined);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    try {
      // Attempt to authenticate with Java & Spring Boot backend
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      if (res.ok) {
        const data = await res.json();
        const authSession = {
          token: data.token,
          userId: data.userId,
          email: data.email,
          name: data.name || data.email.split('@')[0],
          role: data.role || 'CLIENT',
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authSession));
        setSession(authSession);
        return authSession;
      } else {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || 'Invalid email or password.');
      }
    } catch (err) {
      // If server is unreachable / network error, use local mock fallback
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        console.warn('Spring Boot API unreachable, using local fallback mode:', err);
        const usersDb = JSON.parse(localStorage.getItem('keylo-users-db') || '[]');
        const existingUser = usersDb.find((u) => u.email.toLowerCase() === email.toLowerCase());

        if (existingUser && existingUser.password !== password) {
          throw new Error('Invalid email or password.');
        }

        const authSession = {
          token: 'jwt_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
          userId: existingUser?.userId || 'usr_' + Math.random().toString(36).substring(2, 9),
          email: email.toLowerCase(),
          name: existingUser?.name || email.split('@')[0],
          role: existingUser?.role || 'CLIENT',
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authSession));
        setSession(authSession);
        return authSession;
      }
      throw err;
    }
  };

  const register = async (email, password, name) => {
    if (!email || !password) {
      throw new Error('Please provide email and password.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    try {
      // Attempt to register with Java & Spring Boot backend
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          name: name ? name.trim() : undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const authSession = {
          token: data.token,
          userId: data.userId,
          email: data.email,
          name: data.name || data.email.split('@')[0],
          role: data.role || 'CLIENT',
        };
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authSession));
        setSession(authSession);
        return authSession;
      } else {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || 'Unable to create account. Please check your details.');
      }
    } catch (err) {
      // If server is unreachable / network error, use local mock fallback
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        console.warn('Spring Boot API unreachable, using local fallback mode:', err);
        const usersDb = JSON.parse(localStorage.getItem('keylo-users-db') || '[]');
        const emailExists = usersDb.some((u) => u.email.toLowerCase() === email.toLowerCase());

        if (emailExists) {
          throw new Error('An account with this email already exists. Please sign in.');
        }

        const newUser = {
          userId: 'usr_' + Math.random().toString(36).substring(2, 9),
          email: email.toLowerCase(),
          password,
          name: name || email.split('@')[0],
          role: 'CLIENT',
          createdAt: new Date().toISOString(),
        };

        usersDb.push(newUser);
        localStorage.setItem('keylo-users-db', JSON.stringify(usersDb));

        const authSession = {
          token: 'jwt_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
          userId: newUser.userId,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        };

        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authSession));
        setSession(authSession);
        return authSession;
      }
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
  };

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session?.token),
      user: session,
      login,
      register,
      logout,
    }),
    [session]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAuth() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
