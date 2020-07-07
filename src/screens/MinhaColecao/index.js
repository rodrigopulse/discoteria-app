import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
//Redux
import { connect } from 'react-redux';
import { carregandoAction } from '../../store/actions/carregando';
//Components
import Card from '../../components/Card';
//API
import Album from '../../api/albuns';
const album = new Album();
//Styles
import GridStyle from '../../assets/styles/grid';
import TextoStyle from '../../assets/styles/texto';

class MinhaColecao extends Component {

  state = {
    colecao: [],
  }

  constructor( props ) {
    super( props )
  }

  getColecao = ( idUsuario, token ) => {
    album.getColecao( idUsuario, token )
    .then( ( res ) => {
      if(res.data != null) {
        this.setState({
          colecao: res.data
        })
      }
      this.fechaCarregando();
    })
    .catch( () => {
      this.fechaCarregando();
    })
  }

  abreCarregando = () => {
    this.props.dispatch( carregandoAction( true ) )
  }

  fechaCarregando = () => {
    this.props.dispatch( carregandoAction( false ) )
  }

  componentDidMount() {
    this.abreCarregando();
    this.getColecao( this.props.usuario.id, this.props.usuario.token )
  }

  render() {

    return (

      <ScrollView style = { GridStyle.container }>

        { this.state.colecao.length === 0 ? (

          <View>
            <Text style = { TextoStyle.textoBranco }>Nenhum disco na sua coleção</Text>
          </View>

         ) : (

          <View>

            {this.state.colecao.albuns.map( ( item, key ) =>
              <Card
                key = { key }
                album = { item.nome }
                artista = { item.artista }
                ano = { item.ano }
                capa = { item.capa }
                id = { item.id } />
            )}

          </View>

        )}

      </ScrollView>

    )

  }

}

export default connect( state => ( { usuario: state.usuario } ) )( MinhaColecao )