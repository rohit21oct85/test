function convertObjectToEnum (obj) {
  const enumArr = [];
  Object.values(obj).map((val) => enumArr.push(val));
  return enumArr;
};

function randomNumber (length = 4) {
  const numbers = '12345678901234567890';
  let result = '';
  for (let i = length; i > 0; i -= 1) {
    result += numbers[Math.round(Math.random() * (numbers.length - 1))];
  }
  return result;
};

function replaceAll (string, search, replace) { return string.split(search).join(replace); };

function makeUniqueValidation (userService) {
  const uniqueValidation = async (data) =>{
    let filter = {};
    if (data && data['username']){
      filter = { 'username': data['username'] };
    }
    let found = await userService.getSingleDocumentByQuery(filter);
    if (found){
      return false;
    }
    return true;
  };
  return Object.freeze({ uniqueValidation });
}

module.exports = {
  convertObjectToEnum,
  randomNumber,
  replaceAll,
  makeUniqueValidation,
};
