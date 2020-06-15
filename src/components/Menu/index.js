import React from 'react'
import { ScrollView, View, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'

//Redux
import { connect, useDispatch } from 'react-redux';
import { menuAction } from '../../store/actions/menu';

//Styles
import Cores from '../../assets/styles/cores';

const BotaoFechar = () => {

  const dispatch = useDispatch();

  return (

    <TouchableOpacity
      style = { styles.botaoFechar }
      onPress = { () => { dispatch(menuAction(false)) } }
    >
      <Image
        source = { require('../../assets/images/icons/close-24px.png') }
        style = { styles.iconeAlerta }
      />
    </TouchableOpacity>

  )

}

const Menu = ( { menu } ) =>  {

  return (

    <ScrollView style = { menu.estado ? styles.menu : styles.menuNone } >

      <BotaoFechar />

    </ScrollView>

  )

}

const styles = StyleSheet.create({
  menu: {
    width: 275,
    height: Dimensions.get('window').height,
    backgroundColor: Cores.corBackground,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 11
  },
  menuNone: {
    display: 'none'
  },
  botaoFechar: {
    width: '100%',
    alignItems: 'flex-end'
  }
})

export default connect( state => ( { menu: state.menu } ) )(Menu);
