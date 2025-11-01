const fs = require('fs');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

async function copyFile(src, dest) {
  await pipelineAsync(
    fs.createReadStream(src),
    fs.createWriteStream(dest)
  );
  console.log('copy completed');
}
