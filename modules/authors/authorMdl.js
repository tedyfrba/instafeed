var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchm = new Schema({
    name: String,
    articles: [{ type: Schema.ObjectId, ref: 'Article' }]
});

//Export function to create "Author" model 
module.exports = mongoose.model('Author', AuthorSchm );