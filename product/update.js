// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const { title }=require('process');
const {verifyToken} = require('../helper/verifyToken');

module.exports = async function (params, context) {
  console.log('Received params:', params);
  const tokenUser = verifyToken(context)

  if(tokenUser != null && tokenUser.isAdmin){
    const{title, description, category, inStock, color, size} = params
  }

  const productTable = aircode.db.table('product');
  const product = await productTable
  .where({_id})
  .findOne()

  product.title = title
  product.description = description
  product.category = category
  product.inStock = inStock
  product.color = color
  product.size = size

  const result = await productTable.save(product)
};
