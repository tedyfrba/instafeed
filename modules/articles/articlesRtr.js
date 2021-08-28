let express = require('express')
const articleCtlr = require('./articleCtlr');

let router = express.Router()

router.get('/', articleCtlr.list);
router.get('/:id', articleCtlr.detail);
router.post('/', articleCtlr.create_post);

module.exports = router