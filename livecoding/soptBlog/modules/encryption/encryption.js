const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');

module.exports = {
    encrypt: async (originStr) => {
        const salt = (await crypto.randomBytes(32)).toString('hex');
        const derivedKey = pbkdf2.pbkdf2Sync(originStr, salt.toString(), 1, 32, 'sha512');
        const hashed = derivedKey.toString('hex');
        return {
            salt,
            hashed
        };
    },
    encryptWithSalt: (password, salt) => {
        const derivedKey = pbkdf2.pbkdf2Sync(password, salt, 1, 32, 'sha512');
        const hashed = derivedKey.toString('hex');
        return {
            salt,
            hashed
        };
    }
}