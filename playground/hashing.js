// var salt = CryptoJS.lib.WordArray.random(128 / 8);
// var key128Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 128 / 32 });
// var key256Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 256 / 32 });
// var key512Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 512 / 32 });
// var key512Bits1000Iterations = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 512 / 32, iterations: 1000 });

const jwt = require('jsonwebtoken');

var data = {
    id: 11
};

var token = jwt.sign(data, '123abc'); 
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);