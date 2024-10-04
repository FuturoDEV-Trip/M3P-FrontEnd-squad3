import { Link } from 'react-router-dom'; // Importa o Link para navegação interna
import './Navbar.css'; // Importa os estilos específicos do Navbar
import PropTypes from 'prop-types';
import logo from '../assets/Brazil365.png'

function Navbar({ usuarioLogado, logout }) {
  return (
    <nav className="navbar">
      {/* Logo ou nome da aplicação */}
      <div className="navbar-brand">
      <Link to="/">
      <img src={logo} alt="Logo Trip365" className="navbar-logo" />
      </Link>
      </div>

      {/* Menu de navegação */}
      <ul className="navbar-menu">
        <li>
          <Link to="/dashboard-guia">Dashboard</Link>
        </li>
        <li>
          <Link to="/passeio/novo">Cadastrar Passeio</Link>
        </li>
        <li>
          <Link to="/passeios">Listar Passeios</Link>
        </li>
      </ul>

        {/* Informações do usuário e botão de logout */}
        <div className="navbar-user">
        <span>{usuarioLogado.nomeCompleto}</span>
        <button onClick={logout}>Sair</button>
      </div>
    </nav>
  );
}

// Adicionando validação de PropTypes
Navbar.propTypes = {
  usuarioLogado: PropTypes.shape({
    nomeCompleto: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navbar;