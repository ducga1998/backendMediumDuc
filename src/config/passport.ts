import { Kind } from 'graphql/language';
import passport from "passport";
import _ from "lodash";
const { Strategy: FacebookStrategy } = require('passport-facebook');
import { userModel as User } from '../data/models/user';
import { Request, Response, NextFunction } from "express";
import { Strategy as GitHubStrategy } from 'passport-github';
// import user from "data/queries/user";
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    console.log('done ====> ', done)
    done(err, user);
  });
});
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: `/auth/facebook/callback`,
  profileFields: ['name', 'email', 'link', 'locale', 'timezone', 'gender'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  console.log('profile =====>', profile)
  if (req.user) {
    console.log('req user =>>>>', req.user)
  } else {
    User.findOne({ facebook: profile.id }, (err, existingUser) => {
      if (err) { return done(err); }
      if (existingUser) {
        return done(undefined, existingUser);
      }
      User.findOne({ email: profile._json.email }, (err, existingEmailUser) => {
        if (err) { return done(err); }
        if (existingEmailUser) {
          req.flash("errors", { msg: "There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings." });
          done(err);
        } else {
          const user: any = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({ kind: "facebook", accessToken });
          user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
          user.profile.gender = profile._json.gender;
          user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
          user.profile.location = (profile._json.location) ? profile._json.location.name : "";
          user.save((err: Error) => {
            done(err, user);
          });
        }
      });
    });
  }
}));


/**
 * Login Required middleware.
 */
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
  callbackURL: 'https://80a9baa1.ngrok.io/auth/github/callback',
  passReqToCallback: true,
  scope: ['user:email']
}, async (req, accessToken, refreshToken, profile, done) => {
  const { id } = profile
  // console.log('req  user ====> ' , req.user, accessToken, profile) 
  User.find({ idUser: id }, (err, existsUser) => {
    if (err) {
      return
    }
    console.log('existsUser === > ', existsUser)
    if (!existsUser.length) {
      const user: any = new User();
      const profie = user.profile
      profie.push({ kind: 'github', data: profile })
      user.profile = profie
      const accessTokens = user.accessTokens
      accessTokens.push({
        kind: 'github',
        token: accessToken
      })
      user.accessToken = accessTokens
      user.idUser = id
      user.save(err => {
        done(err, user)
      })
    }
    else {
      done(null, profile)
    }
  })
}));

export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  console.log('req.user.tokens', req.user)
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split("/").slice(-1)[0];
  console.log('req.user.tokens 2', req.user.tokens)
  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
