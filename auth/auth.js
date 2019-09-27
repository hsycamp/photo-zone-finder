const isLoggedIn = (req, res, next) => {
  if (req.user) {
    return next();
  }
  return res.redirect("/sign-in");
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.user) {
    return next();
  }
  return res.redirect("/");
};

module.exports = { isLoggedIn, isNotLoggedIn };
