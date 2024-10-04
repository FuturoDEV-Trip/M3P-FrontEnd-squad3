import { createContext, useContext, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signOut: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("insightViagem365");
    return user ? JSON.parse(user) : null;
  });

  async function signIn({ email, password }) {
    try {
      const response = await api(`/usuario?email=${email}&senha=${password}`);
     
      const data = await response.json();
     

      if (data.length > 0) {
        const usuario = data[0];
        if (usuario.email === email && usuario.senha === password) {
          setUser(usuario);
          localStorage.setItem("insightViagem365", JSON.stringify(usuario));
          return true;
        }
      }
      return false;
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
