const passport = require('passport');
const {
  ROLE_RIGHTS, USER_ROLE
} = require('../constants/authConstant');
const message = require('../utils/messages');
const responseStatusCode = require('../utils/responseCode');
const sendResponse = require('../helpers/sendResponse');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject('Unauthorized User');
  }
  req.user = user;
  if (!user.isActive) {
    return reject('User is deactivated');
  }
  if (requiredRights.length) {
    for (role in USER_ROLE){
      if (USER_ROLE[role] === user.role){
        const userRights = ROLE_RIGHTS[user.role];
        const hasRequiredRights = requiredRights.some((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights || !user.id) {
          return reject('Unauthorized user');
        }
      }
    }
  }
  resolve();
};

const auth = (...requiredRights) => async (req, res, next) => {

  let url = req.originalUrl;
    
  if (url.includes('admin')){
    return new Promise((resolve, reject) => {
      passport.authenticate('admin-rule', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((err) => {
        sendResponse(res,message.unAuthorizedRequest(
          { 'Content-Type': 'application/json' },
          responseStatusCode.unAuthorizedRequest,
          err
        ));
      });
  }
    
  else if (url.includes('client')){
    return new Promise((resolve, reject) => {
      passport.authenticate('client-rule', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((err) => {
        sendResponse(res,message.unAuthorizedRequest(
          { 'Content-Type': 'application/json' },
          responseStatusCode.unAuthorizedRequest,
          err
        ));
      });
  }
    
  else if (url.includes('desktop')){
    return new Promise((resolve, reject) => {
      passport.authenticate('desktop-rule', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((err) => {
        sendResponse(res,message.unAuthorizedRequest(
          { 'Content-Type': 'application/json' },
          responseStatusCode.unAuthorizedRequest,
          err
        ));
      });
  }
   
};

module.exports = auth;
