const jwt = require("jsonwebtoken");

const generateJwt = async (res, userInfo) => {
  const token = await jwt.sign({ userInfo }, process.env.SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 10
  });
};

module.exports = generateJwt;
