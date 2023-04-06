const errorMap = {
  IS_REQUIRED: 400,
  NOT_FOUND: 404,
  INVALID_VALUE: 400,
  EMAIL_ALREADY_EXISTS: 409,
  UNAUTHORIZED: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};