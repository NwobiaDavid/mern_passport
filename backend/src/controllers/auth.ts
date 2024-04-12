import express from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/userModel';

const router = express.Router();

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
  
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value
        });
      }
  
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);

// Initialize Passport and restore authentication state, if any, from the session.
router.use(passport.initialize());
router.use(passport.session());

// Serialize user object to store in session
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Deserialize user object from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  

// Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to home.
    res.redirect('/');
  }
);

export default router;
