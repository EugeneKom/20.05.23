function checkExtensions (fileName) {
    const EXTENSIONS = ["txt", "js", "json", "html", "css" ]
    const dotIndex = fileName.lastIndexOf('.');
    const extens = fileName.slice(dotIndex+1);
    const extInclude = EXTENSIONS.some((elem) => elem === extens);
    const obj = {
      extens,
      extInclude,
    };
    return obj;
    
}
module.exports = checkExtensions;