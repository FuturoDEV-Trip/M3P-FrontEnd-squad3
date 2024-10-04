import  { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext(); // Certifique-se de que o contexto está sendo exportado corretamente

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(
    JSON.parse(localStorage.getItem('currentUser')) || null
  );

  // Função para fazer login
  const login = (usuario) => {
    setUsuarioLogado(usuario);
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  };

  // Função para fazer logout
  const logout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ usuarioLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Adicionar validação de PropTypes para 'children'
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};