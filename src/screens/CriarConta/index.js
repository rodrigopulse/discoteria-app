import React from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, Dimensions, ScrollView } from 'react-native';
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
import { usuarioAction } from '../../store/actions/usuario';
import { carregandoAction } from '../../store/actions/carregando';
import { connect } from 'react-redux';
class CriarConta extends React.Component {

  state = { nome: "", email: "", senha: "", repeteSenha: "" }

  constructor(props) {
    super(props)
  }

  verificaToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@DiscoteriaApp:token');
      if( token ) {
        const token = await AsyncStorage.getItem('@DiscoteriaApp:token');
        const id = await AsyncStorage.getItem('@DiscoteriaApp:id');
        const email = await AsyncStorage.getItem('@DiscoteriaApp:email');
        const nome = await AsyncStorage.getItem('@DiscoteriaApp:nome');
        this.props.dispatch( usuarioAction( true, nome, email, id, token ) );
        this.fechaCarregando();
        this.props.navigation.replace( 'MinhaColecao' )
      } else {
        this.fechaCarregando();
        this.props.dispatch( usuarioAction(false, '', '', '', '') )
      }
    }
    catch (err) {
      this.fechaCarregando();
      this.props.dispatch( usuarioAction(false, '', '', '', '') )
      console.log("Verifica Token: false - ", err);
    }
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

  criarConta = () => {
    if( this.state.nome == '' ) {
      this.abreAlerta( 'Preencha o Nome' );
      return
    }
    if( this.state.email == '' ) {
      this.abreAlerta( 'Preencha o E-mail' );
      return
    }
    if( this.state.senha == '' ) {
      this.abreAlerta( 'Preencha a Senha' );
      return
    }
    if( this.state.senha != this.state.repeteSenha ) {
      this.abreAlerta( 'As senhas precisam ser iguais' );
      return
    }
    this.abreCarregando();
    let data = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha
    }
    usuario.criarConta(data)
    .then( () => {
      this.login( { email: this.state.email, senha: this.state.senha } )
    })
    .catch( (err) => {
      this.fechaCarregando();
      if( err.response.data.code == 11000 ) {
        this.abreAlerta( 'Usuário já existe' );
      }
    })
  }

  login = async (data) => {
    try {
      const res = await usuario.login(data);
      await AsyncStorage.setItem('@DiscoteriaApp:token', res.token);
      await AsyncStorage.setItem('@DiscoteriaApp:id', res.id);
      await AsyncStorage.setItem('@DiscoteriaApp:email', res.email);
      await AsyncStorage.setItem('@DiscoteriaApp:nome', res.nome);
      this.props.dispatch(usuarioAction(true, res.nome, res.email, res.id, res.token));
      this.fechaCarregando();
    }
    catch(err) {
      this.fechaCarregando();
      this.abreAlerta( 'Usuário Criado, faça o login' );
    }
  }

  componentDidMount() {
    this.abreCarregando();
    this.verificaToken();
  }

  render () {

    return (

      <View style = { GridStyle.containerDeslogado }>

        <ScrollView style = { styles.containerContentLogin } >

          <Text style = { [ TextoStyle.titulo, { textAlign: 'center' } ] } >
            Crie sua conta sem pagar nada
          </Text>

          <TextInput
            autoCapitalize = "words"
            onChangeText = { ( text => { this.fechaAlerta(); this.setState( { nome: text } ) } ) }
            placeholder = "Digite seu nome" style={ [ FormStyle.inputs, { marginTop: 40 } ] }
          />

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

          <TextInput
            autoCapitalize = "none"
            secureTextEntry = { true }
            onChangeText = { ( text => { this.fechaAlerta(); this.setState( { repeteSenha: text } ) } ) }
            placeholder = "Repita a senha" style={ [ FormStyle.inputs, { marginTop: 20 } ] }
          />

          <View style={{marginTop: 20}}>
            <Botao
              titulo = "Criar Conta"
              onPress = { () => this.criarConta() }
            />
          </View>

          <View style = { styles.containerScreen }>

            <Text style = { [ TextoStyle.textoBranco, { textAlign: 'center' } ] } >
              Já tem uma conta?
            </Text>

            <TouchableHighlight
              onPress = { () => this.props.navigation.navigate( 'Login' ) }
              style = { styles.botaoLogin }
            >
              <Text style = { [ TextoStyle.textoBranco, { textAlign: 'center', fontWeight: '700', marginTop: 7 } ] } >
                Login
              </Text>
            </TouchableHighlight>

          </View>

        </ScrollView>

      </View>

    )

  }

}

const styles = StyleSheet.create({
  containerContentLogin: {
    width: Dimensions.get('window').width,
    maxWidth: 326,
    height: Dimensions.get('window').height,
    paddingTop: 50,
    paddingBottom: 20,
  },
  containerScreen: {
    width: '100%',
    marginTop: 20,
    height: 110,
    alignItems: 'center'
  },
  botaoLogin: {
    width: Dimensions.get('window').width,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    justifyContent: 'center'
  }
})

export default connect( state => ( { alerta: state.alerta, carregando: state.carregando, usuario: state.usuario } ) )( CriarConta )