const encrypt = require('./encryption');

const password = 'asddf';
(async () => {
    const result1 = await encrypt.encrypt(password);
    // console.log(result1);
    const result2 = encrypt.encryptWithSalt(password,result1.salt);
    // console.log(result2);
    console.log(result1.hashed == result2.hashed)
})();
