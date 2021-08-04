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
      let file2write = "./db.json";
      if (err) {
        console.error(err);
        file2write = "./invalid.json";
      }
      console.log(data);

      fs.appendFile(file2write, JSON.stringify(data)+',\n', 'utf8', err => {
          if (err) {
              console.log('Error writing file', err)
          } else {
              console.log('Successfully wrote file: ' + file2write)
          }
      })

    });

})