const fs = require("fs/promises");
const path = require("path")
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator")
const checkExtensions = require("./helpers/checkExtensions")

async function createFile (fileName, content) {
    const data = {
        fileName,
        content
    };
    const {error} = dataValidator(data);
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


module.exports = {
  createFile,
};