"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import api from "../lib/axios";
import type { AuthResponse, SessionResponse } from "../types";

export interface AuthUser {
  _id?: string;
  name: string;
  email?: string;
  avatarUrl: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  isLoggedIn: boolean;
  register: (credentials: RegisterCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadSession = useCallback(async () => {
    const { data } = await api.get<SessionResponse>("/auth/refresh/session");

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

  const register = useCallback(async (credentials: RegisterCredentials) => {
    const { data } = await api.post<AuthResponse>(
      "/auth/register",
      credentials,
    );

    localStorage.setItem("token", data.token);
    setUser(data.user);
    setCartCount(0);
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>("/auth/login", credentials);

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

  const value: AuthContextValue = {
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

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
