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
      // const response = await api(`/auth/login?email=${email}&senha=${password}`);
      const response = await api("/auth/login", {
        method: "POST",
        data: { email, senha: password },
      });

      // const data = await response.json();
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

      // if (data.length > 0) {
      //   const usuario = data[0];
      //   if (usuario.email === email && usuario.senha === password) {
      //     setUser(usuario);
      //     localStorage.setItem("insightViagem365", JSON.stringify(usuario));
      //     return true;
      //   }
      // }
      // return false;
    } catch (error) {
      console.error("Error during sign in:", error);
      return false;
    }
  }
  function signOut() {
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
