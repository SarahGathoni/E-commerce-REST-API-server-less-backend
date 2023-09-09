// @see https://docs.aircode.io/guide/functions/
const aircode = require('aircode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Corrected this line by adding quotes around 'dotenv'

module.exports = async function (params, context) {
  console.log('Received params:', params);

  const { email, password } = params;

  if (!email || !password) {
    context.status(400);
    return { "message": 'all fields are required' };
  }

  const userTable = aircode.db.table('user');
  const user = await userTable
    .where({ email })
    .findOne();

  if (!user) {
    context.status(401);
    return { 'message': 'email or password is invalid' };
  }

  const matchPassword = await bcrypt.compare(password, user.password);
  if (matchPassword) {
    const accessToken = jwt.sign({
      'id': user._id,
      'isAdmin': user.isAdmin
    },
    process.env.ACCESS_TOKEN,
    { expires: '1d' }
    );

    const currentUser = { ...user, accessToken };
    await userTable.save(currentUser);
    context.status(200);
    return { accessToken };
  } else {
    context.status(401);
    return { 'message': 'email or password is invalid' };
  }
};
 
