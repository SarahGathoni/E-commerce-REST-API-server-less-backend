// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');

module.exports = async function (params, context) {
  console.log('Received params:', params);
  const {verifyToken} = require('../helper/verifyToken');


module.exports = async function (params, context) {
  console.log('Received params:', params);
  //we can only delete a user that is logged in we pass the verifytoken fun o check if user is logged in
  const tokenUser = await verifyToken(context);
  if(tokenUser != null){
    const{_id} = tokenUser
    const {name} = params
  }
  const userTable =  aircode.db.table('user');
  const user = await userTable()
  .where({_id})
  .project({isAdmin:0, password:0, accessToken:0})
  .findOne()

  user.name = name;

  try{
    const result = await userTable.delete(user)
    context.status(204)
    return{
      result
    }
  }catch(error){
    context.status(500)
    return{
      'message': error.message
    }
  }
  
};
};
