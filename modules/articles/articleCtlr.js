var Article = require('./articleMdl');
const vldtn = require('../../lib/validation');

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
            if (!data)
                res.status(404).json()
            else
                res.json(data)
        })
      .catch(err => next(err));
};

// Handle Article create on POST.
exports.create_post = [
    (req, res, next) => {
        // Create a Article object.
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

// Handle Article update on PUT.
exports.update_put = [

    (req, res, next) => {
        // Create a Article object.
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

        Article.findByIdAndUpdate(req.params.id, article)
            .then(data => res.json(data))
            .catch(err => next(err));
    }
];

// Handle Article update on PATCH.
exports.update_patch = [

    (req, res, next) => {
        
        var updateOps = {};
        for (let [key, value] of Object.entries(req.body)) {
          updateOps[key] = value;
        }

        Article.findByIdAndUpdate(req.params.id, updateOps)
            .then(data => res.json(data))
            .catch(err => next(err));
    }
];

// Handle Article on DELETE.
exports.delete = async function(req, res, next) {
    // Assume the post has valid id (ie no validation/sanitization).
    Article.findByIdAndRemove(req.params.id).exec()
          .then(data => {
                if (!data)
                    res.status(404).json()
                else
                    res.status(204).json(data)
            })
          .catch(err => next(err));
};