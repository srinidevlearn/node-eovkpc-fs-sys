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
  // if (error) console.error(error);
  console.log(typeof data);
  if (typeof data === 'object') {
    console.log('buffer to string');
    // console.log(data.toString());
  }
  if (typeof data === 'string') {
    // console.log(data);
  }
}
// console.log(os.EOL, 'check');

// file operations
let data = lorem.generateParagraphs(2);
let resolvedFilePath = __dirname + process.env.MYPATH + 'dummy.txt';
resolvedFilePath = path.resolve(resolvedFilePath);

// if (fs.existsSync(resolvedFilePath)) fs.unlink(resolvedFilePath);

// let fsStream = fs.createWriteStream(resolvedFilePath);
// fsStream.write(data);

//stats behaviour with async operation

// fs.writeFile(resolvedFilePath, data, unicode, callback);
// //stats
// fs.stat(resolvedFilePath, (err, stats) => {
//   console.log('async', stats.size);
// });

// //stats behaviour with sync operation
// fs.writeFileSync(resolvedFilePath, data, unicode, () => {});

// //stats
// fs.stat(resolvedFilePath, (err, stats) => {
//   console.log('sync', stats.size);
// });

//stats behaviour with stream operation

// let fsStream = fs.createWriteStream(resolvedFilePath);

// fsStream.write(data);
// fsStream.fsStream.on('end', () => {
//   fs.stat(resolvedFilePath, (err, stats) => {
//     console.log('stats', stats);
//   });
// });

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

let renameFile = resolvedFilePath.replace(/dummy/, 'sample');
setTimeout(() => {
  fs.rename(resolvedFilePath, renameFile, callback);
}, 10 * 1000);

setTimeout(() => {
  fs.unlink(renameFile, callback);
}, 60 * 1000);

const appendText = (text) => {
  fs.open(resolvedFilePath, 'a', 666, (e, id) => {
    fs.write(id, text + os.EOL, null, 'utf8', () => {
      fs.close(id, () => {
        console.log('file is updated');
      });
    });
  });
};

const writeText = (text) => {
  fs.open(resolvedFilePath, 'w', 666, (e, id) => {
    fs.write(id, text + os.EOL, null, 'utf8', () => {
      fs.close(id, () => {
        console.log('file is updated');
      });
    });
  });
};

let count = Array.from({ length: 10 }, (i, ind) => ind);
for (let itm of count) {
  writeText('Hello world write' + itm);
  appendText('Hello world append' + itm);
}
// .forEach(() => {
// });
// fs.open(renameFile,)
