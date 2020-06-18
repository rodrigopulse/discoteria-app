import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
//Redux
import { connect } from 'react-redux';
//Components
import Card from '../../components/Card';
//API
import Album from '../../api/albuns';
const album = new Album();
//Styles
import GridStyle from '../../assets/styles/grid';

class MinhaColecao extends Component {

  state = {
    colecao: [],
  }

  constructor( props ) {
    super( props )
  }

  getColecao = ( idUsuario ) => {
    album.getColecao( idUsuario )
    .then( ( res ) => {
      this.setState({
        colecao: res.data.data[0]
      })
      console.log("Coleçao: ", this.state.colecao)
    })
    .catch( () => {
    })
  }

  componentDidMount() {
    this.getColecao( this.props.usuario.id )
  }

  render() {

    return (

      <ScrollView style = { GridStyle.container }>
        { this.state.colecao.length === 0 ? ( null ) : (
          <View>
            {this.state.colecao.albuns.map( (item, key) =>
              <Card
                key = { key }
                album = { item.nome }
                artista = { item.artistas[0].nome }
                ano = { item.ano }
                capa = { item.capa }
                id = { item._id } />
            )}
          </View>
        )}
      </ScrollView>

    )

  }

}

export default connect( state => ( { usuario: state.usuario } ) )( MinhaColecao )