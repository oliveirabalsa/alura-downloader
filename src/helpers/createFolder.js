const fs = require("fs");

/**
 * create folder
 * @param {string} dir 
 */
module.exports = function create_folder(dir) {
    if (!fs.existsSync(__dirname + '/' + dir)) {
        fs.mkdirSync(__dirname + '/' + dir);
    }
}