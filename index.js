// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);

//import required modules

const fs = require('fs');
const os = require('os');
const path = require('path');
Object.assign(process.env, { MYPATH: '/' });
// workaround for stackblitz env not working

const LoremIpsum = require('lorem-ipsum').LoremIpsum;

// variable definitions

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const fileName = 'dummy.txt';
const unicode = 'UTF-8';
const writeData = 'Hello world';

// function definitioons
function callback(error, data) {
  if (error) console.error(error);
  console.log(typeof data);
  if (typeof data === 'object') {
    console.log('buffer to string');
    console.log(data.toString());
  }
  if (typeof data === 'string') {
    console.log(data);
  }
}
console.log(os.EOL, 'check');

// file operations
let data = lorem.generateParagraphs(1000);
let resolvedFilePath = __dirname + process.env.MYPATH + 'dummy.txt';
resolvedFilePath = path.resolve(resolvedFilePath);

// let fsStream = fs.createWriteStream(resolvedFilePath);
// fsStream.write(data);

//stats behaviour with async operation

fs.writeFile(resolvedFilePath, data, unicode, () => {});

//stats
fs.stat(resolvedFilePath, (err, stats) => {
  console.dir(stats);
});

//stats behaviour with sync operation
fs.writeFileSync(resolvedFilePath, data, unicode, () => {});

//stats
fs.stat(resolvedFilePath, (err, stats) => {
  console.dir(stats);
});

// Read a file
// fs.readFile(resolvedFilePath, callback);
// write a file
// fs.writeFile(resolvedFilePath, writeData, unicode, () => {});
// appendFile
// fs.appendFile(
//   resolvedFilePath,
//   +os.EOL + writeData + os.EOL,
//   unicode,
//   callback
// );

// let renameFile = resolvedFilePath.replace(/dummy/, 'sample');
// fs.rename(resolvedFilePath, renameFile, callback);

// setTimeout(() => {
//   fs.unlink(renameFile, callback);
// }, 60 * 1000);

// fs.open(renameFile,)
