import React from 'react';
import {StyleSheet, TouchableHighlight, Text} from 'react-native';
import Cores from '../../assets/styles/cores.js';

const Botao = (props) => {
  return (
    <TouchableHighlight
      style = { styles.botao }
      onPress = { props.onPress }
      underlayColor = { Cores.corPrimariaHover }
    >
      <Text style = { styles.textoBotao }>
        {props.titulo}
      </Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  botao: {
    width: '100%',
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Cores.corPrimaria,
    borderRadius: 24
  },
  textoBotao: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '700',
  }
})
export default Botao