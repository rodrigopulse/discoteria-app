import axios from 'axios';

export default class Usuario {
  criarConta( data ) {
    return new Promise ( (resolve, reject) => {
      axios({
        url: `http://10.0.3.2:3333/usuario/criar`,
        data: data,
        method: "POST"
      })
      .then( ( res ) => { resolve( res ) } )
      .catch( (err) => { reject ( err ) } )
    })
  }
  login( data ) {
    return new Promise ( (resolve, reject) => {
      axios({
        url: `http://10.0.3.2:3333/usuario/login`,
        data: data,
        method: "POST"
      })
      .then( ( res ) => {
        resolve( res.data )
      } )
      .catch( (err) => { reject ( err ) } )
    })
  }
}