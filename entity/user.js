
function buildMakeUser ({
  insertUserValidator,updateUserValidator
}){
  return function makeUser (data,validatorName){
    let isValid = '';
    switch (validatorName){
    case 'insertUserValidator':
      isValid = insertUserValidator(data);
      break;

    case 'updateUserValidator':
      isValid = updateUserValidator(data);  
      break; 
    }
    if (isValid.error){
      throw new Error(`Invalid data in User entity. ${isValid.error}`);
    }
      
    return Object.freeze({
      get username (){return data.username;},
      get password (){return data.password;},
      get email (){return data.email;},
      get name (){return data.name;},
      get isActive (){return data.isActive;},
      get createdAt (){return data.createdAt;},
      get updatedAt (){return data.updatedAt;},
      get addedBy (){return data.addedBy;},
      get updatedBy (){return data.updatedBy;},
      get isDeleted (){return data.isDeleted;},
      get role (){return data.role;},
      get resetPasswordLink (){return data.resetPasswordLink;},
      get loginRetryLimit (){return data.loginRetryLimit;},
      get loginReactiveTime (){return data.loginReactiveTime;},
            
    });
  };
}
module.exports =  buildMakeUser;
