
import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
//Screens
import CriarConta from './src/screens/CriarConta';
import Login from './src/screens/Login';
//Redux
import { Provider } from 'react-redux';
import store from './src/store';

const Stack = createStackNavigator();

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  verificaToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@DiscoteriaApp:token');
      if( token ) {
        return true
      } else {
        console.log("Verifica Token: false");
        return false
      }
    }
    catch (err) {
      console.log("Verifica Token: false - ", err);
      return false
    }
  }

  componentDidMount() {
    console.log(this.props)
    this.verificaToken()
  }

  render() {

    return (

      <>
      <StatusBar barStyle = "dark-content" />
      <Provider store = { store }>
        <NavigationContainer>
          <Stack.Navigator headerMode = "null" initialRouteName = "CriarConta">
            <Stack.Screen name = "CriarConta" component = { CriarConta } />
            <Stack.Screen name = "Login" component = { Login } />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      </>

    );

  }

}

export default App;