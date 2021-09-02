
function buildMakeProjectRoute ({
  insertProjectRouteValidator,updateProjectRouteValidator
}){
  return function makeProjectRoute (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertProjectRouteValidator':
      isValid = insertProjectRouteValidator(data);
      break;

    case 'updateProjectRouteValidator':
      isValid = updateProjectRouteValidator(data);  
      break; 
    }
    if (isValid.error){
      throw new Error(`Invalid data in ProjectRoute entity. ${isValid.error}`);
    }
      
    return Object.freeze({
      get route_name (){return data.route_name;},
      get method (){return data.method;},
      get uri (){return data.uri;},
      get isActive (){return data.isActive;},
      get isDeleted (){return data.isDeleted;},
      get addedBy (){return data.addedBy;},
            
    });
  };
}
module.exports =  buildMakeProjectRoute;
