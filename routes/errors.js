// utils/errors.js
class BadRequestError extends Error {
  constructor(message, uuAppErrorMap = {}) {
    super(message);
    this.name = "BadRequestError";
    this.uuAppErrorMap = uuAppErrorMap;
    this.status = 400;
  }
}

class NotFoundError extends Error {
  constructor(message, uuAppErrorMap = {}) {
    super(message);
    this.name = "NotFoundError";
    this.uuAppErrorMap = uuAppErrorMap;
    this.status = 404;
  }
}

module.exports = { BadRequestError, NotFoundError };
