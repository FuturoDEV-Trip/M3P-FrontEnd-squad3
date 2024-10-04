import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/useAuth'; 
import { useNavigate } from 'react-router-dom'; 
import './ListagemPasseios.css';


const ListagemPasseios = () => {
    const { usuarioLogado, logout } = useAuth(); // Adiciona a função logout
    const [passeios, setPasseios] = useState([]);
    const [mensagem, setMensagem] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        // Carrega os passeios do localStorage 
        const passeiosCadastrados = JSON.parse(localStorage.getItem('passeios')) || [];
        setPasseios(passeiosCadastrados);
      }, []);

       // Função para logout
    const handleLogout = () => {
      logout(); // Chama a função logout do contexto de autenticação
      navigate('/login'); // Redireciona para a página de login
  };

  // Função para redirecionar para o dashboard
  const handleDashboard = () => {
    navigate('/dashboard-guia'); // Redireciona para a página do dashboard
};

      // Função para reservar um passeio
    const handleReserva = (passeio) => {
    if (usuarioLogado.tipoUsuario !== 'turista') {
      setMensagem('Apenas turistas podem realizar reservas.');
      return;
    }

     // Recupera as reservas do localStorage
     const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

     // Verifica se o passeio já foi reservado pelo usuário
    const jaReservado = reservas.some(
      (reserva) => reserva.passeioId === passeio.nomePasseio && reserva.turistaEmail === usuarioLogado.email
    );

    if (jaReservado) {
      setMensagem('Você já reservou este passeio.');
      return;
    }

     // Adiciona a nova reserva
    const novaReserva = {
        passeioId: passeio.nomePasseio,
        turistaEmail: usuarioLogado.email,
        data: passeio.data,
        local: passeio.local,
      };
  
      reservas.push(novaReserva);
      localStorage.setItem('reservas', JSON.stringify(reservas));
      setMensagem('Reserva realizada com sucesso!');
    };

      // Função para redirecionar para as reservas
      const handleMinhasReservas = () => {
      navigate('/reservas');
  };

  return (
    <div className="listagem-passeios-container">
    <header className="dashboard-header">
        <h2>Bem-vindo, {usuarioLogado.nomeCompleto}</h2>
        <div className="dashboard-actions">
            <button className="btn btn-info" onClick={handleMinhasReservas}>Minhas Reservas</button>
            <button className="btn btn-primary" onClick={handleDashboard}>Dashboard</button>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
    </header>

    {mensagem && <p className="text-message">{mensagem}</p>}

    <h3 className="passeios-title">Listagem de Passeios</h3>

    <div className="passeios-grid">
        {passeios.map((passeio, index) => (
            <div key={index} className="passeios-item">
                <h4>{passeio.nomePasseio}</h4>
                <p><strong>Local:</strong> {passeio.local}</p>
                <p><strong>Descrição:</strong> {passeio.descricao}</p>
                <p><strong>Preço:</strong> R$ {passeio.preco}</p>
                <p><strong>Data:</strong> {passeio.data}</p>
                <button className="btn btn-primary" onClick={() => handleReserva(passeio)}>Reservar</button>
            </div>
        ))}
    </div>
</div>
);
};

export default ListagemPasseios;