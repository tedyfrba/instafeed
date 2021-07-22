const fs = require('fs');
const vldtn = require('./lib/validation');

// leer article.json

fs.readFile('./article.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return
  }
  vldtn.validate(data);
})