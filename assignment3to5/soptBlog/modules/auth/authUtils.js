const jwt = require('./jwt');
const { UnAuthorizationError } = require('../../errors');

const authUtil = {
    LoggedIn: async (req, res, next) => {
        const token = req.headers.token;
        if (!token) {
            throw new UnAuthorizationError();
        }
        const result = jwt.verify(token);
        const {
            userIdx
        } = result.data;
        if (!userIdx) {
            throw new UnAuthorizationError();
        }
        req.decoded = userIdx;
        next();
    },
};

module.exports = authUtil;
