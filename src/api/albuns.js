import axios from 'axios';

export default class Album {
  getColecao( idUsuario, token ) {
    console.log(idUsuario)
    return new Promise ( (resolve, reject) => {
      axios({
        url: `http://10.0.3.2:3333/colecao/id/${idUsuario}`,
        headers: {
          'x-access-token': token,
          'id-user': idUsuario
        },
        method: "GET"
      })
      .then( ( res ) => { resolve( res ); console.log(res) } )
      .catch( (err) => { reject ( err ); console.log(err) } )
    })
  }
  getAlbum( idAlbum ) {
    return new Promise ( (resolve, reject) => {
      axios({
        url: `http://10.0.3.2:3333/albuns/id/${idAlbum}`,
        method: "GET"
      })
      .then( ( res ) => { resolve( res ) } )
      .catch( (err) => { reject ( err ) } )
    })
  }
}