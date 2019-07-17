let fs = require("fs");

function getFileData(fileName) {
    let fileData = fs.readFileSync(fileName);
    //console.log(fileData.toString());

    //output each line as a seperate element in an array
    //break at new lines
    var splitLines = fileData.toString().split("\n");
    //console.log(splitLines);
    return splitLines;
}

module.exports.getFileData = getFileData;