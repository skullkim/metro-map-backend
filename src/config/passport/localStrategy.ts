import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { User } from '../../models/user';
import { ErrorMessage } from '../../utils/type/auth';

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const exUser: User | undefined = await User.getUser(email);
          if (!exUser) {
            return done(null, false, { message: ErrorMessage.DidNotSignUpYet });
          }

          const isValidPassword = await bcrypt.compare(
            password,
            exUser.password
          );
          if (!isValidPassword) {
            return done(null, false, { message: ErrorMessage.WrongPassword });
          }

          if (!exUser.checkedEmail) {
            return done(null, false, {
              message: ErrorMessage.DidNotVerifyEmailYet,
            });
          }

          done(null, exUser);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
