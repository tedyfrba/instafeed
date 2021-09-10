
//TODO add loggger

// Set up mongoose connection
var mongoose = require('mongoose');
const DATABASE = 'instafeed';
var mongoDB = `mongodb://localhost:27017/${DATABASE}?retryWrites=true`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var express = require('express');

var app = express();
app.use(express.json());

var articles = require('./modules/articles/articlesRtr')
var authors = require('./modules/authors/authorsRtr')
app.use('/articles', articles)
app.use('/authors', authors)


//TODO add catch 404 

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json(err);
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
