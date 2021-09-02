const jwt = require('jsonwebtoken');
const message = require('../utils/messages');
const responseCode = require('../utils/responseCode');
const sendResponse = require('../helpers/sendResponse');
const adminSecret = require('../config/constant').JWT.ADMIN_SECRET;
const clientSecret = require('../config/constant').JWT.CLIENT_SECRET;
const desktopSecret = require('../config/constant').JWT.DESKTOP_SECRET;
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    let url = req.originalUrl;
    let secret = '';
    if (url.includes('admin')){
      secret = adminSecret;
    }
    else if (url.includes('client')){
      secret = clientSecret;
    }
    else if (url.includes('desktop')){
      secret = desktopSecret;
    }
    jwt.verify(token,secret, (err, user) => {
      if (err) {
        sendResponse(res,  message.unAuthorizedRequest(
          { 'Content-Type': 'application/json' },
          responseCode.unAuthorizedRequest,
          err
        ));
      }
      req.user = user;
      next();
    });
  } else {
    sendResponse(res,  message.unAuthorizedRequest(
      { 'Content-Type': 'application/json' },
      responseCode.unAuthorizedRequest,
      {}
    ));
  }
};
module.exports = authenticateJWT;