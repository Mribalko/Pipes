
const hash      = require('crypto').createHash('md5');
const transform = require('stream').Transform;
const fs        = require('fs');

let fileName = "Part 2.js";

class transformHashHex extends transform {
    constructor(options) {
        super(options);
    };

    _transform(chunk, encoding, callback){
        // обновляем хеш новыми порциями данных
        hash.update(chunk);
        callback();
    };

    _flush(callback){
        // все прочитали. Считаем хеш и возвращаем результат
        this.push(hash.digest('hex'));
        callback();
    };
}

const input         = fs.createReadStream(fileName);
const output        = fs.createWriteStream(fileName + "_hashhex.txt");
const hexTransform  = new transformHashHex();

input
    .pipe(hexTransform)
    .pipe(process.stdout);

input
    .pipe(hexTransform)
    .pipe(output)
    .on('finish', () => {
        console.log('\nФайл записан')
    })
;