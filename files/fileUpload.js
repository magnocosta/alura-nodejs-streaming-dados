const fs = require('fs');
const path = require('path');

module.exports = (sourcePath, name, callback) => {

    const validFileTypes = ['jpg', 'png', 'jpeg'];
    const fileType = path.extname(sourcePath);
    const targetPath = `./assets/images/${name}${fileType}`;
    const isFileValid = validFileTypes.includes(fileType.substring(1));

    if (isFileValid) {
        fs.createReadStream(sourcePath)
            .pipe(fs.createWriteStream(targetPath))
            .on('finish', () => callback(false, targetPath));
    } else {
        const message = 'Invalid file type';
        callback(message);
    }

}
