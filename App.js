
import * as React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
//Components
import Carregando from './src/components/Carregando';
import Header from './src/components/Header';
import Menu from './src/components/Menu';
import Alerta from './src/components/Alerta';
//Screens
import CriarConta from './src/screens/CriarConta';
import Login from './src/screens/Login';
import MinhaColecao from './src/screens/MinhaColecao';
//Redux
import { Provider } from 'react-redux';
import store from './src/store';
import { carregandoAction } from './src/store/actions/carregando';
import { usuarioAction } from './src/store/actions/usuario';

const Stack = createStackNavigator();

class App extends React.Component {
  state = {
    logado: "carregando"
  }
  constructor(props) {
    super(props)
  }

  verificaToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@DiscoteriaApp:token');
      if( token ) {
        this.setState({
          logado: "logado"
        })
        store.dispatch( usuarioAction( true, '', '', '' ) )
      } else {
        console.log("Verifica Token: false");
        this.setState({
          logado: "deslogado"
        })
      }
    }
    catch (err) {
      this.setState({
        logado: "deslogado"
      })
      console.log("Verifica Token: false - ", err);
    }
  }

  componentDidMount() { this.verificaToken() }

  render() {
    if(this.state.logado == "carregando") {
      <View style = { styles.carregandoLogin } >
      </View>
    }
    return (

      <>
        <StatusBar barStyle = "dark-content" />
        <Provider store = { store }>
          <NavigationContainer>
            <Stack.Navigator headerMode = "null">
              { this.state.logado == "logado" ? (
                <>
                  <Stack.Screen name = "MinhaColecao" component = { MinhaColecao } />
                </>
              ) : (
                <>
                  <Stack.Screen name = "CriarConta" component = { CriarConta } />
                  <Stack.Screen name = "Login" component = { Login } />
                </>
              ) }
            </Stack.Navigator>
          </NavigationContainer>
          <Header />
          <Menu />
          <Alerta />
          <Carregando />
        </Provider>
      </>

    );

  }

}

const styles = StyleSheet.create({
  carregandoLogin: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 10,
    left: 0,
    top: 0,
    position: 'absolute'
  },
})

export default App;