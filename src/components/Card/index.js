import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
//Styles
import Cores from '../../assets/styles/cores';

const Card = (props) => {
  console.log(props.image)
  return (
    <View style = { styles.card }>
      {props.capa ? (
        <Image
          source={{ uri: `${props.capa}`,}}
          style = { styles.capaAlbum }
        />
      ) : (
        <Image
          source = { require('../../assets/images/album.png') }
          style = { styles.capaAlbum }
        />
      )}
      <View style = { styles.cardConteudo } >
        <Text style = { styles.nomeAlbum }>
          { props.album }
        </Text>
        <Text style = { styles.nomeArtista }>
          { props.artista }
        </Text>
        <Text style = { styles.anoAlbum }>
          { props.ano }
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffffff',
    paddingRight: 20
  },
  cardConteudo: {
    paddingLeft: 10,
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  nomeAlbum: {
    fontSize: 13,
    fontWeight: '700',
    color: Cores.corTexto,
    flexWrap: 'wrap'
  },
  nomeArtista: {
    fontSize: 13,
    color: Cores.corTexto
  },
  anoAlbum: {
    fontSize: 13,
    color: Cores.corTexto
  },
  capaAlbum: {
    width: 116,
    height: 116,
  }
})

export default Card