
const hash  = require('crypto').createHash('md5');
const fs    = require('fs');

let fileName = "part 1.js";

const input     = fs.createReadStream(fileName);
const output    = fs.createWriteStream(fileName + "_hash.txt");

input
    .pipe(hash)
    .pipe(output)
    .on('finish', () => {
        console.log('\nФайл записан')
    })
    ;

input
    .pipe(hash)
    .pipe(process.stdout);
