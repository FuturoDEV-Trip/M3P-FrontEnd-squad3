// src/services/userService.js

const USERS_KEY = 'users';

export function getUsuarios() {
  const usuarios = localStorage.getItem(USERS_KEY);
  return usuarios ? JSON.parse(usuarios) : [];
}

export function salvarUsuario(usuario) {
  const usuarios = getUsuarios();

  // Verificar se o e-mail já existe
  const existe = usuarios.some((u) => u.email === usuario.email);
  if (existe) {
    throw new Error('E-mail já cadastrado.');
  }

  usuarios.push(usuario);
  localStorage.setItem(USERS_KEY, JSON.stringify(usuarios));
}
