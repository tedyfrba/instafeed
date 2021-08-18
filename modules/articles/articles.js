let express = require('express')
var article = require('./article');
const process = require('../../process');

let router = express.Router()

let validArticles = [];
async function pushValid(jsonString) {
  validArticles.push(jsonString)
  return Promise.resolve(jsonString);
}

router.post('/', function (req, res) {
  process.jsonValidate(req.body)
  .then(data => pushValid(data))
  .then(data => res.json(data))
  .catch(e => res.status(400).json(e))
})

router.get('/', function (req, res) {
  res.json(validArticles)
})

router.get('/:id', function (req, res) {
  let id = req.params.id;
  console.log(id)
  res.json({id: article.get(id)})
})

module.exports = router