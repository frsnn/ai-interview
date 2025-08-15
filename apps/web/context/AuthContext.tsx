"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextValue {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // On first mount, check if a JWT is stored and still valid
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (!stored) return; // nothing to verify

    // Simply trust the stored token (will be validated on first API call)
    console.log("Found stored token, setting auth state");
        setToken(stored);
  }, []);

  const login = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
    router.push("/dashboard");
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };
  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext missing");
  return ctx;
}; 