import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// Tipo do usuário
interface User {
  email: string;
  password: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TEST_USER: User = {
  email: "avaliador@teste.com",
  password: "123456",
  name: "Avaliador",
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  function login(email: string, password: string): boolean {
    if (email === TEST_USER.email && password === TEST_USER.password) {
      localStorage.setItem("user", JSON.stringify(TEST_USER));
      setUser(TEST_USER);
      return true;
    }
    return false;
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
