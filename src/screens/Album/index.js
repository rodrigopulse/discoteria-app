import React, { Component } from 'react'
import { Text, View } from 'react-native'
//Styles
import GridStyle from '../../assets/styles/grid';

class Album extends Component {

  render() {

    return (

      <View style = { GridStyle.container }>
        <Text> Álbum </Text>
      </View>

    )

  }

}
export default Album
