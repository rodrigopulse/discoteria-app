import { StyleSheet } from 'react-native';
import Cores from './cores.js';

export default GridStyle = StyleSheet.create({
  container: {
    paddingTop: 70,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Cores.corBackground,
    flex: 1,
    zIndex: 1,
  },
  containerDeslogado: {
    backgroundColor: Cores.corBackground,
    flex: 1,
    zIndex: 1,
    alignItems: 'center',
  }
})