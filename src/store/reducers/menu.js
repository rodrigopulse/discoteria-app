const ESTADO_INICIAL = {
  estado: false,
}

export default function menu( state = ESTADO_INICIAL, action) {
  if( action.type === 'MENU' ) {
    return {
      ...state,
      estado: action.estado,
    }
  }
  return state
}