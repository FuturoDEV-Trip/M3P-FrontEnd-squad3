import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import Navbar from '../components/Navbar';
import './DashboardGuia.css'; 
import { Link } from 'react-router-dom';

function DashboardGuia() {
  const { usuarioLogado, logout } = useAuth(); // Obtém o usuário logado e a função de logout do contexto de autenticação
  const [passeios, setPasseios] = useState([]); // Estado para armazenar os passeios do guia

  useEffect(() => {
    // Carrega os passeios do localStorage
    const passeiosCadastrados = JSON.parse(localStorage.getItem('passeios')) || [];

  // Filtra os passeios do guia logado
  const passeiosDoGuia = passeiosCadastrados.filter((passeio) => passeio.guiaEmail === usuarioLogado.email);
  setPasseios(passeiosDoGuia); // Atualiza o estado com os passeios do guia
}, [usuarioLogado]);

return (
  <div className="dashboard-container">

    {/* Componente de navegação */}
    <Navbar usuarioLogado={usuarioLogado} logout={logout} />

    {/* Conteúdo principal do dashboard */}
    <main className="dashboard-main">
      <header className="dashboard-header">
        <h1>Bem-vindo, {usuarioLogado.nomeCompleto}</h1>
      </header>

      {/* Card exibindo a quantidade de passeios cadastrados */}
      <div className="dashboard-card">
        <h2>Passeios Cadastrados</h2>
        <p>{passeios.length}</p>
      </div>

      <div className="dashboard-list">
  <h3>Seus Passeios</h3>
  {passeios.length > 0 ? (
    <div className="grid-container">
      {passeios.map((passeio, index) => (
        <div key={index} className="grid-item">
          <h4>{passeio.nomePasseio}</h4>
          <p>Local: {passeio.local}</p>
          <p>Preço: R$ {passeio.preco}</p>
          <p>Data: {passeio.data}</p>
          <p>Descrição: {passeio.descricao}</p>
          <Link to={`/passeio/${passeio.nomePasseio}`} className="btn btn-info mt-2">
            Ver Detalhes
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <p>Nenhum passeio cadastrado.</p>
  )}
</div>

      {/* Ações disponíveis para o guia */}
      <div className="dashboard-actions">
        <a href="/passeio/novo" className="dashboard-button">
          Cadastrar Novo Passeio
        </a>
        <a href="/passeios" className="dashboard-button">
          Listar Passeios
        </a>
      </div>
    </main>
  </div>
);
}

export default DashboardGuia;