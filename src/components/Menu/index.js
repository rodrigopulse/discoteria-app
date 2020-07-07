import React, { Component } from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../../../RootNavigation.js';
//Redux
import { connect } from 'react-redux';
import { menuAction } from '../../store/actions/menu';
import { usuarioAction } from '../../store/actions/usuario';
//Ícones
import MinhaConta from '../../assets/images/icons/face.png';
import Album from '../../assets/images/icons/album.png';
import ViewList from '../../assets/images/icons/view_list.png';
import AddBox from '../../assets/images/icons/add_box.png';
import RemoveCircleOutline from '../../assets/images/icons/remove_circle_outline.png';

//Styles
import Cores from '../../assets/styles/cores';

class Menu extends Component  {

  constructor(props) {
    super(props)
  }

  BotaoFechar = () => {

    return (

      <TouchableOpacity
        style = { styles.botaoFechar }
        onPress = { () => { this.props.dispatch(menuAction(false)) } }
      >
        <Image
          source = { require('../../assets/images/icons/close-24px.png') }
          style = { styles.iconeAlerta }
        />
      </TouchableOpacity>

    )

  }

  BotaoItem = (props) => {

    return (

      <TouchableOpacity
        style = { styles.botaoItem }
        onPress = { () => { dispatch(menuAction(false)) } }
      >
        <Image
          source = { props.icone }
          style = { styles.botaoItemIcone }
        />
        <Text style = { styles.botaoItemTexto }>{ props.titulo }</Text>
      </TouchableOpacity>

    )

  }

  BotaoSair = () => {

    return (

      <TouchableOpacity
        style = { styles.botaoItem }
        onPress = { () => { this.LogOut() } }
      >
        <Image
          source = { RemoveCircleOutline }
          style = { styles.botaoItemIcone }
        />
        <Text style = { styles.botaoItemTexto }>Sair</Text>
      </TouchableOpacity>

    )

  }

  LogOut = async () => {

    await AsyncStorage.removeItem('@DiscoteriaApp:token');
    await AsyncStorage.removeItem('@DiscoteriaApp:id');
    await AsyncStorage.removeItem('@DiscoteriaApp:email');

    this.props.dispatch( usuarioAction(false, '', '', '') );
    this.props.dispatch(menuAction(false));

    RootNavigation.navigate('Login');

  }
  render() {

    return (

      <ScrollView style = { this.props.menu.estado ? styles.menu : styles.menuNone } >

        <this.BotaoFechar />

        <View>

          <this.BotaoItem titulo = "Minha Conta" icone = { MinhaConta } />
          <this.BotaoItem titulo = "Minha Coleção" icone = { Album } />
          <this.BotaoItem titulo = "Lista de Desejos" icone = { ViewList } />
          <this.BotaoItem titulo = "Adicionar Artista" icone = { AddBox } />
          <this.BotaoItem titulo = "Adicionar Álbum" icone = { AddBox } />
          <this.BotaoSair />

        </View>

      </ScrollView>

    )

  }

}

const styles = StyleSheet.create({
  menu: {
    width: 275,
    height: Dimensions.get('window').height,
    backgroundColor: '#333333',
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
  },
  //Itens do menu
  botaoItem: {
    flex: 1,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  botaoItemIcone: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  botaoItemTexto: {
    fontWeight: '700',
    color: '#fff'
  },
})

export default connect( state => ( { menu: state.menu, carregando: state.carregando, usuario: state.usuario } ) )( Menu );
