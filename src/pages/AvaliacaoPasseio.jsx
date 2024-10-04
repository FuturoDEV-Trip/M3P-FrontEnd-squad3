import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import './AvaliacaoPasseio.css';

const AvaliacaoPasseio = () => {
    const { id } = useParams(); // Obtém o ID do passeio da URL
    const { usuarioLogado } = useAuth(); // Obtém o usuário logado do contexto
    const [nota, setNota] = useState('');
    const [comentario, setComentario] = useState('');
    const [mensagem, setMensagem] = useState(null);
    const [podeAvaliar, setPodeAvaliar] = useState(false); // Verifica se o usuário pode avaliar
    const [avaliacoes, setAvaliacoes] = useState([]); // Estado para armazenar avaliações existentes

    useEffect(() => {
        // Verifica se o usuário é um turista e se participou do passeio
        if (usuarioLogado.tipoUsuario === 'turista') {
            const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
            const participou = reservas.some(
                (reserva) => reserva.passeioId === id && reserva.turistaEmail === usuarioLogado.email && reserva.status !== 'cancelada'
            );
            setPodeAvaliar(participou);
        }

        // Carrega as avaliações existentes do localStorage
        const avaliacoesExistentes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
        const avaliacoesDoPasseio = avaliacoesExistentes.filter((avaliacao) => avaliacao.passeioId === id);
        setAvaliacoes(avaliacoesDoPasseio);
    }, [id, usuarioLogado]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nota || !comentario) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }

        // Recupera as avaliações do localStorage
        const avaliacoesExistentes = JSON.parse(localStorage.getItem('avaliacoes')) || [];

        // Adiciona a nova avaliação
        const novaAvaliacao = {
            passeioId: id,
            turistaEmail: usuarioLogado.email,
            nota: parseFloat(nota),
            comentario,
        };

        avaliacoesExistentes.push(novaAvaliacao);
        localStorage.setItem('avaliacoes', JSON.stringify(avaliacoesExistentes));
        setMensagem('Avaliação enviada com sucesso!');
        setAvaliacoes([...avaliacoes, novaAvaliacao]); // Atualiza o estado com a nova avaliação
        setNota(''); // Limpa o campo de nota
        setComentario(''); // Limpa o campo de comentário
    };

    if (!podeAvaliar) {
        return <p>Você não pode avaliar este passeio. Apenas turistas que participaram do passeio podem avaliá-lo.</p>;
    }

    return (
        <div className="avaliacao-passeio-container">
            <div className="avaliacao-passeio-content">
                <h2>Avaliar Passeio</h2>
                {mensagem && <p className="mensagem">{mensagem}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nota">Nota (0 a 5):</label>
                        <input
                            type="number"
                            id="nota"
                            name="nota"
                            min="0"
                            max="5"
                            step="0.1"
                            value={nota}
                            onChange={(e) => setNota(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comentario">Comentário:</label>
                        <textarea
                            id="comentario"
                            name="comentario"
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar Avaliação</button>
                </form>

                <h3>Avaliações</h3>
                {avaliacoes.length > 0 ? (
                    <ul className="avaliacoes-list">
                        {avaliacoes.map((avaliacao, index) => (
                            <li key={index} className="avaliacoes-item">
                                <p><strong>Nota:</strong> {avaliacao.nota}</p>
                                <p><strong>Comentário:</strong> {avaliacao.comentario}</p>
                                <p><small>Turista: {avaliacao.turistaEmail}</small></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Este passeio ainda não possui avaliações.</p>
                )}
            </div>
        </div>
    );
};

export default AvaliacaoPasseio;
