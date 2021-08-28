var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchm = new Schema({
    _id: String,
    title: String,
    url: String,
    keywords: [String],
    modifiedAt: Date,
    publishedAt: Date,
    author: String,
    readMins: Number,
    source: {
        type: String,
        enum: ['ARTICLE', 'BLOG', 'TWEET', 'NEWSPAPER']
      }
});

//Export function to create "Article" model 
module.exports = mongoose.model('Article', ArticleSchm );