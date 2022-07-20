const jsonwebtoken = require('jsonwebtoken');
const createError = require('http-errors');

const auth = {};

auth.verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    next(createError(401, 'Authenticated!'));
  }
  await jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) next(createError(403, 'Token Invalid!'));
    req.user = user;
    next();
  });
};

module.exports = auth;
