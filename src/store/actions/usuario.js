export function usuarioAction(logado, email, id, token) {
  return {
    type: "USUARIO",
    logado,
    email,
    id,
    token
  }
}