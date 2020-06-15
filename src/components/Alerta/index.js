import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Cores from '../../assets/styles/cores';
import { alertaAction } from '../../store/actions/alerta';

const Alerta = ( { estado } ) => {

  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress = { () => dispatch( alertaAction(false, '', '') ) }
      style = {[
        estado.alerta ? styles.containerAlerta : styles.alertaNone,
        estado.tipo === 'erro' ? styles.corAlertaErro : styles.corAlertaSucesso
      ]}
    >
      <Text
        style = { styles.textoAlerta }
      >
        { estado.mensagem }
      </Text>
      <Image
        source = { require('../../assets/images/icons/close-24px.png') }
        style = { styles.iconeAlerta }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerAlerta: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  corAlertaErro: {
    backgroundColor: Cores.corErro
  },
  corAlertaSucesso: {
    backgroundColor: Cores.corSucesso
  },
  textoAlerta: {
    color: '#fff',
    fontWeight: '700'
  },
  alertaNone: {
    display: 'none'
  },
  iconeAlerta: {
    width: 24,
    height: 24,
    alignSelf: "flex-end",
    right: 20,
    position: "absolute"
  }
})

export default connect( state => ( { estado: state.alerta } ) )(Alerta);