import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("descubraFloripa");
    return user ? JSON.parse(user) : null;
  });

  async function signIn({ email, password }) {
    try {
      const response = await api("/auth/login", {
        method: "POST",
        data: { email, senha: password },
      });

      if (response && response.data) {
        const { token } = response.data;
        localStorage.setItem("token", token);
      }
      const data = response.data;

      if (data.user) {
        setUser(data.user);
        localStorage.setItem("descubraFloripa", JSON.stringify(data.user));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error during sign in:", error);
      return false;
    }
  }
  async function signOut() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Nenhum token encontrado");
        return;
      }

      const response = await api("/auth/logout", {
        method: "POST",
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("descubraFloripa");
        localStorage.removeItem("token");
        setUser(null);
      } else {
        console.error("Falha ao deslogar", response);
      }
    } catch (error) {
      console.error("Erro ao tentar deslogar:", error);
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
