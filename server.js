var jwt = require('jsonwebtoken');
const express = require('express');

const app = express()
const port = 3000

app.listen(port, () => console.log(`app listening on port ${port}!`))

console.log('app is running')

//simpleJWT();
//tokenConAlgoritmo();
//tokenConCallBack();
//tokenConCaducidad(); 
//verificarToken();
verificarTokenOpt2();

//JWT SIMPLE solo tiene claims y secretKey

function simpleJWT(){
    const secretKey= 'secretKey' // secret key que será usadaen el token
    const claims= { //contenido del JWT playload
        userName:'the user name'
    }
    const token= jwt.sign(claims, secretKey);

    console.log(token);
}

//JWT con algoritmo
function tokenConAlgoritmo () {
    const secretKey = 'secretKey';

    const claims= {
        userName: 'The user name'
    
    }
    const token = jwt.sign(claims,secretKey, { algorithm: 'HS256'});
    console.log(token);
}

//token con callback
function tokenConCallBack() {
    const secretKey = 'secretKey'; //secretKey que se usraá en el token
    
    const claims= {
        userName: 'The user name'
    }
    jwt.sign(claims,secretKey, {algorithm:'HS256'}, function (err,token) {
console.log(token)
    });
    console.log('generado..')
}

//token con fecha de expiración
function tokenConCaducidad() {
  //Opción 1
  //se define la fecha en el claim
  /*  
  const token = jwt.sign({
        userName: 'The user name',
        exp: Math.floor(Date.now() / 1000) + (60 *60)
    }, 'secretKey', {algorithm: 'HS256'});
    console.log(token);
    */

    //opcion2
    const token = jwt.sign({
        userName: 'some name',
    }, 
    'secretKey',
    {
        expiresIn: '1h',
        algorithm: 'HS256'
    });
    console.log(token)
}


//verificar Token
function verificarToken() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNvbWUgbmFtZSIsImlhdCI6MTU2MTU2Mzc4NywiZXhwIjoxNTYxNTY3Mzg3fQ.z0CFi7kzmp595hH7vB8Yy3dp8g6baeWt3lPOFPjBWRY'
    

    try {
        const tokenDecoded = jwt.verify(token, 'secretKey22323');
        console.log(tokenDecoded)
    }catch (err) {
        console.log(err)
        console.log('token invalido')
    } 
}
    
function verificarTokenOpt2() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InNvbWUgbmFtZSIsImlhdCI6MTU2MTU2Mzc4NywiZXhwIjoxNTYxNTY3Mzg3fQ.z0CFi7kzmp595hH7vB8Yy3dp8g6baeWt3lPOFPjBWRY'
    jwt.verify(token, 'secretKey', function (err, token) {
        if (err) {
            console.log(err)
        }else {
            console.log(token)
        }
    });
}
