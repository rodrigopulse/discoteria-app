import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
//Styles
import GridStyle from '../../assets/styles/grid';

class MinhaColecao extends Component {

  render() {

    return (

      <ScrollView style = { GridStyle.container }>
        <Text>Minha Coleção</Text>
      </ScrollView>

    )

  }

}

export default MinhaColecao