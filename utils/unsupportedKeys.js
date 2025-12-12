// utils/unsupportedKeys.js
function findUnsupportedKeys(dtoIn, allowedKeys) {
  const unsupported = [];
  Object.keys(dtoIn || {}).forEach(k => {
    if (!allowedKeys.includes(k)) unsupported.push(k);
  });
  return unsupported;
}

module.exports = { findUnsupportedKeys };
