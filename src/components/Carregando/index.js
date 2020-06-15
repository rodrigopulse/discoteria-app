import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Cores from '../../assets/styles/cores.js';

const Carregando = ( { estado } ) => {
  return (
    <View style = { estado.carregando ? styles.containerCarregando : styles.carregandoNone } >
      <Image
        style={{width: 280, height: 280, resizeMode: "cover"}}
        source={require('../../assets/images/carregando.gif')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerCarregando: {
    height: '100%',
    width: '100%',
    backgroundColor: Cores.corBackground,
    zIndex: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
  },
  carregandoNone: {
    display: 'none'
  }
})

export default connect( state => ({ estado: state.carregando }))(Carregando);