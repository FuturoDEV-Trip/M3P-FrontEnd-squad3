import { api } from "../../services/api";

export async function validateCPF(cpf) {
  try {
    const response = await api(`/usuario?cpf=${cpf}`);
    const data = await response.json();
    if (data.length > 0) {
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
    const response = await api(`/usuario?email=${email}`);
    const data = await response.json();
    if (data.length > 0) {
      alert("E-mail já cadastrado");
      return true;
    }
    return false;
  } catch (error) {
    console.error("Erro ao validar e-mail:", error);
    return false;
  }
}
