const jwt = require("jsonwebtoken");
const config = require("../config");

const checkJwt = () => async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.user = false;
    return next();
  }

  try {
    const decodedToken = await jwt.verify(token, config.secret);
    req.user = decodedToken.id;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = checkJwt;
