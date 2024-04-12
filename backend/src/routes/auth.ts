import express from 'express';
import passport from 'passport';
// import GoogleStrategy from 'passport-google-oauth20';
// import User from '../models/userModel';

const router = express.Router();

// Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to home.
    res.redirect('/');
  }
);

export default router;
