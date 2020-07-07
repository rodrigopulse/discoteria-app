import React from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//Components
import Botao from '../../components/Botao';
//API
import Usuario from '../../api/usuario';
const usuario = new Usuario();
//Style
import GridStyle from '../../assets/styles/grid';
import TextoStyle from '../../assets/styles/texto';
import FormStyle from '../../assets/styles/forms';
//Redux
import { alertaAction } from '../../store/actions/alerta';
import { carregandoAction } from '../../store/actions/carregando';
import { usuarioAction } from '../../store/actions/usuario';
import { connect } from 'react-redux';

class Login extends React.Component {

  state = { email: "", senha: "" }

  constructor(props) {
    super(props)
  }

  abreAlerta = ( mensagem ) => {
    this.props.dispatch( alertaAction(true, 'erro', mensagem) );
  }

  fechaAlerta = () => {
    this.props.dispatch( alertaAction(false, '', '') );
  }

  abreCarregando = () => {
    this.props.dispatch( carregandoAction( true ) )
  }

  fechaCarregando = () => {
    this.props.dispatch( carregandoAction( false ) )
  }

  login = async () => {
    this.abreCarregando();
    try {
      const res = await usuario.login( { email: this.state.email, senha: this.state.senha } );
      await AsyncStorage.setItem('@DiscoteriaApp:token', res.token);
      await AsyncStorage.setItem('@DiscoteriaApp:id', res._id);
      await AsyncStorage.setItem('@DiscoteriaApp:email', res.email);
      this.fechaCarregando();
      await this.props.dispatch( usuarioAction(true, res.email, res._id, res.token) );
      this.props.navigation.navigate( 'MinhaColecao' )
    }
    catch(err) {
      this.abreAlerta( err.response.data.erro )
      this.fechaCarregando();
    }
  }

  componentDidMount() {
    this.fechaCarregando()
  }

  render() {

    return (

      <View style = { GridStyle.containerDeslogado }>

        <View style = { styles.containerContentLogin } >

          <View style = { styles.camposLoginContainer } >

            <Text style = { [ TextoStyle.titulo, { textAlign: 'center' } ] } >
              Login
            </Text>

            <TextInput
              keyboardType = "email-address"
              autoCapitalize = "none"
              onChangeText = { ( text => { this.fechaAlerta(); this.setState( { email: text } ) } ) }
              placeholder = "Digite seu e-mail" style={ [ FormStyle.inputs, { marginTop: 20 } ] }
            />

            <TextInput
              autoCapitalize = "none"
              secureTextEntry = { true }
              onChangeText = { ( text => { this.fechaAlerta(); this.setState( { senha: text } ) } ) }
              placeholder = "Digite uma senha" style={ [ FormStyle.inputs, { marginTop: 20 } ] }
            />

            <View style={{marginTop: 20}}>
              <Botao
                titulo = "Login"
                onPress = { () => this.login() }
              />
            </View>

          </View>

          <View style = { styles.containerScreen }>

            <Text style = { [ TextoStyle.textoBranco, { textAlign: 'center' } ] } >
              Ainda não tem uma conta?
            </Text>

            <TouchableHighlight
              onPress = { () => this.props.navigation.navigate( 'CriarConta' ) }
              style = { styles.botaoLogin }
            >
              <Text style = { [ TextoStyle.textoBranco, { textAlign: 'center', fontWeight: '700', marginTop: 7 } ] } >
                Criar Conta
              </Text>
            </TouchableHighlight>

          </View>

        </View>

      </View>

    )

  }

}

const styles = StyleSheet.create({
  containerContentLogin: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    maxWidth: 326,
    justifyContent: 'center',
  },
  camposLoginContainer: {
    width: '100%',
    height: Dimensions.get('window').height - 110,
    marginTop: -110,
    justifyContent: 'center',
  },
  containerScreen: {
    width: '100%',
    //marginTop: 20,
    height: 110,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0
  },
  botaoLogin: {
    width: Dimensions.get('window').width,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    justifyContent: 'center'
  }
})

export default connect( state => ( { alerta: state.alerta, carregando: state.carregando, usuario: state.usuario } ) )( Login )
