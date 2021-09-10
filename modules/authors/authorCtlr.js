var Author = require('./authorMdl');

// Display list of all Authors.
exports.list = async function(req, res, next) {
  Author.find({}).exec()
      .then(data => res.json(data))
      .catch(err => next(err));
};

// Display detail page for a specific Author.
exports.detail = async function(req, res, next) {
    Author.findById(req.params.id).exec()
      .then(data => {
            if (!data)
                res.status(404).json()
            else
                res.json(data)
        })
      .catch(err => next(err));
};

// Handle Author create on POST.
exports.create_post = [
    (req, res, next) => {
        // Create a Author object.
        var author = new Author(
          { 
            name: req.body.name,
          });

        author.save()
            .then(data => res.json(data))
            .catch(err => next(err));
    }
];

// Handle Author update on PUT.
exports.update_put = [

    (req, res, next) => {
        // Create a Author object.
        var author = new Author(
          { 
            name: req.body.name,
            _id:req.params.id // This is required, or a new ID will be assigned!
          });

        Author.findByIdAndUpdate(req.params.id, author)
            .then(data => res.json(data))
            .catch(err => next(err));
    }
];

// Handle Author on DELETE.
exports.delete = async function(req, res, next) {
    // Assume the post has valid id (ie no validation/sanitization).
    Author.findByIdAndRemove(req.params.id).exec()
          .then(data => {
                if (!data)
                    res.status(404).json()
                else
                    res.status(204).json(data)
            })
          .catch(err => next(err));
};