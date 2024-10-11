// import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validateCPF, validateEmail } from "../../components/Validate/Validate";
import { api } from "../../services/api";
import { viaCep } from "../../services/viaCep";
import "./SignUp.css";

function SignUp() {
  const { register, handleSubmit, formState, setValue,watch } =
    useForm();
  const navigate = useNavigate();
  const cep = watch("cep");

  async function addUser(data) {
    const cpf = data.cpf;
    const email = data.email;

    const cpfExists = await validateCPF(cpf);
    const emailExists = await validateEmail(email);

    if (cpfExists || emailExists) {
      return;
    }
    try {
      const response = await api("/usuario", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      alert("Usuário cadastrado com sucesso", result);
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }

  useEffect(() => {
  async function addressUser(cep) {
    if (cep && cep.length === 8) {
      try {
        const data = await viaCep(cep);

        setValue("logradouro", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    }
  }

  addressUser(cep);
}, [cep, setValue]);

  return (
    <>
    <div className="signup-content">
      
      <div className="signup-form">
            <form onSubmit={handleSubmit(addUser)} className="form-container-signup">
              <h4>Cadastre-se para viver novas aventuras em Floripa!</h4>

              <div className="form-input-duplo">
                <input
                  className="input-signup"
                  id="floatingNome"
                  placeholder="Digite o seu nome"
                  {...register("nome", { required: "O nome é obrigatório" })}
                />
                <span>{formState.errors?.nome?.message}</span>

                <input
                  className="input-signup"
                  id="floatingSobreNome"
                  placeholder="Digite o Sobrenome"
                  {...register("sobrenome", { required: "O sobrenome é obrigatório" })}
                />
                <span>{formState.errors?.sobrenome?.message}</span>
              </div>

            <div className="form-input">
              <input
                className="input-signup"
                id="floatingCPF"
                placeholder="cpf"
                {...register("cpf", {
                  required: "O CPF é obrigatório",
                  maxLength: 11,
                })}
              />
              <span>{formState.errors?.cpf?.message}</span>
            </div>

            <div className="form-input">
              <input
                type="date"
                className="input-signup"
                id="floatingDate"
                {...register("dataNascimento", {
                  required: "O data de nascimento é obrigatório",
                })}
              />
              <span>{formState.errors?.dataNascimento?.message}</span>
            </div>

            <fieldset className="fieldset" id="fieldset">
              <p>Sexo</p>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  value="Feminino"
                  id="flexRadioDefault1"
                  {...register("sexo")}
                />
                <label className="form-check-label">Feminino</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  value="Masculino"
                  id="flexRadioDefault2"
                  {...register("sexo")}
                />
                <label className="form-check-label">Masculino</label>
              </div>
            </fieldset>

            <div className="form-input">
              <input
                className="input-signup"
                id="floatingInput"
                placeholder="Digite o seu email"
                {...register("email", { required: "O email é obrigatório" })}
              />
              <span>{formState.errors?.email?.message}</span>
            </div>

            <div className="form-input">
              <input
                className="input-signup"
                id="floatingPassword"
                placeholder="Senha"
                type="password"
                {...register("senha", { required: "A senha é obrigatória" })}
              />
              <span>{formState.errors?.senha?.message}</span>
            </div>

            <div className="form-input">
              <input
                type="text"
                className="input-signup"
                id="floatingCep"
                placeholder="cep"
                {...register("cep", { required: "Cep é obrigatório" })}
              />
              <span>{formState.errors?.cep?.message}</span>
            </div>

            <div className="form-input">
              <input
                type="text"
                className="input-signup"
                id="floatingLogradouro"
                placeholder="Digite o seu endereço"
                {...register("logradouro")}
              />
              <span>{formState.errors?.logradouro?.message}</span>
            </div>

            <div className="form-input">
              <input
                type="text"
                className="input-signup"
                id="floatingBairro"
                placeholder="Digite o seu bairro"
                {...register("bairro")}
              />
              <span>{formState.errors?.bairro?.message}</span>
            </div>

            <div className="form-input">
              <input
                type="text"
                className="input-signup"
                id="floatingCidade"
                placeholder="Digite a sua cidade"
                {...register("cidade")}
              />
              <span>{formState.errors?.cidade?.message}</span>
            </div>

            <div className="form-input">
              <input
                type="text"
                className="input-signup"
                id="floatingEstado"
                placeholder="Digite o seu estado"
                {...register("estado")}
              />
              <span>{formState.errors?.estado?.message}</span>
            </div>

            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </form>
        </div>
        <div className="signup-image"></div>
        </div>
    </>
  );
}

export default SignUp;