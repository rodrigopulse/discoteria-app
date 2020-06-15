const ESTADO_INICIAL = {
  carregando: false,
}

export default function carregando( state = ESTADO_INICIAL, action) {
  if(action.type === 'CARREGANDO') {
    return {...state, carregando: action.carregando}
  }
  return state
}