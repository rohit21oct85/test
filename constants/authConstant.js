const JWT = {
  ADMIN_SECRET:'myjwtadminsecret',
  CLIENT_SECRET:'myjwtclientsecret',
  DESKTOP_SECRET:'myjwtdesktopsecret',
  EXPIRES_IN: 10000
};

const USER_ROLE = {
        
  Admin :1,
  User:2,
};

const PLATFORM = {
  ADMIN:1,
  CLIENT:2,
  DESKTOP:3,
    
};

let LOGIN_ACCESS = {
  [USER_ROLE.Admin]:[PLATFORM.ADMIN,PLATFORM.DESKTOP,PLATFORM.CLIENT],           
  [USER_ROLE.User]:[PLATFORM.CLIENT],           
};

const DEFAULT_ROLE = 1;

const ROLE_RIGHTS = {
    
  [USER_ROLE.Admin] : [
    'getAllByAdminInAdminPlatform',
    'getByAdminInAdminPlatform',
    'aggregateByAdminInAdminPlatform',
    'getCountByAdminInAdminPlatform',
    'createByAdminInAdminPlatform',
    'addBulkByAdminInAdminPlatform',
    'updateByAdminInAdminPlatform',
    'updateBulkByAdminInAdminPlatform',
    'partialUpdateByAdminInAdminPlatform',
    'deleteByAdminInAdminPlatform',
    'softDeleteByAdminInAdminPlatform',
    'upsertByAdminInAdminPlatform',
    'fileUploadByAdminInAdminPlatform',
    'logoutByAdminInAdminPlatform',
    'softDeleteManyByAdminInAdminPlatform',
    'deleteManyByAdminInAdminPlatform',
    'changePasswordByAdminInAdminPlatform',
    'updateProfileByAdminInAdminPlatform',
    'getAllByAdminInDesktopPlatform',
    'getByAdminInDesktopPlatform',
    'aggregateByAdminInDesktopPlatform',
    'getCountByAdminInDesktopPlatform',
    'createByAdminInDesktopPlatform',
    'addBulkByAdminInDesktopPlatform',
    'updateByAdminInDesktopPlatform',
    'updateBulkByAdminInDesktopPlatform',
    'partialUpdateByAdminInDesktopPlatform',
    'deleteByAdminInDesktopPlatform',
    'softDeleteByAdminInDesktopPlatform',
    'upsertByAdminInDesktopPlatform',
    'fileUploadByAdminInDesktopPlatform',
    'logoutByAdminInDesktopPlatform',
    'softDeleteManyByAdminInDesktopPlatform',
    'deleteManyByAdminInDesktopPlatform',
    'changePasswordByAdminInDesktopPlatform',
    'updateProfileByAdminInDesktopPlatform',
    'getAllByAdminInClientPlatform',
    'getByAdminInClientPlatform',
    'aggregateByAdminInClientPlatform',
    'getCountByAdminInClientPlatform',
    'createByAdminInClientPlatform',
    'addBulkByAdminInClientPlatform',
    'updateByAdminInClientPlatform',
    'updateBulkByAdminInClientPlatform',
    'partialUpdateByAdminInClientPlatform',
    'deleteByAdminInClientPlatform',
    'softDeleteByAdminInClientPlatform',
    'upsertByAdminInClientPlatform',
    'fileUploadByAdminInClientPlatform',
    'logoutByAdminInClientPlatform',
    'softDeleteManyByAdminInClientPlatform',
    'deleteManyByAdminInClientPlatform',
    'changePasswordByAdminInClientPlatform',
    'updateProfileByAdminInClientPlatform'
  ],
    
  [USER_ROLE.User] : [
    'getAllByUserInClientPlatform',
    'getByUserInClientPlatform',
    'aggregateByUserInClientPlatform',
    'getCountByUserInClientPlatform',
    'createByUserInClientPlatform',
    'addBulkByUserInClientPlatform',
    'updateByUserInClientPlatform',
    'updateBulkByUserInClientPlatform',
    'partialUpdateByUserInClientPlatform',
    'deleteByUserInClientPlatform',
    'softDeleteByUserInClientPlatform',
    'upsertByUserInClientPlatform',
    'fileUploadByUserInClientPlatform',
    'logoutByUserInClientPlatform',
    'softDeleteManyByUserInClientPlatform',
    'deleteManyByUserInClientPlatform',
    'changePasswordByUserInClientPlatform',
    'updateProfileByUserInClientPlatform'
  ],
    
};
const MAX_LOGIN_RETRY_LIMIT = 3;
const LOGIN_REACTIVE_TIME = 20;

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: false
  },
  EXPIRETIME: 15
};

module.exports = {
  JWT,
  USER_ROLE,
  DEFAULT_ROLE,
  ROLE_RIGHTS,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
    
};