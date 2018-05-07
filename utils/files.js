const fs = require('fs');

module.exports = {
    writeFile: (filename, content) => {
        return new Promise((resolve, reject)=> {
            fs.appendFile(filename, content, function (err) {
            if (err) reject(err);
            resolve(`Saved file ${filename}`);
            });
        });
    },
    makeDirectory: (dir)=>{
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    }
}