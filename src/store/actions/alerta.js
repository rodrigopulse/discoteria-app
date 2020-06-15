export function alertaAction(alerta, tipo, mensagem) {
  return {
    type: "ALERTA",
    alerta,
    tipo, //erro, sucesso
    mensagem
  }
}