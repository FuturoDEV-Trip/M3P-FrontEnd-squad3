import { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Função para inicializar usuários simulados no localStorage
  useEffect(() => {
    const users = [
      { email: 'admin@example.com', senha: 'Admin1234', tipoUsuario: 'guia', nomeCompleto: 'Admin User' },
      { email: 'livia@example.com', senha: 'Password1', tipoUsuario: 'turista', nomeCompleto: 'User One' },
      { email: 'user2@example.com', senha: 'Pass1234', tipoUsuario: 'turista', nomeCompleto: 'User Two' },
    ];

    // Verifica se os usuários já estão no localStorage, senão, os insere
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Usuários simulados inseridos no localStorage.');
    } else {
      // Se os usuários já estão no localStorage, exibe-os no console
      console.log('Usuários já estão no localStorage.');
    }
  }, []);

  // Função para realizar o login
  const handleLogin = (e) => {
    e.preventDefault();
    setError(null); // Reseta a mensagem de erro

    // Verificar se o localStorage contém os usuários
    const storedUsers = localStorage.getItem('users');
    if (!storedUsers) {
      setError('Não há usuários no sistema. Tente novamente mais tarde.');
      console.log('Erro: Usuários não estão no localStorage');
      return;
    }

    // Verifica se o usuário e senha existem na lista de usuários simulados
    let users = JSON.parse(storedUsers) || [];
    console.log('Tentando login com:', email, senha);
    console.log('Usuários no localStorage:', users);

    let user = users.find((user) => user.email === email && user.senha === senha);

    if (user) {
      // Adiciona nomeCompleto se não estiver presente
      if (!user.nomeCompleto) {
        user.nomeCompleto = 'Usuário Simulado';
      }

      // Login bem-sucedido, armazena no localStorage e redireciona
      console.log('Usuário encontrado:', user);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));

      // Adiciona um delay para garantir que o localStorage seja atualizado antes do redirecionamento
      setTimeout(() => {
        if (user.tipoUsuario === 'guia') {
          navigate('/dashboard-guia');
        } else {
          navigate('/passeios');
        }
      }, 500); // Pequeno delay de 500ms
    } else {
      // Exibir erro se o login falhar
      setError('Usuário ou senha inválidos.');
    }
  };
  
  return (
    <div id="main-wrapper" className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-xl-14">
          <div className="card border-0">
            <div className="card-body p-0">

              <div className="row no-gutters">
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="mb-5">
                      <img 
                        src="/src/assets/Brazil365.png" 
                        alt="Brazil365 Logo" 
                        className="logo-image" 
                      />
                    </div>

                    <h3 className="h4 font-weight-bold text-theme">
                      Explorando as belezas do Brasil, um guia de cada vez.
                    </h3>
                    <p className="text-muted mt-2 mb-5">Digite seus dados de acesso</p>

                    {/* Formulário de Login */}
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group mb-4">
                        <label htmlFor="senha">Senha</label>
                        <input
                          type="password"
                          className="form-control"
                          id="senha"
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                          required
                        />
                      </div>

                      {/* Exibição de erro, caso ocorra */}
                      {error && <p className="text-danger">{error}</p>}

                      {/* Botão de Login */}
                      <button type="submit" className="btn btn-success btn-login">
                       Log in 
                      </button>
                      
                        {/* Link "Esqueceu a senha?" abaixo do botão */}
                      <a 
                        href="#!" className="forgot-link float-right text-primary">
                        Esqueceu a senha?
                      </a>

                   {/* Frase de cadastro */}
                      <p className="text-muted text-center mt-3 mb-0">
                        Não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-danger ml-1">
                          Cadastre-se
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>

                <div className="col-lg-6 d-flex align-items-center ">
                  <div className="account-block rounded-right">
                    <div className="overlay rounded-right"></div>
                    <div className="account-testimonial">
                      <h4 className="text-white mb-4">&quot;Mais do que uma viagem, somos uma experiência.&quot;</h4>
                      <p className="lead text-white">&quot;Descubra novos horizontes e faça da sua próxima aventura uma experiência inesquecível!&quot;</p>
                      <p>- Equipe Brazil365</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end card-body */}
          </div>
          {/* end card */}
        </div>
      </div>
    </div>
  );
};

export default Login;