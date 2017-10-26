//cipher
const crypto = require('crypto');
const fs = require('fs');

const cipher = crypto.createCipher('aes192', 'a password');

const input = fs.createReadStream('secretfile.txt');
const output = fs.createWriteStream('secretfile.txt.enc');

input.pipe(cipher).pipe(output);


