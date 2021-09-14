const fs = require('fs').promises;
const vldtn = require('./lib/validation');

async function jsonReader(filePath) {
    let jsonData = await fs.readFile(filePath, 'utf8');
    return await JSON.parse(jsonData);
}

async function jsonWriter(filePath, data) {
    let jsonData = await JSON.stringify(data)+',\n';
    return await fs.appendFile(filePath, jsonData, 'utf8');
}

async function readDir(dirPath) {
    let files = await fs.readdir(dirPath);

    await Promise.all(
        files.map(async (file) => jsonReader(dirPath+file)
            .then(data => vldtn.validateWithYup(data))
            .then(data => jsonWriter('./db.json', data))
            .catch(e => jsonWriter('./invalid.json', e.value))
        )
    );
}

// readDir('./articles/')
module.exports.readDir = readDir

/*jsonReader('./article.json')
    .then(data => vldtn.validateWithYup(data))
    .then(data => jsonWriter('./db.json', data))
    .catch(e => jsonWriter('./invalid.json', e));*/