const message = require('../../../utils/messages');
const responseCode = require('../../../utils/responseCode');
function makeRoleController ({
  roleService,makeRole
})
{
  const addRole = async ({ data }) => {
    try {
      const originalData = data;

      const role = makeRole(originalData,'insertRoleValidator');
      let createdRole = await roleService.createDocument(role);
            
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        createdRole
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

  const bulkInsertRole = async ({ body }) => {
    try {
      let data = body.data;
      const roleEntities = body.data.map((item)=>makeRole(item,'insertRoleValidator'));
      const results = await roleService.bulkInsert(roleEntities);
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

  const findAllRole = async ({ data }) => {
    try {
      let options = {};
      let query = {};
      let result;
      if (data.isCountOnly){
        if (data.query !== undefined) {
          query = { ...data.query };
        }
        result = await roleService.countDocument(query);
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
        result = await roleService.getAllDocuments(query,options);
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

  const getRoleById = async (id) =>{
    try {
      if (id){
        let result = await roleService.getSingleDocumentById(id);
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

  const partialUpdateRole = async (data,id) => {
    try {
      if (id && data){
        const role = makeRole(data,'updateRoleValidator');
        const filterData = removeEmpty(role);
        const query = { _id:id };
        let updatedRole = await roleService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedRole){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedRole
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

  const softDeleteRole = async (id) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      let pos = [
        {
          model: 'routeRole',
          refId: 'roleId' 
        },
        {
          model: 'userRole',
          refId: 'roleId' 
        }
      ];
      await roleService.softDeleteByQuery(query);
      const query = { _id:id };
      let result = await deleteDependentService.softDeleteRole(query);
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        result);
            
    } catch (error){
      return message.failureResponse(
        { 'Content-Type': 'application/json' },
        responseCode.internalServerError,
        error.message
      );
    }
  };

  const updateRole = async (data,id) =>{
    try {
      if (id && data){
        const role = makeRole(data,'updateRoleValidator');
        const filterData = removeEmpty(role);
        let query = { _id:id };
        let updatedRole = await roleService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedRole){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedRole
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

  const getRoleByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await roleService.getDocumentByAggregation(data);
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

  const getRoleCount = async (data) => {
    try {
      let where = {};
      if (data.where){
        where = data.where;
      }
      let result = await roleService.countDocument(where);
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

  const upsertRole = async (data)=>{
    try {
      if (data){
        let result;
        if (data.id) {
          let where = data.id; 
          const role = makeRole(data,'updateRoleValidator');
          const filterData = removeEmpty(role);
          result = await roleService.updateDocument(where,filterData);
        }
        else {
          const role = makeRole(data,'insertRoleValidator');
          result = await roleService.createDocument(role); 
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
    addRole,
    bulkInsertRole,
    findAllRole,
    getRoleById,
    partialUpdateRole,
    softDeleteRole,
    updateRole,
    getRoleByAggregate,
    getRoleCount,
    upsertRole,
    removeEmpty,
  });
}

module.exports = makeRoleController;
