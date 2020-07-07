const ESTADO_INICIAL = {
  logado: false,
  email: '',
  id: '',
  token: ''
}

export default function alerta( state = ESTADO_INICIAL, action) {
  if( action.type === 'USUARIO' ) {
    return {
      ...state,
      logado: action.logado,
      email: action.email,
      id: action.id,
      token: action.token
    }
  }
  return state
}