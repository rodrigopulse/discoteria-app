import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
//Components
import Card from '../../components/Card';
//Styles
import GridStyle from '../../assets/styles/grid';

class MinhaColecao extends Component {

  render() {

    return (

      <ScrollView style = { GridStyle.container }>
        <Card album = "Sgt Pepper’s Lonely Hearts Club Band" artista = "The Beatles" ano = "1970" />
      </ScrollView>

    )

  }

}

export default MinhaColecao