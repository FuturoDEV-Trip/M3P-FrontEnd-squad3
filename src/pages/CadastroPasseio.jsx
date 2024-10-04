import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import './CadastroPasseio.css';

const CadastroPasseio = () => {
  const [nomePasseio, setNomePasseio] = useState('');
  const [local, setLocal] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [data, setData] = useState('');
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();
  const { usuarioLogado } = useAuth(); // Obtém o usuário logado

  const handleCadastroPasseio = (e) => {
    e.preventDefault();

    if (!nomePasseio || !local || !preco || !data) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    if (nomePasseio.length > 100) {
      setErro('O nome do passeio não pode ultrapassar 100 caracteres.');
      return;
    }

    if (descricao.length > 500) {
      setErro('A descrição não pode ultrapassar 500 caracteres.');
      return;
    }

    const passeiosCadastrados = JSON.parse(localStorage.getItem('passeios')) || [];

    const passeioExistente = passeiosCadastrados.find((passeio) => passeio.nomePasseio === nomePasseio);
    if (passeioExistente) {
      setErro('Já existe um passeio com este nome cadastrado.');
      return;
    }

    const novoPasseio = {
      nomePasseio,
      local,
      descricao,
      preco,
      data,
      guiaEmail: usuarioLogado.email,
    };

    passeiosCadastrados.push(novoPasseio);
    localStorage.setItem('passeios', JSON.stringify(passeiosCadastrados));

    setNomePasseio('');
    setLocal('');
    setDescricao('');
    setPreco('');
    setData('');
    setErro(null);
    navigate('/dashboard-guia');
  };

  return (
    <div className="cadastro-background">
      <div className="container-cadastro">
        <h2>Cadastro de Novo Passeio</h2>
        <form onSubmit={handleCadastroPasseio}>
          <div className="form-group">
            <label htmlFor="nomePasseio">Nome do Passeio</label>
            <input
              type="text"
              className="form-control"
              id="nomePasseio"
              value={nomePasseio}
              onChange={(e) => setNomePasseio(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="local">Local</label>
            <input
              type="text"
              className="form-control"
              id="local"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              className="form-control"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              maxLength="500"
            />
          </div>

          <div className="form-group">
            <label htmlFor="preco">Preço</label>
            <input
              type="number"
              className="form-control"
              id="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="data">Data</label>
            <input
              type="date"
              className="form-control"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </div>

          {erro && <p className="text-danger">{erro}</p>}

          <button type="submit" className="btn btn-primary mt-3">Cadastrar Passeio</button>
        </form>
      </div>
    </div>
  );
};

export default CadastroPasseio;
