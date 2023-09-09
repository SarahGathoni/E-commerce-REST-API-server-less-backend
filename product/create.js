// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const {verifyToken} = require('../helper/verifyToken');

module.exports = async function (params, context) {
  console.log('Received params:', params);
  const tokenUser = verifyToken(context);

  if(tokenUser != null && tokenUser.isAdmin){
    const{title, description, category, inStock, color, size} = params;
  }
  productTable = aircode.db.table('product')
  

  const productExists = await productTable
  .where({title})
  .findOne()
  
  if(productExists){
    context.status(400)
    return{
      'message': 'product exists'
    }
  }try{
    const result = await productTable.save(params)
    context.status(201)
    return{
      result
    }
  }
  catch(err){
    context.status(500)
    return{'message': err.message}
  }
  
};
