const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = payload => {
  return jwt.sign(payload, process.env.SECRET);
};

const verifyToken = token => {
  return jwt.verify(token, process.env.SECRET);
};
const hashPassword = plain => bcrypt.hashSync(plain, +process.env.SALT);
const checkPassword = (plain, hash) => bcrypt.compareSync(plain, hash);

module.exports = { hashPassword, checkPassword, generateToken, verifyToken };
