const PASSEIOS_KEY = 'passeios';

// Função para obter todos os passeios
export function getPasseios() {
  const passeios = localStorage.getItem(PASSEIOS_KEY);
  return passeios ? JSON.parse(passeios) : [];
}

// Função para obter passeios cadastrados por um guia específico
export function getPasseiosByGuia(emailGuia) {
  const passeios = getPasseios();
  return passeios.filter((passeio) => passeio.emailGuia === emailGuia);
}

// Função para salvar um novo passeio
export function salvarPasseio(passeio) {
  const passeios = getPasseios();
  // lógica adicional 
  passeios.push(passeio);
  localStorage.setItem(PASSEIOS_KEY, JSON.stringify(passeios));
}