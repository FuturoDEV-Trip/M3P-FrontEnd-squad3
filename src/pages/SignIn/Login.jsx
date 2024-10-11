// import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-descubra-floripa.png";
import { useAuth } from "../../contexts/Auth";
import "./Login.css";

function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function userLogin(data) {
    try {
      const isSuccess = await signIn(data);
      if (isSuccess) {
        navigate("/Dashboard");
      } else {
        alert("Email ou senha incorretos");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="row">

      <div className="col-md-6 login-section">
        <form className="form-container-login" onSubmit={handleSubmit(userLogin)}>
          <h5>Descubra Floripa</h5>
          <img src={logo} alt="Descubra Floripa Logo" className="logo-login" />
          <h1 className="titulo-login">Login</h1>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="input"
              id="email"
              placeholder="Digite seu Email"
              required
              {...register("email")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              className="input"
              id="password"
              placeholder="Digite sua senha"
              required
              {...register("password")}
            />
          </div>
          
          <div className="button-form-div">
            <button type="submit" className="btn-login">
              Entrar
            </button>
            <span className="text-span">
              Ainda não possui conta?
              <Link to="/SignUp" className="text-signup">
                Cadastre-se agora!
              </Link>
            </span>
          </div>
        </form>
      </div>
      
      <div className="col-md-6 video-bg">
        <div className="text-container">
          <h4>Sua próxima aventura começa aqui</h4>
          <p>
            Descubra novos destinos e transforme suas viagens em experiências inesquecíveis.
          </p>
        </div>
        <video autoPlay muted loop id="video-bg">
          <source src="/src/assets/Ilha do Campeche -login.mp4" type="video/mp4" />
          Seu navegador não suporta o formato de vídeo.
        </video>
      </div>
    </div>
  );
}

export default Login;