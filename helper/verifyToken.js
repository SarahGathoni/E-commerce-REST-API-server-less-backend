// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const jwt = require('jsonwebtoken');
require('dotenv').config;

//ensure to export the helper function
module.exports.verifyToken = async function (context) {
  console.log('Received params:', params);
 let token;
  let authHeader = context.headers.Authorization || context.headers.authorization;
  console.log(authHeader)

  if(authHeader && authHeader.startswith('Bearer')){
    token = authHeader.split('')[1];
    console.log(token);
  }
  try{
    const user = jwt.verify(token, process.env.ACCESS_TOKEN)
    cnsole.log(`the looged in user is: ${user}`)
    return user
  }catch(error){
    return null
  }
  if(!token){
    return null
  }
};
