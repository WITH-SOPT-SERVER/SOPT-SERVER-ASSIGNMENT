const statusCode = require('../modules/utils/statusCode');
const responseMessage = require('../modules/utils/responseMessage');

class AuthorizationError extends Error {
    constructor(code = 'GENERIC', status = statusCode.FORBIDDEN, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthorizationError);
        }
        this.code = code;
        this.status = status;
        this.message = responseMessage.FORBIDDEN;
    }
}

module.exports = AuthorizationError;
