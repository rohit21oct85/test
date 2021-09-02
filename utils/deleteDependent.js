const db = require('../config/db');
let User = require('../model/user')(db);
let Role = require('../model/role')(db);
let ProjectRoute = require('../model/projectRoute')(db);
let RouteRole = require('../model/routeRole')(db);
let UserRole = require('../model/userRole')(db);

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const userFilter2577 = { 'addedBy': { '$in': user } };
      const user1266 = await deleteUser(userFilter2577);
      const userFilter1744 = { 'updatedBy': { '$in': user } };
      const user4315 = await deleteUser(userFilter1744);
      const userRoleFilter1450 = { 'userId': { '$in': user } };
      const userRole2894 = await deleteUserRole(userRoleFilter1450);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter5045 = { 'roleId': { '$in': role } };
      const routeRole5834 = await deleteRouteRole(routeRoleFilter5045);
      const userRoleFilter4853 = { 'roleId': { '$in': role } };
      const userRole9248 = await deleteUserRole(userRoleFilter4853);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectRoute = await ProjectRoute.find(filter, { _id:1 });
    if (projectRoute.length){
      projectRoute = projectRoute.map((obj) => obj._id);
      const routeRoleFilter5994 = { 'routeId': { '$in': projectRoute } };
      const routeRole1999 = await deleteRouteRole(routeRoleFilter5994);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const userFilter4426 = { 'addedBy': { '$in': user } };
      const user6667Cnt = await countUser(userFilter4426);
      const userFilter3915 = { 'updatedBy': { '$in': user } };
      const user8771Cnt = await countUser(userFilter3915);
      const userRoleFilter3474 = { 'userId': { '$in': user } };
      const userRole8953Cnt = await countUserRole(userRoleFilter3474);
      const userCnt =  await User.countDocuments(filter);
      let response = { user : userCnt  };
      response = {
        ...response,
        ...user6667Cnt,
        ...user8771Cnt,
        ...userRole8953Cnt,
      };
      return response;
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter8376 = { 'roleId': { '$in': role } };
      const routeRole2789Cnt = await countRouteRole(routeRoleFilter8376);
      const userRoleFilter7036 = { 'roleId': { '$in': role } };
      const userRole5073Cnt = await countUserRole(userRoleFilter7036);
      const roleCnt =  await Role.countDocuments(filter);
      let response = { role : roleCnt  };
      response = {
        ...response,
        ...routeRole2789Cnt,
        ...userRole5073Cnt,
      };
      return response;
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectRoute = await ProjectRoute.find(filter, { _id:1 });
    if (projectRoute.length){
      projectRoute = projectRoute.map((obj) => obj._id);
      const routeRoleFilter4554 = { 'routeId': { '$in': projectRoute } };
      const routeRole4835Cnt = await countRouteRole(routeRoleFilter4554);
      const projectRouteCnt =  await ProjectRoute.countDocuments(filter);
      let response = { projectRoute : projectRouteCnt  };
      response = {
        ...response,
        ...routeRole4835Cnt,
      };
      return response;
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const userFilter8036 = { 'addedBy': { '$in': user } };
      const user0920 = await softDeleteUser(userFilter8036);
      const userFilter5035 = { 'updatedBy': { '$in': user } };
      const user2987 = await softDeleteUser(userFilter5035);
      const userRoleFilter6664 = { 'userId': { '$in': user } };
      const userRole9549 = await softDeleteUserRole(userRoleFilter6664);
      return await User.updateMany(filter, { isDeleted:true });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter2745 = { 'roleId': { '$in': role } };
      const routeRole4528 = await softDeleteRouteRole(routeRoleFilter2745);
      const userRoleFilter7788 = { 'roleId': { '$in': role } };
      const userRole7212 = await softDeleteUserRole(userRoleFilter7788);
      return await Role.updateMany(filter, { isDeleted:true });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter) =>{
  try {
    let projectRoute = await ProjectRoute.find(filter, { _id:1 });
    if (projectRoute.length){
      projectRoute = projectRoute.map((obj) => obj._id);
      const routeRoleFilter4855 = { 'routeId': { '$in': projectRoute } };
      const routeRole5518 = await softDeleteRouteRole(routeRoleFilter4855);
      return await ProjectRoute.updateMany(filter, { isDeleted:true });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.updateMany(filter, { isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter) =>{
  try {
    return await UserRole.updateMany(filter, { isDeleted:true });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteUser,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countUser,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteUser,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
