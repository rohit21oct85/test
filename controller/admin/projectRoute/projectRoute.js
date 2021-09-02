const message = require('../../../utils/messages');
const responseCode = require('../../../utils/responseCode');
function makeProjectRouteController ({
  projectRouteService,makeProjectRoute
})
{
  const addProjectRoute = async ({ data }) => {
    try {
      const originalData = data;

      const projectRoute = makeProjectRoute(originalData,'insertProjectRouteValidator');
      let createdProjectRoute = await projectRouteService.createDocument(projectRoute);
            
      return message.successResponse(
        { 'Content-Type': 'application/json' },
        responseCode.success,
        createdProjectRoute
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

  const bulkInsertProjectRoute = async ({ body }) => {
    try {
      let data = body.data;
      const projectRouteEntities = body.data.map((item)=>makeProjectRoute(item,'insertProjectRouteValidator'));
      const results = await projectRouteService.bulkInsert(projectRouteEntities);
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

  const findAllProjectRoute = async ({ data }) => {
    try {
      let options = {};
      let query = {};
      let result;
      if (data.isCountOnly){
        if (data.query !== undefined) {
          query = { ...data.query };
        }
        result = await projectRouteService.countDocument(query);
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
        result = await projectRouteService.getAllDocuments(query,options);
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

  const getProjectRouteById = async (id) =>{
    try {
      if (id){
        let result = await projectRouteService.getSingleDocumentById(id);
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

  const partialUpdateProjectRoute = async (data,id) => {
    try {
      if (id && data){
        const projectRoute = makeProjectRoute(data,'updateProjectRouteValidator');
        const filterData = removeEmpty(projectRoute);
        const query = { _id:id };
        let updatedProjectRoute = await projectRouteService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedProjectRoute){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedProjectRoute
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

  const softDeleteProjectRoute = async (id) => {
    try {
      const deleteDependentService = require('../../../utils/deleteDependent');
      let pos = [ {
        model: 'routeRole',
        refId: 'routeId' 
      } ];
      await projectRouteService.softDeleteByQuery(query);
      const query = { _id:id };
      let result = await deleteDependentService.softDeleteProjectRoute(query);
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

  const updateProjectRoute = async (data,id) =>{
    try {
      if (id && data){
        const projectRoute = makeProjectRoute(data,'updateProjectRouteValidator');
        const filterData = removeEmpty(projectRoute);
        let query = { _id:id };
        let updatedProjectRoute = await projectRouteService.findOneAndUpdateDocument(query,filterData,{ new:true });
        if (updatedProjectRoute){
          return message.successResponse(
            { 'Content-Type': 'application/json' },
            responseCode.success,
            updatedProjectRoute
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

  const getProjectRouteByAggregate = async ({ data }) =>{
    try {
      if (data){
        let result = await projectRouteService.getDocumentByAggregation(data);
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

  const getProjectRouteCount = async (data) => {
    try {
      let where = {};
      if (data.where){
        where = data.where;
      }
      let result = await projectRouteService.countDocument(where);
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

  const upsertProjectRoute = async (data)=>{
    try {
      if (data){
        let result;
        if (data.id) {
          let where = data.id; 
          const projectRoute = makeProjectRoute(data,'updateProjectRouteValidator');
          const filterData = removeEmpty(projectRoute);
          result = await projectRouteService.updateDocument(where,filterData);
        }
        else {
          const projectRoute = makeProjectRoute(data,'insertProjectRouteValidator');
          result = await projectRouteService.createDocument(projectRoute); 
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
    addProjectRoute,
    bulkInsertProjectRoute,
    findAllProjectRoute,
    getProjectRouteById,
    partialUpdateProjectRoute,
    softDeleteProjectRoute,
    updateProjectRoute,
    getProjectRouteByAggregate,
    getProjectRouteCount,
    upsertProjectRoute,
    removeEmpty,
  });
}

module.exports = makeProjectRouteController;
