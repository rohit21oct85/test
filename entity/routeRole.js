
function buildMakeRouteRole ({
  insertRouteRoleValidator,updateRouteRoleValidator
}){
  return function makeRouteRole (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertRouteRoleValidator':
      isValid = insertRouteRoleValidator(data);
      break;

    case 'updateRouteRoleValidator':
      isValid = updateRouteRoleValidator(data);  
      break; 
    }
    if (isValid.error){
      throw new Error(`Invalid data in RouteRole entity. ${isValid.error}`);
    }
      
    return Object.freeze({
      get routeId (){return data.routeId;},
      get roleId (){return data.roleId;},
      get isActive (){return data.isActive;},
      get isDeleted (){return data.isDeleted;},
      get addedBy (){return data.addedBy;},
            
    });
  };
}
module.exports =  buildMakeRouteRole;
