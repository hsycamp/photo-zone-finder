const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("./user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password",
        session: true,
        passReqToCallback: false
      },
      (id, password, done) => {
        Users.findOne({ id: id }, (findError, user) => {
          if (findError) return done(findError);
          if (!user) {
            return done(null, false, { message: "존재하지 않는 아이디입니다" });
          }
          if (!user.checkPassword(password)) {
            return done(null, false, { message: "비밀번호가 틀렸습니다" });
          }
          return done(null, user);
        });
      }
    )
  );
};
