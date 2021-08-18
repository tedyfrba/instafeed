const fs = require('fs').promises;
const vldtn = require('./lib/validation');

async function jsonReader(filePath) {
    let jsonData = await fs.readFile(filePath, 'utf8');
    return await JSON.parse(jsonData);
}

async function jsonWriter(filePath, data) {
    let jsonData = await JSON.stringify(data)+',\n';
    fs.appendFile(filePath, jsonData, 'utf8');
    return Promise.resolve(data);
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
module.exports.jsonValidate = jsonValidate
module.exports.jsonWriter = jsonWriter

async function jsonValidate(jsonString) {
    return vldtn.validateWithYup(jsonString)
        .then(data => jsonWriter('./db.json', data))
        .catch(e => {jsonWriter('./invalid.json', e.value); return Promise.reject(e)});
}