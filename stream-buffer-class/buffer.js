const {Buffer} = require('buffer');
const fs = require('fs');

const buffer = Buffer.alloc(10);
buffer.write('hello');
console.log('Buffer content:', buffer.toString('hex'));

const bufferArr = Buffer.from([0x41, 2, 3, 4, 5]);
console.log('Buffer content:', bufferArr.toString());

const fileBuffer = fs.readFileSync('hello.txt');
console.log('File Buffer content:', fileBuffer);

const fileStream = fs.createReadStream('hello.txt');
fileStream.on('data', (chunk) => {
  console.log('File Stream chunk:', chunk);
});
