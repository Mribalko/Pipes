
const Readable      = require('stream').Readable;
const Transform     = require('stream').Transform;
const Writable      = require('stream').Writable;

class customReadable extends Readable{
    constructor(options){
        super(options)
    };

    _read(size){
        while(this.push(`${Math.floor(Math.random() * 100)}`)){}
    };
};

class customTransform extends Transform {
    constructor(options) {
        super(options);
    };

    _transform(chunk, encoding, callback) {
        setTimeout(callback, 1000, null, `${chunk * 2}`);
    };
};

class customWritable extends Writable{
    constructor(options){
        super(options)
    };

    _write(chunk, encoding, callback){
        console.log(chunk.toString());
        callback();
    };
};


const reader        = new customReadable();
const transformer   = new customTransform();
const writer        = new customWritable();


reader
    .pipe(transformer)
    .pipe(writer);