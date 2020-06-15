import { combineReducers } from 'redux';

import carregando from './carregando';
import alerta from './alerta';
import usuario from './usuario';
import menu from './menu';

export default combineReducers({
  carregando,
  alerta,
  usuario,
  menu
})