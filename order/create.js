// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {verifyToken} = require('../helper/verifyToken');

module.exports = async function (params, context) {

  const tokenUser = await verifyToken(context)
  if(tokenUser != null){
    const {products, amount, status, address} = params;
  }
  if(!products || !amount || !status || !address){
    context.satus(400)

    return{
      'message': 'prducts, amount, status, addres required'
    }
  }
  try{
    const orderTable = aicode.db.table('order')
    const order = await orderTable.save(...params, tokenUser._id)
    context.status(201)
  }catch(err){
    
  }
  
};
