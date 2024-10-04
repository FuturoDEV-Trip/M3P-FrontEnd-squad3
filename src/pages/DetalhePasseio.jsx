import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../contexts/useAuth'; 
import './DetalhePasseio.css'; 

const DetalhePasseio = () => {
  const { id } = useParams(); // Obtém o ID do passeio da URL
  const { usuarioLogado } = useAuth(); // Obtém o usuário logado do contexto
  const [passeio, setPasseio] = useState(null); // Estado para armazenar os detalhes do passeio
  const [mensagem, setMensagem] = useState(null); // Mensagem para feedback de ações
  const navigate = useNavigate(); 

  useEffect(() => {
    // Carrega os passeios do localStorage
    const passeiosCadastrados = JSON.parse(localStorage.getItem('passeios')) || [];
    
    // Encontra o passeio pelo nome (id)
    const passeioEncontrado = passeiosCadastrados.find((p) => p.nomePasseio === id);
    
    // Atualiza o estado com os detalhes do passeio encontrado
    if (passeioEncontrado) {
      setPasseio(passeioEncontrado);
    } else {
      setMensagem('Passeio não encontrado.');
    }
  }, [id]);

  // Função para editar o passeio (apenas para guias)
  const handleEdit = () => {
    navigate(`/passeio/editar/${passeio.nomePasseio}`);
  };

  // Função para excluir o passeio (apenas para guias)
  const handleDelete = () => {
    const passeiosCadastrados = JSON.parse(localStorage.getItem('passeios')) || [];
    const novosPasseios = passeiosCadastrados.filter((p) => p.nomePasseio !== passeio.nomePasseio);
    
    // Atualiza o localStorage com os passeios restantes
    localStorage.setItem('passeios', JSON.stringify(novosPasseios));
    setMensagem('Passeio excluído com sucesso.');
    navigate('/dashboard-guia');
  };

  // Função para reservar o passeio (apenas para turistas)
  const handleReserva = () => {
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

  // Função para voltar ao dashboard
  const handleVoltar = () => {
    navigate('/dashboard-guia');
  };

  if (!passeio) {
    return <p>{mensagem || 'Carregando...'}</p>;
  }

  return (
    <div className="detalhe-passeio-container">
      <div className="detalhe-passeio-content">
        <h2>{passeio.nomePasseio}</h2>
        <p><strong>Local:</strong> {passeio.local}</p>
        <p><strong>Descrição:</strong> {passeio.descricao}</p>
        <p><strong>Preço:</strong> R$ {passeio.preco}</p>
        <p><strong>Data:</strong> {passeio.data}</p>

        {/* Exibe os botões de edição e exclusão apenas para o guia */}
        {usuarioLogado.tipoUsuario === 'guia' && usuarioLogado.email === passeio.guiaEmail && (
          <div className="action-buttons">
            <button className="btn btn-warning" onClick={handleEdit}>Editar Passeio</button>
            <button className="btn btn-danger" onClick={handleDelete}>Excluir Passeio</button>
          </div>
        )}

        {/* Botão para reserva, visível apenas para turistas */}
        {usuarioLogado.tipoUsuario === 'turista' && (
          <button className="btn btn-primary" onClick={handleReserva}>Reservar Passeio</button>
        )}

        {/* Botão de Voltar ao dashboard */}
        <button className="btn btn-info" onClick={handleVoltar}>Voltar ao Dashboard</button>

        {/* Exibe mensagem, se houver */}
        {mensagem && <p className="text-success">{mensagem}</p>}
      </div>
    </div>
  );
};

export default DetalhePasseio;