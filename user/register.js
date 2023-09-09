// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
//const bcrypt = require('bcrypt');

module.exports = async function (params, context) {
  console.log('Received params:', params);
  console.log('Received params:', params);

  const {name, email, password} = params;
  if (!name || !email || !password){
    context.status(400);
    return{
      "message": "all fields are required"
    }
    
  }

  //User database
  const userTable = aircode.db.table('user')
  const userExist = await userTable
  .where({email})
  .findOne()

  if (userExist){
    context.status(409);
    return{
      "message": "user exists"
    }
  }
  try{
    const count = await userTable
    .where()
    .count()
  
    console.log(`the user count is: ${count}`)
  
    //const harshedPasswword = await bcrypt.hash(password, 10);
    const newUser = {name, email, password, "isAdmin": false}

  if(count == 0){
    newUser.isAdmin = true
  }
    await userTable.save(newUser);

  const result = await userTable
  .where(email)
  .projection({password:0, isAdmin:0})
  .find()

  context.status(201)
  
  return{
    ...result
  }
  }catch(error){
    context.status(500)
    return {"message": error.message}
  }
}

  
  
