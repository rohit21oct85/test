const message = require('../../../utils/messages');
const responseCode = require('../../../utils/responseCode');
function makeUserRoleController ({
  userRoleService,makeUserRole
})
{
  const addUserRole = async ({ data }) => {
    try {
      const originalData = data;

      const userRole = makeUserRole(originalData,'insertUserRoleValidator');
      let createdUserRole = await userRoleService.createDocument(userRole);
            
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        createdUserRole
      );

    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          error.message
        );
      }
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };

  const bulkInsertUserRole = async ({ body }) => {
    try {
      let data = body.data;
      const userRoleEntities = body.data.map((item)=>makeUserRole(item,'insertUserRoleValidator'));
      const results = await userRoleService.bulkInsert(userRoleEntities);
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        results
      );
    } catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          error.message
        );
      }
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };

  const findAllUserRole = async ({ data }) => {
    try {
      let options = {};
      let query = {};
      let result;
      if (data.isCountOnly){
        if (data.query !== undefined) {
          query = { ...data.query };
        }
        result = await userRoleService.countDocument(query);
        if (result) {
          result = { totalRecords: result };  
        } else {
          return message.recordNotFound(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            []
          );
        }
      } else { 
        if (data.options !== undefined) {
          options = { ...data.options };
        }
        if (data.query !== undefined){
          query = { ...data.query };
        }
        result = await userRoleService.getAllDocuments(query,options);
      }
      if (result.data){
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          result
        );
      } else {
        return message.recordNotFound(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          {}
        );
      }
            
    }
    catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };

  const getUserRoleById = async (id) =>{
    try {
      if (id){
        let result = await userRoleService.getSingleDocumentById(id);
        if (result){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            result
          );
        }
        return message.recordNotFound(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          {}
        );
                 
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    }
    catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };

  const partialUpdateUserRole = async (data,id) => {
    try {
      if (id && data){
        const userRole = makeUserRole(data,'updateUserRoleValidator');
        const filterData = removeEmpty(userRole);
        const query = { _id:id };
        let updatedUserRole = await userRoleService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedUserRole){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedUserRole
          );
        }
        else {
          return message.badRequest(
            { 'Content-Type': 'application/json' },
            responseCode.badRequest,
            {}
          );
        }
      }
      else {
        return message.badRequest(
          { 'Content-Type': 'application/json' },
          responseCode.badRequest,
          {}
        );
      }
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          error.message
        );
      }
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };

  const updateUserRole = async (data,id) =>{
    try {
      if (id && data){
        const userRole = makeUserRole(data,'updateUserRoleValidator');
        const filterData = removeEmpty(userRole);
        let query = { _id:id };
        let updatedUserRole = await userRoleService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedUserRole){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedUserRole
          );
        }
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          error.message
        );
      }
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };

  const softDeleteUserRole = async (id)=>{
    try {
      if (id){
        const query = { _id:id };
        let updatedUserRole = await userRoleService.softDeleteByQuery(query);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          updatedUserRole
        );
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    } catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };

  const getUserRoleByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await userRoleService.getDocumentByAggregation(data);
        if (result){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            result
          );
        }
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    } catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      ); 
    }
  };

  const getUserRoleCount = async (data) => {
    try {
      let where = {};
      if (data.where){
        where = data.where;
      }
      let result = await userRoleService.countDocument(where);
      if (result){
        result = { totalRecords:result };
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          result
        );
                
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    }
    catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };

  const upsertUserRole = async (data)=>{
    try {
      if (data){
        let result;
        if (data.id) {
          let where = data.id; 
          const userRole = makeUserRole(data,'updateUserRoleValidator');
          const filterData = removeEmpty(userRole);
          result = await userRoleService.updateDocument(where,filterData);
        }
        else {
          const userRole = makeUserRole(data,'insertUserRoleValidator');
          result = await userRoleService.createDocument(userRole); 
        }
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          result
        );
                
      }
      return message.badRequest(
        { 'Content-Type': 'application/json' },
        responseCode.badRequest,
        {}
      );
    }
    catch (error){
      if (error.name === 'ValidationError'){
        return message.inValidParam(
          { 'Content-Type': 'application/json' },
          responseCode.validationError,
          error.message);
      }
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message);
    }
  };

  const removeEmpty = (obj) => {
    let newObj = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
      else if (obj[key] !== undefined) newObj[key] = obj[key];
    });
    return newObj;
  };

  return Object.freeze({
    addUserRole,
    bulkInsertUserRole,
    findAllUserRole,
    getUserRoleById,
    partialUpdateUserRole,
    updateUserRole,
    softDeleteUserRole,
    getUserRoleByAggregate,
    getUserRoleCount,
    upsertUserRole,
    removeEmpty,
  });
}

module.exports = makeUserRoleController;
