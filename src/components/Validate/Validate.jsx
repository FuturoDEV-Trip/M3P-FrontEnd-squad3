import { api } from "../../services/api";

export async function validateCPF(cpf) {
  try {
const response = await api(`/usuarios/consultar?cpf=${cpf}`, {
      method: "GET",
    });
    const data = response.data;

    const cpfCadastrado = data.find((usuario) => usuario.cpf === cpf);
    if (cpfCadastrado) {
      alert("CPF já cadastrado");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Erro ao validar CPF:", error);
    return false;
  }
}
export async function validateEmail(email) {
  try {
    const response = await api(`/usuarios/consultar?email=${email}`, {
      method: "GET",
    });
    const data = response.data;
    const emailCadastrado = data.find((usuario) => usuario.email === email);
    if (emailCadastrado) {
      alert("E-mail já cadastrado");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Erro ao validar e-mail:", error);
    return false;
  }
}
  export async function validateSenha(senha) {
    if (!(senha.length >= 8) || !(senha.length <= 16)) {
      return false;
    }

    if (!senha.match(/\d/)) {
      return false;
    }

    if (!senha.match(/[a-z]/)) {
      return false;
    }

    if (!senha.match(/[A-Z]/)) {
      return false;
    }

    if (!senha.match(/[\W_]/)) {
      return false;
    }

    return true;
  }