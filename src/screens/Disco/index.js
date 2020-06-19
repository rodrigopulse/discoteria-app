import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
//Redux
import { connect } from 'react-redux';
import { carregandoAction } from '../../store/actions/carregando';
//API
import Album from '../../api/albuns';
const album = new Album();
//Styles
import GridStyle from '../../assets/styles/grid';

class Disco extends Component {

  state = {
    capa: '',
  }

  constructor( props ) {
    super( props )
  }

  getAlbum = () => {
    const idAlbum = this.props.route.params.id;
    album.getAlbum(idAlbum)
    .then( (res) => {
      let album = res.data
      this.setState({
        capa: album.capa,
      });
      this.fechaCarregando();
    })
    .catch( (res) => {
      console.log("Erro: ", res);
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
    this.getAlbum();
  }

  render() {

    return (

      <View style = { GridStyle.container }>

        { this.state.capa != '' &&

          <View>

          <Image
            source = {{ uri: `http://ec2-18-191-68-238.us-east-2.compute.amazonaws.com:9060/imagens/albuns/${this.state.capa}`}}
            style = { styles.capaAlbum }
          />

          </View>

        }
      </View>

    )

  }

}

const styles = StyleSheet.create({
  capaAlbum: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: "cover"
  }
})

export default connect( state => ( { usuario: state.usuario } ) )( Disco )
