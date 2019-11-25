const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    "sign-in",
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password"
      },
      async (id, password, done) => {
        try {
          const user = await User.findUser(id);
          if (!user) {
            return done(null, false, { message: "존재하지 않는 아이디입니다" });
          }
          const validPassword = await user.checkPassword(password);
          if (!validPassword) {
            return done(null, false, { message: "비밀번호가 틀렸습니다" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "sign-up",
    new LocalStrategy(
      {
        usernameField: "id",
        passwordField: "password"
      },
      async (id, password, done) => {
        try {
          const existId = await User.findUser(id);
          if (existId) {
            return done(null, false, { message: "이미 존재하는 아이디입니다" });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await User.createUser(id, hashedPassword);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET
      },
      async (token, done) => {
        try {
          return done(null, token);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
