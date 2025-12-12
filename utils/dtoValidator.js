// utils/dtoValidator.js
const { findUnsupportedKeys } = require("./unsupportedKeys");
const { BadRequestError } = require("../routes/errors");

function validateRequired(dtoIn, requiredKeys) {
  const missing = [];
  requiredKeys.forEach(k => {
    if (dtoIn[k] === undefined || dtoIn[k] === null || dtoIn[k] === "") {
      missing.push(k);
    }
  });
  return missing;
}

/**
 * Basic validation helper producing the uuAppErrorMap structure
 * allowedKeys: array of allowed keys
 * requiredKeys: array of required keys
 */
function validateDtoIn(dtoIn, { allowedKeys = [], requiredKeys = [] } = {}) {
  const uuAppErrorMap = {};
  const unsupportedKeyList = findUnsupportedKeys(dtoIn, allowedKeys);
  if (unsupportedKeyList.length) {
    uuAppErrorMap.unsupportedKeys = { unsupportedKeyList };
  }
  const missing = validateRequired(dtoIn, requiredKeys);
  if (missing.length) {
    uuAppErrorMap.invalidDtoIn = { missingKeyMap: missing };
  }
  if (Object.keys(uuAppErrorMap).length) {
    throw new BadRequestError("DtoIn is invalid or contains unsupported keys.", uuAppErrorMap);
  }
  return uuAppErrorMap; // empty if ok
}

module.exports = { validateDtoIn };
