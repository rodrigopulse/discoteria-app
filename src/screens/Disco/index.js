import React, { Component } from 'react';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
//Redux
import { connect } from 'react-redux';
import { carregandoAction } from '../../store/actions/carregando';
//API
import Album from '../../api/albuns';
const album = new Album();
//Styles
import GridStyle from '../../assets/styles/grid';
import Cores from '../../assets/styles/cores';
import TextoStyle from '../../assets/styles/texto';
class Disco extends Component {

  state = {
    capa: '',
  }

  constructor( props ) {
    super( props )
  }

  getAlbum = () => {
    const idAlbum = this.props.route.params.id;
    console.log(idAlbum)
    album.getAlbum(idAlbum)
    .then( (res) => {
      console.log(res)
      let album = res.data
      console.log(album)
      this.setState({
        capa: album.capa,
        nomeAlbum: album.nome,
        artista: album.artista,
        ano: album.ano,
        genero: album.genero,
        ladoA: album.ladoa,
        ladoB: album.ladob
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

          <ScrollView>

            <Image
              source = {{ uri: `http://ec2-18-191-68-238.us-east-2.compute.amazonaws.com:9060/imagens/albuns/${this.state.capa}`}}
              style = { styles.capaAlbum }
            />

            <View style = { styles.containerItem }>

              <Text style = { styles.nomeArtista }>{ this.state.artista }</Text>

              <Text style = { TextoStyle.textoBrancoNegrito }>
                Álbum: <Text style = { TextoStyle.textoBranco }>{ this.state.nomeAlbum }</Text>
              </Text>

              <Text style = { TextoStyle.textoBrancoNegrito }>
                Ano de Lançamento: <Text style = { TextoStyle.textoBranco }>{ this.state.ano }</Text>
              </Text>

              <Text style = { TextoStyle.textoBrancoNegrito }>
                Gênero: <Text style = { TextoStyle.textoBranco }>{ this.state.genero }</Text>
              </Text>

            </View>

            <View style = { styles.containerItem }>

              <Text style = { styles.ladoDisco }>Lado A</Text>

              { this.state.ladoA.map( (item, key) =>
                <Text style = { TextoStyle.textoBranco } key = { key }>
                  { key + 1 }. { item }
                </Text>
              )}


            </View>

            <View style = { [ styles.containerItem, { marginBottom: 20 } ] }>

              <Text style = { styles.ladoDisco }>Lado B</Text>

              { this.state.ladoB.map( (item, key) =>
                <Text style = { TextoStyle.textoBranco } key = { key }>
                  { key + 1 }. { item }
                </Text>
              )}

            </View>

          </ScrollView>

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
  },
  containerItem: {
    width: '100%',
    marginTop: 20
  },
  nomeArtista: {
    fontSize: 30,
    fontWeight: '700',
    color: Cores.corPrimaria
  },
  ladoDisco: {
    fontSize: 22,
    fontWeight: '700',
    color: Cores.corPrimaria
  }
})

export default connect( state => ( { usuario: state.usuario } ) )( Disco )
