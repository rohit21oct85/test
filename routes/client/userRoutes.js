const express = require('express');
const router = express.Router();
const userController = require('../../controller/client/user');
const adaptRequest = require('../../helpers/adaptRequest');
const sendResponse = require('../../helpers/sendResponse');
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');

router.post('/client/api/v1/user/create',auth(...[ 'createByAdminInClientPlatform', 'createByUserInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.addUser({ data:req.body }).then((result)=>{
    sendResponse(res, result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

router.post('/client/api/v1/user/list',auth(...[ 'getAllByAdminInClientPlatform', 'getAllByUserInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.findAllUser({
    data: req.body,
    loggedInUser:req.user
  }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

router.get('/client/api/v1/user/:id',auth(...[ 'getByAdminInClientPlatform', 'getByUserInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.getUserById(req.pathParams.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

router.route('/client/api/v1/user/count').post(auth(...[ 'getCountByAdminInClientPlatform', 'getCountByUserInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.getUserCount(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

router.route('/client/api/v1/user/aggregate').post(auth(...[
  'aggregateByAdminInClientPlatform',
  'aggregateByUserInClientPlatform'
]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.getUserByAggregate({ data:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

router.put('/client/api/v1/user/update/:id',auth(...[ 'updateByAdminInClientPlatform', 'updateByUserInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.updateUser(req.body,req.pathParams.id,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   

router.put('/client/api/v1/user/partial-update/:id',auth(...[
  'partialUpdateByAdminInClientPlatform',
  'partialUpdateByUserInClientPlatform'
]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.partialUpdateUser(req.body,req.pathParams.id,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});   

router.put('/client/api/v1/user/softDelete/:id',auth(...[
  'softDeleteByAdminInClientPlatform',
  'softDeleteByUserInClientPlatform'
]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.softDeleteUser(req.pathParams.id,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

router.put('/client/api/v1/user/softDeleteMany',auth(...[
  'softDeleteManyByAdminInClientPlatform',
  'softDeleteManyByUserInClientPlatform'
]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.softDeleteManyUser(req.body.ids,req.user).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

router.post('/client/api/v1/user/addBulk',auth(...[ 'addBulkByAdminInClientPlatform', 'addBulkByUserInClientPlatform' ]),checkRolePermission,(req,res,next)=>{
  userController.bulkInsertUser({ body:req.body }).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

router.put('/client/api/v1/user/updateBulk',auth(...[
  'updateBulkByAdminInClientPlatform',
  'updateBulkByUserInClientPlatform'
]),checkRolePermission,(req,res,next)=>{
  req = adaptRequest(req);
  userController.bulkUpdateUser(req.body).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
}); 

router.route('/client/api/v1/user/change-password').put(auth(...[
  'changePasswordByAdminInClientPlatform',
  'changePasswordByUserInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  let params = {
    ...req.body,
    userId:req.user.id
  };
  userController.changePassword(params).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});
router.route('/client/api/v1/user/update-profile').put(auth(...[
  'updateProfileByAdminInClientPlatform',
  'updateProfileByUserInClientPlatform'
]),(req,res,next)=>{
  req = adaptRequest(req);
  userController.updateProfile(req.body,req.user.id).then((result)=>{
    sendResponse(res,result);
  })
    .catch((e) => {
      sendResponse(res,e);
    });
});

module.exports = router;