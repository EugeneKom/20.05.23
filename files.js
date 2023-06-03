{
  const fs = require("fs/promises");
  const path = require("path");
  const dataValidator = require("./helpers/dataValidator");
  const checkExtensions = require("./helpers/checkExtensions");

  async function createFile(req, res, next) {
    const { fileName, content } = req.body;

    const { error } = dataValidator(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: `Please specify ${error.details[0].path} parametr ` });
      return;
    }
    const { extens, extInclude } = checkExtensions(fileName);
    if (!extInclude) {
      res.status(400).json({
        message: `Sorry this app doesn't support files with ".${extens}" extension`,
      });
      return;
    }
    const filePath = path.join(__dirname, "./files", fileName);
    try {
      await fs.writeFile(filePath, content, "utf-8");
      res.json({ message: "File was created successfully" });
    } catch (error) {
      res.status(500).json({ message: `${error.message}` });
    }
  }

  const getFiles = async (req, res, next) => {
    try {
      const result = await fs.readdir(path.join(__dirname, "./files"));
      if (!result.length) {
        res.status(404).json({ message: "No files in this directory." });
        return;
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  const getFile = async (req, res, next) => {
    try {
      const result = await fs.readdir(path.join(__dirname, "./files"));

      const { fileName } = req.params;

      const isPresent = result.includes(fileName);

      if (!isPresent) {
        res.status(404).json({
          message: `No file with "${fileName}" name in this directory`,
        });
        return;
      }
      const data = await fs.readFile(
        path.join(__dirname, "./files", fileName),
        "utf-8"
      );
      const extension = path.extname(fileName);
      const fileNameWithOutExt = path.basename(
        path.join(__dirname, "./files", fileName),
        extension
      );

      const fileData = {
        name: fileNameWithOutExt,
        extension,
        content: data,
      };
      res.json(fileData);
    } catch (error) {
      res.json({ message: error.message });
    }
  };

  module.exports = {
    createFile,
    getFiles,
    getFile,
  };
}
