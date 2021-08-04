const fs = require('fs');
const vldtn = require('./lib/validation');

// leer article.json
function jsonReader(filePath, callback) {
    fs.readFile(filePath, 'utf8' , (err, data) => {
        if (err) {
            return callback && callback(err)
        }
        try {
            const object = JSON.parse(data)
            return callback && callback(null, object)
        } catch(err) {
            return callback && callback(err)
        }
    })
}

jsonReader('./article.json', (err, data) => {
    if (err) {
        console.error(err);
        return
    }

    vldtn.validateWithYup(data, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);

    });

})