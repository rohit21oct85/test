const {
  JWT,LOGIN_ACCESS,
  PLATFORM,MAX_LOGIN_RETRY_LIMIT,LOGIN_REACTIVE_TIME,FORGOT_PASSWORD_WITH
} = require('../constants/authConstant');
const jwt = require('jsonwebtoken');
const common = require('../utils/common');
const moment = require('moment');
const sendEmail = require('./email/emailService');
const sendSMS = require('./sms/smsService');
const uuid = require('uuid').v4;
const bcrypt = require('bcrypt');

async function generateToken (user,secret){
  return jwt.sign( {
    id:user.id,
    username:user.username
  }, secret, { expiresIn: JWT.EXPIRES_IN });
}

function makeAuthService ({
  model,userService
}) {
  const loginUser = async (username,password,url) => {
    try {
      let where = { username:username };
      const user = await model.findOne(where);
      if (user) {
        if (user.loginRetryLimit >= MAX_LOGIN_RETRY_LIMIT){
          if (user.loginReactiveTime){
            let now = moment();
            let limitTime = moment(user.loginReactiveTime);
            if (limitTime > now){
              let expireTime = moment().add(LOGIN_REACTIVE_TIME,'minutes').toISOString();
              await userService.updateDocument(user.id,{
                loginReactiveTime:expireTime,
                loginRetryLimit:user.loginRetryLimit + 1  
              });
              return {
                flag:true,
                data:`you have exceed the number of limit.you can login after ${LOGIN_REACTIVE_TIME} minutes.`
              }; 
            }
          } else {
            // send error
            let expireTime = moment().add(LOGIN_REACTIVE_TIME,'minutes').toISOString();
            await userService.updateDocument(user.id,{
              loginReactiveTime:expireTime,
              loginRetryLimit:user.loginRetryLimit + 1 
            });
            return {
              flag:true,
              data:`you have exceed the number of limit.you can login after ${LOGIN_REACTIVE_TIME} minutes.`
            }; 
          } 
        }
        const isPasswordMatched = await user.isPasswordMatch(password);
        if (isPasswordMatched) {
          const userData = user.toJSON();
          let token;
          if (!user.role) {
            return {
              flag:true,
              data:'You have not been assigned role.'
            };
          }
          if (url.includes('admin')){
            if (!LOGIN_ACCESS[user.role].includes(PLATFORM.ADMIN)){
              return {
                flag:true,
                data:'you are unable to access this platform'
              };
            }
            token = await generateToken(userData,JWT.ADMIN_SECRET);
          }
          else if (url.includes('client')){
            if (!LOGIN_ACCESS[user.role].includes(PLATFORM.CLIENT)){
              return {
                flag:true,
                data:'you are unable to access this platform'
              };
            }
            token = await generateToken(userData,JWT.CLIENT_SECRET);
          }
          else if (url.includes('desktop')){
            if (!LOGIN_ACCESS[user.role].includes(PLATFORM.DESKTOP)){
              return {
                flag:true,
                data:'you are unable to access this platform'
              };
            }
            token = await generateToken(userData,JWT.DESKTOP_SECRET);
          }
          if (user.loginRetryLimit){
            await userService.updateDocument(user.id,{
              loginRetryLimit:0,
              loginReactiveTime:''
            });
          }
          const userToReturn = {
            ...userData,
            ...{ token } 
          };
          return {
            flag:false,
            data:userToReturn
          };
        } else {
          await userService.updateDocument(user.id,{ loginRetryLimit:user.loginRetryLimit + 1 });
          return {
            flag:true,
            data:'incorrect password'
          };
        }
      } else {
        return {
          flag:true,
          data:'User not exists'
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const changePassword = async (params) => {
    try {
      let password = params.newPassword;
      let oldPassword = params.oldPassword;
      let user = await userService.getSingleDocumentById(params.userId);
      if (user && user.id) {
        let isPasswordMatch = await user.isPasswordMatch(oldPassword);
        if (!isPasswordMatch){
          return {
            flag:true,
            data:'Incorrect old password'
          };
        }
        password = await bcrypt.hash(password, 8);
        let updatedUser = userService.updateDocument(user.id, { password:password });
        if (updatedUser) {
          return {
            flag:false,
            data:'Password changed successfully.'
          };
        }
        return {
          flag:true,
          data:'Password not updated'
        };
      }
      return {
        flag:true,
        data:'User not found'
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  const sendResetPasswordNotification = async (user) => {
    let resultOfEmail = false;
    let resultOfSMS = false;
    try {
      if (FORGOT_PASSWORD_WITH.LINK.email){
        resultOfEmail = await sendEmailForResetPasswordLink(user);
      }
      if (FORGOT_PASSWORD_WITH.LINK.sms){
        resultOfSMS = await sendSMSForResetPasswordLink(user);
      }
      return {
        resultOfEmail,
        resultOfSMS 
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
    
  const resetPassword = async (user, newPassword) => {
    try {
      let where = { _id: user.id };
      const dbUser = await userService.getSingleDocumentByQuery(where);
      if (!dbUser) {
        return {
          flag: true,
          data: 'user not found',
        };
      }
      newPassword = await bcrypt.hash(newPassword, 8);
      await userService.updateDocument(user.id, {
        password: newPassword,
        resetPasswordLink: null,
        loginRetryLimit:0
      });
      let mailObj = {
        subject: 'Reset Password',
        to: user.email,
        template: '/views/successfullyResetPassword',
        data: {
          isWidth: true,
          email: user.email || '-',
          message: 'Password Successfully Reset'
        }
      };
      await sendEmail(mailObj);
      return {
        flag: false,
        data: 'Password reset successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  };
    
  const sendEmailForResetPasswordLink = async (user) => {
    try {
      let token = uuid();
      let expires = moment();
      expires = expires.add(FORGOT_PASSWORD_WITH.EXPIRETIME, 'minutes').toISOString();
      await userService.updateDocument(user.id,
        {
          resetPasswordLink: {
            code: token,
            expireTime: expires 
          } 
        });
      let updatedUser = await userService.getSingleDocumentByQuery(User,{ _id:user.id });
      let mailObj = {
        subject: 'Reset Password',
        to: user.email,
        template: '/views/ResetPassword',
        data:updatedUser
      };
      await sendEmail(mailObj);
      return true;
    } catch (e) {
      return false;
    }
  };
  async function sendSMSForResetPasswordLink (user) {
    try {
      let token = uuid();
      let expires = moment();
      expires = expires.add(FORGOT_PASSWORD_WITH.EXPIRETIME, 'minutes').toISOString();
      await userService.updateDocument(User,user.id,
        {
          resetPasswordLink: {
            code: token,
            expireTime: expires 
          } 
        });
      let viewType = '/reset-password/';
      let msg = `Click on the link to reset your password.
                http://localhost:${process.env.PORT}${viewType + token}`;
      let smsObj = {
        to:user.mobileNo,
        message:msg
      };
      await sendSMS(smsObj);
      return true;
    } catch (e) {
      return false;
    }
  }
    
  return Object.freeze({
    loginUser,
    changePassword,
    resetPassword,
    sendResetPasswordNotification,
  });
}

module.exports = makeAuthService;