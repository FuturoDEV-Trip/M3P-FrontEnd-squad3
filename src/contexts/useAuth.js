import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Importa o AuthContext

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}