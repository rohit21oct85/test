
function buildMakeRole ({
  insertRoleValidator,updateRoleValidator
}){
  return function makeRole (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertRoleValidator':
      isValid = insertRoleValidator(data);
      break;

    case 'updateRoleValidator':
      isValid = updateRoleValidator(data);  
      break; 
    }
    if (isValid.error){
      throw new Error(`Invalid data in Role entity. ${isValid.error}`);
    }
      
    return Object.freeze({
      get name (){return data.name;},
      get code (){return data.code;},
      get weight (){return data.weight;},
      get isActive (){return data.isActive;},
      get isDeleted (){return data.isDeleted;},
      get addedBy (){return data.addedBy;},
            
    });
  };
}
module.exports =  buildMakeRole;
