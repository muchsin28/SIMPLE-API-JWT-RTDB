//Authentication
const { verifyToken } = require("./helper");
const Authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      res.status(401).json("Please Login");
    } else {
      const decoded = verifyToken(access_token);
      req.loggedIn = decoded;

      next();
    }
  } catch (err) {
    res.status(500).send("Invalid Token");
  }
};

module.exports = Authentication;
