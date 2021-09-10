let express = require('express')
const authorCtlr = require('./authorCtlr');

let router = express.Router()

router.get('/', authorCtlr.list);
router.get('/:id', authorCtlr.detail);
router.post('/', authorCtlr.create_post);
router.put('/:id', authorCtlr.update_put);
router.delete('/:id', authorCtlr.delete);

module.exports = router