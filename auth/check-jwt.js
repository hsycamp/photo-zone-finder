const jwt = require("jsonwebtoken");
const checkJwt = () => async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    req.user = false;
    return next();
  }

  try {
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    req.user = decodedToken.id;
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = checkJwt;
