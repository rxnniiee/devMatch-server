const CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  LOCKED: 423,
  TOO_MANY_REQUESTS: 429,
  SERVER_ERROR: 500,
}

const MESSAGES = {
  OK: (message = null) => ({
    type: 'success',
    code: CODES.OK,
    message,
  }),
  CREATED: (message = null) => ({
    type: 'success',
    code: CODES.CREATED,
    message,
  }),
  ACCEPTED: (message = null) => ({
    type: 'success',
    code: CODES.ACCEPTED,
    message,
  }),
  BAD_REQUEST: (message = null) => ({
    type: 'error',
    code: CODES.BAD_REQUEST,
    message,
  }),
  UNAUTHORIZED: (message = null) => ({
    type: 'error',
    code: CODES.UNAUTHORIZED,
    message,
  }),
  PAYMENT_REQUIRED: (message = null) => ({
    type: 'error',
    code: CODES.PAYMENT_REQUIRED,
    message,
  }),
  FORBIDDEN: (message = null) => ({
    type: 'error',
    code: CODES.FORBIDDEN,
    message,
  }),
  NOT_FOUND: (message = null) => ({
    type: 'error',
    code: CODES.NOT_FOUND,
    message,
  }),
  METHOD_NOT_ALLOWED: (message = null) => ({
    type: 'error',
    code: CODES.METHOD_NOT_ALLOWED,
    message,
  }),
  NOT_ACCEPTABLE: (message = null) => ({
    type: 'error',
    code: CODES.NOT_ACCEPTABLE,
    message,
  }),
  CONFLICT: (message = null) => ({
    type: 'error',
    code: CODES.CONFLICT,
    message,
  }),
  GONE: (message = null) => ({
    type: 'error',
    code: CODES.GONE,
    message,
  }),
  LENGTH_REQUIRED: (message = null) => ({
    type: 'error',
    code: CODES.LENGTH_REQUIRED,
    message,
  }),
  PAYLOAD_TOO_LARGE: (message = null) => ({
    type: 'error',
    code: CODES.PAYLOAD_TOO_LARGE,
    message,
  }),
  UNSUPPORTED_MEDIA_TYPE: (message = null) => ({
    type: 'error',
    code: CODES.UNSUPPORTED_MEDIA_TYPE,
    message,
  }),
  LOCKED: (message = null) => ({
    type: 'error',
    code: CODES.LOCKED,
    message,
  }),
  TOO_MANY_REQUESTS: (message = null) => ({
    type: 'error',
    code: CODES.TOO_MANY_REQUESTS,
    message,
  }),
  SERVER_ERROR: (message = null) => ({
    type: 'error',
    code: CODES.SERVER_ERROR,
    message,
  }),
}

module.exports = { CODES, MESSAGES }
