import axios from 'axios';

export default class Album {
  getColecao( idUsuario ) {
    return new Promise ( (resolve, reject) => {
      axios({
        url: `http://ec2-18-191-68-238.us-east-2.compute.amazonaws.com:9060/colecao/id?id=${idUsuario}`,
        method: "GET"
      })
      .then( ( res ) => { resolve( res ) } )
      .catch( (err) => { reject ( err ) } )
    })
  }
}