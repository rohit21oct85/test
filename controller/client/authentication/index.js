const db = require('../../../config/db');
const userModel  = require('../../../model/user')(db);
const {
  schemaKeys,updateSchemaKeys
} = require('../../../validation/userValidation');
const insertUserValidator = require('../../../validation/genericValidator')(schemaKeys);
const updateUserValidator = require('../../../validation/genericValidator')(updateSchemaKeys);
const makeUser = require('../../../entity/user')({
  insertUserValidator,
  updateUserValidator
});
const userService = require('../../../services/mongoDbService')({
  model:userModel,
  makeUser
});
const authService = require('../../../services/auth')({
  model:userModel,
  makeUser,
  userService
});
const makeUniqueValidation = require('../../../utils/common.js').makeUniqueValidation(userService);
const makeAuthController = require('./authController');
const authController = makeAuthController({
  authService,
  makeUniqueValidation,
  userService,
  makeUser
});
module.exports = authController;