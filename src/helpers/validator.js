const { getMessage } = require('../helpers/messages.js')

const getValidatorError = (error, messagePath) => {
  if (!error) return null;

  const errorMessages = {};
  error.details.map((detail) => {
    const message = detail.message //error.details[0].message; //
    const type = detail.type ///error.details[0].type; //
    const key = detail.context.key //error.details[0].context.key;

    const path = `${messagePath}.${key}.${type}`

    const customMessage = getMessage(path);

    if(!customMessage){
         console.log('customMessage not found for path:', path);
    }
    errorMessages[key] = customMessage || message;

});
  return errorMessages;
};

module.exports = { getValidatorError, getMessage };
