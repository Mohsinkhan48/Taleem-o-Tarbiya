// utils/fileUtil.js
const fs = require("fs");
const path = require("path");

const writeToFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, "utf8", (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const writeToDirectory = async (folderPath, textToWrite) => {
  for (const fileName in textToWrite) {
    const completePath = path.join(folderPath, fileName);
    if (!fs.existsSync(path.dirname(completePath))) {
      fs.mkdirSync(path.dirname(completePath), { recursive: true });
    }
    await writeToFile(completePath, textToWrite[fileName]);
  }
};

const createDirectory = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

const deleteDirectoryRecursive = async (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.rm(dirPath, { recursive: true, force: true }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

module.exports = {
  writeToFile,
  createDirectory,
  writeToDirectory,
  deleteDirectoryRecursive,
};
