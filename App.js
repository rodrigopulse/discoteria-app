
import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Screens
import CriarConta from './src/screens/CriarConta';
import Login from './src/screens/Login';
//Redux
import { Provider } from 'react-redux';
import store from './src/store';

const Stack = createStackNavigator();

class App extends React.Component {

  render() {

    return (

      <>
      <StatusBar barStyle = "dark-content" />
      <Provider store = { store }>
        <NavigationContainer>
          <Stack.Navigator headerMode="null">
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