var express = require('express');
//TODO add loggger

var articles = require('./modules/articles/articlesRtr')

var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
const DATABASE = 'instafeed';
var mongoDB = `mongodb://localhost:27017/${DATABASE}?retryWrites=true`;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(express.json());

app.use('/articles', articles)


//TODO add catch 404 

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json(err);
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
