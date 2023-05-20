const argv = require("yargs").argv;
const { createFile, getFiles, getFile } = require('./files')


// TODO: рефакторить
async function invokeAction({ action, fileName, content }) {
  switch (action) {

    case "create":
      await createFile(fileName, content);
      break;

    case "get":
      getFiles();
      break;

    case "getFile":
      getFile(fileName);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
