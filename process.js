const fs = require('fs');
const vldtn = require('./lib/validation');

// leer article.json

fs.readFile('./article.json', 'utf8' , (err, data) => {
  if (err) throw err;
  vldtn.validateWithYup(JSON.parse(data));
})