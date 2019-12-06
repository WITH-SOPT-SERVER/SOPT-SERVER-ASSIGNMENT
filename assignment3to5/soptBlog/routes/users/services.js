const {
    util,
    status,
    message
} = require('../../modules/utils');
const {
    NotMatchedError,
    AuthorizationError
} = require('../../errors');
const jwt = require('../../modules/auth/jwt');
const encrypt = require('../../modules/encryption/encryption');

const User = require('../../models/User');

module.exports = {
    signin: async ({
        id,
        password
    }) => {
        const userResult = await User.readWhere({
            id
        });
        if (userResult.length == 0){
            throw new NotMatchedError();
        }
        const user = userResult[0];
        const {
            hashed
        } = encrypt.encryptWithSalt(password, user.salt);
        if (user.password != hashed) {
            throw new AuthorizationError();
        }
        const {name, email, phone} = user;
        return jwt.publish({id, name, email, phone});
    },
    signup: async ({
        id,
        password,
        name,
        email,
        phone
    }) => {
        const {hashed, salt} = await encrypt.encrypt(password);
        const result = await User.create({id,password: hashed, salt, name, email, phone});
        const userId = result.insertId;
        return userId;
    }
};