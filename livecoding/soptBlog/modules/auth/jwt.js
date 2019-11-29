const jwt = require('jsonwebtoken');
const { TokenExpiredError, AuthorizationError } = require('../../errors');
const {
    secretOrPrivateKey
} = require('../config/secretKey');

const options = {
    algorithm: "HS256",
    expiresIn: "1m",
    issuer: "with-sopt"
};

const refreshOptions = {
    algorithm: "HS256",
    expiresIn: "2h",
    issuer: "with-sopt"
};

module.exports = {
    publish: (payload) => {
        const token = jwt.sign(payload, secretOrPrivateKey, options);
        const refreshToken = jwt.sign({
            refreshToken: payload
        }, secretOrPrivateKey, refreshOptions);
        return {
            token,
            refreshToken
        };
    },
    create: (payload) => {
        return jwt.sign(payload, secretOrPrivateKey, options);
    },
    verify: (token) => {
        try {
            const data = jwt.verify(token, secretOrPrivateKey);
            return data;
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                throw TokenExpiredError();
            }
            if (err.message === 'invalid token') {
                console.log('invalid token');
                throw AuthorizationError();
            }
            console.log(err);
            throw err;
        }
    },
    reissue: (payload, refreshToken) => {
        const result = jwt.verify(refreshToken);
        if(result.data.userIdx != payload.userIdx) {
            console.log('invalid token');
            throw AuthorizationError();
        }
        return jwt.sign(payload, secretOrPrivateKey, options);
    }
};