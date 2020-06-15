export function usuarioAction(logado, nome, email, id, token) {
  return {
    type: "USUARIO",
    logado,
    nome,
    email,
    id,
    token
  }
}