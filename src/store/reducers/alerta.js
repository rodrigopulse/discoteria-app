const ESTADO_INICIAL = {
  alerta: false,
  // Tipo: erro, sucesso
  tipo: '',
  mensagem: ''
}

export default function alerta( state = ESTADO_INICIAL, action) {
  if( action.type === 'ALERTA' ) {
    return {
      ...state,
      alerta: action.alerta,
      tipo: action.tipo,
      mensagem: action.mensagem
    }
  }
  return state
}