const fs = require("fs/promises");
const path = require("path")
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator")
const checkExtensions = require("./helpers/checkExtensions")

async function createFile(fileName, content) {
  const data = {
    fileName,
    content
  };
  const { error } = dataValidator(data);
  // console.log(validData.error.details[0]);
  if (error) {
    console.log(chalk.red(`Please specify ${error.details[0].path} parametr `));
    return
  }
  const { extens, extInclude } = checkExtensions(fileName);
  if (!extInclude) {
    console.log(
      chalk.red(`Sorry this app doesn't support files with ".${extens}" extension`)
    );
    return
  }
  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.blue("File was created successfully"))
  } catch (error) {
    console.log(error);
  }


}

const getFiles = async () => {
  try {
    const result = await fs.readdir(path.join(__dirname, "./files"))
    if (!result.length) {
      console.log(chalk.red('No files in this directory.'))
      return
    }
    console.log(result);

  } catch (error) {
    console.log(error.message);
  }
}
const getFile = async (fileName) => {

  try {
    const result = await fs.readdir(path.join(__dirname, "./files"))

    const isPresent = result.includes(fileName)

    if (!isPresent) {
      console.log(chalk.red(`No file with "${fileName}" name in this directory`));
      return
    }
    const data = await fs.readFile(path.join(__dirname, "./files", fileName), "utf-8")
    const extension = path.extname(fileName)
    const fileNameWithOutExt = path.basename(path.join(__dirname, "./files", fileName), extension)

    const fileData = {
      name: fileNameWithOutExt,
      extension,
      content: data
    }
    console.log(fileData);
  } catch (error) {
    console.log(error.message);
  }

}

module.exports = {
  createFile,
  getFiles,
  getFile,
};