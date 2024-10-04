import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import PropTypes from 'prop-types'; 

function PrivateRouteGuia({ children }) {
    const { usuarioLogado } = useAuth(); // Obtém o usuário logado
  
    if (!usuarioLogado) {
      // Se não estiver logado, redireciona para o login
      return <Navigate to="/login" />;
    }
  
    if (usuarioLogado.tipoUsuario !== 'guia') {
      // Se não for guia, redireciona para a página inicial ou exibe uma mensagem de acesso negado
      return <Navigate to="/" />;
    }
  
    // Se estiver logado e for guia, renderiza o componente filho
    return children;
  }
  
//validação de PropTypes para 'children'
PrivateRouteGuia.propTypes = {
  children: PropTypes.node.isRequired,
};
  export default PrivateRouteGuia;