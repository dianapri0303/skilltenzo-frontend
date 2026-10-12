"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../lib/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadSession = useCallback(async () => {
    const { data } = await api.get("/auth/refresh/session");

    localStorage.setItem("token", data.token);
    setUser({ name: data.name, avatarUrl: data.avatarUrl });
    setCartCount(data.cartCount);
  }, []);

  useEffect(() => {
    let ignore = false;

    async function restoreSession() {
      try {
        if (localStorage.getItem("token")) {
          await loadSession();
        }
      } catch {
        localStorage.removeItem("token");

        if (!ignore) {
          setUser(null);
          setCartCount(0);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      ignore = true;
    };
  }, [loadSession]);

  const register = useCallback(async (credentials) => {
    const { data } = await api.post("/auth/register", credentials);

    localStorage.setItem("token", data.token);
    setUser(data.user);
    setCartCount(0);
  }, []);

  const login = useCallback(
    async (credentials) => {
      const { data } = await api.post("/auth/login", credentials);

      localStorage.setItem("token", data.token);
      setUser(data.user);

      await loadSession();
    },
    [loadSession],
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setCartCount(0);
    }
  }, []);

  const value = {
    user,
    cartCount,
    setCartCount,
    isLoading,
    isLoggedIn: Boolean(user),
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
