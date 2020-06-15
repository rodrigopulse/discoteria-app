import React from 'react'
import { View, TouchableHighlight, Image, Dimensions, StyleSheet } from 'react-native'

//Redux
import { connect, useDispatch } from 'react-redux';
import { menuAction } from '../../store/actions/menu';

//Styles
import Cores from '../../assets/styles/cores';

const Header = ( { usuario } ) =>  {

  const dispatch = useDispatch();

  return (

    <View style = { usuario.logado ? styles.header : styles.headerNone } >

      <TouchableHighlight
        style = { styles.botaoMenu }
        onPress = { () => { dispatch(menuAction(true)) } }
        underlayColor = { Cores.corPrimariaHover }
      >
        <Image
          style = { styles.iconeMenu }
          source = { require('../../assets/images/icons/menu-white.png') } />
      </TouchableHighlight>

    </View>

  )

}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: Cores.corPrimaria,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    position: 'absolute',
    top: 0,
    left: 0
  },
  headerNone: {
    display: 'none'
  },
  botaoMenu: {
    width: 35,
    height: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconeMenu: {
    width: 25,
    height: 25,
    resizeMode: 'cover'
  }
})

export default connect( state => ( { usuario: state.usuario } ) )(Header);
