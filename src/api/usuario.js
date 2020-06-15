import axios from 'axios';

export default class Usuario {
  criarConta( data ) {
    return new Promise ( (resolve, reject) => {
      axios({
        url: `http://ec2-18-191-68-238.us-east-2.compute.amazonaws.com:9060/usuarios/criar`,
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
        url: `http://ec2-18-191-68-238.us-east-2.compute.amazonaws.com:9060/usuarios/login`,
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