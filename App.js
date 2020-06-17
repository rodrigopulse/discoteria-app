
import * as React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './RootNavigation';
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

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (

      <>
        <StatusBar barStyle = "dark-content" />
        <Provider store = { store }>
          <NavigationContainer ref = { navigationRef }>
            <Stack.Navigator headerMode = "null">
              <Stack.Screen name = "CriarConta" component = { CriarConta } />
              <Stack.Screen name = "Login" component = { Login } />
              <Stack.Screen name = "MinhaColecao" component = { MinhaColecao } />
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

export default App;