import React, { createContext, useContext, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'keylo-auth-session';
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
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }

    // Check if user registered in local mock db
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
      role: existingUser?.role || 'user',
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authSession));
    setSession(authSession);
    return authSession;
  };

  const register = async (email, password, name) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!email || !password) {
      throw new Error('Please provide email and password.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

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
      role: 'user',
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
