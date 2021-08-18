var express = require('express');
var articles = require('./modules/articles/articles')

var app = express();
app.use(express.json());

app.use('/articles', articles)

const port = 8000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
