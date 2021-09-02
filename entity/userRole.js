
function buildMakeUserRole ({
  insertUserRoleValidator,updateUserRoleValidator
}){
  return function makeUserRole (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertUserRoleValidator':
      isValid = insertUserRoleValidator(data);
      break;

    case 'updateUserRoleValidator':
      isValid = updateUserRoleValidator(data);  
      break; 
    }
    if (isValid.error){
      throw new Error(`Invalid data in UserRole entity. ${isValid.error}`);
    }
      
    return Object.freeze({
      get userId (){return data.userId;},
      get roleId (){return data.roleId;},
      get isActive (){return data.isActive;},
      get isDeleted (){return data.isDeleted;},
      get addedBy (){return data.addedBy;},
            
    });
  };
}
module.exports =  buildMakeUserRole;
