const message = require('../../../utils/messages');
const responseCode = require('../../../utils/responseCode');
function makeRouteRoleController ({
  routeRoleService,makeRouteRole
})
{
  const addRouteRole = async ({ data }) => {
    try {
      const originalData = data;

      const routeRole = makeRouteRole(originalData,'insertRouteRoleValidator');
      let createdRouteRole = await routeRoleService.createDocument(routeRole);
            
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        createdRouteRole
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

  const bulkInsertRouteRole = async ({ body }) => {
    try {
      let data = body.data;
      const routeRoleEntities = body.data.map((item)=>makeRouteRole(item,'insertRouteRoleValidator'));
      const results = await routeRoleService.bulkInsert(routeRoleEntities);
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

  const findAllRouteRole = async ({ data }) => {
    try {
      let options = {};
      let query = {};
      let result;
      if (data.isCountOnly){
        if (data.query !== undefined) {
          query = { ...data.query };
        }
        result = await routeRoleService.countDocument(query);
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
        result = await routeRoleService.getAllDocuments(query,options);
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

  const getRouteRoleById = async (id) =>{
    try {
      if (id){
        let result = await routeRoleService.getSingleDocumentById(id);
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

  const partialUpdateRouteRole = async (data,id) => {
    try {
      if (id && data){
        const routeRole = makeRouteRole(data,'updateRouteRoleValidator');
        const filterData = removeEmpty(routeRole);
        const query = { _id:id };
        let updatedRouteRole = await routeRoleService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedRouteRole){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedRouteRole
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

  const updateRouteRole = async (data,id) =>{
    try {
      if (id && data){
        const routeRole = makeRouteRole(data,'updateRouteRoleValidator');
        const filterData = removeEmpty(routeRole);
        let query = { _id:id };
        let updatedRouteRole = await routeRoleService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedRouteRole){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedRouteRole
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

  const softDeleteRouteRole = async (id)=>{
    try {
      if (id){
        const query = { _id:id };
        let updatedRouteRole = await routeRoleService.softDeleteByQuery(query);
        return message.successResponse(
          { 'Content-Type': 'application/json' },
          responseCode.success,
          updatedRouteRole
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

  const getRouteRoleByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await routeRoleService.getDocumentByAggregation(data);
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

  const getRouteRoleCount = async (data) => {
    try {
      let where = {};
      if (data.where){
        where = data.where;
      }
      let result = await routeRoleService.countDocument(where);
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

  const upsertRouteRole = async (data)=>{
    try {
      if (data){
        let result;
        if (data.id) {
          let where = data.id; 
          const routeRole = makeRouteRole(data,'updateRouteRoleValidator');
          const filterData = removeEmpty(routeRole);
          result = await routeRoleService.updateDocument(where,filterData);
        }
        else {
          const routeRole = makeRouteRole(data,'insertRouteRoleValidator');
          result = await routeRoleService.createDocument(routeRole); 
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
    addRouteRole,
    bulkInsertRouteRole,
    findAllRouteRole,
    getRouteRoleById,
    partialUpdateRouteRole,
    updateRouteRole,
    softDeleteRouteRole,
    getRouteRoleByAggregate,
    getRouteRoleCount,
    upsertRouteRole,
    removeEmpty,
  });
}

module.exports = makeRouteRoleController;
