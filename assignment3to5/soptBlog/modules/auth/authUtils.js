const jwt = require('./jwt');
const { AuthorizationError } = require('../../errors');

const authUtil = {
    LoggedIn: async (req, res, next) => {
        const token = req.headers.token;
        if (!token) {
            throw new AuthorizationError();
        }
        const result = jwt.verify(token);
        const {
            userIdx
        } = result.data;
        if (!userIdx) {
            throw new AuthorizationError();
        }
        req.decoded = userIdx;
        next();
    },
};

module.exports = authUtil;
