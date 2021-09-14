const express = require('express');
const prcss = require('./process');

var app = express();

const port = 8000;

app.get('/', function (req, res) {
  prcss.readDir('./articles/');
  res.send('processing')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});