'use strict';

let passport = require('passport');
let Strategy = require('passport-local').Strategy;

let MemberRepository = require('../repositories/member_repository');

let passportConfig = {
  init: () => {
    let memberRepo = new MemberRepository();
    passport.serializeUser((user, done) => {
      done(null, user.username);
    });

    passport.deserializeUser((email, done) => {
      memberRepo.findByEmail(email, data => {
        done(null, data);
      }, err => {
        if(err){
          done(err);
        }
      });
    });

    let strategy = new Strategy({usernameField: 'email', passwordField: 'password', passReqToCallback: true}, (req, username, password, done) => {
      memberRepo.findByEmail(username, result => {
        if(!result){
          done(null, false, req.flash('message', 'Username or password is not valid !!'));
        } else if(!result.isValidPassword(password)){
          done(null, false, req.flash('message', 'Username or password is not valid !!'));
        } else {
          done(null, result);
        }
      }, err => {
        if(err){
          done(null, false, req.flash('message', 'Username or password is not valid !!'));
        }
      });
    });

    passport.use('local', strategy);
    return passport.initialize();
  },

  auth: () => {
    return passport.authenticate('local', {successRedirect: '/profile', failureRedirect: '/login', failureFlash: true});
  },

  session: () => {
    return passport.session();
  }
};

module.exports = passportConfig;
