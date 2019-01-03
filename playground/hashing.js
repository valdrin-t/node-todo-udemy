// var salt = CryptoJS.lib.WordArray.random(128 / 8);
// var key128Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 128 / 32 });
// var key256Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 256 / 32 });
// var key512Bits = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 512 / 32 });
// var key512Bits1000Iterations = CryptoJS.PBKDF2("Secret Passphrase", salt, { keySize: 512 / 32, iterations: 1000 });

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = 'valdrin123';

// bcrypt.genSalt(15, (err, salt) =>{
//     bcrypt.hash(password, salt, (err, hash) =>{
//         console.log(hash);
//     });
// });

var hashedPass = '$2a$15$zI4bOhCKnPJ8E7t2T8Xiz.Di556zGOlfJRclHAgDigzSorbyEEK9y';

bcrypt.compare(password, hashedPass, (err, result) =>{
    console.log(result);
});

// var data = {
//     id: 11
// };

// var token = jwt.sign(data, '123abc'); 
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);