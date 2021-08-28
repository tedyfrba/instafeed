var Article = require('./articleMdl');

// Display list of all Articles.
exports.list = async function(req, res, next) {
  Article.find({}).exec()
      .then(data => res.json(data))
      .catch(err => next(err));
};

// Display detail page for a specific Article.
exports.detail = async function(req, res, next) {
    Article.findById(req.params.id).exec()
      .then(data => {
        res.json(data)
    })
      .catch(err => next(err));
};

// Handle Article create on POST.
exports.create_post = [
    (req, res, next) => {
        // Create a Article object with escaped and trimmed data.
        var article = new Article(
          { _id: req.body.id,
            title: req.body.title,
            url: req.body.url,
            keywords: req.body.keywords,
            modifiedAt: req.body.modifiedAt,
            publishedAt: req.body.publishedAt,
            author: req.body.author,
            readMins: req.body.readMins,
            source: req.body.source
           });

        article.save()
            .then(data => res.json(data))
            .catch(err => next(err));
    }
];
